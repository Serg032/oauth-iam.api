import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ClientExpiredRefreshToken extends IntValueObject
{
    public readonly type: string = 'ClientExpiredRefreshToken';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientExpiredRefreshToken',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}