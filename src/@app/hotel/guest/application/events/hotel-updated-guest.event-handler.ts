import { HotelUpdatedGuestEvent } from '@app/hotel/guest';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HotelUpdatedGuestEvent)
export class HotelUpdatedGuestEventHandler implements IEventHandler<HotelUpdatedGuestEvent>
{
    handle(event: HotelUpdatedGuestEvent): void
    {
        // console.log('UpdatedGuestEvent: ', event);
    }
}
