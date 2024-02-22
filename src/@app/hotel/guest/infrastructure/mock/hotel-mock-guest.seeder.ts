import { HotelGuest, hotelMockGuestData } from '@app/hotel/guest';
import {
    HotelGuestCode,
    HotelGuestCreatedAt,
    HotelGuestDeletedAt,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
    HotelGuestUpdatedAt,
} from '@app/hotel/guest/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class HotelMockGuestSeeder extends MockSeeder<HotelGuest>
{
    public collectionSource: HotelGuest[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const guest of _.orderBy(hotelMockGuestData, ['id']))
        {
            this.collectionSource.push(
                HotelGuest.register(
                    new HotelGuestId(guest.id),
                    new HotelGuestName(guest.name),
                    new HotelGuestLastname(guest.lastname),
                    new HotelGuestCode(guest.code),
                    new HotelGuestCreatedAt({ currentTimestamp: true }),
                    new HotelGuestUpdatedAt({ currentTimestamp: true }),
                    new HotelGuestDeletedAt(null),
                ),
            );
        }
    }
}
