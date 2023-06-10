const express = require('express')
const routes = express.Router()

let db = [
  { '1':{ Animal: 'Especie 1', Sexo: 'M/F', Estado: 'RS', Cidade: 'Porto Alegre' } },
  { '2':{ Animal: 'Especie 2', Sexo: 'M/F', Estado: 'SP', Cidade: 'São Paulo' } },
  { '3':{ Animal: 'Especie 3', Sexo: 'M/F', Estado: 'MG', Cidade: 'Belo Horizonte' } } 
]

// BUSCAR TODOS OS ANIMAIS CADASTRADOS
routes.get('/', (req, res) => {
  return res.json(db)
})

// BUSCAR ANIMAL POR ID
routes.get('/:id', (req, res) => {
  const id = req.params.id
  const animal = db.find(item => Object.keys(item)[0] === id)
  if (!animal) {
    return res.status(404).send('Animal não encontrado')
  }
  return res.json(animal)
})

// INSERIR NOVO ANIMAL
routes.post('/add', (req, res) => {
  const body = req.body
  if (!body || !body.Animal || !body.Sexo || !body.Estado || !body.Cidade) {
    return res.status(400).send('Dados incompletos')
  }
  const newAnimalId = (db.length + 1).toString()
  const newAnimal = { [newAnimalId]: body }
  db.push(newAnimal)
  return res.json(newAnimal)
})

// ATUALIZAR ANIMAL POR ID
routes.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  if (!body || !body.Animal || !body.Sexo || !body.Estado || !body.Cidade) {
    return res.status(400).send('Dados incompletos')
  }
  const animalIndex = db.findIndex(item => Object.keys(item)[0] === id)
  if (animalIndex === -1) {
    return res.status(404).send('Animal não encontrado')
  }
  const updatedAnimal = { [id]: body }
  db[animalIndex] = updatedAnimal
  return res.json(updatedAnimal)
})

// DELETAR ANIMAL POR ID
routes.delete('/:id', (req, res) => {
  const id = req.params.id
  const animalIndex = db.findIndex(item => Object.keys(item)[0] === id)
  if (animalIndex === -1) {
    return res.status(404).send('Animal não encontrado')
  }
  db.splice(animalIndex, 1)
  return res.send(`Animal com id ${id} deletado com sucesso`)
})


module.exports = routes


  