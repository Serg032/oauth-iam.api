/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelUpdateGuestByIdInput } from '@api/graphql';
import { HotelUpdateGuestByIdHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestByIdHandler', () =>
{
    let handler: HotelUpdateGuestByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelUpdateGuestByIdHandler,
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

        handler = module.get<HotelUpdateGuestByIdHandler>(HotelUpdateGuestByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('HotelUpdateGuestByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelUpdateGuestByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a guest updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(
                await handler.main(
                    <HotelUpdateGuestByIdInput>hotelMockGuestData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(hotelMockGuestData[0]);
        });
    });
});
