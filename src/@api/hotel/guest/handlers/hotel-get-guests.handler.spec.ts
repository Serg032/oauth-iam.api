/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelGetGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelGetGuestsHandler', () =>
{
    let handler: HotelGetGuestsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelGetGuestsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<HotelGetGuestsHandler>(HotelGetGuestsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('HotelGetGuestsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelGetGuestsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a hotelMockGuestData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(hotelMockGuestData);
        });
    });
});
