import { HotelGuestMapper, HotelGuestResponse, HotelRawSQLGuestsQuery } from '@app/hotel/guest';
import { HotelRawSQLGuestsService } from '@app/hotel/guest/application/raw-sql/hotel-raw-sql-guests.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(HotelRawSQLGuestsQuery)
export class HotelRawSQLGuestsQueryHandler implements IQueryHandler<HotelRawSQLGuestsQuery>
{
    private readonly mapper: HotelGuestMapper = new HotelGuestMapper();

    constructor(
        private readonly rawSQLGuestsService: HotelRawSQLGuestsService,
    ) {}

    async execute(query: HotelRawSQLGuestsQuery): Promise<HotelGuestResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLGuestsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
