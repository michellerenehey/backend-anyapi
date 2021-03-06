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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const flower = await Flower.findById(req.params.id);
      if (!flower) {
        const error = new Error('Flower not found');
        error.status = 404;
        throw error;
      }
      res.send(flower);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const flower = await Flower.updateById(req.params.id, req.body);
    res.send(flower);
  })

  .delete('/:id', async (req, res) => {
    const flower = await Flower.deleteById(req.params.id);
    res.send(flower);
  });
