/* eslint-disable key-spacing */
import { HotelCreatedGuestEvent, HotelDeletedGuestEvent, HotelUpdatedGuestEvent } from '@app/hotel/guest';
import {
    HotelGuestCode,
    HotelGuestCreatedAt,
    HotelGuestDeletedAt,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
    HotelGuestUpdatedAt,
} from '@app/hotel/guest/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class HotelGuest extends AggregateRoot
{
    id: HotelGuestId;
    name: HotelGuestName;
    lastname: HotelGuestLastname;
    code: HotelGuestCode;
    createdAt: HotelGuestCreatedAt;
    updatedAt: HotelGuestUpdatedAt;
    deletedAt: HotelGuestDeletedAt;

    constructor(
        id: HotelGuestId,
        name: HotelGuestName,
        lastname: HotelGuestLastname,
        code: HotelGuestCode,
        createdAt: HotelGuestCreatedAt,
        updatedAt: HotelGuestUpdatedAt,
        deletedAt: HotelGuestDeletedAt,
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.code = code;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: HotelGuestId,
        name: HotelGuestName,
        lastname: HotelGuestLastname,
        code: HotelGuestCode,
        createdAt: HotelGuestCreatedAt,
        updatedAt: HotelGuestUpdatedAt,
        deletedAt: HotelGuestDeletedAt,
    ): HotelGuest
    {
        return new HotelGuest(
            id,
            name,
            lastname,
            code,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(guest: HotelGuest): void
    {
        this.apply(
            new HotelCreatedGuestEvent(
                guest.id.value,
                guest.name.value,
                guest.lastname.value,
                guest.code.value,
                guest.createdAt?.value,
                guest.updatedAt?.value,
                guest.deletedAt?.value,
            ),
        );
    }

    updated(guest: HotelGuest): void
    {
        this.apply(
            new HotelUpdatedGuestEvent(
                guest.id?.value,
                guest.name?.value,
                guest.lastname?.value,
                guest.code?.value,
                guest.createdAt?.value,
                guest.updatedAt?.value,
                guest.deletedAt?.value,
            ),
        );
    }

    deleted(guest: HotelGuest): void
    {
        this.apply(
            new HotelDeletedGuestEvent(
                guest.id.value,
                guest.name.value,
                guest.lastname.value,
                guest.code.value,
                guest.createdAt?.value,
                guest.updatedAt?.value,
                guest.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            lastname: this.lastname.value,
            code: this.code.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            lastname: this.lastname.value,
            code: this.code.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
