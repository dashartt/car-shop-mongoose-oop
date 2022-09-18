import express from 'express';
import CarFactory from '../factories/car.factory';

const route = express.Router();

const carController = CarFactory.make();

route
  .delete('/:_id', async (req, res) => carController.delete(req, res))
  .put('/:_id', async (req, res) => carController.update(req, res))
  .post('/', async (req, res) => carController.create(req, res))
  .get('/', async (req, res) => carController.read(req, res))
  .get('/:_id', async (req, res) => carController.readOne(req, res));

export default route;