const { Router } = require('express');
const Flower = require('../models/Flower');

module.exports = Router()
  .post('/', async (req, res) => {
    const flower = await Flower.insert(req.body);
    res.send(flower);
  })

  .get('/', async (req, res) => {
    const flowers = await Flower.findAll();
    res.send(flowers);
  });
