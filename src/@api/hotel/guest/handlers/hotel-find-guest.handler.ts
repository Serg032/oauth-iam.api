import { HotelGuest } from '@api/graphql';
import { HotelGuestDto } from '@api/hotel/guest';
import { HotelFindGuestQuery } from '@app/hotel/guest';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelFindGuestHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<HotelGuest | HotelGuestDto>
    {
        return await this.queryBus.ask(new HotelFindGuestQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
