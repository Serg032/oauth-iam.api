import { hotelMockGuestData, HotelUpdateAndIncrementGuestsCommand } from '@app/hotel/guest';
import { HotelUpdateAndIncrementGuestsCommandHandler } from '@app/hotel/guest/application/update/hotel-update-and-increment-guests.command-handler';
import { HotelUpdateAndIncrementGuestsService } from '@app/hotel/guest/application/update/hotel-update-and-increment-guests.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateAndIncrementGuestsCommandHandler', () =>
{
    let commandHandler: HotelUpdateAndIncrementGuestsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelUpdateAndIncrementGuestsCommandHandler,
                {
                    provide : HotelUpdateAndIncrementGuestsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<HotelUpdateAndIncrementGuestsCommandHandler>(HotelUpdateAndIncrementGuestsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementGuestsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an guests updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new HotelUpdateAndIncrementGuestsCommand(
                    {
                        id: hotelMockGuestData[0].id,
                        name: hotelMockGuestData[0].name,
                        lastname: hotelMockGuestData[0].lastname,
                        code: hotelMockGuestData[0].code,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
