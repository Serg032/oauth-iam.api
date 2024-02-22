import { HotelGuest } from '@api/graphql';
import { HotelDeleteGuestsHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.delete')
export class HotelDeleteGuestsResolver
{
    constructor(
        private readonly handler: HotelDeleteGuestsHandler,
    ) {}

    @Mutation('hotelDeleteGuests')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<HotelGuest[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
