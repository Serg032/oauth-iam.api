import { hotelMockGuestData, HotelUpsertGuestCommand } from '@app/hotel/guest';
import { HotelUpsertGuestCommandHandler } from '@app/hotel/guest/application/upsert/hotel-upsert-guest.command-handler';
import { HotelUpsertGuestService } from '@app/hotel/guest/application/upsert/hotel-upsert-guest.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpsertGuestCommandHandler', () =>
{
    let commandHandler: HotelUpsertGuestCommandHandler;
    let service: HotelUpsertGuestService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelUpsertGuestCommandHandler,
                {
                    provide : HotelUpsertGuestService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<HotelUpsertGuestCommandHandler>(HotelUpsertGuestCommandHandler);
        service = module.get<HotelUpsertGuestService>(HotelUpsertGuestService);
    });

    describe('main', () =>
    {
        test('UpsertGuestCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the HotelUpsertGuestService', async () =>
        {
            expect(await commandHandler.execute(
                new HotelUpsertGuestCommand(
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
