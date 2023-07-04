import { 
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    UnauthorizedException,
    Logger, 
    HttpStatus,
    HttpException,
    NotFoundException
} from '@nestjs/common';
import { Brackets, ObjectLiteral } from 'typeorm';


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
            if (error.name === 'Unauthorized') {
                throw new UnauthorizedException( response.message );
            }

            if (error.name === 'HttpException') {
                throw new HttpException( response, error.status );
            }
        }

        this.logger.error(new Date());
        console.log(error);
        throw new InternalServerErrorException('Please check server logs');
    }

    public createWhere( 
        where: ObjectLiteral,
        columnName: string,
        valueFilter: string | number | boolean | ObjectLiteral | Brackets | ObjectLiteral[],
        propertyNameDto?: string | number | boolean,
        advance: AdvanceWhere = AdvanceWhere.empty
    ): ObjectLiteral {
        

        if (advance === AdvanceWhere.empty && propertyNameDto) {
            where[columnName] = valueFilter;
        }
        else if (propertyNameDto) {
            switch(advance){
                case AdvanceWhere.custom:                      
                    where[columnName] = valueFilter[columnName];                    
                    break;
            }
        }
        return where;
    }

    public emptyFieldValidation(
        fieldName: string | number | object | undefined | null,
        message: string,
        status?: HttpStatus
    ) {

        let isEmpty = false;

        if (typeof fieldName === 'string' && fieldName.trim() === '') {
            isEmpty = true;
        }

        if (typeof fieldName === 'number' && isNaN(fieldName)) {
            isEmpty = true;
        }

        if (typeof fieldName === 'object' && (fieldName === null  || Object.keys(fieldName).length === 0)) {
            isEmpty = true;
        }

        if (fieldName === undefined || fieldName === null || isEmpty) {
            this.exceptionResponse(message, status);
        }
    }

    private exceptionResponse(message: string, status: HttpStatus) {
        if (status !== undefined) {
            throw new HttpException(message, status);
        }
        // Default response ==> status: 500
        throw new NotFoundException(message);
    }



 
}
