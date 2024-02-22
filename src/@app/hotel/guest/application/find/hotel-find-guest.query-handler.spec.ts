import { HotelFindGuestQuery, HotelGuestMapper, HotelIGuestRepository, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelFindGuestQueryHandler } from '@app/hotel/guest/application/find/hotel-find-guest.query-handler';
import { HotelFindGuestService } from '@app/hotel/guest/application/find/hotel-find-guest.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestQueryHandler', () =>
{
    let queryHandler: HotelFindGuestQueryHandler;
    let service: HotelFindGuestService;
    let repository: HotelMockGuestRepository;
    let mapper: HotelGuestMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelFindGuestQueryHandler,
                {
                    provide : HotelIGuestRepository,
                    useClass: HotelMockGuestRepository,
                },
                {
                    provide : HotelFindGuestService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<HotelFindGuestQueryHandler>(HotelFindGuestQueryHandler);
        service = module.get<HotelFindGuestService>(HotelFindGuestService);
        repository = <HotelMockGuestRepository>module.get<HotelIGuestRepository>(HotelIGuestRepository);
        mapper = new HotelGuestMapper();
    });

    describe('main', () =>
    {
        test('HotelFindGuestQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an guest founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new HotelFindGuestQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
