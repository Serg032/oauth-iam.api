import { Pagination } from '@api/graphql';
import { HotelPaginateGuestsQuery } from '@app/hotel/guest';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelPaginateGuestsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new HotelPaginateGuestsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
