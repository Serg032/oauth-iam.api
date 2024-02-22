import { HotelIGuestRepository, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelRawSQLGuestsService } from '@app/hotel/guest/application/raw-sql/hotel-raw-sql-guests.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelRawSQLGuestsService ', () =>
{
    let service: HotelRawSQLGuestsService ;
    let repository: HotelIGuestRepository;
    let mockRepository: HotelMockGuestRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                HotelRawSQLGuestsService ,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(HotelRawSQLGuestsService );
        repository      = module.get(HotelIGuestRepository);
        mockRepository  = module.get(HotelMockGuestRepository);
    });

    describe('main', () =>
    {
        test('RawSQLGuestsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get guests', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
