import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import { RandomOrgService } from './random-org.service';
import { CommonService } from 'src/common/common.service';
import axios from 'axios';
import { 
  mockGenerateRandomDto,
  mockedAxiosRandomOrg
} from '../../test/mocks/random-org.mock';

jest.mock('axios');

describe('RandomOrgService', () => {
  let randomService: RandomOrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RandomOrgService,
        CommonService,
        ConfigService
      ],
    }).compile();

    randomService = module.get<RandomOrgService>(RandomOrgService);
  });

  it('should be defined', () => {
    expect(randomService).toBeDefined();
  });

  describe('Generate strings with random-org', ()=> {

    beforeEach(()=> {
      axios.post = mockedAxiosRandomOrg.post;
    })
    it('should generate strings', async () => {
      const randomSpy = jest.spyOn(randomService, 'generateStrings');
      const dto = { ...mockGenerateRandomDto };
    
      expect(randomSpy).not.toHaveBeenCalled();
      const result = await randomService.generateStrings(dto);
      
      expect(randomSpy).toHaveBeenCalledWith(dto);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(dto.quantity);
      expect(result[0].length).toEqual(dto.length);
    });
    it('should generate strings with default values', async () => {
      const randomSpy = jest.spyOn(randomService, 'generateStrings');
      const dto = {};
    
      expect(randomSpy).not.toHaveBeenCalled();
      const result = await randomService.generateStrings(dto);
      
      expect(randomSpy).toHaveBeenCalledWith(dto);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle errors', async () => {
      const error = new Error('Please check server logs');
      const dto = { ...mockGenerateRandomDto };

      jest.spyOn(mockedAxiosRandomOrg, 'post').mockRejectedValue(new InternalServerErrorException('Please check server logs'));
        
      await expect(randomService.generateStrings(dto)).rejects.toThrowError(error);
    });

  });

});
