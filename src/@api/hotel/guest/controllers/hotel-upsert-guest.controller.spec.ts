import { HotelUpsertGuestController, HotelUpsertGuestHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpsertGuestController', () =>
{
    let controller: HotelUpsertGuestController;
    let handler: HotelUpsertGuestHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                HotelUpsertGuestController,
            ],
            providers: [
                {
                    provide : HotelUpsertGuestHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelUpsertGuestController>(HotelUpsertGuestController);
        handler = module.get<HotelUpsertGuestHandler>(HotelUpsertGuestHandler);
    });

    describe('main', () =>
    {
        test('HotelUpsertGuestController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an guest upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await controller.main(hotelMockGuestData[0])).toBe(hotelMockGuestData[0]);
        });
    });
});
