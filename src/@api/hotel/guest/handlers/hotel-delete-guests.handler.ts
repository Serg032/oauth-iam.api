import { HotelGuest } from '@api/graphql';
import { HotelGuestDto } from '@api/hotel/guest';
import { HotelDeleteGuestsCommand, HotelGetGuestsQuery } from '@app/hotel/guest';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelDeleteGuestsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<HotelGuest[] | HotelGuestDto[]>
    {
        const guests = await this.queryBus.ask(new HotelGetGuestsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new HotelDeleteGuestsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return guests;
    }
}
