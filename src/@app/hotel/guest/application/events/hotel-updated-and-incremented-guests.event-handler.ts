import { HotelUpdatedAndIncrementedGuestsEvent } from '@app/hotel/guest';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(HotelUpdatedAndIncrementedGuestsEvent)
export class HotelUpdatedAndIncrementedGuestsEventHandler implements IEventHandler<HotelUpdatedAndIncrementedGuestsEvent>
{
    handle(event: HotelUpdatedAndIncrementedGuestsEvent): void
    {
        // console.log('HotelUpdatedAndIncrementedGuestsEvent: ', event);
    }
}
