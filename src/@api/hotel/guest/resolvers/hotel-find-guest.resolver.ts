import { HotelGuest } from '@api/graphql';
import { HotelFindGuestHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.get')
export class HotelFindGuestResolver
{
    constructor(
        private readonly handler: HotelFindGuestHandler,
    ) {}

    @Query('hotelFindGuest')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<HotelGuest>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
