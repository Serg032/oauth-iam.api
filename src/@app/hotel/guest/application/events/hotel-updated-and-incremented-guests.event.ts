import { HotelUpdatedAndIncrementedGuestEvent } from './hotel-updated-and-incremented-guest.event';

export class HotelUpdatedAndIncrementedGuestsEvent
{
    constructor(
        public readonly guests: HotelUpdatedAndIncrementedGuestEvent[],
    ) {}
}
