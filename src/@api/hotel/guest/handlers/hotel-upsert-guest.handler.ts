import { HotelGuest, HotelUpdateGuestByIdInput } from '@api/graphql';
import { HotelGuestDto, HotelUpdateGuestByIdDto } from '@api/hotel/guest';
import { HotelFindGuestByIdQuery, HotelUpsertGuestCommand } from '@app/hotel/guest';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelUpsertGuestHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: HotelUpdateGuestByIdInput | HotelUpdateGuestByIdDto,
        timezone?: string,
    ): Promise<HotelGuest | HotelGuestDto>
    {
        await this.commandBus.dispatch(new HotelUpsertGuestCommand(
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
