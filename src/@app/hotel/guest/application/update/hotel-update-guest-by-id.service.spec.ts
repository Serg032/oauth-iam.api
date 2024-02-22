/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotelIGuestRepository, hotelMockGuestData, HotelMockGuestRepository } from '@app/hotel/guest';
import { HotelUpdateGuestByIdService } from '@app/hotel/guest/application/update/hotel-update-guest-by-id.service';
import {
    HotelGuestCode,
    HotelGuestId,
    HotelGuestLastname,
    HotelGuestName,
} from '@app/hotel/guest/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('HotelUpdateGuestByIdService', () =>
{
    let service: HotelUpdateGuestByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                HotelUpdateGuestByIdService,
                HotelMockGuestRepository,
                {
                    provide : HotelIGuestRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(HotelUpdateGuestByIdService);
    });

    describe('main', () =>
    {
        test('HotelUpdateGuestByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a guest and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new HotelGuestId(hotelMockGuestData[0].id),
                        name: new HotelGuestName(hotelMockGuestData[0].name),
                        lastname: new HotelGuestLastname(hotelMockGuestData[0].lastname),
                        code: new HotelGuestCode(hotelMockGuestData[0].code),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
