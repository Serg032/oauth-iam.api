import { HotelDeleteGuestsCommand } from '@app/hotel/guest';
import { HotelDeleteGuestsService } from '@app/hotel/guest/application/delete/hotel-delete-guests.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(HotelDeleteGuestsCommand)
export class HotelDeleteGuestsCommandHandler implements ICommandHandler<HotelDeleteGuestsCommand>
{
    constructor(
        private readonly deleteGuestsService: HotelDeleteGuestsService,
    ) {}

    async execute(command: HotelDeleteGuestsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteGuestsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
