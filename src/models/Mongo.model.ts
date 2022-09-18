import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { ZodError } from 'zod';
import { ErrorTypes } from '../errors';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findById(_id);

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;    
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findByIdAndUpdate(
      _id,
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId) as ZodError;

    const resultQuery = await this._model.findByIdAndRemove(_id);

    if (!resultQuery) {
      throw Error(ErrorTypes.EntityIdNotFound) as ZodError;      
    }

    return resultQuery;
  }
}