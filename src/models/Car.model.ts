import { model, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';

const carSchema = new Schema<ICar>();
const CarModel = model('Car', carSchema);

export default CarModel;