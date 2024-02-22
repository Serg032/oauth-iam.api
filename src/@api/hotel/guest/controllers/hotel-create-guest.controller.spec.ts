import { HotelCreateGuestController, HotelCreateGuestHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelCreateGuestController', () =>
{
    let controller: HotelCreateGuestController;
    let handler: HotelCreateGuestHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelCreateGuestController,
            ],
            providers: [
                {
                    provide : HotelCreateGuestHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelCreateGuestController>(HotelCreateGuestController);
        handler = module.get<HotelCreateGuestHandler>(HotelCreateGuestHandler);
    });

    describe('main', () =>
    {
        test('HotelCreateGuestController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an guest created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(
                await controller.main(
                    hotelMockGuestData[0],
                ),
            )
                .toBe(hotelMockGuestData[0]);
        });
    });
});
