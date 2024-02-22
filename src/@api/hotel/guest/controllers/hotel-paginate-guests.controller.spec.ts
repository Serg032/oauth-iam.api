import { HotelPaginateGuestsController, HotelPaginateGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelPaginateGuestsController', () =>
{
    let controller: HotelPaginateGuestsController;
    let handler: HotelPaginateGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelPaginateGuestsController,
            ],
            providers: [
                {
                    provide : HotelPaginateGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelPaginateGuestsController>(HotelPaginateGuestsController);
        handler = module.get<HotelPaginateGuestsHandler>(HotelPaginateGuestsHandler);
    });

    describe('main', () =>
    {
        test('HotelPaginateGuestsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a hotelMockGuestData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : hotelMockGuestData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : hotelMockGuestData,
            });
        });
    });
});
