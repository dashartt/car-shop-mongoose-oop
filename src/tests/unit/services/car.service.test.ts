import * as sinon from 'sinon';
import chai from 'chai';
import CarRepository from '../../../repositories/car.repository';
import CarService from '../../../services/car.service';
import { carMock, carMockWithId, invalidCarMock } from '../../mocks/car.mock';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Testing Car Service', () => {
    const carModel = new CarRepository();
    const carService = new CarService(carModel);    

    before(() => {
        sinon.stub(carModel, 'create').resolves(carMockWithId);        
    })
    after(() => {
        sinon.restore()
    })

    describe('Validate car data before creating', () => {
        it('When the data is valid', async () => {
            const validCarData = await carService.create(carMock);

            expect(validCarData).to.be.deep.equal(carMockWithId);
        });

        it('When the data is incorrect', async () => {
            try {
                await carService.create(invalidCarMock);
            } catch (err: any) {
                expect(err.message).to.be.equal('InvalidFields');
            }
        });
    });
});