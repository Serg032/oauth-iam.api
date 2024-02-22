import { OAuthApplicationClient, OAuthIApplicationClientRepository } from '@app/o-auth/application-client';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpsertApplicationClientService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIApplicationClientRepository,
    ) {}

    async main(
        payload: {
            applicationId: OAuthApplicationClientApplicationId;
            clientId: OAuthApplicationClientClientId;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const applicationClient = OAuthApplicationClient.register(
            payload.applicationId,
            payload.clientId,
        );

        await this.repository
            .upsert(
                applicationClient,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationClientRegister = this.publisher.mergeObjectContext(
            applicationClient,
        );

        applicationClientRegister.created(applicationClient); // apply event to model events
        applicationClientRegister.commit(); // commit all events of model
    }
}
