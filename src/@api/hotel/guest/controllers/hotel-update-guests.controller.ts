/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelGuestDto, HotelUpdateGuestsDto, HotelUpdateGuestsHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guests/update')
@Auth('hotel.guest.update')
export class HotelUpdateGuestsController
{
    constructor(
        private readonly handler: HotelUpdateGuestsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update guests' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: HotelGuestDto })
    async main(
        @Body() payload: HotelUpdateGuestsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
