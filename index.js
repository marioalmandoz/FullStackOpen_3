const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
  })
  
  // Morgan middleware with custom format
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
  
const cors = require('cors')

app.use(cors())

app.use(express.static('dist'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {
    response.send('<h1> Hello World!</h1>')
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p> Phonebook has info for ${persons.length} people</p> <p> ${new Date()}</p>` )
})

app.get('/api/persons/:id',(request, response)=> {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    
    if(person){
        response.json(person)
    }else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id!== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if(!person.name || !person.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const existingPerson = persons.find(p => p.name === person.name)
    if(existingPerson) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    person.id = Math.floor(Math.random() *1000)

    persons = persons.concat(person)

    console.log('New person added:', person)
    console.log('Updated persons list:', persons)
    response.json(person)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })