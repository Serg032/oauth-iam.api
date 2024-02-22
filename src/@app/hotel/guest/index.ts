// export commands
export { HotelCreateGuestCommand } from './application/create/hotel-create-guest.command';
export { HotelCreateGuestsCommand } from './application/create/hotel-create-guests.command';
export { HotelUpdateGuestByIdCommand } from './application/update/hotel-update-guest-by-id.command';
export { HotelUpdateGuestsCommand } from './application/update/hotel-update-guests.command';
export { HotelUpdateAndIncrementGuestsCommand } from './application/update/hotel-update-and-increment-guests.command';
export { HotelUpsertGuestCommand } from './application/upsert/hotel-upsert-guest.command';
export { HotelDeleteGuestByIdCommand } from './application/delete/hotel-delete-guest-by-id.command';
export { HotelDeleteGuestsCommand } from './application/delete/hotel-delete-guests.command';

// export queries
export { HotelPaginateGuestsQuery } from './application/paginate/hotel-paginate-guests.query';
export { HotelGetGuestsQuery } from './application/get/hotel-get-guests.query';
export { HotelFindGuestQuery } from './application/find/hotel-find-guest.query';
export { HotelFindGuestByIdQuery } from './application/find/hotel-find-guest-by-id.query';
export { HotelRawSQLGuestsQuery } from './application/raw-sql/hotel-raw-sql-guests.query';

// export mocks
export { hotelMockGuestData } from './infrastructure/mock/hotel-mock-guest.data';
export { HotelMockGuestSeeder } from './infrastructure/mock/hotel-mock-guest.seeder';
export { HotelMockGuestRepository } from './infrastructure/mock/hotel-mock-guest.repository';

// export events
export { HotelAddGuestsContextEvent } from './application/events/hotel-add-guests-context.event';
export { HotelCreatedGuestsEvent } from './application/events/hotel-created-guests.event';
export { HotelCreatedGuestEvent } from './application/events/hotel-created-guest.event';
export { HotelDeletedGuestsEvent } from './application/events/hotel-deleted-guests.event';
export { HotelDeletedGuestEvent } from './application/events/hotel-deleted-guest.event';
export { HotelUpdatedGuestsEvent } from './application/events/hotel-updated-guests.event';
export { HotelUpdatedGuestEvent } from './application/events/hotel-updated-guest.event';
export { HotelUpdatedAndIncrementedGuestsEvent } from './application/events/hotel-updated-and-incremented-guests.event';
export { HotelUpdatedAndIncrementedGuestEvent } from './application/events/hotel-updated-and-incremented-guest.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { HotelGuest } from './domain/hotel-guest.aggregate';
export { HotelGuestMapper } from './domain/hotel-guest.mapper';
export { HotelIGuestRepository } from './domain/hotel-guest.repository';
export { HotelGuestResponse } from './domain/hotel-guest.response';

// infrastructure
export { HotelGuestModel } from './infrastructure/sequelize/hotel-sequelize-guest.model';
export { HotelSequelizeGuestRepository } from './infrastructure/sequelize/hotel-sequelize-guest.repository';

// sagas
export { HotelGuestSagas } from './application/sagas/hotel-guest.sagas';

// command handlers
import { HotelCreateGuestCommandHandler } from './application/create/hotel-create-guest.command-handler';
import { HotelCreateGuestsCommandHandler } from './application/create/hotel-create-guests.command-handler';
import { HotelUpdateGuestByIdCommandHandler } from './application/update/hotel-update-guest-by-id.command-handler';
import { HotelUpdateGuestsCommandHandler } from './application/update/hotel-update-guests.command-handler';
import { HotelUpdateAndIncrementGuestsCommandHandler } from './application/update/hotel-update-and-increment-guests.command-handler';
import { HotelUpsertGuestCommandHandler } from './application/upsert/hotel-upsert-guest.command-handler';
import { HotelDeleteGuestByIdCommandHandler } from './application/delete/hotel-delete-guest-by-id.command-handler';
import { HotelDeleteGuestsCommandHandler } from './application/delete/hotel-delete-guests.command-handler';

// query handlers
import { HotelPaginateGuestsQueryHandler } from './application/paginate/hotel-paginate-guests.query-handler';
import { HotelGetGuestsQueryHandler } from './application/get/hotel-get-guests.query-handler';
import { HotelFindGuestQueryHandler } from './application/find/hotel-find-guest.query-handler';
import { HotelFindGuestByIdQueryHandler } from './application/find/hotel-find-guest-by-id.query-handler';
import { HotelRawSQLGuestsQueryHandler } from './application/raw-sql/hotel-raw-sql-guests.query-handler';

// event handlers
import { HotelCreatedGuestEventHandler } from './application/events/hotel-created-guest.event-handler';
import { HotelCreatedGuestsEventHandler } from './application/events/hotel-created-guests.event-handler';
import { HotelUpdatedGuestEventHandler } from './application/events/hotel-updated-guest.event-handler';
import { HotelUpdatedGuestsEventHandler } from './application/events/hotel-updated-guests.event-handler';
import { HotelUpdatedAndIncrementedGuestsEventHandler } from './application/events/hotel-updated-and-incremented-guests.event-handler';
import { HotelDeletedGuestEventHandler } from './application/events/hotel-deleted-guest.event-handler';
import { HotelDeletedGuestsEventHandler } from './application/events/hotel-deleted-guests.event-handler';

// services
import { HotelCreateGuestService } from './application/create/hotel-create-guest.service';
import { HotelCreateGuestsService } from './application/create/hotel-create-guests.service';
import { HotelPaginateGuestsService } from './application/paginate/hotel-paginate-guests.service';
import { HotelGetGuestsService } from './application/get/hotel-get-guests.service';
import { HotelFindGuestService } from './application/find/hotel-find-guest.service';
import { HotelFindGuestByIdService } from './application/find/hotel-find-guest-by-id.service';
import { HotelRawSQLGuestsService } from './application/raw-sql/hotel-raw-sql-guests.service';
import { HotelUpdateGuestByIdService } from './application/update/hotel-update-guest-by-id.service';
import { HotelUpdateGuestsService } from './application/update/hotel-update-guests.service';
import { HotelUpdateAndIncrementGuestsService } from './application/update/hotel-update-and-increment-guests.service';
import { HotelUpsertGuestService } from './application/upsert/hotel-upsert-guest.service';
import { HotelDeleteGuestByIdService } from './application/delete/hotel-delete-guest-by-id.service';
import { HotelDeleteGuestsService } from './application/delete/hotel-delete-guests.service';

export const HotelGuestHandlers = [
    // commands
    HotelCreateGuestCommandHandler,
    HotelCreateGuestsCommandHandler,
    HotelUpdateGuestByIdCommandHandler,
    HotelUpdateGuestsCommandHandler,
    HotelUpdateAndIncrementGuestsCommandHandler,
    HotelUpsertGuestCommandHandler,
    HotelDeleteGuestByIdCommandHandler,
    HotelDeleteGuestsCommandHandler,

    // queries
    HotelPaginateGuestsQueryHandler,
    HotelGetGuestsQueryHandler,
    HotelFindGuestQueryHandler,
    HotelFindGuestByIdQueryHandler,
    HotelRawSQLGuestsQueryHandler,

    // events
    HotelCreatedGuestEventHandler,
    HotelCreatedGuestsEventHandler,
    HotelUpdatedGuestEventHandler,
    HotelUpdatedGuestsEventHandler,
    HotelUpdatedAndIncrementedGuestsEventHandler,
    HotelDeletedGuestEventHandler,
    HotelDeletedGuestsEventHandler,
];

export const HotelGuestServices = [
    HotelCreateGuestService,
    HotelCreateGuestsService,
    HotelPaginateGuestsService,
    HotelGetGuestsService,
    HotelFindGuestService,
    HotelFindGuestByIdService,
    HotelRawSQLGuestsService,
    HotelUpdateGuestByIdService,
    HotelUpdateGuestsService,
    HotelUpdateAndIncrementGuestsService,
    HotelUpsertGuestService,
    HotelDeleteGuestByIdService,
    HotelDeleteGuestsService,
];