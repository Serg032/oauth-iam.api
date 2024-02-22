import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HotelGuestDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'HotelGuestDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HotelGuestDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}