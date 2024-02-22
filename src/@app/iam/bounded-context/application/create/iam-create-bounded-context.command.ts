import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateBoundedContextCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            root: string;
            sort?: number;
            isActive: boolean;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
