/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelIGuestRepository, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelCreateGuestsService } from '@app/hotel/guest/application/create/hotel-create-guests.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelCreateGuestsService', () =>
{
    let service: HotelCreateGuestsService;
    let mockRepository: HotelMockGuestRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                HotelCreateGuestsService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelCreateGuestsService);
        mockRepository = module.get(HotelMockGuestRepository);
    });

    describe('main', () =>
    {
        test('CreateGuestsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create guests and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
