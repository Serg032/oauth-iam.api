import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { HotelCreateGuestsCommand } from '@app/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';

@Injectable()
export class HotelGuestSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new HotelCreateGuestsCommand(
            hotelMockGuestData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
