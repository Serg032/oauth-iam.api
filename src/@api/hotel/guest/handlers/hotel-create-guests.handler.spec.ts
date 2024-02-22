import { HotelCreateGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelCreateGuestsHandler', () =>
{
    let handler: HotelCreateGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelCreateGuestsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<HotelCreateGuestsHandler>(HotelCreateGuestsHandler);
    });

    describe('main', () =>
    {
        test('HotelCreateGuestsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an hotelMockGuestData created', async () =>
        {
            expect(await handler.main(hotelMockGuestData)).toBe(true);
        });
    });
});
