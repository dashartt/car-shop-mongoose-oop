import { IMotorcycle } from "../../interfaces/IMotorcycle";


export const invalidMotorcycle: IMotorcycle = {
  color: 'Preto',    
  model: 'Classic',
  year: 2001,
  status: false,
  buyValue: 200,
  category: 'Celta',
  engineCapacity: 3000,
};

export const motorcycle: IMotorcycle = {
  color: 'Preto',    
  model: 'Classic',
  year: 2001,
  status: false,
  buyValue: 200,
  category: 'Custom',
  engineCapacity: 1000,
};

export const updateMotorcycle: IMotorcycle = {
  color: 'updated_color',  
  model: 'update_model',
  year: 2007,
  status: true,
  buyValue: 777,
  category: 'Street',
  engineCapacity: 1777,
};

export const updatedMotorcycleWithId: IMotorcycle & { _id: string }= {
  _id: '62cf1fc6498565d94eba52cd',
  ...updateMotorcycle
};


export const motorcycleWithId: IMotorcycle & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  ...motorcycle
};

export const motorcyclesWithId: (IMotorcycle & { _id: string })[]  = [
  { ...motorcycleWithId },
  { 
    _id: '62cf1fd6498565d94eba52cd',
    color: 'color_#',    
    model: 'model_2xx1',
    year: 2001,
    status: false,
    buyValue: 111,
    category: 'jadsjsjd',
    engineCapacity: 500,
  },
  {
    _id: '62cf1fc6498565d94eba53cd',
    color: 'color_#2',    
    model: 'model_2xx2',
    year: 2002,
    status: true,
    buyValue: 222,
    category: 'kkskkss',
    engineCapacity: 700,
  }
]

export const carsAfterDeleteOne = motorcyclesWithId.shift();

export const invalidId = '62cf1fc6498565d94eba52c';
export const nonExistId = '62cf1fc6498565d94eba52cc';


