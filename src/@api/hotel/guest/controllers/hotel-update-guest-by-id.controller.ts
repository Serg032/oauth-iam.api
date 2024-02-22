/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelGuestDto, HotelUpdateGuestByIdDto, HotelUpdateGuestByIdHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guest/update')
@Auth('hotel.guest.update')
export class HotelUpdateGuestByIdController
{
    constructor(
        private readonly handler: HotelUpdateGuestByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update guest by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: HotelGuestDto })
    async main(
        @Body() payload: HotelUpdateGuestByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
