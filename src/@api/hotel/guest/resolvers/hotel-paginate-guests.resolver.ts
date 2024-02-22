import { Pagination } from '@api/graphql';
import { HotelPaginateGuestsHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.get')
export class HotelPaginateGuestsResolver
{
    constructor(
        private readonly handler: HotelPaginateGuestsHandler,
    ) {}

    @Query('hotelPaginateGuests')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
