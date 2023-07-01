import { CreateUserDto, LoginUserDto } from "src/auth/dto";
import { User } from "src/auth/entities/user.entity";
import { UserStatus } from "src/common/common.constants";

// Data
export const mockUser = (): User => {
    const user = new User();
    user.username       = "Edwin.Qr@gmail.com";
    user.password       = "3Dw1n.";
    user.status         = UserStatus.active;
    user.isDeleted      = false;
    return user;
}

// DTOs
export const mockCreateUserDto: CreateUserDto = {
    username: 'Edwin.Qr@gmail.com',
    password: 'One2.+'
};

export const mockLoginUserDto: LoginUserDto = {
    username: 'edwinqr@gmail.com',
    password: '3dwIn-02'
};

// Mock resolves
export const mockCreateUserResolveSuccess = {
    username: "edwinqr.dev@gmail.com",
    id: "52d285f6-f2fd-48fd-bb27-9798e1df1b94",
    status: UserStatus.active,
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyZDI4NWY2LWYyZmQtNDhmZC1iYjI3LTk3OThlMWRmMWI5NCIsImlhdCI6MTY4ODE3NDE2NCwiZXhwIjoxNjg4MTc1OTY0fQ.5GwEssgdHP6vdNWc5BK709jmPAbSpLpJ0OBPbq3suUU"
};

export const mockLoginUserResolveSuccess = {
    id: "52d285f6-f2fd-48fd-bb27-9798e1df1b94",
    username: "edwinqr@gmail.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyZDI4NWY2LWYyZmQtNDhmZC1iYjI3LTk3OThlMWRmMWI5NCIsImlhdCI6MTY4ODIxMTQ4MSwiZXhwIjoxNjg4MjEzMjgxfQ.eZpxtcT7BY4e0LAzn8grNWdK0X1XxB-qireg2rq6oaw"
};

export const mockLoginUserResolveError = {
    statusCode: 401,
    message: "Credentials are not valid.",
    error: "Unauthorized"
};

// Repository
export const mockUserRepository = {
    create: jest.fn().mockResolvedValue(mockCreateUserResolveSuccess),
    findOne: jest.fn().mockResolvedValue(mockLoginUserResolveSuccess)
};

