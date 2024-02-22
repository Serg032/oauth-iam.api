import { HotelAddGuestsContextEvent, HotelIGuestRepository } from '@app/hotel/guest';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class HotelDeleteGuestsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: HotelIGuestRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const guests = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (guests.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddGuestsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const guestsRegistered = this.publisher.mergeObjectContext(
            new HotelAddGuestsContextEvent(guests),
        );

        guestsRegistered.deleted(); // apply event to model events
        guestsRegistered.commit(); // commit all events of model
    }
}
