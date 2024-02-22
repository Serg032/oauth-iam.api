import { HotelGuest, HotelIGuestRepository } from '@app/hotel/guest';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelRawSQLGuestsService
{
    constructor(
        private readonly repository: HotelIGuestRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<HotelGuest[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
