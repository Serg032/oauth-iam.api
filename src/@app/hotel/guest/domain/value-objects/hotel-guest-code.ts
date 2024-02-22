import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HotelGuestCode extends StringValueObject
{
    public readonly type: string = 'HotelGuestCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HotelGuestCode',
            nullable   : false,
            undefinable: false,
            maxLength  : 127,
        }, validationRules));
    }
}