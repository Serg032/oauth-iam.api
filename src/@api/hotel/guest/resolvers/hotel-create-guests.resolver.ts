import { HotelCreateGuestInput } from '@api/graphql';
import { HotelCreateGuestsHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.create')
export class HotelCreateGuestsResolver
{
    constructor(
        private readonly handler: HotelCreateGuestsHandler,
    ) {}

    @Mutation('hotelCreateGuests')
    async main(
        @Args('payload') payload: HotelCreateGuestInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
