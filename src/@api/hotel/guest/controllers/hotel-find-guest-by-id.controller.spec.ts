import { HotelFindGuestByIdController, HotelFindGuestByIdHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestByIdController', () =>
{
    let controller: HotelFindGuestByIdController;
    let handler: HotelFindGuestByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelFindGuestByIdController,
            ],
            providers: [
                {
                    provide : HotelFindGuestByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelFindGuestByIdController>(HotelFindGuestByIdController);
        handler = module.get<HotelFindGuestByIdHandler>(HotelFindGuestByIdHandler);
    });

    describe('main', () =>
    {
        test('HotelFindGuestByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an guest by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await controller.main(hotelMockGuestData[0].id)).toBe(hotelMockGuestData[0]);
        });
    });
});
