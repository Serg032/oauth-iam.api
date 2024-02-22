import { HotelFindGuestByIdQuery, HotelGuestMapper, HotelGuestResponse } from '@app/hotel/guest';
import { HotelFindGuestByIdService } from '@app/hotel/guest/application/find/hotel-find-guest-by-id.service';
import { HotelGuestId } from '@app/hotel/guest/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(HotelFindGuestByIdQuery)
export class HotelFindGuestByIdQueryHandler implements IQueryHandler<HotelFindGuestByIdQuery>
{
    private readonly mapper: HotelGuestMapper = new HotelGuestMapper();

    constructor(
        private readonly findGuestByIdService: HotelFindGuestByIdService,
    ) {}

    async execute(query: HotelFindGuestByIdQuery): Promise<HotelGuestResponse>
    {
        const guest = await this.findGuestByIdService.main(
            new HotelGuestId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(guest);
    }
}
