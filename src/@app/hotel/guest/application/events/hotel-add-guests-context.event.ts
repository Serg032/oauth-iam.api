import { HotelCreatedGuestEvent, HotelCreatedGuestsEvent, HotelDeletedGuestEvent, HotelDeletedGuestsEvent, HotelGuest, HotelUpdatedAndIncrementedGuestEvent, HotelUpdatedAndIncrementedGuestsEvent, HotelUpdatedGuestEvent, HotelUpdatedGuestsEvent } from '@app/hotel/guest';
import { AggregateRoot } from '@nestjs/cqrs';

export class HotelAddGuestsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: HotelGuest[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new HotelCreatedGuestsEvent(
                this.aggregateRoots.map(guest =>
                    new HotelCreatedGuestEvent(
                        guest.id.value,
                        guest.name.value,
                        guest.lastname.value,
                        guest.code.value,
                        guest.createdAt?.value,
                        guest.updatedAt?.value,
                        guest.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new HotelUpdatedGuestsEvent(
                this.aggregateRoots.map(guest =>
                    new HotelUpdatedGuestEvent(
                        guest.id.value,
                        guest.name.value,
                        guest.lastname.value,
                        guest.code.value,
                        guest.createdAt?.value,
                        guest.updatedAt?.value,
                        guest.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new HotelUpdatedAndIncrementedGuestsEvent(
                this.aggregateRoots.map(guest =>
                    new HotelUpdatedAndIncrementedGuestEvent(
                        guest.id.value,
                        guest.name.value,
                        guest.lastname.value,
                        guest.code.value,
                        guest.createdAt?.value,
                        guest.updatedAt?.value,
                        guest.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new HotelDeletedGuestsEvent(
                this.aggregateRoots.map(guest =>
                    new HotelDeletedGuestEvent(
                        guest.id.value,
                        guest.name.value,
                        guest.lastname.value,
                        guest.code.value,
                        guest.createdAt?.value,
                        guest.updatedAt?.value,
                        guest.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
