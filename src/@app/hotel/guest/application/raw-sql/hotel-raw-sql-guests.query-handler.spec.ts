import { HotelGuestMapper, HotelIGuestRepository, HotelMockGuestRepository, HotelRawSQLGuestsQuery } from '@app/hotel/guest';
import { HotelRawSQLGuestsQueryHandler } from '@app/hotel/guest/application/raw-sql/hotel-raw-sql-guests.query-handler';
import { HotelRawSQLGuestsService } from '@app/hotel/guest/application/raw-sql/hotel-raw-sql-guests.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLGuestsQueryHandler', () =>
{
    let queryHandler: HotelRawSQLGuestsQueryHandler;
    let service: HotelRawSQLGuestsService;
    let repository: HotelMockGuestRepository;
    let mapper: HotelGuestMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelRawSQLGuestsQueryHandler,
                {
                    provide : HotelIGuestRepository,
                    useClass: HotelMockGuestRepository,
                },
                {
                    provide : HotelRawSQLGuestsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<HotelRawSQLGuestsQueryHandler>(HotelRawSQLGuestsQueryHandler);
        service = module.get<HotelRawSQLGuestsService>(HotelRawSQLGuestsService);
        repository = <HotelMockGuestRepository>module.get<HotelIGuestRepository>(HotelIGuestRepository);
        mapper = new HotelGuestMapper();
    });

    describe('main', () =>
    {
        test('HotelRawSQLGuestsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an guests founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new HotelRawSQLGuestsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
