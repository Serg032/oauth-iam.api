/* eslint-disable key-spacing */
import { HotelCreateGuestCommand } from '@app/hotel/guest';
import { HotelCreateGuestService } from '@app/hotel/guest/application/create/hotel-create-guest.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(HotelCreateGuestCommand)
export class HotelCreateGuestCommandHandler implements ICommandHandler<HotelCreateGuestCommand>
{
    constructor(
        private readonly createGuestService: HotelCreateGuestService,
    ) {}

    async execute(command: HotelCreateGuestCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createGuestService.main(
            {
                id: new HotelGuestId(command.payload.id),
                name: new HotelGuestName(command.payload.name),
                lastname: new HotelGuestLastname(command.payload.lastname),
                code: new HotelGuestCode(command.payload.code),
            },
            command.cQMetadata,
        );
    }
}
