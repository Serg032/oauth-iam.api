import { HotelFindGuestQuery, HotelGuestMapper, HotelGuestResponse } from '@app/hotel/guest';
import { HotelFindGuestService } from '@app/hotel/guest/application/find/hotel-find-guest.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(HotelFindGuestQuery)
export class HotelFindGuestQueryHandler implements IQueryHandler<HotelFindGuestQuery>
{
    private readonly mapper: HotelGuestMapper = new HotelGuestMapper();

    constructor(
        private readonly findGuestService: HotelFindGuestService,
    ) {}

    async execute(query: HotelFindGuestQuery): Promise<HotelGuestResponse>
    {
        const guest = await this.findGuestService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(guest);
    }
}
