/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelPaginateGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelPaginateGuestsHandler', () =>
{
    let handler: HotelPaginateGuestsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelPaginateGuestsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<HotelPaginateGuestsHandler>(HotelPaginateGuestsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('HotelPaginateGuestsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelPaginateGuestsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a guests', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: hotelMockGuestData.length,
                count: hotelMockGuestData.length,
                rows : hotelMockGuestData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: hotelMockGuestData.length,
                    count: hotelMockGuestData.length,
                    rows : hotelMockGuestData,
                });
        });
    });
});
