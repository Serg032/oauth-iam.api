/* eslint-disable key-spacing */
import { HotelUpdateGuestsCommand } from '@app/hotel/guest';
import { HotelUpdateGuestsService } from '@app/hotel/guest/application/update/hotel-update-guests.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(HotelUpdateGuestsCommand)
export class HotelUpdateGuestsCommandHandler implements ICommandHandler<HotelUpdateGuestsCommand>
{
    constructor(
        private readonly updateGuestsService: HotelUpdateGuestsService,
    ) {}

    async execute(command: HotelUpdateGuestsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateGuestsService.main(
            {
                id: new HotelGuestId(command.payload.id, { undefinable: true }),
                name: new HotelGuestName(command.payload.name, { undefinable: true }),
                lastname: new HotelGuestLastname(command.payload.lastname, { undefinable: true }),
                code: new HotelGuestCode(command.payload.code, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
