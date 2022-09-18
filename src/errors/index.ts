export enum ErrorTypes {  
  InvalidFields = 'InvalidFields',
  InvalidMongoId = 'InvalidMongoId',
  EntityIdNotFound = 'EntityIdNotFound',
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
    message: 'Invalid fields',
  },  
  InvalidMongoId: {
    status: 400,
    message: 'Id must have 24 hexadecimal characters',
  },
  EntityIdNotFound: {
    status: 404,
    message: 'Object not found',
  },
};