import { HotelCreateGuestCommandHandler } from './hotel-create-guest.command-handler';
import { HotelCreateGuestService } from './hotel-create-guest.service';
import { HotelCreateGuestCommand, hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelCreateGuestCommandHandler', () =>
{
    let commandHandler: HotelCreateGuestCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelCreateGuestCommandHandler,
                {
                    provide : HotelCreateGuestService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<HotelCreateGuestCommandHandler>(HotelCreateGuestCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateGuestCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the HotelCreateGuestService', async () =>
        {
            expect(await commandHandler.execute(
                new HotelCreateGuestCommand(
                    {
                        id: hotelMockGuestData[0].id,
                        name: hotelMockGuestData[0].name,
                        lastname: hotelMockGuestData[0].lastname,
                        code: hotelMockGuestData[0].code,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
