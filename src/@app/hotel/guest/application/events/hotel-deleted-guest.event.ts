export class HotelDeletedGuestEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly lastname: string,
        public readonly code: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
