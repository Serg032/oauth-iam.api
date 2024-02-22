import { HotelDeletedGuestEvent } from './hotel-deleted-guest.event';

export class HotelDeletedGuestsEvent
{
    constructor(
        public readonly guests: HotelDeletedGuestEvent[],
    ) {}
}
