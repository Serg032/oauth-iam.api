import { HotelDeletedGuestEvent } from '@app/hotel/guest';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HotelDeletedGuestEvent)
export class HotelDeletedGuestEventHandler implements IEventHandler<HotelDeletedGuestEvent>
{
    handle(event: HotelDeletedGuestEvent): void
    {
        // console.log('HotelDeletedGuestEvent: ', event);
    }
}
