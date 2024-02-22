/* eslint-disable key-spacing */
import { HotelCreateGuestsCommand } from '@app/hotel/guest';
import { HotelCreateGuestsService } from '@app/hotel/guest/application/create/hotel-create-guests.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(HotelCreateGuestsCommand)
export class HotelCreateGuestsCommandHandler implements ICommandHandler<HotelCreateGuestsCommand>
{
    constructor(
        private readonly createGuestsService: HotelCreateGuestsService,
    ) {}

    async execute(command: HotelCreateGuestsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createGuestsService.main(
            command.payload
                .map(guest =>
                {
                    return {
                        id: new HotelGuestId(guest.id),
                        name: new HotelGuestName(guest.name),
                        lastname: new HotelGuestLastname(guest.lastname),
                        code: new HotelGuestCode(guest.code),
                    };
                }),
            command.cQMetadata,
        );
    }
}
