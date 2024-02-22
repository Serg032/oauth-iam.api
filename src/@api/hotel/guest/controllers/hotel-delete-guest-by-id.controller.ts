/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelDeleteGuestByIdHandler, HotelGuestDto } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guest/delete')
@Auth('hotel.guest.delete')
export class HotelDeleteGuestByIdController
{
    constructor(
        private readonly handler: HotelDeleteGuestByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete guest by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: HotelGuestDto })
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
