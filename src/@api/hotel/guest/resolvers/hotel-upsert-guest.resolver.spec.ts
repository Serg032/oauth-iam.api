/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelUpdateGuestByIdInput } from '@api/graphql';
import { HotelUpsertGuestHandler, HotelUpsertGuestResolver } from '@api/hotel/guest';
import { hotelMockGuestData } from '@app/hotel/guest';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpsertGuestResolver', () =>
{
    let resolver: HotelUpsertGuestResolver;
    let handler: HotelUpsertGuestHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                HotelUpsertGuestResolver,
                {
                    provide : HotelUpsertGuestHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<HotelUpsertGuestResolver>(HotelUpsertGuestResolver);
        handler = module.get<HotelUpsertGuestHandler>(HotelUpsertGuestHandler);
    });

    test('HotelUpsertGuestResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('HotelUpsertGuestResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an guest upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(hotelMockGuestData[0])));
            expect(await resolver.main(<HotelUpdateGuestByIdInput>hotelMockGuestData[0])).toBe(hotelMockGuestData[0]);
        });
    });
});
