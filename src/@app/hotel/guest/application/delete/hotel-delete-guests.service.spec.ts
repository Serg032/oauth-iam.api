/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelIGuestRepository, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelDeleteGuestsService } from '@app/hotel/guest/application/delete/hotel-delete-guests.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelDeleteGuestsService', () =>
{
    let service: HotelDeleteGuestsService;
    let repository: HotelIGuestRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                HotelDeleteGuestsService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelDeleteGuestsService);
        repository = module.get(HotelIGuestRepository);
    });

    describe('main', () =>
    {
        test('HotelDeleteGuestsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete guest and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
