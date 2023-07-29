import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import { CommonService } from 'src/common/common.service';
import { GenerateRandomRandomOrgDto } from './dto/generate-string-random-org.dto';

@Injectable()
export class RandomOrgService {

  constructor(
    private readonly commonService: CommonService,
    private readonly configService: ConfigService
  ) { }

  generateStrings(dto: GenerateRandomRandomOrgDto) {
    try {
      const {
        quantity = 1,
        length = 17,
        characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        replacement = false
      } = dto;
  
      const params = { 
        apiKey: this.configService.get('RANDOM_ORG_APIKEY'),
        n: quantity,
        length,
        characters,
        replacement
      };
  
      const data = axios.post(this.configService.get('RANDOM_ORG_URL'), {
        jsonrpc: '2.0',
        id: + new Date(),
        method: 'generateStrings',
        params
      })
      .then(res => {
          return res.data.result.random.data;    
      });
  
      return data;
    } catch (error) {
      this.commonService.handleErrors('[RandomOrgService/generateStrings]', error);
    }
    
  }
}
