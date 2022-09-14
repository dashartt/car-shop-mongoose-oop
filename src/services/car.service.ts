import { ZodError } from 'zod';
import { ICar, carSchema } from '../interfaces/ICar';
import MongoModel from '../models/Mongo.model';
import IService from '../interfaces/IService.interface';
import { ErrorTypes } from '../errors';

class CarService implements IService<ICar> {
  private _car: MongoModel<ICar>;

  constructor(model: MongoModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carSchema.safeParse(obj);        
        
    if (!parsed.success) {      
      throw new Error(ErrorTypes.InvalidFields) as ZodError;
    }

    return this._car.create(parsed.data);
  }
}

export default CarService;