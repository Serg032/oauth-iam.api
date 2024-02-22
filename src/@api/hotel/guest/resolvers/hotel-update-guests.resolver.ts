import { HotelGuest, HotelUpdateGuestsInput } from '@api/graphql';
import { HotelUpdateGuestsHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.update')
export class HotelUpdateGuestsResolver
{
    constructor(
        private readonly handler: HotelUpdateGuestsHandler,
    ) {}

    @Mutation('hotelUpdateGuests')
    async main(
        @Args('payload') payload: HotelUpdateGuestsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<HotelGuest>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
