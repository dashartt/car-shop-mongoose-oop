import MotorcycleController from '../controllers/motorcycle.controller';
import MotorcycleRepository from '../repositories/motorcycle.repository';
import MotorcycleService from '../services/motorcycle.service';

export default class MotorcycleFactory {
  static make() {
    const motorcycleModel = new MotorcycleRepository();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    const motorcycleController = new MotorcycleController(motorcycleService);

    return motorcycleController;
  }
}