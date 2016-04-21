let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

//////////////



enum Color {Red, Green, Blue};
let c: Color = Color.Green;

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(something : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}


var student = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(student);