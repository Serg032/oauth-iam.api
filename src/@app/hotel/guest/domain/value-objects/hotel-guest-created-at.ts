import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HotelGuestCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'HotelGuestCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HotelGuestCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}