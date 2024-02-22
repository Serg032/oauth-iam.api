import { hotelMockGuestData, HotelUpdateGuestByIdCommand } from '@app/hotel/guest';
import { HotelUpdateGuestByIdCommandHandler } from '@app/hotel/guest/application/update/hotel-update-guest-by-id.command-handler';
import { HotelUpdateGuestByIdService } from '@app/hotel/guest/application/update/hotel-update-guest-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestByIdCommandHandler', () =>
{
    let commandHandler: HotelUpdateGuestByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelUpdateGuestByIdCommandHandler,
                {
                    provide : HotelUpdateGuestByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<HotelUpdateGuestByIdCommandHandler>(HotelUpdateGuestByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateGuestByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an guest created', async () =>
        {
            expect(await commandHandler.execute(
                new HotelUpdateGuestByIdCommand(
                    {
                        id: hotelMockGuestData[0].id,
                        name: hotelMockGuestData[0].name,
                        lastname: hotelMockGuestData[0].lastname,
                        code: hotelMockGuestData[0].code,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
