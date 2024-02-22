import { HotelPaginateGuestsQuery } from '@app/hotel/guest';
import { HotelPaginateGuestsService } from '@app/hotel/guest/application/paginate/hotel-paginate-guests.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(HotelPaginateGuestsQuery)
export class HotelPaginateGuestsQueryHandler implements IQueryHandler<HotelPaginateGuestsQuery>
{
    constructor(
        private readonly paginateGuestsService: HotelPaginateGuestsService,
    ) {}

    async execute(query: HotelPaginateGuestsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateGuestsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
