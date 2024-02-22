import { HotelIGuestRepository, hotelMockGuestData, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelFindGuestByIdService } from '@app/hotel/guest/application/find/hotel-find-guest-by-id.service';
import { HotelGuestId } from '@app/hotel/guest/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelFindGuestByIdService', () =>
{
    let service: HotelFindGuestByIdService;
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
                HotelFindGuestByIdService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelFindGuestByIdService);
        repository = module.get(HotelIGuestRepository);
        mockRepository = module.get(HotelMockGuestRepository);
    });

    describe('main', () =>
    {
        test('FindGuestByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find guest by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new HotelGuestId(hotelMockGuestData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
