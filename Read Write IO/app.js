var rl = require('readline-sync');
var fs = require("fs");

var root = createGroup("~");
var currentGroup = root;
var nextId = 0;
var objString;
var readFileIndex = 0;

var Menu = {
    ADD_NEW_CONTACT: 1,
    ADD_NEW_GROUP: 2,
    CHANGE_CURRENT_GROUP: 3,
    PRINT: 4,
    PRINT_ALL: 5,
    FIND: 6,
    DELETE: 7,
    EXIT: 8
};

function printMenu() {
    console.log();
    console.log("1) Add new contact");
    console.log("2) Add new group");
    console.log("3) Change current group");
    console.log("4) Print");
    console.log("5) Print All");
    console.log("6) Find");
    console.log("7) Delete");
    console.log("8) Exit");
}

function run() {
    while (true) {
        printMenu();
        var command = rl.question("Contact Book> ");
        handleCommand(command);
    }
}

function handleCommand(line) {
    var command = parseInt(line);

    if (command == Menu.ADD_NEW_CONTACT) {
        addNewContact();
    }
    else if (command == Menu.ADD_NEW_GROUP) {
        addNewGroup();
    }
    else if (command == Menu.CHANGE_CURRENT_GROUP) {
        changeCurrentGroup();
    }
    else if (command == Menu.PRINT) {
        print();
    }
    else if (command == Menu.PRINT_ALL) {
        printAll(root);
    }
    else if (command == Menu.FIND) {
        find();
    }
    else if (command == Menu.DELETE) {
        deleteItem();
    }
    else if (command == Menu.EXIT) {
        WriteIOFile();
        exit();
    }
}

function addNewContact() {
    var firstName = readNonEmptyString("First Name: ");
    var lastName = readNonEmptyString("Last Name: ");

    var phoneNumbers = [];
    while (true) {
        var phoneNumber = rl.question("Phone Number (press enter when done): ");
        if (!phoneNumber) {
            break;
        }

        phoneNumbers.push(phoneNumber);
    }

    var contact = createContact(firstName, lastName, phoneNumbers)
    addItem(contact);
}

function addNewGroup() {
    var name = readNonEmptyString("Name: ");

    var group = createGroup(name);
    addItem(group);
}

function changeCurrentGroup() {
    var name = readNonEmptyString("Name: ");
    if (name == "..") {
        if (!currentGroup.parent) {
            return;
        }

        currentGroup = currentGroup.parent;
    }
    else {
        var subGroup = findGroup(root, name);
        if (!subGroup) {
            console.log("Group with name " + name + " was not found")
        }

        currentGroup = subGroup;
    }
}

function print() {
    currentGroup.items.forEach(function (item) {
        if (item.type == "Group") {
            printGroup(item);
        }
        else {
            printContact(item);
        }
    });

}

function printAll(currentGroup) {
    printGroup(currentGroup);
    currentGroup.items.forEach(function (item) {
        if (item.type == "Contact") {
            printContact(item);
        }
    });

    currentGroup.items.forEach(function (item) {
        if (item.type == "Group") {
            printAll(item);
        }
    });
}

function find() {
    var name = readNonEmptyString("Name: ");

    currentGroup.items.forEach(function (item) {
        if (item.name != name && item.firstName != name) {
            return;
        }
        if (item.type == "Contact") {
            printContact(item);
        }
        else {
            printGroup(item);
        }
        return;
    });
}

function deleteItem() {
    var ID = readNonEmptyString("ID: ");
    findItemAndDelete(root, ID);
}

function findItemAndDelete(cGroup, ID) {
    cGroup.items.forEach(function (item, index) {
        if (item.id == ID) {

            cGroup.items.splice(index, 1);
            currentGroup = root;
            return;
        }
        else if (item.type == "Group") {
            findItemAndDelete(item, ID)
        }
    });
}

function exit() {
    process.exit(0);
}

function createContact(firstName, lastName, phoneNumbers) {
    var contact = {
        id: generateNextId(),
        type: 'Contact',
        firstName: firstName,
        lastName: lastName,
        phoneNumbers: phoneNumbers,
    };

    return contact;
}

function pushContact(id, firstName, lastName, phoneNumbers) {
    var contact = {
        id: id,
        type: 'Contact',
        firstName: firstName,
        lastName: lastName,
        phoneNumbers: phoneNumbers,
    };

    return contact;
}


function updateRoot(childrenCount) {
    root.childrenCount = childrenCount;
}


function addItem(item) {
    if (item.currentGroup) {
        throw Error("Item with id " + item.id + " was already added to group: " + item.currentGroup.id);
    }

    currentGroup.items.push(item);
    currentGroup.childrenCount = +currentGroup.childrenCount + 1;
    item.parent = currentGroup;
}

function pushItem(item) {
    currentGroup.items.push(item);
    item.parent = currentGroup;
}

function generateNextId() {
    return nextId++;
}

function printGroup(group) {
    console.log("Group -- ID: " + group.id + " -- Name: " + group.name);
}

function printContact(contact) {
    console.log("Contact -- ID: " + contact.id + " -- First Name: " + contact.firstName
        + " -- Last Name: " + contact.lastName
        + " -- Phones: " + contact.phoneNumbers.toString());
}

function readNonEmptyString(message) {
    while (true) {
        var line = rl.question(message).trim();
        if (line) {
            return line;
        }
    }
}

function findGroup(currentGroup, name) {
    currentGroup.items.forEach(function (item) {
        if (item.type == "Group" && item.name.toUpperCase() == name.toUpperCase()) {
            currentGroup = item;
            return;
        }
    });
    return currentGroup;
}

function WriteIOFile() {
    objString = '{"nextId": "' + nextId + '"}';
    convertObjectToString(root);

    fs.writeFileSync('PhoneBook.txt', objString, 'utf8', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("SUCCESS");
    });
}

function convertObjectToString(currentGroup) {
    convertGroupToString(currentGroup);
    currentGroup.items.forEach(function (item) {
        if (item.type == "Contact") {
            convertContactToString(item);
        }
    });

    currentGroup.items.forEach(function (item) {
        if (item.type == "Group") {
            convertObjectToString(item);
        }
    });
}

function convertGroupToString(item) {
    objString += '|{';
    objString += '"type": "' + item.type + '",';
    objString += '"id": "' + item.id + '",';
    objString += '"name": "' + item.name + '",';
    objString += '"items": "' + item.childrenCount + '"';
    objString += '}';
}

function convertContactToString(item) {
    objString += '|{';
    objString += '"type": "' + item.type + '",';
    objString += '"id": "' + item.id + '",';
    objString += '"firstName": "' + item.firstName + '",';
    objString += '"lastName": "' + item.lastName + '",';
    objString += '"phoneNumbers": "' + item.phoneNumbers + '"';
    objString += '}';
}

function readIOFile() {
    if (fs.existsSync('PhoneBook.txt')) {
        var dataArr = fs.readFileSync('PhoneBook.txt', 'utf8').split('|');

        var obj = JSON.parse(dataArr[readFileIndex]);
        nextId = obj.nextId;
        readFileIndex++;

        // root object
        obj = JSON.parse(dataArr[readFileIndex]);
        readFileIndex++;
        updateRoot(obj.items);

        for (var i = 0; i < root.childrenCount; i++) {
            obj = JSON.parse(dataArr[readFileIndex]);
            readFileIndex++;
            addGroupsAndContactsToPhoneBook(obj, dataArr);
        }
    }

    currentGroup = root;
}

function addGroupsAndContactsToPhoneBook(currentObj, dataArr) {
    if (currentObj.type == 'Group') {
        var group = pushGroup(currentObj.id, currentObj.name, currentObj.items);
        pushItem(group);
        currentGroup = group;

        for (var i = 0; i < currentGroup.childrenCount; i++) {
            var obj = JSON.parse(dataArr[readFileIndex]);
            readFileIndex++;
            addGroupsAndContactsToPhoneBook(obj, dataArr);
        }
        currentGroup = currentGroup.parent;
    }
    else {
        addContactToPhoneBook(currentObj);
    }
}

function addContactToPhoneBook(currentObj) {
    var phoneNumbers = currentObj.phoneNumbers.split(',');
    var contact = pushContact(currentObj.id, currentObj.firstName, currentObj.lastName, phoneNumbers);
    pushItem(contact);
}

(function () {
    readIOFile(root);
    run();
})();



