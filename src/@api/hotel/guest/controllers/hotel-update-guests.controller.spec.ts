import { HotelUpdateGuestsController, HotelUpdateGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestsController', () =>
{
    let controller: HotelUpdateGuestsController;
    let handler: HotelUpdateGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelUpdateGuestsController,
            ],
            providers: [
                {
                    provide : HotelUpdateGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelUpdateGuestsController>(HotelUpdateGuestsController);
        handler = module.get<HotelUpdateGuestsHandler>(HotelUpdateGuestsHandler);
    });

    describe('main', () =>
    {
        test('HotelUpdateGuestsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a guests updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await controller.main(hotelMockGuestData[0])).toBe(hotelMockGuestData[0]);
        });
    });
});
