import { ZodError } from 'zod';
import MongoModel from '../models/Mongo.model';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../errors';
import { IMotorcycle, motorcycleSchema } from '../interfaces/IMotorcycle';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: MongoModel<IMotorcycle>;

  constructor(model: MongoModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  // REFACTOR TO ABSTRACT CLASS OU UTIL METHOD
  public static validate(obj: IMotorcycle): IMotorcycle | ZodError {
    const parsed = motorcycleSchema.safeParse(obj);

    if (!parsed.success) {
      throw new Error(ErrorTypes.InvalidFields) as ZodError;
    }

    return parsed.data as IMotorcycle;
  }

  public async create(obj: IMotorcycle) {
    return this._motorcycle.create(
      MotorcycleService.validate(obj) as IMotorcycle,
    );
  }

  public async read() {
    return this._motorcycle.read();
  }

  public async readOne(_id: string) {
    return this._motorcycle.readOne(_id);
  }

  public async update(_id: string, obj: IMotorcycle) {
    return this._motorcycle.update(
      _id,
      MotorcycleService.validate(obj) as IMotorcycle,
    );
  }

  public async delete(_id: string) {
    return this._motorcycle.delete(_id);
  }
}

export default MotorcycleService;