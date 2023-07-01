import { 
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    UnauthorizedException,
    Logger 
} from '@nestjs/common';


// Documentation: https://typeorm.io/find-options#advanced-options
export enum AdvanceWhere {
    empty  = '',
    custom = 'custom'
}
@Injectable()
export class CommonService {

    private logger = new Logger();
    
    /**
     * 
     * @param nameComponent Example: [AuthService/create]
     * @param error Error object
     */
    public handleErrors( nameComponent: string, error: any ): never {

        this.logger.error(`${ nameComponent }`)

        if ( error.hasOwnProperty('code') ) {
            this.logger.error(`------------------ [database-error] ------------------`);
            this.logger.error(`[ErrorCode]: ${error.code}`);
            if (error.code === '23505') {
               this.logger.error({
                    detail: error.detail
                });
                throw new BadRequestException( error.detail );
            }
        }

        if ( error.hasOwnProperty('response') ) {
            this.logger.error(`------------------ [web-error] ------------------`);
            const { response } = error;
            if(response.error === 'Unauthorized') {
                throw new UnauthorizedException( response.message )
            }
        }

        this.logger.error(new Date());
        console.log(error);
        throw new InternalServerErrorException('Please check server logs');
    }


 
}
