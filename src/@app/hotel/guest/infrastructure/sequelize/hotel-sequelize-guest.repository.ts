import { HotelGuest, HotelGuestMapper, HotelGuestModel, HotelIGuestRepository } from '@app/hotel/guest';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class HotelSequelizeGuestRepository extends SequelizeRepository<HotelGuest, HotelGuestModel> implements HotelIGuestRepository
{
    public readonly aggregateName: string = 'HotelGuest';
    public readonly mapper: HotelGuestMapper = new HotelGuestMapper();

    constructor(
        @InjectModel(HotelGuestModel)
        public readonly repository: typeof HotelGuestModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
