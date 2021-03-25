var express = require('express');
const bp = require('body-parser')
const fs = require('fs');
const products = JSON.parse(fs.readFileSync('./products.json'))

var app = express();

let data = products

app.use(bp.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

app.get('/', function(req, res) {
  new_data = data.map(item => {return {...item, active: false}})
  data = new_data
  res.send(data)
});

app.get('/:id', function(req, res) {
  const id = req.params.id
  const findProduct = data.filter(a => a.id === parseInt(id))

  res.send(findProduct)
});

app.delete('/all', function(req, res){
  data = []

  res.send(data)

})

app.delete('/:id', function(req, res) {
  const id = req.params.id
  const deleteProduct = data.filter(a => a.id !== parseInt(id))
  data = deleteProduct

  res.send(data)
})

app.put('/active/:id', function(req, res) {
  const id = req.params.id
  const updateProduct = data.map(item => {
    if(item.id === parseInt(id)){
      return {...item, active: true}
    }
    else{
      return item
    }
  })

  data = updateProduct
  res.send(updateProduct)
})

app.put('/:id', function(req, res) {
  const id = req.params.id
  const updateProduct = data.map(item => {
    if(item.id === parseInt(id)){
      return req.body
    }
    else{
      return item
    }
  })

  data = updateProduct
  res.send(updateProduct)
})

app.post('/', function(req, res) {
  const new_product = req.body
  data.unshift(new_product)
  
  res.send(data)
})

app.listen(5000, function() {
  console.log('Listening you on port 5000!');
})