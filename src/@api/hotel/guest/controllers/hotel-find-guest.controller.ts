/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HotelFindGuestHandler, HotelGuestDto } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[hotel] guest')
@Controller('hotel/guest/find')
@Auth('hotel.guest.get')
export class HotelFindGuestController
{
    constructor(
        private readonly handler: HotelFindGuestHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find guest according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: HotelGuestDto })
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
