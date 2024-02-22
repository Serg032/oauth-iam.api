/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelDeleteGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestsHandler', () =>
{
    let handler: HotelDeleteGuestsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelDeleteGuestsHandler,
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

        handler = module.get<HotelDeleteGuestsHandler>(HotelDeleteGuestsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('HotelDeleteGuestsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an hotelMockGuestData deleted', async () =>
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
