import { HotelGuest } from '@api/graphql';
import { HotelGuestDto } from '@api/hotel/guest';
import { HotelDeleteGuestByIdCommand, HotelFindGuestByIdQuery } from '@app/hotel/guest';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelDeleteGuestByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<HotelGuest | HotelGuestDto>
    {
        const guest = await this.queryBus.ask(new HotelFindGuestByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new HotelDeleteGuestByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return guest;
    }
}
