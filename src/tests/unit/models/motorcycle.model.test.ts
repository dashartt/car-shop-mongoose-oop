import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import MotorcycleRepository from '../../../repositories/motorcycle.repository';

import { motorcyclesWithId, motorcycleWithId, updatedMotorcycleWithId, updateMotorcycle } from '../../mocks/motorcycle.mock';

const { expect } = chai;

describe('---> Testing Motorcycle Model <---]', () => {
    const motorcycleRepository = new MotorcycleRepository();

    describe('---> Successfully operation MongoDB', () => {
        before(() => {
            sinon.stub(Model, 'create').resolves(motorcycleWithId);
            sinon.stub(Model, 'find').resolves(motorcyclesWithId);
            sinon.stub(Model, 'findById').resolves(motorcycleWithId);
            sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedMotorcycleWithId);
            sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleWithId);
        });

        after(() => {
            sinon.restore();
        });

        it('---> Create motorcycle', async () => {
            const newMotorcycle = await motorcycleRepository.create(motorcycleWithId);
            expect(newMotorcycle).to.be.deep.equal(motorcycleWithId);
        });

        it('---> List all motorcycles', async () => {
            const allMotocycles = await motorcycleRepository.read();

            expect(allMotocycles).to.be.deep.equal(motorcyclesWithId);
        });

        it('---> List a motorcycle', async () => {
            const aMotorcycle = await motorcycleRepository.readOne(motorcycleWithId._id);

            expect(aMotorcycle).to.be.deep.equal(motorcycleWithId);
        });

        it('---> Update a motorcycle', async () => {
            const updatedMotorcycle = await motorcycleRepository.update(motorcycleWithId._id, updateMotorcycle);

            expect(updatedMotorcycle).to.be.deep.equal(updatedMotorcycleWithId)
        });

        it('---> Delete a motorcycle', async () => {
            const deleteMotorcycle = await motorcycleRepository.delete(motorcycleWithId._id);

            expect(deleteMotorcycle).to.be.deep.equal(motorcycleWithId)
        });
    });

    describe('---> Fail operation MongoDB', () => {

        it('---> Find by id', async () => {
            await motorcycleRepository.update(motorcycleWithId._id + '...', updateMotorcycle)
                .catch((error) => {
                    expect(error.message).to.be.equal('InvalidMongoId');
                })

            await motorcycleRepository.delete(motorcycleWithId._id + '...')
                .catch((error) => {
                    expect(error.message).to.be.equal('InvalidMongoId');
                })
        });
    });
});