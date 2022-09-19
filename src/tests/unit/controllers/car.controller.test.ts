import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { ZodError } from 'zod';
import { Request, Response } from 'express';

import CarRepository from '../../../repositories/car.repository';
import CarService from '../../../services/car.service';
import CarController from '../../../controllers/car.controller';
import { car, carskWithId, carWithId, updateCar, updatedCarWithId } from '../../mocks/car.mock';
import { ErrorTypes } from '../../../errors';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('---> Testing Car Controller  <---', () => {
  const carModel = new CarRepository()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carWithId);
    sinon.stub(carService, 'read').resolves(carskWithId);
    sinon.stub(carService, 'readOne').resolves(carWithId);
    sinon.stub(carService, 'update').resolves(updatedCarWithId);
    sinon.stub(carService, 'delete').resolves(carWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  after(() => {
    sinon.restore()
  })

  describe('Try to create', () => {
    it('---> Create a car', async () => {
      req.body = car;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carWithId)).to.be.true;
    });

    it('---> Don"t create a car', async () => {
      const { status, body } = await chai
        .request(app).post('/cars').send({ ...car, doorsQty: 100 });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ error: 'Invalid fields' });
    });
  })

  describe('Try to get all cars', () => {
    it('---> Successfully', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carskWithId)).to.be.true;
    });
  });

  describe('Try to get unique car', () => {
    it('---> Sucessfully', async () => {
      req.params = { _id: carWithId._id }
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carWithId)).to.be.true;
    });
  });

  describe('Try to update a car', () => {
    it('---> Update a car', async () => {
      req.body = updateCar;
      req.params = { _id: carWithId._id }

      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedCarWithId)).to.be.true;
    });

    it('---> Don"t update a car with incorrect or non-existent ID', async () => {
      const { status, body } = await chai
        .request(app).put(`/cars/${carWithId._id}xxx`).send({ ...updateCar });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ error: 'Id must have 24 hexadecimal characters' });
    });

    it('---> Don"t update a car with incorrect car data', async () => {
      const { status, body } = await chai
        .request(app).put(`/cars/${carWithId._id}`).send({ ...updateCar, seatsQty: 100 });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ error: 'Invalid fields' });
    });
  })

  describe('Try to delete a car', () => {
    it('---> Delete a car', async () => {
      req.params = { _id: carWithId._id }

      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });

    it('---> Don"t delete a car with incorrect or non-existent ID', async () => {
      const { status, body } = await chai
        .request(app).delete(`/cars/${carWithId._id}xxx`);

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ error: 'Id must have 24 hexadecimal characters' });
    });
  })
})