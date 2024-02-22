import { HotelDeleteGuestByIdCommand, hotelMockGuestData } from '@app/hotel/guest';
import { HotelDeleteGuestByIdCommandHandler } from '@app/hotel/guest/application/delete/hotel-delete-guest-by-id.command-handler';
import { HotelDeleteGuestByIdService } from '@app/hotel/guest/application/delete/hotel-delete-guest-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestByIdCommandHandler', () =>
{
    let commandHandler: HotelDeleteGuestByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelDeleteGuestByIdCommandHandler,
                {
                    provide : HotelDeleteGuestByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<HotelDeleteGuestByIdCommandHandler>(HotelDeleteGuestByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the HotelDeleteGuestByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new HotelDeleteGuestByIdCommand(
                    hotelMockGuestData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
