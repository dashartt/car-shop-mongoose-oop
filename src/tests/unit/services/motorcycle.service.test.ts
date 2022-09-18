import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleRepository from '../../../repositories/motorcycle.repository';
import MotorcycleService from '../../../services/motorcycle.service';
import { motorcycle, motorcyclesWithId, motorcycleWithId, updatedMotorcycleWithId, updateMotorcycle } from '../../mocks/motorcycle.mock';

const { expect } = chai;

describe('---> Testing Motorcycle Service <---', () => {
    const motorcycleModel = new MotorcycleRepository();
    const motorcycleService = new MotorcycleService(motorcycleModel);    

    before(() => {
        sinon.stub(motorcycleModel, 'create').resolves(motorcycleWithId);
        sinon.stub(motorcycleModel, 'read').resolves(motorcyclesWithId);
        sinon.stub(motorcycleModel, 'readOne').resolves(motorcycleWithId);
        sinon.stub(motorcycleModel, 'update').resolves(updatedMotorcycleWithId);
        sinon.stub(motorcycleModel, 'delete').resolves(motorcycleWithId);

    })
    after(() => {
        sinon.restore()
    })

    describe('---> Successfully validated', () => {
        it('---> Create a motorcycle', async () => {
            const newMotorcycle = await motorcycleService.create(motorcycle);

            expect(newMotorcycle).to.be.deep.equal(motorcycleWithId);
        }); 

        it('---> List all motorcycles', async () => {
            const allMotorcycles = await motorcycleService.read();

            expect(allMotorcycles).to.be.deep.equal(motorcyclesWithId);
        }); 

        it('---> List a motorcycle', async () => {
            
            const aMotorcycle = await motorcycleService.readOne(motorcycleWithId._id);

            expect(aMotorcycle).to.be.deep.equal(motorcycleWithId);
        }); 
        
        it('---> Update a motorcycle', async () => {
            const updateAMotorcycle = await motorcycleService.update(motorcycleWithId._id, updateMotorcycle);

            expect(updateAMotorcycle).to.be.deep.equal(updatedMotorcycleWithId);
        });

        it('---> Delete a motorcycle', async () => {
            const deleteMotorcycle = await motorcycleService.delete(motorcycleWithId._id);

            expect(deleteMotorcycle).to.be.deep.equal(motorcycleWithId);
        });
    });
});