import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HotelGuestId extends UuidValueObject
{
    public readonly type: string = 'HotelGuestId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HotelGuestId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}