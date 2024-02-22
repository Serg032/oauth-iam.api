import { HotelGetGuestsQuery, HotelGuestMapper, HotelGuestResponse } from '@app/hotel/guest';
import { HotelGetGuestsService } from '@app/hotel/guest/application/get/hotel-get-guests.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(HotelGetGuestsQuery)
export class HotelGetGuestsQueryHandler implements IQueryHandler<HotelGetGuestsQuery>
{
    private readonly mapper: HotelGuestMapper = new HotelGuestMapper();

    constructor(
        private readonly getGuestsService: HotelGetGuestsService,
    ) {}

    async execute(query: HotelGetGuestsQuery): Promise<HotelGuestResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getGuestsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
