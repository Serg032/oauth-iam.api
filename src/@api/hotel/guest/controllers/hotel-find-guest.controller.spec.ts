import { HotelFindGuestController, HotelFindGuestHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestController', () =>
{
    let controller: HotelFindGuestController;
    let handler: HotelFindGuestHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelFindGuestController,
            ],
            providers: [
                {
                    provide : HotelFindGuestHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelFindGuestController>(HotelFindGuestController);
        handler = module.get<HotelFindGuestHandler>(HotelFindGuestHandler);
    });

    describe('main', () =>
    {
        test('HotelFindGuestController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a guest', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await controller.main()).toBe(hotelMockGuestData[0]);
        });
    });
});
