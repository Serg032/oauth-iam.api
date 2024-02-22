/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelFindGuestByIdHandler, HotelFindGuestByIdResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestByIdResolver', () =>
{
    let resolver: HotelFindGuestByIdResolver;
    let handler: HotelFindGuestByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelFindGuestByIdResolver,
                {
                    provide : HotelFindGuestByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelFindGuestByIdResolver>(HotelFindGuestByIdResolver);
        handler = module.get<HotelFindGuestByIdHandler>(HotelFindGuestByIdHandler);
    });

    test('HotelFindGuestByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelFindGuestByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an guest by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await resolver.main(hotelMockGuestData[0].id)).toBe(hotelMockGuestData[0]);
        });
    });
});
