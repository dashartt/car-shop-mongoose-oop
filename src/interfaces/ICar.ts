import { z } from 'zod';
import { IVehicle } from './IVehicle';

const carSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type ICar = z.infer<typeof carSchema> & IVehicle;