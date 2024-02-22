import { HotelCreatedGuestEvent } from './hotel-created-guest.event';

export class HotelCreatedGuestsEvent
{
    constructor(
        public readonly guests: HotelCreatedGuestEvent[],
    ) {}
}
