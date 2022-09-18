import { ZodError } from 'zod';

export default interface IService<T> {  
  create(obj: T): Promise<T | ZodError>,
  read(): Promise<T[]>,
  update(_id: string, obj: T): Promise<T | null>
}  