import { CreateOperationDto } from "src/operation/dto";
import { FindAllOperationDto } from "src/operation/dto/find-all-operation.dto";
import { Operation } from "src/operation/entities/operation.entity";

// Data
export const mockOperation = (): Operation => {
    const operation = new Operation();
    operation.type  = "addition";
    operation.isActive       =  true;
    operation.isDeleted      =  false;
    operation.cost           = 7;

    return operation;
}

// DTOs
export const mockCreateOperationDto: CreateOperationDto = {
    type: 'random_image',
    cost: 75
};

export const mockOperationParamId = {
    id: 'c7cfbca5-94d0-4c3c-9da1-c5b98f14370a'
};

export const mockFindAllOperationDto: FindAllOperationDto = {
    isActive: 'true'
};


// Mock resolves
export const mockFindAllOperationResolveSuccess = [
    {
        id: "c7cfbca5-94d0-4c3c-9da1-c5b98f14190e",
        type: "division",
        cost: 21,
        isActive: true,
        isDeleted: false
    },
    {
        id: "178d45e8-9e65-422c-b68e-c7b230de065a",
        type: "multiplication",
        cost: 20,
        isActive: true,
        isDeleted: false
    },
    {
        id: "c7cfbca5-94d0-4c3c-9da1-c5b98f14370a",
        type: "randmon_image",
        cost: 75,
        isActive: false,
        isDeleted: false
    }
];

export const mockFindOneOperationResolveSuccess = {
    id: "c7cfbca5-94d0-4c3c-9da1-c5b98f14370a",
    type: "randmon_image",
    cost: 75,
    isActive: false,
    isDeleted: false
};

// Repository
export const mockOperationRepository = {
    create: jest.fn().mockResolvedValue(mockFindOneOperationResolveSuccess),
    findOne: jest.fn().mockResolvedValue(mockFindOneOperationResolveSuccess),
    find: jest.fn().mockResolvedValue(mockFindAllOperationResolveSuccess),
};
