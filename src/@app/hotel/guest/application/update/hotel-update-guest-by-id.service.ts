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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class HotelUpdateGuestByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: HotelIGuestRepository,
    ) {}

    async main(
        payload: {
            id: HotelGuestId;
            name?: HotelGuestName;
            lastname?: HotelGuestLastname;
            code?: HotelGuestCode;
        },
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

        // update by id
        await this.repository.updateById(
            guest,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const guestRegister = this.publisher.mergeObjectContext(
            guest,
        );

        guestRegister.updated(guest); // apply event to model events
        guestRegister.commit(); // commit all events of model
    }
}
