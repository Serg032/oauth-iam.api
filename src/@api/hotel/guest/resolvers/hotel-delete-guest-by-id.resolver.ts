import { HotelGuest } from '@api/graphql';
import { HotelDeleteGuestByIdHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.delete')
export class HotelDeleteGuestByIdResolver
{
    constructor(
        private readonly handler: HotelDeleteGuestByIdHandler,
    ) {}

    @Mutation('hotelDeleteGuestById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<HotelGuest>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
