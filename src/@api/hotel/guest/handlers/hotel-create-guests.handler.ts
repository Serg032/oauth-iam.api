import { HotelCreateGuestInput } from '@api/graphql';
import { HotelCreateGuestDto } from '@api/hotel/guest';
import { HotelCreateGuestsCommand } from '@app/hotel/guest';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelCreateGuestsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: HotelCreateGuestInput[] | HotelCreateGuestDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new HotelCreateGuestsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
