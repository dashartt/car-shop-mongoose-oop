import { ZodError } from 'zod';
import { ICar, carSchema } from '../interfaces/ICar';
import MongoModel from '../models/Mongo.model';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../errors';

class CarService implements IService<ICar> {
  private _car: MongoModel<ICar>;

  constructor(model: MongoModel<ICar>) {
    this._car = model;
  }

  // REFACTOR TO ABSTRACT CLASS OU UTIL METHOD
  public static validate(obj: ICar): ICar | ZodError {
    const parsed = carSchema.safeParse(obj);

    if (!parsed.success) {
      throw new Error(ErrorTypes.InvalidFields) as ZodError;
    }

    return parsed.data as ICar;
  }

  public async create(obj: ICar) {
    return this._car.create(
      CarService.validate(obj) as ICar,
    );
  }

  public async read() {
    return this._car.read();
  }

  public async readOne(_id: string) {
    return this._car.readOne(_id);
  }

  public async update(_id: string, obj: ICar) {
    return this._car.update(
      _id,
      CarService.validate(obj) as ICar,
    );
  }
}

export default CarService;