import express from 'express';
import MotorcycleFactory from '../factories/motorcycle.factory';

const route = express.Router();

const motorcycleController = MotorcycleFactory.make();

route
  .delete('/:_id', async (req, res) => motorcycleController.delete(req, res))
  .put('/:_id', async (req, res) => motorcycleController.update(req, res))
  .post('/', async (req, res) => motorcycleController.create(req, res))
  .get('/', async (req, res) => motorcycleController.read(req, res))
  .get('/:_id', async (req, res) => motorcycleController.readOne(req, res));

export default route;