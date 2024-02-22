import { HotelCreateGuestInput, HotelGuest } from '@api/graphql';
import { HotelCreateGuestHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.create')
export class HotelCreateGuestResolver
{
    constructor(
        private readonly handler: HotelCreateGuestHandler,
    ) {}

    @Mutation('hotelCreateGuest')
    async main(
        @Args('payload') payload: HotelCreateGuestInput,
        @Timezone() timezone?: string,
    ): Promise<HotelGuest>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
