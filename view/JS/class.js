const Student = function (name, age, sex) {
    this.name = name
    this.age = age
    this.sex = sex
}
Student.prototype.printAge = function () {
    console.log(this.age)
}
Student.prototype.printSex = function () {
    console.log(this.sex)
}

const student1 = new Student('张三', 18, '男')
const student2 = new Student('lisi', 28, '男')
student1.printAge()
student1.printSex()
student2.printAge()