/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelIGuestRepository, hotelMockGuestData, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelUpsertGuestService } from '@app/hotel/guest/application/upsert/hotel-upsert-guest.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpsertGuestService', () =>

{
    let service: HotelUpsertGuestService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                HotelUpsertGuestService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelUpsertGuestService);
    });

    describe('main', () =>
    {
        test('HotelUpsertGuestService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a guest and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new HotelGuestId(hotelMockGuestData[0].id),
                        name: new HotelGuestName(hotelMockGuestData[0].name),
                        lastname: new HotelGuestLastname(hotelMockGuestData[0].lastname),
                        code: new HotelGuestCode(hotelMockGuestData[0].code),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
