import { HotelGuest } from '@api/graphql';
import { HotelGuestDto } from '@api/hotel/guest';
import { HotelFindGuestByIdQuery } from '@app/hotel/guest';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelFindGuestByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<HotelGuest | HotelGuestDto>
    {
        return await this.queryBus.ask(new HotelFindGuestByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
