import { ICar } from "../../interfaces/ICar";

export const invalidCar: ICar = {
  color: 'Preto',
  doorsQty: 11,
  seatsQty: -1,
  model: 'Classic',
  year: 2001,
  status: false,
  buyValue: 200
};

export const car: ICar = {
  color: 'Preto',
  doorsQty: 4,
  seatsQty: 4,
  model: 'Classic',
  year: 2001,
  status: false,
  buyValue: 200
};

export const updateCar: ICar = {
  color: 'updated_color',
  doorsQty: 2,
  seatsQty: 2,
  model: 'update_model',
  year: 2007,
  status: true,
  buyValue: 777
};

export const updatedCarWithId: ICar & { _id: string }= {
  _id: '62cf1fc6498565d94eba52cd',
  ...updateCar
};


export const carWithId: ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  ...car
};

export const carskWithId: (ICar & { _id: string })[]  = [
  { ...carWithId },
  { 
    _id: '62cf1fd6498565d94eba52cd',
    color: 'color_#',
    doorsQty: 2,
    seatsQty: 2,
    model: 'model_2xx1',
    year: 2001,
    status: false,
    buyValue: 111,
  },
  {
    _id: '62cf1fc6498565d94eba53cd',
    color: 'color_#2',
    doorsQty: 3,
    seatsQty: 3,
    model: 'model_2xx2',
    year: 2002,
    status: true,
    buyValue: 222
  }
]

export const carsAfterDeleteOne = carskWithId.shift();

export const invalidId = '62cf1fc6498565d94eba52c';
export const nonExistId = '62cf1fc6498565d94eba52cc';


