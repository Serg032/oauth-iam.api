/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelGuestDto, HotelUpdateGuestByIdDto, HotelUpsertGuestHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guest/upsert')
@Auth('hotel.guest.upsert')
export class HotelUpsertGuestController
{
    constructor(
        private readonly handler: HotelUpsertGuestHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert guest' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: HotelGuestDto })
    async main(
        @Body() payload: HotelUpdateGuestByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
