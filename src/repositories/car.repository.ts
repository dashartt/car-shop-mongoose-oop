import { ZodError } from 'zod';
import { isValidObjectId, UpdateQuery } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from '../models/Mongo.model';
import UserModel from '../models/Car.model';
import { ErrorTypes } from '../errors';

export default class CarRepository extends MongoModel<ICar> {
  constructor(_model = UserModel) {
    super(_model);
  }

  public async create(obj: ICar): Promise<ICar> {        
    return this._model.create({ ...obj });
  }

  public async read(): Promise<ICar[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findById(_id);

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findByIdAndUpdate(
      _id,
      { ...obj } as UpdateQuery<ICar>,
      { new: true },
    );

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;
  }
  
  public async delete(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findByIdAndDelete(_id);

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;
  }
}