import { HotelDeleteGuestsController, HotelDeleteGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestsController', () =>
{
    let controller: HotelDeleteGuestsController;
    let handler: HotelDeleteGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelDeleteGuestsController,
            ],
            providers: [
                {
                    provide : HotelDeleteGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelDeleteGuestsController>(HotelDeleteGuestsController);
        handler = module.get<HotelDeleteGuestsHandler>(HotelDeleteGuestsHandler);
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an hotelMockGuestData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData)));
            expect(await controller.main()).toBe(hotelMockGuestData);
        });
    });
});
