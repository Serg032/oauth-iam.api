import { HotelUpdateGuestByIdController, HotelUpdateGuestByIdHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestByIdController', () =>
{
    let controller: HotelUpdateGuestByIdController;
    let handler: HotelUpdateGuestByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelUpdateGuestByIdController,
            ],
            providers: [
                {
                    provide : HotelUpdateGuestByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelUpdateGuestByIdController>(HotelUpdateGuestByIdController);
        handler = module.get<HotelUpdateGuestByIdHandler>(HotelUpdateGuestByIdHandler);
    });

    describe('main', () =>
    {
        test('HotelUpdateGuestByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a guest updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await controller.main(hotelMockGuestData[0])).toBe(hotelMockGuestData[0]);
        });
    });
});
