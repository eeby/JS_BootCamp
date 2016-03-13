/**
 * Created by elibe on 09/02/2016.
 */

var fs                              = require("fs");
var readlineSync                    = require('readline-sync');
var Table                           = require('cli-table');

var tableMenu                       = new Table();
var tableShowElems                  = new Table();

var groups                          = [];
var persons                         = [];

var currentGroup                    = null;
var nextID                          = 0;
var foundString                     = false;

var MENU_ADD_PERSON                 = 1;
var MENU_ADD_GROUP                  = 2;
var MENU_CHANGE_GROUP               = 3;
var MENU_PRINT_CURRENT_GROUP        = 4;
var MENU_PRINT_ALL                  = 5;
var MENU_FIND_ELEMENT               = 6;
var MENU_DELETE                     = 7;
var MENU_CREATE_FILE                = 8;
var MENU_READ_FILE                  = 9;
var MENU_EXIT                       = 10;

var MENU_ITEM_ADD_PERSON            = "Add New Person";
var MENU_ITEM_ADD_GROUP             = "Add New Group";
var MENU_ITEM_CHANGE_GROUP          = "Change Current Group";
var MENU_ITEM_PRINT_CURRENT_GROUP   = "Print Current Group";
var MENU_ITEM_PRINT_ALL_ELEMENTS    = "Print All Element";
var MENU_ITEM_FIND_ELEMENT          = "Find Element";
var MENU_ITEM_DELETE_ELEMENT        = "Delete Element";
var MENU_ITEM_CREATE_FILE           = "Create IO File";
var MENU_ITEM_READ_FILE             = "Read IO File";
var MENU_ITEM_EXIT                  = "EXIT";

var CAPTION_ID                  = "ID";
var CAPTION_GROUP_NAME          = "Group Name";
var CAPTION_FIRST_NAME          = "First Name";
var CAPTION_LAST_NAME           = "Last Name";
var CAPTION_PHONES              = "Phones";

var PARAM_PERSON                = 1;
var PARAM_GROUP                 = 2;
var PARAM__NAME                 = "name";
var PARAM_FIRST_NAME            = "firstName";
var PARAM_LAST_NAME             = "lastName";

var QUESTION_FIRST_NAME         = "Enter First Name: ";
var QUESTION_LAST_NAME          = "Enter Last Name: ";
var QUESTION_PHONE              = "Enter Phone Number: ";
var QUESTION_ANOTHER_PHONE      = "Do you want to enter another phone number? \nPress Y for yes or N for not: ";
var QUESTION_GROUP_NAME         = "Enter Group Name: ";
var QUESTION_SAVE_CHANGES       = "Do you want to save your changes? \nPress Y for yes or N for not: " ;
var QUESTION_PRESS_TO_CONTINUE  = "\n\nPress any key to continue! " ;
var QUESTION_ID_TO_DELETE       = "Please enter the ID to delete? " ;
var QUESTION_STRING_TO_FIND     = "Please enter the string you are looking? " ;
var QUESTION_STRING_NOT_FOUND   = "There is no Group or Person named: ";

var MESSAGE_IO_SUCCESS          = "Data written successfully!";
var MESSAGE_GOOD_BYE            = "Good Bye!";
var MESSAGE_FALSE_NAME          = "Group name doesn't exists under current group!";
var MESSAGE_IO_SUCCESS          = "Data written successfully!";

var ROOT_GROUP                  = "root";

(function createGUI(){
    addRoot();

    tableMenu.push(["1.",   MENU_ITEM_ADD_PERSON]);
    tableMenu.push(["2.",   MENU_ITEM_ADD_GROUP]);
    tableMenu.push(["3.",   MENU_ITEM_CHANGE_GROUP]);
    tableMenu.push(["4.",   MENU_ITEM_PRINT_CURRENT_GROUP]);
    tableMenu.push(["5.",   MENU_ITEM_PRINT_ALL_ELEMENTS]);
    tableMenu.push(["6.",   MENU_ITEM_FIND_ELEMENT]);
    tableMenu.push(["7.",   MENU_ITEM_DELETE_ELEMENT]);
    tableMenu.push(["8.",   MENU_ITEM_CREATE_FILE]);
    tableMenu.push(["9.",   MENU_ITEM_READ_FILE]);
    tableMenu.push(["10.",  MENU_ITEM_EXIT]);

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
            setTableHeader();
            printCurrentGroup();
            console.log(tableShowElems.toString());
            break;
        case MENU_PRINT_ALL:
            setTableHeader();
            printAllElem(groups[0]);
            console.log(tableShowElems.toString());
            break;
        case MENU_FIND_ELEMENT:
            findElem();
            break;
        case MENU_DELETE:
            setTableHeader();
            printAllElem(groups[0]);
            console.log(tableShowElems.toString());
            enterItemToDelete();
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
        readlineSync.question(QUESTION_PRESS_TO_CONTINUE);
        drawTable();
    }
    else
    {
        endProg();
    }
}

function endProg(){
    var saveOrNot = readlineSync.question(QUESTION_SAVE_CHANGES);
    if(saveOrNot.toUpperCase() == "Y") {
        createIOFile();
    }
    console.log(MESSAGE_GOOD_BYE);
}

function checkStringNotEmpty(question){
    var param;
    do{
        param = readlineSync.question(question);
    }
    while (param == "");

    return param;
}

function createPerson() {
    var phoneArr    = [];
    var firstName   = checkStringNotEmpty(QUESTION_FIRST_NAME);
    var lastName    = checkStringNotEmpty(QUESTION_LAST_NAME);

    do{
        phoneArr.push(checkStringNotEmpty(QUESTION_PHONE));
    }
    while (readlineSync.question(QUESTION_ANOTHER_PHONE).toUpperCase() == "Y");

    addPerson(firstName, lastName, phoneArr);
}

function createGroup(){
    var name = checkStringNotEmpty(QUESTION_GROUP_NAME);

    addGroup(name);
}

function enterGroupNameTOChange(){

    var name = readlineSync.question(QUESTION_GROUP_NAME);
    changeCurrentGroup(name);
}

function deletePersons(itemToDelete){
    delPersonItem(itemToDelete);
}

function deleteGroup(itemToDelete){
    delGroupItem(itemToDelete);
    currentGroup = groups[0];
}

function setTableHeader(){
    tableShowElems = new Table();
    tableShowElems.push([CAPTION_ID, CAPTION_GROUP_NAME, CAPTION_FIRST_NAME, CAPTION_LAST_NAME, CAPTION_PHONES]);
}

function enterItemToDelete(){
    var itemToDelete = readlineSync.question(QUESTION_ID_TO_DELETE);
    if(!deleteGroup(itemToDelete)){
        deletePersons(itemToDelete);
    }
}

function findElem(){
    setTableHeader();
    var stringToFind = readlineSync.question(QUESTION_STRING_TO_FIND);
    findByName(stringToFind);
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
        name: ROOT_GROUP,
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
            if(groups[i].name.toUpperCase() == groupName.toUpperCase() && currentGroup.ID == groups[i].parentID){
                currentGroup = groups[i];
                groupNameExists = true;
                break;
            }
        }
        if(groupNameExists == false){
            console.log(MESSAGE_FALSE_NAME);
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

function printPersonsByGroupID(groupID) {
    for (var y = 0; y < persons.length; y++) {
        if (persons[y].groupID == groupID) {
            printPerson(persons[y]);
        }
    }
}

function printPerson(person){
    tableShowElems.push([person.ID, "", person.firstName, person.lastName, person.phone.toString()]);
}

function printGroup(group) {
    if (group.ID != -1) {
        tableShowElems.push([group.ID ,group.name]);
    }
}

function printAllElem(obj) {
    printGroup(obj);
    printPersonsByGroupID(obj.ID);

    for (var i = 0; i < groups.length; i++) {
        if (groups[i].parentID == obj.ID) {
            printAllElem(groups[i]);
        }
    }
}

function findByName(stringToFind) {
    foundString = false;
    for(var i=0; i<groups.length; i++){
        checkString(stringToFind, groups[i], PARAM_GROUP);
    }
    for (var i = 0; i < persons.length; i++) {
        checkString(stringToFind, persons[i], PARAM_PERSON);
    }
    if(foundString){
        console.log(tableShowElems.toString());
    }
    else{
        console.log(QUESTION_STRING_NOT_FOUND + stringToFind);
    }
}

function checkString(stringToFind, object, paramType){
    var keys = Object.keys(object);

    for(var i=0; i<keys.length; i++){
        if(keys[i] == PARAM__NAME || keys[i] == PARAM_FIRST_NAME || keys[i] == PARAM_LAST_NAME) {
            if (object[keys[i]].toLowerCase() == stringToFind.toLowerCase()) {
                foundString = true;
                if (paramType == 1) {
                    printPerson(object);
                }
                else {
                    printGroup(object);
                }
            }
        }
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
            return true;
        }
    }
}

function drawTable(){
    console.log(tableMenu.toString());
    var actionSelected = readlineSync.question("\n" + currentGroup.name + " > ");
    runAction(actionSelected);
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
        console.log(MESSAGE_IO_SUCCESS);
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