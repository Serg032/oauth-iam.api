/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelUpsertGuestHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpsertGuestHandler', () =>
{
    let handler: HotelUpsertGuestHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelUpsertGuestHandler,
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

        handler = module.get<HotelUpsertGuestHandler>(HotelUpsertGuestHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('HotelUpsertGuestHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an guest upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(
                await handler.main(
                    hotelMockGuestData[0],
                    'Europe/Madrid',
                ))
                .toBe(hotelMockGuestData[0]);
        });
    });
});
