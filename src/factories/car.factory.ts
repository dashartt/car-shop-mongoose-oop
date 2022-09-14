import CarController from '../controllers/car.controller';
import CarRepository from '../repositories/car.repository';
import CarService from '../services/car.service';

export default class CarFactory {
  static make() {
    const carModel = new CarRepository();
    const carService = new CarService(carModel);
    const carController = new CarController(carService);

    return carController;
  }
}