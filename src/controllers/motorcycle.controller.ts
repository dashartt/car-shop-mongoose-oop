import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response) {
    const response = await this._service.create({
      model: req.body.model,
      year: req.body.year,
      status: req.body.status,
      color: req.body.color,
      buyValue: req.body.buyValue,
      category: req.body.category,
      engineCapacity: req.body.engineCapacity,
    });

    return res.status(201).json(response);
  }

  public async read(_req: Request, res: Response) {
    const response = await this._service.read();

    return res.status(200).json(response);
  }

  public async readOne(req: Request, res: Response) {
    const response = await this._service.readOne(req.params._id);

    return res.status(200).json(response);
  }

  public async update(req: Request, res: Response) {
    const response = await this._service.update(
      req.params._id,
      {
        model: req.body.model,
        year: req.body.year,
        status: req.body.status,
        color: req.body.color,
        buyValue: req.body.buyValue,
        category: req.body.category,
        engineCapacity: req.body.engineCapacity,
      },
    );

    return res.status(200).json(response);
  }

  public async delete(req: Request, res: Response) {
    await this._service.delete(req.params._id);

    return res.status(204).json();
  }
}