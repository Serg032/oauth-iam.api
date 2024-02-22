import { HotelCreatedGuestEvent } from '@app/hotel/guest';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HotelCreatedGuestEvent)
export class HotelCreatedGuestEventHandler implements IEventHandler<HotelCreatedGuestEvent>
{
    handle(event: HotelCreatedGuestEvent): void
    {
        // console.log('HotelCreatedGuestEvent: ', event);
    }
}
