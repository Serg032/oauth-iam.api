/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelDeleteGuestsHandler, HotelGuestDto } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guests/delete')
@Auth('hotel.guest.delete')
export class HotelDeleteGuestsController
{
    constructor(
        private readonly handler: HotelDeleteGuestsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete guests in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [HotelGuestDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
