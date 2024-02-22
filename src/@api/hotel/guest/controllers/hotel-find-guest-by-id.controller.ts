/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelFindGuestByIdHandler, HotelGuestDto } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guest/find')
@Auth('hotel.guest.get')
export class HotelFindGuestByIdController
{
    constructor(
        private readonly handler: HotelFindGuestByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find guest by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: HotelGuestDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
