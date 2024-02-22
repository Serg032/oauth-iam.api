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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class HotelUpdateAndIncrementGuestsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: HotelIGuestRepository,
    ) {}

    async main(
        payload: {
            id?: HotelGuestId;
            name?: HotelGuestName;
            lastname?: HotelGuestLastname;
            code?: HotelGuestCode;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const guest = HotelGuest.register(
            payload.id,
            payload.name,
            payload.lastname,
            payload.code,
            null, // createdAt
            new HotelGuestUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            guest,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const guests = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const guestsRegister = this.publisher.mergeObjectContext(
            new HotelAddGuestsContextEvent(guests),
        );

        guestsRegister.updatedAndIncremented(); // apply event to model events
        guestsRegister.commit(); // commit all events of model
    }
}
