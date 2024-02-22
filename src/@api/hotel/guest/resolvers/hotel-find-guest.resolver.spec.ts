/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelFindGuestHandler, HotelFindGuestResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestResolver', () =>
{
    let resolver: HotelFindGuestResolver;
    let handler: HotelFindGuestHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelFindGuestResolver,
                {
                    provide : HotelFindGuestHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelFindGuestResolver>(HotelFindGuestResolver);
        handler = module.get<HotelFindGuestHandler>(HotelFindGuestHandler);
    });

    test('HotelFindGuestResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelFindGuestResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a guest', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await resolver.main()).toBe(hotelMockGuestData[0]);
        });
    });
});
