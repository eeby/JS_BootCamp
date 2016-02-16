/**
 * Created by elibe on 09/02/2016.
 */

var fs                  = require("fs");
var readlineSync        = require('readline-sync');
var Table               = require('cli-table');
var groups              = [];
var persons             = [];
var currentGroup        = null;
var nextID              = 0;
var table               = new Table();
var tableFind           = new Table();
var tblPrintAll         = new Table();



var MENU_ADD_PERSON             = 1;
var MENU_ADD_GROUP              = 2;
var MENU_CHANGE_GROUP           = 3;
var MENU_PRINT_CURRENT_GROUP    = 4;
var MENU_PRINT_ALL              = 5;
var MENU_FIND_ELEMENT           = 6;
var MENU_DELETE                 = 7;
var MENU_CREATE_FILE            = 8;
var MENU_READ_FILE              = 9;
var MENU_EXIT                   = 10;

var CASE_PERSON = 1;
var CASE_GROUP  = 2;

(function createGUI(){
    addRoot();

    table.push(["1.",   "Add New Person"]);
    table.push(["2.",   "Add New Group"]);
    table.push(["3.",   "Change Current Group"]);
    table.push(["4.",   "Print Current Group"]);
    table.push(["5.",   "Print All Element"]);
    table.push(["6.",   "Find Element"]);
    table.push(["7.",   "Delete Element"]);
    table.push(["8.",   "Create IO File"]);
    table.push(["9.",   "Read IO File"]);
    table.push(["10.",  "Exit"]);

    // read file name PhoneBook.txt if exists
    readIOFile();
    drawTable();
})();

function runAction(action){
    var isRun = true;
    switch(+action){
        case MENU_ADD_PERSON:
            createPerson();
            break;
        case MENU_ADD_GROUP:
            createGroup();
            break;
        case MENU_CHANGE_GROUP:
            enterGroupNameTOChange();
            break;
        case MENU_PRINT_CURRENT_GROUP:
            tblPrintAll = new Table();
            printCurrentGroup();
            console.log(tblPrintAll.toString());
            break;
        case MENU_PRINT_ALL:
            tblPrintAll = new Table();
            printAllElem(groups[0]);
            console.log(tblPrintAll.toString());
            break;
        case MENU_FIND_ELEMENT:
            findElem();
            break;
        case MENU_DELETE:
            enterItemToDelete();
            tblPrintAll = new Table();
            break;
        case MENU_CREATE_FILE:
            createIOFile();
            break;
        case MENU_READ_FILE:
            readIOFile();
            break;
        case MENU_EXIT:
            isRun = false;
            break;
        default: // DO NOTHING
            break;
    }

    if(isRun){
        readlineSync.question('Press any key to continue! ');
        drawTable();
    }
    else
    {
        endProg();
    }
}

function endProg(){
    var saveOrNot = readlineSync.question('Do you want to save your changes? \nPress Y to save or N not to save:   ');
    if(saveOrNot.toUpperCase() == "Y") {
        createIOFile();
    }
    console.log("See You Later");
}

function createPerson() {
    var firstName   = readlineSync.question('First name? ');
    var lastName    = readlineSync.question('Last name? ');
    var phone       = readlineSync.question('Phone number? ');

    addPerson(firstName, lastName, phone);
}

function createGroup(){
    var name = readlineSync.question('Group name? ');
    addGroup(name);
}

function enterGroupNameTOChange(){
    var name = readlineSync.question('Group name? ');
    changeCurrentGroup(name);
}

function deletePersons(){
    for(var i=0; i<persons.length; i++){
        tblShowElems.push([persons[i].ID, persons[i].firstName, persons[i].lastName]);
    }
    console.log(tblShowElems.toString());
    delPersonItem(readlineSync.question('Please enter the person ID? '));
}

function deleteGroup(){
    for(var y=1; y<groups.length; y++){
        tblShowElems.push([groups[y].ID, groups[y].name]);
    }
    console.log(tblShowElems.toString());
    delGroupItem(readlineSync.question('Please enter the group ID? '));
    currentGroup = groups[0];
}

function enterItemToDelete(){
    var typeElme = readlineSync.question('Press 1 to delete a Person or 2 to delete a Group: ');
    tblShowElems = new Table();
    tblShowElems.push(["ID", "Name"]);
    switch (+typeElme){
        case CASE_PERSON:
            deletePersons();
            break;
        case CASE_GROUP:
            deleteGroup();
            break;
    }
}

function findElem(){
    var typeElme = readlineSync.question('Press 1 to find a Person or 2 to find a Group: ');
    tableFind = new Table();
    switch (+typeElme){
        case CASE_PERSON:
            findPersonByName(readlineSync.question('Please enter the persons name? '));
            break;
        case CASE_GROUP:
            findGroupByName(readlineSync.question('Please enter the groups name? '));
            break;
    }
}

function addPerson(firstName, lastName, phone){
    persons.push(
        {
            ID: generateID(),
            groupID: currentGroup.ID,
            firstName: firstName,
            lastName: lastName,
            phone: phone
        }
    );
}

function addGroup(groupName){
    var group = {
        ID: generateID(),
        name: groupName,
        parentID: currentGroup.ID
    };
    groups.push(group);
    currentGroup = group;
}

function addRoot(){
    var root = {
        ID: -1,
        name: "root",
        parentID: null
    };

    groups.push(root);
    currentGroup = root;
}

function generateID(){
    return ++nextID;
}

function changeCurrentGroup(groupName){
    if(groupName != ".."){
        var groupNameExists = false;
        for(var i=0; i<groups.length; i++){
            if(groups[i].name.toUpperCase() == groupName.toUpperCase()){
                currentGroup = groups[i];
                groupNameExists = true;
            }
        }
        if(groupNameExists == false){
            console.log("False group name!");
        }
    }
    else{
        if(currentGroup.ID != -1){
            for(var i=0; i<groups.length; i++){
                if(groups[i].ID == currentGroup.ID){
                    currentGroup = getParent(groups[i].parentID);
                }
            }
        }
    }
}

function getParent(ID){
    for(var i=0; i<groups.length; i++){
        if(groups[i].ID == ID){
            return groups[i];
            break;
        }
    }
}

function printCurrentGroup(){
    for(var i=0; i <groups.length; i++){
        if(groups[i].ID == currentGroup.ID){
            printAllElem(groups[i]);
        }
    }
}

function printPersons(groupID){
    if(persons) {
        for (var y = 0; y < persons.length; y++) {
            if (persons[y].groupID == groupID) {
                tblPrintAll.push(["", persons[y].firstName, persons[y].lastName, persons[y].phone ]);
                //console.log("  Person: Name:" + persons[y].firstName + " Last Name: " + persons[y].lastName + " Phone: " + persons[y].phone);
            }
        }
    }
}

function printAllElem(obj) {
    if (obj.ID != -1) {
        tblPrintAll.push([obj.name]);
    }

    printPersons(obj.ID);

    for (var i = 0; i < groups.length; i++) {
        if (groups[i].parentID == obj.ID) {
            printAllElem(groups[i]);
        }
    }
}

function findPersonByName(strName) {
    var exists = false;

    for (var i = 0; i < persons.length; i++) {
        if (persons[i].firstName.toUpperCase() == strName.toUpperCase() || persons[i].lastName.toUpperCase() == strName.toUpperCase() || persons[i].phone == strName) {
            printTable(persons[i]);
            //console.log("Name:" + persons[i].firstName + " Last Name: " + persons[i].lastName + " Phone: " + persons[i].phone);
            exists = true;
            break;
        }
    }

    if(exists == false){
        console.log("Group Name not exists!")
    }
}

function findGroupByName(strName){
    var exists = false;

    for(var i=0; i<groups.length; i++){
        if(groups[i].name.toUpperCase() == strName.toUpperCase()){
            printTable(groups[i]);
            //console.log("Group Name:" + groups[i].name);
            exists = true;
            break;
        }
    }

    if(exists == false){
        console.log("Group Name not exists!")
    }

}

function delPersonItem(ID){
    for(var i=0; i<persons.length; i++){
        if(persons[i].ID == ID){
            persons.splice(i,1);
        }
    }
}

function deletePersonsUnderGroup(groupID){
    if(persons) {
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].groupID == groupID) {
                persons.splice(i, 1);
                i--;
            }
        }
    }
}

function delGroupItem(groupID) {

    // delete persons under  the current group
    deletePersonsUnderGroup(groupID);

    // delete groups under current group
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].parentID == groupID) {
            // delete persons under  the current group
            deletePersonsUnderGroup(groupID);

            groups.splice(i, 1);
            i--;
        }
    }

    // delete current group
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].ID == groupID){
            groups.splice(i, 1);
        }
    }
}

function printTable(obj){
    var keys = Object.keys(obj);
    tableFind.push(keys);
    tableFind.push(pushToArr(keys, obj));
    console.log(tableFind.toString());
}

function pushToArr(keys, obj){
    var arrVal = [];
    for(var i=0; i<keys.length; i++){
        arrVal.push(obj[keys[i]]);
    }
    return arrVal;
}

function drawTable(){
    console.log(table.toString());
    var actionSelected = readlineSync.question("\n" + currentGroup.name + " > ");
    runAction(actionSelected);
}

function getGroupName(){

}

function createIOFile() {
    var phoneBook = {
        groups:         groups,
        persons:        persons,
        nextID:         nextID
    }
    fs.writeFileSync('PhoneBook.txt', JSON.stringify(phoneBook), 'utf8', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("Data written successfully!");
    });
}

function readIOFile() {
    if(fs.existsSync('PhoneBook.txt')) {
        var data        = fs.readFileSync('PhoneBook.txt', 'utf8');
        var phoneBook   = JSON.parse(data);
        groups          = phoneBook.groups;
        persons         = phoneBook.persons;
        nextID          = phoneBook.nextID;
    }
}