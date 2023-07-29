import { Record } from 'src/record/entities/record.entity';
import { v4 as uuid } from 'uuid';
import { mockUser } from './auth.mock';
import { mockOperation } from './operation.mock';
import { CreateRecordDto, FindAllRecordDto } from 'src/record/dto';

// Entity
const mockId = uuid();
export const mockRecord: Record = {
    id: mockId,
    createdAt: new Date(),
    updatedAt: new Date(),
    amount: 17,
    user: mockUser(),
    balance: 0,
    operation: mockOperation(),
    operationResponse: '17',
    date: new Date(),
    isDeleted: false
};

// DTOs
export const mockCreateRecordDto: CreateRecordDto = {
    amount: 170,
    balance: 2500,
    operationId: mockOperation(),
    userId: mockUser(),
    operationResponse: '17'
}

export const mockFindAllRecordDto: FindAllRecordDto = {
    userId: "58f3d4a2-8c72-4674-ab27-5e8e23ca5436",
    limitRows: 3,
    isActive: "true"
}

// Mock resolves
export const mockFindAllRecordSuccess = {
    pagination: {
        limitRows: 3,
        offsetRows: 0,
        totalRows: 22
    },
    data: [
        {
            id: "a61643fd-09fd-4d3a-b9eb-39e1c2a1c0a9",
            amount: 35,
            balance: 447,
            operationResponse: "Ap9Orxk1Oo,gdNMU0ymBa",
            date: "2023-07-08T08:31:22.000Z",
            isDeleted: false,
            user: {
                id: "58f3d4a2-8c72-4674-ab27-5e8e23ca5436",
                username: "edwinqr-01@gmail.com",
                status: "active",
                isDeleted: false,
                roles: [
                    "user"
                ]
            },
            operation: {
                id: "ec0e2857-5236-42d5-8bc8-291d4bf12ec1",
                type: "random_string",
                cost: "35",
                isActive: true,
                isDeleted: false
            }
        },
        {
            id: "1ad06797-e5f2-4d96-93d4-fd019e5f19d6",
            amount: 21,
            balance: 468,
            operationResponse: "8",
            date: "2023-07-08T07:08:31.000Z",
            isDeleted: false,
            user: {
                id: "58f3d4a2-8c72-4674-ab27-5e8e23ca5436",
                username: "edwinqr-01@gmail.com",
                status: "active",
                isDeleted: false,
                roles: [
                    "user"
                ]
            },
            operation: {
                id: "497279ef-74f4-45b8-8016-806d3b4b2a75",
                type: "square_root",
                cost: "21",
                isActive: true,
                isDeleted: false
            }
        },
        {
            id: "eb7d7a68-e331-4e68-b104-03764327310b",
            amount: 12,
            balance: 480,
            operationResponse: "61",
            date: "2023-07-07T09:26:28.000Z",
            isDeleted: false,
            user: {
                id: "58f3d4a2-8c72-4674-ab27-5e8e23ca5436",
                username: "edwinqr-01@gmail.com",
                status: "active",
                isDeleted: false,
                roles: [
                    "user"
                ]
            },
            operation: {
                id: "2c19e23e-3b9b-499c-a4b9-4a8964eafe64",
                type: "addition",
                cost: "12",
                isActive: true,
                isDeleted: false
            }
        }
    ]
};

// Repository
export const mockRecordRepository = jest.fn(() => ({
    create: jest.fn().mockImplementation(() => {
      return {
        id: mockId,
        ...mockRecord,
      };
    }),
    save: jest.fn().mockImplementation((mockRecord: Record) =>
      Promise.resolve({
        id: mockId,
        ...mockRecord,
      }),
    ),
    preload: jest.fn().mockImplementation(() =>
      Promise.resolve({
        ...mockRecord,
      }),
    ),
    findAndCount: jest.fn().mockResolvedValue(mockFindAllRecordSuccess),
}))();