import { HotelDeleteGuestByIdCommand } from '@app/hotel/guest';
import { HotelDeleteGuestByIdService } from '@app/hotel/guest/application/delete/hotel-delete-guest-by-id.service';
import { HotelGuestId } from '@app/hotel/guest/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(HotelDeleteGuestByIdCommand)
export class HotelDeleteGuestByIdCommandHandler implements ICommandHandler<HotelDeleteGuestByIdCommand>
{
    constructor(
        private readonly deleteGuestByIdService: HotelDeleteGuestByIdService,
    ) {}

    async execute(command: HotelDeleteGuestByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteGuestByIdService.main(
            new HotelGuestId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
