import { CQMetadata } from '@aurorajs.dev/core';

export class HotelCreateGuestCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            lastname: string;
            code: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
