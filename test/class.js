class Person {
  constructor () {
    this.eye = 'big'
    this.a = 'a'
  }
  speak () {
    console.log(this)
    console.log(this.a)
    console.log('aaa')
  }
  a = 'a'
}


var worker = new Person


console.log(Person.a, 'Person.a')
console.log(worker.a, 'worker.a')
worker.speak()