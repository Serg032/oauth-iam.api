/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelDeleteGuestByIdHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestByIdController', () =>
{
    let handler: HotelDeleteGuestByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelDeleteGuestByIdHandler,
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

        handler = module.get<HotelDeleteGuestByIdHandler>(HotelDeleteGuestByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an guest deleted', async () =>
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
