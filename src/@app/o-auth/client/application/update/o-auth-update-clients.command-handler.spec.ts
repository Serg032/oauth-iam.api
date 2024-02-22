import { oAuthMockClientData, OAuthUpdateClientsCommand } from '@app/o-auth/client';
import { OAuthUpdateClientsCommandHandler } from '@app/o-auth/client/application/update/o-auth-update-clients.command-handler';
import { OAuthUpdateClientsService } from '@app/o-auth/client/application/update/o-auth-update-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateClientsCommandHandler', () =>
{
    let commandHandler: OAuthUpdateClientsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateClientsCommandHandler,
                {
                    provide : OAuthUpdateClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateClientsCommandHandler>(OAuthUpdateClientsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an clients updated', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpdateClientsCommand(
                    {
                        id: oAuthMockClientData[0].id,
                        grantType: oAuthMockClientData[0].grantType,
                        name: oAuthMockClientData[0].name,
                        secret: oAuthMockClientData[0].secret,
                        authUrl: oAuthMockClientData[0].authUrl,
                        redirect: oAuthMockClientData[0].redirect,
                        scopeOptions: oAuthMockClientData[0].scopeOptions,
                        expiredAccessToken: oAuthMockClientData[0].expiredAccessToken,
                        expiredRefreshToken: oAuthMockClientData[0].expiredRefreshToken,
                        isActive: oAuthMockClientData[0].isActive,
                        isMaster: oAuthMockClientData[0].isMaster,
                        applicationIds: oAuthMockClientData[0].applicationIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
