import { ICar } from "../../interfaces/ICar";

export const invalidCarMock: ICar = {
  color: 'Preto',
  doorsQty: 11,
  seatsQty: -1,
  model: 'Classic',
  year: 2001,
  status: false,
  buyValue: 200
};

export const carMock: ICar = {
  color: 'Preto',
  doorsQty: 4,
  seatsQty: 4,
  model: 'Classic',
  year: 2001,
  status: false,
  buyValue: 200
};

export const carrMockWithIdUpdated: ICar = {
  color: 'Preto',
  doorsQty: 4,
  seatsQty: 4,
  model: 'Classic',
  year: 2001,
  status: true,
  buyValue: 200
};

export const carMockWithId: ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  ...carMock
};

