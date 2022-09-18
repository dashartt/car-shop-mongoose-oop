import { Request, Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleRepository from '../../../repositories/motorcycle.repository';
import MotorcycleController from '../../../controllers/motorcycle.controller';
import MotorcycleService from '../../../services/motorcycle.service';
import { motorcycle, motorcyclesWithId, motorcycleWithId, updatedMotorcycleWithId, updateMotorcycle } from '../../mocks/motorcycle.mock';
const { expect } = chai;

describe('---> Testing Motorcycle Controller  <---', () => {
  const motorcycleModel = new MotorcycleRepository()
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  describe('---> Request with correct data ', () => {
    before(() => {
      sinon.stub(motorcycleService, 'create').resolves(motorcycleWithId);
      sinon.stub(motorcycleService, 'read').resolves(motorcyclesWithId);
      sinon.stub(motorcycleService, 'readOne').resolves(motorcycleWithId);
      sinon.stub(motorcycleService, 'update').resolves(updatedMotorcycleWithId);
      sinon.stub(motorcycleService, 'delete').resolves(motorcycleWithId);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    })

    after(() => {
      sinon.restore()
    })

    it('---> Create a motorcycle', async () => {
      req.body = motorcycle;
      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleWithId)).to.be.true;
    });

    it('---> Return all motorcycles', async () => {
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcyclesWithId)).to.be.true;
    });

    it('---> Return a motorcycle', async () => {
      req.params = { _id: motorcycleWithId._id }
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleWithId)).to.be.true;
    });

    it('---> Update a motorcycle', async () => {      
      req.body = updateMotorcycle;
      req.params = { _id: motorcycleWithId._id }

      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedMotorcycleWithId)).to.be.true;
    });

    it('---> Delete a motorcycle', async () => {            
      req.params = { _id: motorcycleWithId._id }

      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
})