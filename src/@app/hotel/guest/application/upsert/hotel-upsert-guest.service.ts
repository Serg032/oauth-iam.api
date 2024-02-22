import { HotelGuest, HotelIGuestRepository } from '@app/hotel/guest';
import {
    HotelGuestCode,
    HotelGuestCreatedAt,
    HotelGuestDeletedAt,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
    HotelGuestUpdatedAt,
} from '@app/hotel/guest/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class HotelUpsertGuestService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: HotelIGuestRepository,
    ) {}

    async main(
        payload: {
            id: HotelGuestId;
            name: HotelGuestName;
            lastname: HotelGuestLastname;
            code: HotelGuestCode;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const guest = HotelGuest.register(
            payload.id,
            payload.name,
            payload.lastname,
            payload.code,
            new HotelGuestCreatedAt({ currentTimestamp: true }),
            new HotelGuestUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                guest,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const guestRegister = this.publisher.mergeObjectContext(
            guest,
        );

        guestRegister.created(guest); // apply event to model events
        guestRegister.commit(); // commit all events of model
    }
}
