import { HotelGuest, HotelGuestResponse } from '@app/hotel/guest';
import {
    HotelGuestCode,
    HotelGuestCreatedAt,
    HotelGuestDeletedAt,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
    HotelGuestUpdatedAt,
} from '@app/hotel/guest/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class HotelGuestMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param guest
     */
    mapModelToAggregate(guest: LiteralObject, cQMetadata?: CQMetadata): HotelGuest
    {
        if (!guest) return;

        return this.makeAggregate(guest, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param guests
     */
    mapModelsToAggregates(guests: LiteralObject[], cQMetadata?: CQMetadata): HotelGuest[]
    {
        if (!Array.isArray(guests)) return;

        return guests.map(guest => this.makeAggregate(guest, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param guest
     */
    mapAggregateToResponse(guest: HotelGuest): HotelGuestResponse
    {
        return this.makeResponse(guest);
    }

    /**
     * Map array of aggregates to array responses
     * @param guests
     */
    mapAggregatesToResponses(guests: HotelGuest[]): HotelGuestResponse[]
    {
        if (!Array.isArray(guests)) return;

        return guests.map(guest => this.makeResponse(guest));
    }

    private makeAggregate(guest: LiteralObject, cQMetadata?: CQMetadata): HotelGuest
    {
        return HotelGuest.register(
            new HotelGuestId(guest.id, { undefinable: true }),
            new HotelGuestName(guest.name, { undefinable: true }),
            new HotelGuestLastname(guest.lastname, { undefinable: true }),
            new HotelGuestCode(guest.code, { undefinable: true }),
            new HotelGuestCreatedAt(guest.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new HotelGuestUpdatedAt(guest.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new HotelGuestDeletedAt(guest.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(guest: HotelGuest): HotelGuestResponse
    {
        if (!guest) return;

        return new HotelGuestResponse(
            guest.id.value,
            guest.name.value,
            guest.lastname.value,
            guest.code.value,
            guest.createdAt.value,
            guest.updatedAt.value,
            guest.deletedAt.value,
        );
    }
}
