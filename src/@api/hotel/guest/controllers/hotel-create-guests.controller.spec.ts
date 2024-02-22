import { HotelCreateGuestsController, HotelCreateGuestsHandler } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelCreateGuestsController', () =>
{
    let controller: HotelCreateGuestsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                HotelCreateGuestsController,
            ],
            providers: [
                {
                    provide : HotelCreateGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<HotelCreateGuestsController>(HotelCreateGuestsController);
    });

    describe('main', () =>
    {
        test('HotelCreateGuestsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an hotelMockGuestData created', async () =>
        {
            expect(
                await controller.main(
                    hotelMockGuestData,
                ),
            )
                .toBe(undefined);
        });
    });
});
