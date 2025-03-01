let students = [];

function createStudent(name, age, mark) {
    return {
        name: name,
        age: age,
        mark: mark
    };
}

students.push(createStudent("omar", 20, 75));
students.push(createStudent("lena", 22, 45));
students.push(createStudent("fares", 21, 90));
students.push(createStudent("rital", 23, 30));
students.push(createStudent("ahmad", 19, 55));

let successStudents = [];
let failedStudents = [];

for (let student of students) {
    if (student.mark >= 50) {
        successStudents.push(student);
    } else {
        failedStudents.push(student);
    }
}

console.log("Success Students:", successStudents);
console.log("Failed Students:", failedStudents);
