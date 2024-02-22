import { HotelIGuestRepository, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelFindGuestService } from '@app/hotel/guest/application/find/hotel-find-guest.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestService', () =>
{
    let service: HotelFindGuestService;
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
                HotelFindGuestService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelFindGuestService);
        repository = module.get(HotelIGuestRepository);
        mockRepository = module.get(HotelMockGuestRepository);
    });

    describe('main', () =>
    {
        test('HotelFindGuestService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find guest', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
