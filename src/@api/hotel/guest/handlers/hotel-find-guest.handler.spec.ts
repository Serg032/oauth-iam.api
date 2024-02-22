/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelFindGuestHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestHandler', () =>
{
    let handler: HotelFindGuestHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelFindGuestHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<HotelFindGuestHandler>(HotelFindGuestHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('HotelFindGuestHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelFindGuestHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a guest', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(hotelMockGuestData[0]);
        });
    });
});
