import { HotelDeleteGuestsCommand } from '@app/hotel/guest';
import { HotelDeleteGuestsCommandHandler } from '@app/hotel/guest/application/delete/hotel-delete-guests.command-handler';
import { HotelDeleteGuestsService } from '@app/hotel/guest/application/delete/hotel-delete-guests.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestsCommandHandler', () =>
{
    let commandHandler: HotelDeleteGuestsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelDeleteGuestsCommandHandler,
                {
                    provide : HotelDeleteGuestsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<HotelDeleteGuestsCommandHandler>(HotelDeleteGuestsCommandHandler);
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new HotelDeleteGuestsCommand(),
            )).toBe(undefined);
        });
    });
});
