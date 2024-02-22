/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelUpdateGuestsInput } from '@api/graphql';
import { HotelUpdateGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestsHandler', () =>
{
    let handler: HotelUpdateGuestsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelUpdateGuestsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<HotelUpdateGuestsHandler>(HotelUpdateGuestsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('HotelUpdateGuestsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelUpdateGuestsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a guests updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(
                await handler.main(
                    <HotelUpdateGuestsInput>hotelMockGuestData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(hotelMockGuestData[0]);
        });
    });
});
