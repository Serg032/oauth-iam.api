import { HotelGuest } from '@api/graphql';
import { HotelFindGuestByIdHandler } from '@api/hotel/guest';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('hotel.guest.get')
export class HotelFindGuestByIdResolver
{
    constructor(
        private readonly handler: HotelFindGuestByIdHandler,
    ) {}

    @Query('hotelFindGuestById')
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
