import { HotelIGuestRepository } from '@app/hotel/guest';
import { HotelGuestId } from '@app/hotel/guest/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class HotelDeleteGuestByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: HotelIGuestRepository,
    ) {}

    async main(
        id: HotelGuestId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const guest = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                guest.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const guestRegister = this.publisher.mergeObjectContext(guest);

        guestRegister.deleted(guest); // apply event to model events
        guestRegister.commit(); // commit all events of model
    }
}
