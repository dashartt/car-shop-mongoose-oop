import { ZodError } from 'zod';
import { isValidObjectId, UpdateQuery } from 'mongoose';
import MongoModel from '../models/Mongo.model';
import MotorcycleModel from '../models/Motorcycle.model';
import { ErrorTypes } from '../errors';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleRepository extends MongoModel<IMotorcycle> {
  constructor(_model = MotorcycleModel) {
    super(_model);
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {        
    return this._model.create({ ...obj });
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findById(_id);

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findByIdAndUpdate(
      _id,
      { ...obj } as UpdateQuery<IMotorcycle>,
      { new: true },
    );

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;
  }
  
  public async delete(_id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findByIdAndDelete(_id);

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;
  }
}