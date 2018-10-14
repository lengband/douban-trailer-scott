class Person {
  constructor () {
    this.eye = 'big'
  }
  speak () {
    console.log('aaa')
  }
}

var worker = new Person

console.log(worker.speak)
