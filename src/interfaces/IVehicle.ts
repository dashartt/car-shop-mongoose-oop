import { z } from 'zod';

const vehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
});

export type IVehicle = z.infer<typeof vehicleSchema>;

// export interface IVehicle {
//   model: string
//   year: number
//   color: string
//   status?: boolean
//   buyValue: number
// }