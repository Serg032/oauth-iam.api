/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelUpdateGuestsInput } from '@api/graphql';
import { HotelUpdateGuestsHandler, HotelUpdateGuestsResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestsResolver', () =>
{
    let resolver: HotelUpdateGuestsResolver;
    let handler: HotelUpdateGuestsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelUpdateGuestsResolver,
                {
                    provide : HotelUpdateGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelUpdateGuestsResolver>(HotelUpdateGuestsResolver);
        handler = module.get<HotelUpdateGuestsHandler>(HotelUpdateGuestsHandler);
    });

    test('HotelUpdateGuestsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelUpdateGuestsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a guests updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await resolver.main(<HotelUpdateGuestsInput>hotelMockGuestData[0])).toBe(hotelMockGuestData[0]);
        });
    });
});
