import { model, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';

export const carSchema = new Schema<ICar>({
  model: String,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
  status: Boolean,
  year: Number,
}, { versionKey: false });

const CarModel = model('Car', carSchema);

export default CarModel;