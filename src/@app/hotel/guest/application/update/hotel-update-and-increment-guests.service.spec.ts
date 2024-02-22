/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelIGuestRepository, hotelMockGuestData, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelUpdateAndIncrementGuestsService } from '@app/hotel/guest/application/update/hotel-update-and-increment-guests.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateAndIncrementGuestsService', () =>
{
    let service: HotelUpdateAndIncrementGuestsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                HotelUpdateAndIncrementGuestsService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelUpdateAndIncrementGuestsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementGuestsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a guests and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        id: new HotelGuestId(hotelMockGuestData[0].id),
                        name: new HotelGuestName(hotelMockGuestData[0].name),
                        lastname: new HotelGuestLastname(hotelMockGuestData[0].lastname),
                        code: new HotelGuestCode(hotelMockGuestData[0].code),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
