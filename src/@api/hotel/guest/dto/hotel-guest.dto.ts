/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class HotelGuestDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
        example    : 'IamAccountType.USER',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'lastname [input here api field description]',
    })
    lastname: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code: string;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}
