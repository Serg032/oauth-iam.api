/* eslint-disable key-spacing */
import { HotelUpdateAndIncrementGuestsCommand } from '@app/hotel/guest';
import { HotelUpdateAndIncrementGuestsService } from '@app/hotel/guest/application/update/hotel-update-and-increment-guests.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(HotelUpdateAndIncrementGuestsCommand)
export class HotelUpdateAndIncrementGuestsCommandHandler implements ICommandHandler<HotelUpdateAndIncrementGuestsCommand>
{
    constructor(
        private readonly updateGuestsService: HotelUpdateAndIncrementGuestsService,
    ) {}

    async execute(command: HotelUpdateAndIncrementGuestsCommand): Promise<void>
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
