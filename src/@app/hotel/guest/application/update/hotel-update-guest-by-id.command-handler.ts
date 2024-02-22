/* eslint-disable key-spacing */
import { HotelUpdateGuestByIdCommand } from '@app/hotel/guest';
import { HotelUpdateGuestByIdService } from '@app/hotel/guest/application/update/hotel-update-guest-by-id.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(HotelUpdateGuestByIdCommand)
export class HotelUpdateGuestByIdCommandHandler implements ICommandHandler<HotelUpdateGuestByIdCommand>
{
    constructor(
        private readonly updateGuestByIdService: HotelUpdateGuestByIdService,
    ) {}

    async execute(command: HotelUpdateGuestByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateGuestByIdService.main(
            {
                id: new HotelGuestId(command.payload.id),
                name: new HotelGuestName(command.payload.name, { undefinable: true }),
                lastname: new HotelGuestLastname(command.payload.lastname, { undefinable: true }),
                code: new HotelGuestCode(command.payload.code, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
