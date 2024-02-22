/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelDeleteGuestsHandler, HotelDeleteGuestsResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestsResolver', () =>
{
    let resolver: HotelDeleteGuestsResolver;
    let handler: HotelDeleteGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelDeleteGuestsResolver,
                {
                    provide : HotelDeleteGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelDeleteGuestsResolver>(HotelDeleteGuestsResolver);
        handler = module.get<HotelDeleteGuestsHandler>(HotelDeleteGuestsHandler);
    });

    test('HotelDeleteGuestsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an hotelMockGuestData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData)));
            expect(await resolver.main()).toBe(hotelMockGuestData);
        });
    });
});
