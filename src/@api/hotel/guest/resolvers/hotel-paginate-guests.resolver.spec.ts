/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelPaginateGuestsHandler, HotelPaginateGuestsResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelPaginateGuestsResolver', () =>
{
    let resolver: HotelPaginateGuestsResolver;
    let handler: HotelPaginateGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelPaginateGuestsResolver,
                {
                    provide : HotelPaginateGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelPaginateGuestsResolver>(HotelPaginateGuestsResolver);
        handler = module.get<HotelPaginateGuestsHandler>(HotelPaginateGuestsHandler);
    });

    test('HotelPaginateGuestsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelPaginateGuestsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a hotelMockGuestData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : hotelMockGuestData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : hotelMockGuestData,
            });
        });
    });
});
