import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import { carskWithId, carWithId, updateCar, updatedCarWithId } from '../../mocks/car.mock';
import CarRepository from '../../../repositories/car.repository';

const { expect } = chai;

describe('---> Testing Car Model <--- ', () => {
    const carRepository = new CarRepository();       
    
    before(() => {
        sinon.stub(Model, 'create').resolves(carWithId);
        sinon.stub(Model, 'find').resolves(carskWithId);
        sinon.stub(Model, 'findById').resolves(carWithId);
        sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCarWithId);
        sinon.stub(Model, 'findByIdAndDelete').resolves(carWithId);
    });

    after(() => {
        sinon.restore();
    });

    describe('---> Successfully operation MongoDB', () => {
        it('---> Create car', async () => {
            const newCar = await carRepository.create(carWithId);
            expect(newCar).to.be.deep.equal(carWithId);
        });

        it('---> List all cars', async () => {
            const allCars = await carRepository.read();
            
            expect(allCars).to.be.deep.equal(carskWithId);
        });   
        
        it('---> List a car', async () => {
            const aCar = await carRepository.readOne(carWithId._id);
            
            expect(aCar).to.be.deep.equal(carWithId);
        }); 

        it('---> Update a car', async () => {
            const updatedCar = await carRepository.update(carWithId._id, updateCar);

            expect(updatedCar).to.be.deep.equal(updatedCarWithId)                  
        }); 
        
        it('---> Delete a car', async () => {
            const deleteCar = await carRepository.delete(carWithId._id);

            expect(deleteCar).to.be.deep.equal(carWithId)                  
        });   
    });
});