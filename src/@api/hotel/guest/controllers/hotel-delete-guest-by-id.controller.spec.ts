/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelDeleteGuestByIdController, HotelDeleteGuestByIdHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestByIdController', () =>
{
    let controller: HotelDeleteGuestByIdController;
    let handler: HotelDeleteGuestByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelDeleteGuestByIdController,
            ],
            providers: [
                {
                    provide : HotelDeleteGuestByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelDeleteGuestByIdController>(HotelDeleteGuestByIdController);
        handler = module.get<HotelDeleteGuestByIdHandler>(HotelDeleteGuestByIdHandler);
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an guest deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await controller.main(hotelMockGuestData[0].id)).toBe(hotelMockGuestData[0]);
        });
    });
});
