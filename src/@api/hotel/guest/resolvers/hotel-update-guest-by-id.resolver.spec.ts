/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelUpdateGuestByIdInput } from '@api/graphql';
import { HotelUpdateGuestByIdHandler, HotelUpdateGuestByIdResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestByIdResolver', () =>
{
    let resolver: HotelUpdateGuestByIdResolver;
    let handler: HotelUpdateGuestByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelUpdateGuestByIdResolver,
                {
                    provide : HotelUpdateGuestByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelUpdateGuestByIdResolver>(HotelUpdateGuestByIdResolver);
        handler = module.get<HotelUpdateGuestByIdHandler>(HotelUpdateGuestByIdHandler);
    });

    test('HotelUpdateGuestByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelUpdateGuestByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a guest by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await resolver.main(<HotelUpdateGuestByIdInput>hotelMockGuestData[0])).toBe(hotelMockGuestData[0]);
        });
    });
});
