import { HotelIGuestRepository, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelPaginateGuestsService } from '@app/hotel/guest/application/paginate/hotel-paginate-guests.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelPaginateGuestsService', () =>
{
    let service: HotelPaginateGuestsService;
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
                HotelPaginateGuestsService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelPaginateGuestsService);
        repository = module.get(HotelIGuestRepository);
        mockRepository = module.get(HotelMockGuestRepository);
    });

    describe('main', () =>
    {
        test('HotelPaginateGuestsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate guests', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
