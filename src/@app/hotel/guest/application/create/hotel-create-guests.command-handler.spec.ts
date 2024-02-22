import { HotelCreateGuestsCommand, hotelMockGuestData } from '@app/hotel/guest';
import { HotelCreateGuestsCommandHandler } from '@app/hotel/guest/application/create/hotel-create-guests.command-handler';
import { HotelCreateGuestsService } from '@app/hotel/guest/application/create/hotel-create-guests.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('hotelCreateGuestsCommandHandler', () =>
{
    let commandHandler: HotelCreateGuestsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelCreateGuestsCommandHandler,
                {
                    provide : HotelCreateGuestsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<HotelCreateGuestsCommandHandler>(HotelCreateGuestsCommandHandler);
    });

    describe('main', () =>
    {
        test('HotelCreateGuestsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return HotelMockGuestData created', async () =>
        {
            expect(await commandHandler.execute(
                new HotelCreateGuestsCommand(
                    hotelMockGuestData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
