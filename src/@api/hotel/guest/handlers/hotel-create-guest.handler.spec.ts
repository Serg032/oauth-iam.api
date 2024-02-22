/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelCreateGuestHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelCreateGuestHandler', () =>
{
    let handler: HotelCreateGuestHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelCreateGuestHandler,
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

        handler = module.get<HotelCreateGuestHandler>(HotelCreateGuestHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('HotelCreateGuestHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an guest created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(
                await handler.main(
                    hotelMockGuestData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(hotelMockGuestData[0]);
        });
    });
});
