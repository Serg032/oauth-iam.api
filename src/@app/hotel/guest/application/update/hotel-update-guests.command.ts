import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class HotelUpdateGuestsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
            lastname?: string;
            code?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
