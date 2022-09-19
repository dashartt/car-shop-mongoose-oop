import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

export const motorcycleSchema = z.object({  
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().max(2500).min(1),
}).merge(vehicleSchema);

export type IMotorcycle = z.infer<typeof motorcycleSchema>;