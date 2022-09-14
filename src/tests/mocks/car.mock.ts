import { ICar } from "../../interfaces/ICar";

const carMock : ICar = {
    color: 'Preto',
    doorsQty: 4, 
    seatsQty: 4,
    model: 'Classic',
    year: 2001,
    status: false,
    buyValue: 200  
  };

  export const carrMockWithIdUpdated : ICar = {
    color: 'Preto',
    doorsQty: 4, 
    seatsQty: 4,
    model: 'Classic',
    year: 2001,
    status: true,
    buyValue: 200  
  };
  
  const carMockWithId: ICar & { _id : string } = {
    _id: '62cf1fc6498565d94eba52cd',      
    ...carMock
  };  
  
  export { carMock, carMockWithId };