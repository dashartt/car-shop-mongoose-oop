import * as sinon from 'sinon';
import chai from 'chai';
import CarRepository from '../../../repositories/car.repository';
import CarService from '../../../services/car.service';
import { car, carskWithId, carWithId, updateCar, updatedCarWithId } from '../../mocks/car.mock';
import { ZodError } from 'zod';

const { expect } = chai;

describe('---> Testing Car Service <---', () => {
    const carModel = new CarRepository();
    const carService = new CarService(carModel);

    before(() => {
        sinon.stub(carModel, 'create').resolves(carWithId);
        sinon.stub(carModel, 'read').resolves(carskWithId);
        sinon.stub(carModel, 'readOne').resolves(carWithId);
        sinon.stub(carModel, 'update').resolves(updatedCarWithId);
        sinon.stub(carModel, 'delete').resolves(carWithId);
    })

    after(() => {
        sinon.restore()
    })

    describe('Valid data', () => {
        it('---> Create a car', async () => {
            const newCar = await carService.create(car);
    
            expect(newCar).to.be.deep.equal(carWithId);
        });

        it('---> Don"t create a car', async () => {
            await carService.create({ ...car, doorsQty: 1000 })
                .catch((error) => {
                    expect(error.message).to.be.equal('InvalidFields')
                });
        });

        it('---> Update a car', async () => {
            const updateACar = await carService.update(carWithId._id, updateCar);
    
            expect(updateACar).to.be.deep.equal(updatedCarWithId);
        });
    
        it('---> Don"t update a car', async () => {
            await carService.update(carWithId._id, { ...updateCar, doorsQty: 1000 })
                .catch((error) => {
                    expect(error.message).to.be.equal('InvalidFields')
                });
        });
    
        it('---> Delete a car', async () => {
            const deleteCar = await carService.delete(carWithId._id);
    
            expect(deleteCar).to.be.deep.equal(carWithId);
        });
    
        it('---> Don"t delete a car', async () => {
            await carService.delete(carWithId._id)
                .catch((error) => {
                    expect(error.message).to.be.equal('InvalidFields')
                });
        });    
    })    

    it('---> List all cars', async () => {
        const allCars = await carService.read();

        expect(allCars).to.be.deep.equal(carskWithId);
    });

    it('---> List a car', async () => {

        const aCar = await carService.readOne(carWithId._id);

        expect(aCar).to.be.deep.equal(carWithId);
    });
  
});