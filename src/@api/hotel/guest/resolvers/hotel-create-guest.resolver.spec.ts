/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelCreateGuestInput } from '@api/graphql';
import { HotelCreateGuestHandler, HotelCreateGuestResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelCreateGuestResolver', () =>
{
    let resolver: HotelCreateGuestResolver;
    let handler: HotelCreateGuestHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelCreateGuestResolver,
                {
                    provide : HotelCreateGuestHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelCreateGuestResolver>(HotelCreateGuestResolver);
        handler = module.get<HotelCreateGuestHandler>(HotelCreateGuestHandler);
    });

    test('HotelCreateGuestResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelCreateGuestResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an guest created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await resolver.main(<HotelCreateGuestInput>hotelMockGuestData[0])).toBe(hotelMockGuestData[0]);
        });
    });
});
