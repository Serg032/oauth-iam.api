import { HotelCreateGuestInput } from '@api/graphql';
import { HotelCreateGuestsHandler, HotelCreateGuestsResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelCreateGuestsResolver', () =>
{
    let resolver: HotelCreateGuestsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelCreateGuestsResolver,
                {
                    provide : HotelCreateGuestsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelCreateGuestsResolver>(HotelCreateGuestsResolver);
    });

    test('HotelCreateGuestsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelCreateGuestsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an guests created', async () =>
        {
            expect(await resolver.main(<HotelCreateGuestInput[]>hotelMockGuestData)).toBe(undefined);
        });
    });
});
