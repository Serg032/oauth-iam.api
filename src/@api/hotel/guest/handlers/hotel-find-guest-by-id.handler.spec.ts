/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelFindGuestByIdHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestByIdHandler', () =>
{
    let handler: HotelFindGuestByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelFindGuestByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<HotelFindGuestByIdHandler>(HotelFindGuestByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('HotelFindGuestByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelFindGuestByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an guest by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(
                await handler.main(
                    hotelMockGuestData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(hotelMockGuestData[0]);
        });
    });
});
