import { model, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';

const motorcycleSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  status: Boolean,
  color: String,
  buyValue: Number,  
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

const MotorcycleModel = model('Motorcycle', motorcycleSchema);

export default MotorcycleModel;