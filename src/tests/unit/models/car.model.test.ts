import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import { carMock, carMockWithId, carrMockWithIdUpdated } from '../../mocks/car.mock';
import CarRepository from '../../../repositories/car.repository';
import constants from '../../../constants';

const { expect } = chai;

const { MONGO_INVALID_ID } = constants;
const CORRECT_ID = '62cf1fc6498565d94eba52cd'
const INCORRECT_ID = '1'

describe('Testing Car Model', () => {
    const carRepository = new CarRepository();       
    
    before(() => {
        sinon.stub(Model, 'create').resolves(carMockWithId);
        sinon.stub(Model, 'find').resolves([carMockWithId]);
        sinon.stub(Model, 'findById').resolves(carMockWithId);
        sinon.stub(Model, 'findByIdAndUpdate').resolves(carrMockWithIdUpdated);
        sinon.stub(Model, 'findByIdAndDelete').resolves([]);
    });

    after(() => {
        sinon.restore();
    });

    describe('Upon receiving correct data according to Car Model', () => {
        it('Successfully created', async () => {
            const newCar = await carRepository.create(carMock);
            expect(newCar).to.be.deep.equal(carMockWithId);
        });
    });

    describe('When listing all cars', () => {
        it('Returns the values ​​inside the array ', async () => {
            const allCars = await carRepository.read();

            expect(allCars).to.be.lengthOf(1)       
            expect(allCars).to.be.deep.equal([carMockWithId]);
        });        
    });

    describe('When to look for a specific car', () => {
        it('Successfully found ', async () => {
            const foundCar = await carRepository.readOne(CORRECT_ID);

            expect(foundCar).to.be.deep.equal(carMockWithId)                  
        });   
        
        it('Fail to find, incorrect or non-existent id ', async () => {            
            try {
                await carRepository.readOne(INCORRECT_ID);            
            } catch (err: any) {
                expect(err).to.be.an('Error');                
                expect(err.message).to.be.equal(MONGO_INVALID_ID)
            }
        });      
    });

    describe('When upgrading an existing car', () => {
        it('Successfully updated ', async () => {
            const updatedCar = await carRepository.update(CORRECT_ID, carrMockWithIdUpdated);

            expect(updatedCar).to.be.deep.equal(carrMockWithIdUpdated)                  
        });   
        
        it('Fail to update, incorrect or non-existent id ', async () => {            
            try {
                await carRepository.update(INCORRECT_ID, carrMockWithIdUpdated);            
            } catch (err: any) {
                expect(err).to.be.an('Error');                
                expect(err.message).to.be.equal(MONGO_INVALID_ID)
            }
        });      
    });

    describe('When deleting an existing car', () => {
        it('Successfully deleted ', async () => {
            const afterDeleteCar = await carRepository.delete(CORRECT_ID);

            expect(afterDeleteCar).to.be.deep.equal([])                  
        });   
        
        it('Fail to delete, incorrect or non-existent id ', async () => {            
            try {
                await carRepository.delete(INCORRECT_ID);            
            } catch (err: any) {
                expect(err).to.be.an('Error');                
                expect(err.message).to.be.equal(MONGO_INVALID_ID)
            }
        });      
    });
});