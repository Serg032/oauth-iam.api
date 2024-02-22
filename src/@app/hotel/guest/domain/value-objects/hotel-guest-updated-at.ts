import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HotelGuestUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'HotelGuestUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HotelGuestUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}