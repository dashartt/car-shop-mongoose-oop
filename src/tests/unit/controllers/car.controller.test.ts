import { Request, Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import CarRepository from '../../../repositories/car.repository';
import CarService from '../../../services/car.service';
import CarController from '../../../controllers/car.controller';
import { car, carskWithId, carWithId, updateCar, updatedCarWithId } from '../../mocks/car.mock';
const { expect } = chai;

describe('---> Testing Car Controller  <---', () => {
  const carModel = new CarRepository()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  describe('---> Request with correct data ', () => {
    before(() => {
      sinon.stub(carService, 'create').resolves(carWithId);
      sinon.stub(carService, 'read').resolves(carskWithId);
      sinon.stub(carService, 'readOne').resolves(carWithId);
      sinon.stub(carService, 'update').resolves(updatedCarWithId);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    })

    after(() => {
      sinon.restore()
    })

    it('---> Create a car', async () => {
      req.body = car;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carWithId)).to.be.true;
    });

    it('---> Return all cars', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carskWithId)).to.be.true;
    });

    it('---> Return a car', async () => {
      req.params = { _id: carWithId._id }
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carWithId)).to.be.true;
    });

    it('---> Update a car', async () => {      
      req.body = updateCar;
      req.params = { _id: carWithId._id }

      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedCarWithId)).to.be.true;
    });


  });
})