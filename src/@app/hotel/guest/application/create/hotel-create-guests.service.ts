import { HotelAddGuestsContextEvent, HotelGuest, HotelIGuestRepository } from '@app/hotel/guest';
import {
    HotelGuestCode,
    HotelGuestCreatedAt,
    HotelGuestDeletedAt,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
    HotelGuestUpdatedAt,
} from '@app/hotel/guest/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class HotelCreateGuestsService
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
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateGuests = payload.map(guest => HotelGuest.register(
            guest.id,
            guest.name,
            guest.lastname,
            guest.code,
            new HotelGuestCreatedAt({ currentTimestamp: true }),
            new HotelGuestUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateGuests,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddGuestsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const guestsRegistered = this.publisher.mergeObjectContext(new HotelAddGuestsContextEvent(aggregateGuests));

        guestsRegistered.created(); // apply event to model events
        guestsRegistered.commit(); // commit all events of model
    }
}
