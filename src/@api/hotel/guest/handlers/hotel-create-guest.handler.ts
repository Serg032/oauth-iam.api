import { HotelCreateGuestInput, HotelGuest } from '@api/graphql';
import { HotelCreateGuestDto, HotelGuestDto } from '@api/hotel/guest';
import { HotelCreateGuestCommand, HotelFindGuestByIdQuery } from '@app/hotel/guest';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelCreateGuestHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: HotelCreateGuestInput | HotelCreateGuestDto,
        timezone?: string,
    ): Promise<HotelGuest | HotelGuestDto>
    {
        await this.commandBus.dispatch(new HotelCreateGuestCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new HotelFindGuestByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
