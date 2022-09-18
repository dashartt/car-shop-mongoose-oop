import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response) {           
    const response = await this._service.create({
      model: req.body.model,
      year: req.body.year,
      status: req.body.status,
      color: req.body.color,
      doorsQty: req.body.doorsQty,
      seatsQty: req.body.seatsQty,
      buyValue: req.body.buyValue,
    });
        
    return res.status(201).json(response);
  }

  public async read(req: Request, res: Response) {
    const response = await this._service.read();

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
        doorsQty: req.body.doorsQty,
        seatsQty: req.body.seatsQty,
        buyValue: req.body.buyValue,
      },
    );

    return res.status(200).json(response);
  }
}