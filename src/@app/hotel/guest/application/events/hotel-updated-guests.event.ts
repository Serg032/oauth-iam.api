import { HotelUpdatedGuestEvent } from './hotel-updated-guest.event';

export class HotelUpdatedGuestsEvent
{
    constructor(
        public readonly guests: HotelUpdatedGuestEvent[],
    ) {}
}
