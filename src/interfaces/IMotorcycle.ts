import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

export const motorcycleSchema = z.object({  
  category: z.string().refine((option) => ['Street', 'Custom', 'Trail'].includes(option)),
  engineCapacity: z.number().max(2500),
}).merge(vehicleSchema);

export type IMotorcycle = z.infer<typeof motorcycleSchema>;