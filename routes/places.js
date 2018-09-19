const express = require('express')
const router = express.Router()
const Place = require('../models/Place')

//Agregar nuevo lugar
router.get('/new',(req,res,next)=>{
  res.render('new')
})
router.post('/new',(req,res,next)=>{
  Place.create(req.body)
  .then(place=>{
    res.redirect('/')
  })
  .catch(e=>next(e))
})

//lista
router.get('/list', (req, res, next)=>{
  const {type} = req.query
  Place.find({type})
  .then(places=>{
    res.render('list',{places,type})
  })
})

//detalle
router.get('/detail/:id', (req, res, next)=>{
  const {id} = req.params
  Place.findById(id)
  .then(places=>{
    res.render('detail',places)
  })
  .catch(e=>{
    next(e)
  })
})

//update
router.get('/edit/:id', (req, res, next)=>{
  const {id} = req.params
  Place.findById(id)
  .then(places=>{
    res.render('edit',places)
  })
  .catch(e=>next(e))
})

router.post('/edit/:id',(req,res,next)=>{
  const {id}=req.params
  console.log(req.params)
  Place.findByIdAndUpdate(id,{$set:req.body},{new:true})
  .then(place=>{
    res.redirect(`/places/detail/${id}`)
  }).catch(e=>next(e))
})

//Borrar
router.get('/delete/:id',(req,res,next)=>{
  const {id}=req.params
  Place.findByIdAndRemove(id)
  .then(places=>{
    res.redirect('/')
  }).catch(e=>next(e))
})

module.exports = router