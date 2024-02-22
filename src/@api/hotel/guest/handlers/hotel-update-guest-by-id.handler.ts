import { HotelGuest, HotelUpdateGuestByIdInput } from '@api/graphql';
import { HotelGuestDto, HotelUpdateGuestByIdDto } from '@api/hotel/guest';
import { HotelFindGuestByIdQuery, HotelUpdateGuestByIdCommand } from '@app/hotel/guest';
import { diff, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelUpdateGuestByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: HotelUpdateGuestByIdInput | HotelUpdateGuestByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<HotelGuest | HotelGuestDto>
    {
        const guest = await this.queryBus.ask(new HotelFindGuestByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, guest);

        await this.commandBus.dispatch(new HotelUpdateGuestByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new HotelFindGuestByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
