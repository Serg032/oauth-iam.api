import { hotelMockGuestData, HotelUpdateGuestsCommand } from '@app/hotel/guest';
import { HotelUpdateGuestsCommandHandler } from '@app/hotel/guest/application/update/hotel-update-guests.command-handler';
import { HotelUpdateGuestsService } from '@app/hotel/guest/application/update/hotel-update-guests.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestsCommandHandler', () =>
{
    let commandHandler: HotelUpdateGuestsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelUpdateGuestsCommandHandler,
                {
                    provide : HotelUpdateGuestsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<HotelUpdateGuestsCommandHandler>(HotelUpdateGuestsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateGuestsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an guests updated', async () =>
        {
            expect(await commandHandler.execute(
                new HotelUpdateGuestsCommand(
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
        });
    });
});
