/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelIGuestRepository, hotelMockGuestData, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelDeleteGuestByIdService } from '@app/hotel/guest/application/delete/hotel-delete-guest-by-id.service';
import { HotelGuestId } from '@app/hotel/guest/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestByIdService', () =>
{
    let service: HotelDeleteGuestByIdService;
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
                HotelDeleteGuestByIdService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelDeleteGuestByIdService);
        repository = module.get(HotelIGuestRepository);
        mockRepository = module.get(HotelMockGuestRepository);
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete guest and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new HotelGuestId(hotelMockGuestData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
