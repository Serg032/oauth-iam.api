/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamGetTenantsAccountsHandler, IamTenantAccountDto } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant-account')
@Controller('iam/tenants-accounts/get')
@Auth('iam.tenantAccount.get')
export class IamGetTenantsAccountsController
{
    constructor(
        private readonly handler: IamGetTenantsAccountsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get tenants-accounts according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamTenantAccountDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
