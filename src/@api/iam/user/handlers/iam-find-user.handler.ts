import { IamUser } from '@api/graphql';
import { IamUserDto } from '@api/iam/user';
import { IamFindUserQuery } from '@app/iam/user';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindUserHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser | IamUserDto>
    {
        return await this.queryBus.ask(new IamFindUserQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
