/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelGetGuestsHandler, HotelGetGuestsResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelGetGuestsResolver', () =>
{
    let resolver: HotelGetGuestsResolver;
    let handler: HotelGetGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelGetGuestsResolver,
                {
                    provide : HotelGetGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelGetGuestsResolver>(HotelGetGuestsResolver);
        handler = module.get<HotelGetGuestsHandler>(HotelGetGuestsHandler);
    });

    test('HotelGetGuestsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelGetGuestsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a hotelMockGuestData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData)));
            expect(await resolver.main()).toBe(hotelMockGuestData);
        });
    });
});
