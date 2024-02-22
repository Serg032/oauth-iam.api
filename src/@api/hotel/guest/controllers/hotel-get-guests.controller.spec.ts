import { HotelGetGuestsController, HotelGetGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelGetGuestsController', () =>
{
    let controller: HotelGetGuestsController;
    let handler: HotelGetGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelGetGuestsController,
            ],
            providers: [
                {
                    provide : HotelGetGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelGetGuestsController>(HotelGetGuestsController);
        handler = module.get<HotelGetGuestsHandler>(HotelGetGuestsHandler);
    });

    describe('main', () =>
    {
        test('HotelGetGuestsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a hotelMockGuestData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData)));
            expect(await controller.main()).toBe(hotelMockGuestData);
        });
    });
});
