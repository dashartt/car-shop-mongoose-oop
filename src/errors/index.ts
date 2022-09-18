export enum ErrorTypes {  
  InvalidFields = 'InvalidFields',
  InvalidMongoId = 'InvalidMongoId',
  EntityIdNotFound = 'EntityIdNotFound',
}

type ErrorResponseObject = {
  status: number  
  error: string
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  InvalidFields: {
    status: 400,
    error: 'Invalid fields',
  },  
  InvalidMongoId: {
    status: 400,
    error: 'Id must have 24 hexadecimal characters',
  },
  EntityIdNotFound: {
    status: 404,
    error: 'Object not found',
  },
};