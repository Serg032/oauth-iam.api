/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelDeleteGuestByIdHandler, HotelDeleteGuestByIdResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestByIdResolver', () =>
{
    let resolver: HotelDeleteGuestByIdResolver;
    let handler: HotelDeleteGuestByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelDeleteGuestByIdResolver,
                {
                    provide : HotelDeleteGuestByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelDeleteGuestByIdResolver>(HotelDeleteGuestByIdResolver);
        handler = module.get<HotelDeleteGuestByIdHandler>(HotelDeleteGuestByIdHandler);
    });

    test('HotelDeleteGuestByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an guest deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await resolver.main(hotelMockGuestData[0].id)).toBe(hotelMockGuestData[0]);
        });
    });
});
