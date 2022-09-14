export enum ErrorTypes {  
  InvalidFields = 'InvalidFields',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = {
  status: number
  message: string;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  InvalidFields: {
    status: 400,
    message: 'invalid fields',
  },  
  InvalidMongoId: {
    status: 404,
    message: 'id not found',
  },
};