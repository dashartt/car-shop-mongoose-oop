import { Request, Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import CarRepository from '../../../repositories/car.repository';
import CarService from '../../../services/car.service';
import CarController from '../../../controllers/car.controller';
import { carMock, carMockWithId, invalidCarMock } from '../../mocks/car.mock';
const { expect } = chai;

describe('Testing Car Controller', () => {
  const carModel = new CarRepository()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves([carMockWithId]);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Upon receiving values ​​from the requisition according to type car', () => {
    it('When values ​​are valid', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });  
  });

  describe('When the request waits to return all cars', () => {
    it('Values ​​in array format', async () => {      
      await carController.read(req, res);            

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });
});