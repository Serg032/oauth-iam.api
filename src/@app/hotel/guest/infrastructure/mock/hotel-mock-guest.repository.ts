import { HotelGuest, HotelIGuestRepository, hotelMockGuestData } from '@app/hotel/guest';
import {
    HotelGuestCode,
    HotelGuestCreatedAt,
    HotelGuestDeletedAt,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
    HotelGuestUpdatedAt,
} from '@app/hotel/guest/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelMockGuestRepository extends MockRepository<HotelGuest> implements HotelIGuestRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'HotelGuest';
    public collectionSource: HotelGuest[];

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>hotelMockGuestData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(HotelGuest.register(
                new HotelGuestId(itemCollection.id),
                new HotelGuestName(itemCollection.name),
                new HotelGuestLastname(itemCollection.lastname),
                new HotelGuestCode(itemCollection.code),
                new HotelGuestCreatedAt(itemCollection.createdAt),
                new HotelGuestUpdatedAt(itemCollection.updatedAt),
                new HotelGuestDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
