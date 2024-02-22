/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelCreateGuestDto, HotelCreateGuestHandler, HotelGuestDto } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guest/create')
@Auth('hotel.guest.create')
export class HotelCreateGuestController
{
    constructor(
        private readonly handler: HotelCreateGuestHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create guest' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: HotelGuestDto })
    async main(
        @Body() payload: HotelCreateGuestDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
