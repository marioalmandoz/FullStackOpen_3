const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name  = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://marioalmandoz6:${password}@fullstackopen.5vfsy.mongodb.net/?
  retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if(!name){ // para encontrar personas
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
}else{ // para añadir personas 
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      }) 
}




