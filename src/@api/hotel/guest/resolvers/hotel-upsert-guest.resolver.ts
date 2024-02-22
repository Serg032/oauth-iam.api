import { HotelGuest, HotelUpdateGuestByIdInput } from '@api/graphql';
import { HotelUpsertGuestHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.upsert')
export class HotelUpsertGuestResolver
{
    constructor(
        private readonly handler: HotelUpsertGuestHandler,
    ) {}

    @Mutation('hotelUpsertGuest')
    async main(
        @Args('payload') payload: HotelUpdateGuestByIdInput,
        @Timezone() timezone?: string,
    ): Promise<HotelGuest>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
