import { HotelGetGuestsQuery, HotelGuestMapper, HotelIGuestRepository, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelGetGuestsQueryHandler } from '@app/hotel/guest/application/get/hotel-get-guests.query-handler';
import { HotelGetGuestsService } from '@app/hotel/guest/application/get/hotel-get-guests.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetGuestsQueryHandler', () =>
{
    let queryHandler: HotelGetGuestsQueryHandler;
    let service: HotelGetGuestsService;
    let repository: HotelMockGuestRepository;
    let mapper: HotelGuestMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelGetGuestsQueryHandler,
                {
                    provide : HotelIGuestRepository,
                    useClass: HotelMockGuestRepository,
                },
                {
                    provide : HotelGetGuestsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<HotelGetGuestsQueryHandler>(HotelGetGuestsQueryHandler);
        service = module.get<HotelGetGuestsService>(HotelGetGuestsService);
        repository = <HotelMockGuestRepository>module.get<HotelIGuestRepository>(HotelIGuestRepository);
        mapper = new HotelGuestMapper();
    });

    describe('main', () =>
    {
        test('HotelGetGuestsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an guests founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new HotelGetGuestsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
