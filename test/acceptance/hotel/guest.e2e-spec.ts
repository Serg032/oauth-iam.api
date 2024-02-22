/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { HotelModule } from '@api/hotel/hotel.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { HotelIGuestRepository, hotelMockGuestData, HotelMockGuestSeeder } from '@app/hotel/guest';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('guest', () =>
{
    let app: INestApplication;
    let guestRepository: HotelIGuestRepository;
    let guestSeeder: HotelMockGuestSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                HotelModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                HotelMockGuestSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = hotelMockGuestData;
        app = module.createNestApplication();
        guestRepository = module.get<HotelIGuestRepository>(HotelIGuestRepository);
        guestSeeder = module.get<HotelMockGuestSeeder>(HotelMockGuestSeeder);

        // seed mock data in memory database
        await guestRepository.insert(guestSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestId must be defined, can not be null');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestName must be defined, can not be null');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestLastname property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                lastname: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestLastname must be defined, can not be null');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestCode property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestCode must be defined, can not be null');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestId must be defined, can not be undefined');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestName must be defined, can not be undefined');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestLastname property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                lastname: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestLastname must be defined, can not be undefined');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestCode property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestCode must be defined, can not be undefined');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestName is too large, has a maximum length of 63', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestName is too large, has a maximum length of 63');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestLastname is too large, has a maximum length of 63', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                lastname: '****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestLastname is too large, has a maximum length of 63');
            });
    });

    test('/REST:POST hotel/guest/create - Got 400 Conflict, GuestCode is too large, has a maximum length of 127', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HotelGuestCode is too large, has a maximum length of 127');
            });
    });


    test('/REST:POST hotel/guest/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST hotel/guests/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guests/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: guestSeeder.collectionResponse.length,
                    count: guestSeeder.collectionResponse.length,
                    rows : guestSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST hotel/guests/get', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guests/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    guestSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST hotel/guest/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'aea1c0b3-61c7-5213-aac6-ef9f6c28889f',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST hotel/guest/create', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST hotel/guest/find', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:POST hotel/guest/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/find/c48cda4c-a494-5281-a2cc-ac5da3590358')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST hotel/guest/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/hotel/guest/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT hotel/guest/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/hotel/guest/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5297b32d-3cf6-5ab6-b89b-2de82b2e9994',
            })
            .expect(404);
    });

    test('/REST:PUT hotel/guest/update', () =>
    {
        return request(app.getHttpServer())
            .put('/hotel/guest/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE hotel/guest/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/hotel/guest/delete/956ff746-97d2-5266-82e5-5c1b51eab510')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE hotel/guest/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/hotel/guest/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL hotelCreateGuest - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:HotelCreateGuestInput!)
                    {
                        hotelCreateGuest (payload:$payload)
                        {
                            id
                            name
                            lastname
                            code
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.originalError.message).toContain('already exist in database');
            });
    });

    test('/GraphQL hotelPaginateGuests', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        hotelPaginateGuests (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.hotelPaginateGuests).toEqual({
                    total: guestSeeder.collectionResponse.length,
                    count: guestSeeder.collectionResponse.length,
                    rows : guestSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL hotelGetGuests', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        hotelGetGuests (query:$query)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.hotelGetGuests.entries())
                {
                    expect(guestSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL hotelCreateGuest', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:HotelCreateGuestInput!)
                    {
                        hotelCreateGuest (payload:$payload)
                        {
                            id
                            name
                            lastname
                            code
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.hotelCreateGuest).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL hotelFindGuest - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        hotelFindGuest (query:$query)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'a0d9d9b9-33bd-5e22-88f4-6bc46be04536',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL hotelFindGuest', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        hotelFindGuest (query:$query)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.hotelFindGuest.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL hotelFindGuestById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        hotelFindGuestById (id:$id)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3bf14035-305b-5753-96c8-62f3d356642a',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL hotelFindGuestById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        hotelFindGuestById (id:$id)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.hotelFindGuestById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL hotelUpdateGuestById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:HotelUpdateGuestByIdInput!)
                    {
                        hotelUpdateGuestById (payload:$payload)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'f5134111-9e6f-5aac-bdc9-f201769619cc',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL hotelUpdateGuestById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:HotelUpdateGuestByIdInput!)
                    {
                        hotelUpdateGuestById (payload:$payload)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.hotelUpdateGuestById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL hotelUpdateGuests', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:HotelUpdateGuestsInput! $query: QueryStatement)
                    {
                        hotelUpdateGuests (payload:$payload query:$query)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                    query: {
                        where: {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.hotelUpdateGuests[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL hotelDeleteGuestById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        hotelDeleteGuestById (id:$id)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a9dadc78-344e-59a3-8f89-27ecce361442',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL hotelDeleteGuestById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        hotelDeleteGuestById (id:$id)
                        {
                            id
                            name
                            lastname
                            code
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.hotelDeleteGuestById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await guestRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
