import { HotelGuest, HotelUpdateGuestByIdInput } from '@api/graphql';
import { HotelUpdateGuestByIdHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.update')
export class HotelUpdateGuestByIdResolver
{
    constructor(
        private readonly handler: HotelUpdateGuestByIdHandler,
    ) {}

    @Mutation('hotelUpdateGuestById')
    async main(
        @Args('payload') payload: HotelUpdateGuestByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<HotelGuest>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
