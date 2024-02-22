import { HotelIGuestRepository, HotelMockGuestRepository, HotelPaginateGuestsQuery } from '@app/hotel/guest';
import { HotelPaginateGuestsQueryHandler } from '@app/hotel/guest/application/paginate/hotel-paginate-guests.query-handler';
import { HotelPaginateGuestsService } from '@app/hotel/guest/application/paginate/hotel-paginate-guests.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelPaginateGuestsQueryHandler', () =>
{
    let queryHandler: HotelPaginateGuestsQueryHandler;
    let service: HotelPaginateGuestsService;
    let repository: HotelMockGuestRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelPaginateGuestsQueryHandler,
                {
                    provide : HotelIGuestRepository,
                    useClass: HotelMockGuestRepository,
                },
                {
                    provide : HotelPaginateGuestsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<HotelPaginateGuestsQueryHandler>(HotelPaginateGuestsQueryHandler);
        service = module.get<HotelPaginateGuestsService>(HotelPaginateGuestsService);
        repository = <HotelMockGuestRepository>module.get<HotelIGuestRepository>(HotelIGuestRepository);
    });

    describe('main', () =>
    {
        test('HotelPaginateGuestsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an guests paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new HotelPaginateGuestsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
