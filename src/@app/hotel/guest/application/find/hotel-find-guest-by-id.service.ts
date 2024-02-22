import { HotelGuest, HotelIGuestRepository } from '@app/hotel/guest';
import { HotelGuestId } from '@app/hotel/guest/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelFindGuestByIdService
{
    constructor(
        private readonly repository: HotelIGuestRepository,
    ) {}

    async main(
        id: HotelGuestId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<HotelGuest>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
