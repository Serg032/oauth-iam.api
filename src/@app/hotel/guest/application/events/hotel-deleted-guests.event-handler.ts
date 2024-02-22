import { HotelDeletedGuestsEvent } from '@app/hotel/guest';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HotelDeletedGuestsEvent)
export class HotelDeletedGuestsEventHandler implements IEventHandler<HotelDeletedGuestsEvent>
{
    handle(event: HotelDeletedGuestsEvent): void
    {
        // console.log('DeletedGuestsEvent: ', event);
    }
}
