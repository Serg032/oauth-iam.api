import { HotelFindGuestByIdQuery, HotelGuestMapper, HotelIGuestRepository, hotelMockGuestData, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelFindGuestByIdQueryHandler } from '@app/hotel/guest/application/find/hotel-find-guest-by-id.query-handler';
import { HotelFindGuestByIdService } from '@app/hotel/guest/application/find/hotel-find-guest-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestByIdQueryHandler', () =>
{
    let queryHandler: HotelFindGuestByIdQueryHandler;
    let service: HotelFindGuestByIdService;
    let repository: HotelMockGuestRepository;
    let mapper: HotelGuestMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelFindGuestByIdQueryHandler,
                {
                    provide : HotelIGuestRepository,
                    useClass: HotelMockGuestRepository,
                },
                {
                    provide : HotelFindGuestByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<HotelFindGuestByIdQueryHandler>(HotelFindGuestByIdQueryHandler);
        service = module.get<HotelFindGuestByIdService>(HotelFindGuestByIdService);
        repository = <HotelMockGuestRepository>module.get<HotelIGuestRepository>(HotelIGuestRepository);
        mapper = new HotelGuestMapper();
    });

    describe('main', () =>
    {
        test('FindGuestByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an guest founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new HotelFindGuestByIdQuery(
                    hotelMockGuestData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
