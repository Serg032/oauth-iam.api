/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelCreateGuestDto, HotelCreateGuestsHandler, HotelGuestDto } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guests/create')
@Auth('hotel.guest.create')
export class HotelCreateGuestsController
{
    constructor(
        private readonly handler: HotelCreateGuestsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create guests in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [HotelGuestDto]})
    @ApiBody({ type: [HotelCreateGuestDto]})
    async main(
        @Body() payload: HotelCreateGuestDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
