import axios from "axios";
import { GenerateRandomStringOrgDto } from "src/random-org/dto";

// DTOs
export const mockGenerateRandomDto: GenerateRandomStringOrgDto = {
    quantity: 2,
    length: 7
};

// Axios
export const mockedAxiosRandomOrg = axios as jest.Mocked<typeof axios>;
mockedAxiosRandomOrg.post.mockResolvedValue({
    data: {
    result: {
        random: {
            data: [
                "a17s4d1",
                "38sd1as"
            ]
        }
    }
    },
});
