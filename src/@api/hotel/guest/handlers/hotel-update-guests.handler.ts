import { HotelGuest, HotelUpdateGuestsInput } from '@api/graphql';
import { HotelGuestDto, HotelUpdateGuestsDto } from '@api/hotel/guest';
import { HotelGetGuestsQuery, HotelUpdateGuestsCommand } from '@app/hotel/guest';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelUpdateGuestsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: HotelUpdateGuestsInput | HotelUpdateGuestsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<HotelGuest | HotelGuestDto>
    {
        await this.commandBus.dispatch(new HotelUpdateGuestsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new HotelGetGuestsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
