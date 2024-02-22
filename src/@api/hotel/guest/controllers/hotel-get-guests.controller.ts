/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelGetGuestsHandler, HotelGuestDto } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guests/get')
@Auth('hotel.guest.get')
export class HotelGetGuestsController
{
    constructor(
        private readonly handler: HotelGetGuestsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get guests according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [HotelGuestDto]})
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
