import { HotelUpdatedGuestsEvent } from '@app/hotel/guest';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HotelUpdatedGuestsEvent)
export class HotelUpdatedGuestsEventHandler implements IEventHandler<HotelUpdatedGuestsEvent>
{
    handle(event: HotelUpdatedGuestsEvent): void
    {
        // console.log('HotelUpdatedGuestsEvent: ', event);
    }
}
