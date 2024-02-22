import { HotelCreatedGuestsEvent } from '@app/hotel/guest';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HotelCreatedGuestsEvent)
export class HotelCreatedGuestsEventHandler implements IEventHandler<HotelCreatedGuestsEvent>
{
    handle(event: HotelCreatedGuestsEvent): void
    {
        // console.log('CreatedGuestsEvent: ', event);
    }
}
