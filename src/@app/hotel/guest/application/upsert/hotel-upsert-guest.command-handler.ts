/* eslint-disable key-spacing */
import { HotelUpsertGuestCommand } from '@app/hotel/guest';
import { HotelUpsertGuestService } from '@app/hotel/guest/application/upsert/hotel-upsert-guest.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(HotelUpsertGuestCommand)
export class HotelUpsertGuestCommandHandler implements ICommandHandler<HotelUpsertGuestCommand>
{
    constructor(
        private readonly upsertGuestService: HotelUpsertGuestService,
    ) {}

    async execute(command: HotelUpsertGuestCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertGuestService.main(
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
