import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HotelGuestName extends StringValueObject
{
    public readonly type: string = 'HotelGuestName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HotelGuestName',
            nullable   : false,
            undefinable: false,
            maxLength  : 63,
        }, validationRules));
    }
}