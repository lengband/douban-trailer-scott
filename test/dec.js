class Boy {
  @speak
  run () {
    console.log('I can run!')
  }
}

function speak(target, key, descriptor) {
  console.log(target)
  console.log(key)
  console.log(descriptor)
}

const luck = new Boy()

luck.run()
