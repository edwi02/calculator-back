import { UserBalance } from 'src/user-balance/entities/user-balance.entity';
import { v4 as uuid } from 'uuid';
import { mockUser } from './auth.mock';
import { CreateUserBalanceDto } from 'src/user-balance/dto';
import { User } from 'src/auth/entities/user.entity';


// Entity
const mockId = uuid();
export const mockUserBalance: UserBalance = {
    id: mockId,
    createdAt: new Date(),
    updatedAt: new Date(),
    balance: 0,
    isDeleted: false,
    user: mockUser()
};

// DTOs
export const mockCreateUserBalanceDto: CreateUserBalanceDto = {
    userId: new User,
    balance: 180
}

// Repository
export const mockUserBalanceRepository = jest.fn(() => ({
    create: jest.fn().mockImplementation(() => {
      return {
        id: mockId,
        ...mockUserBalance,
      };
    }),
    save: jest.fn().mockImplementation((mockUserBalance: UserBalance) =>
      Promise.resolve({
        id: mockId,
        ...mockUserBalance,
      }),
    ),
    preload: jest.fn().mockImplementation(() =>
      Promise.resolve({
        ...mockUserBalance,
      }),
    ),
    findOne: jest.fn().mockResolvedValue(mockUserBalance),
    findOneByUser: jest.fn().mockResolvedValue(mockUserBalance),
}))();