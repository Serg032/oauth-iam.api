// export DTOs
export { HotelGuestDto } from './dto/hotel-guest.dto';
export { HotelCreateGuestDto } from './dto/hotel-create-guest.dto';
export { HotelUpdateGuestByIdDto } from './dto/hotel-update-guest-by-id.dto';
export { HotelUpdateGuestsDto } from './dto/hotel-update-guests.dto';

// export handlers
export { HotelCreateGuestHandler } from './handlers/hotel-create-guest.handler';
export { HotelCreateGuestsHandler } from './handlers/hotel-create-guests.handler';
export { HotelPaginateGuestsHandler } from './handlers/hotel-paginate-guests.handler';
export { HotelGetGuestsHandler } from './handlers/hotel-get-guests.handler';
export { HotelFindGuestByIdHandler } from './handlers/hotel-find-guest-by-id.handler';
export { HotelFindGuestHandler } from './handlers/hotel-find-guest.handler';
export { HotelUpdateGuestByIdHandler } from './handlers/hotel-update-guest-by-id.handler';
export { HotelUpdateGuestsHandler } from './handlers/hotel-update-guests.handler';
export { HotelUpsertGuestHandler } from './handlers/hotel-upsert-guest.handler';
export { HotelDeleteGuestByIdHandler } from './handlers/hotel-delete-guest-by-id.handler';
export { HotelDeleteGuestsHandler } from './handlers/hotel-delete-guests.handler';

// export controllers
export { HotelCreateGuestController } from './controllers/hotel-create-guest.controller';
export { HotelCreateGuestsController } from './controllers/hotel-create-guests.controller';
export { HotelPaginateGuestsController } from './controllers/hotel-paginate-guests.controller';
export { HotelGetGuestsController } from './controllers/hotel-get-guests.controller';
export { HotelFindGuestByIdController } from './controllers/hotel-find-guest-by-id.controller';
export { HotelFindGuestController } from './controllers/hotel-find-guest.controller';
export { HotelUpdateGuestByIdController } from './controllers/hotel-update-guest-by-id.controller';
export { HotelUpdateGuestsController } from './controllers/hotel-update-guests.controller';
export { HotelUpsertGuestController } from './controllers/hotel-upsert-guest.controller';
export { HotelDeleteGuestByIdController } from './controllers/hotel-delete-guest-by-id.controller';
export { HotelDeleteGuestsController } from './controllers/hotel-delete-guests.controller';

// export resolvers
export { HotelCreateGuestResolver } from './resolvers/hotel-create-guest.resolver';
export { HotelCreateGuestsResolver } from './resolvers/hotel-create-guests.resolver';
export { HotelPaginateGuestsResolver } from './resolvers/hotel-paginate-guests.resolver';
export { HotelGetGuestsResolver } from './resolvers/hotel-get-guests.resolver';
export { HotelFindGuestByIdResolver } from './resolvers/hotel-find-guest-by-id.resolver';
export { HotelFindGuestResolver } from './resolvers/hotel-find-guest.resolver';
export { HotelUpdateGuestByIdResolver } from './resolvers/hotel-update-guest-by-id.resolver';
export { HotelUpdateGuestsResolver } from './resolvers/hotel-update-guests.resolver';
export { HotelUpsertGuestResolver } from './resolvers/hotel-upsert-guest.resolver';
export { HotelDeleteGuestByIdResolver } from './resolvers/hotel-delete-guest-by-id.resolver';
export { HotelDeleteGuestsResolver } from './resolvers/hotel-delete-guests.resolver';

// import controllers
import { HotelCreateGuestController } from './controllers/hotel-create-guest.controller';
import { HotelCreateGuestsController } from './controllers/hotel-create-guests.controller';
import { HotelPaginateGuestsController } from './controllers/hotel-paginate-guests.controller';
import { HotelGetGuestsController } from './controllers/hotel-get-guests.controller';
import { HotelFindGuestByIdController } from './controllers/hotel-find-guest-by-id.controller';
import { HotelFindGuestController } from './controllers/hotel-find-guest.controller';
import { HotelUpdateGuestByIdController } from './controllers/hotel-update-guest-by-id.controller';
import { HotelUpdateGuestsController } from './controllers/hotel-update-guests.controller';
import { HotelUpsertGuestController } from './controllers/hotel-upsert-guest.controller';
import { HotelDeleteGuestByIdController } from './controllers/hotel-delete-guest-by-id.controller';
import { HotelDeleteGuestsController } from './controllers/hotel-delete-guests.controller';

// import resolvers
import { HotelCreateGuestResolver } from './resolvers/hotel-create-guest.resolver';
import { HotelCreateGuestsResolver } from './resolvers/hotel-create-guests.resolver';
import { HotelPaginateGuestsResolver } from './resolvers/hotel-paginate-guests.resolver';
import { HotelGetGuestsResolver } from './resolvers/hotel-get-guests.resolver';
import { HotelFindGuestByIdResolver } from './resolvers/hotel-find-guest-by-id.resolver';
import { HotelFindGuestResolver } from './resolvers/hotel-find-guest.resolver';
import { HotelUpdateGuestByIdResolver } from './resolvers/hotel-update-guest-by-id.resolver';
import { HotelUpdateGuestsResolver } from './resolvers/hotel-update-guests.resolver';
import { HotelUpsertGuestResolver } from './resolvers/hotel-upsert-guest.resolver';
import { HotelDeleteGuestByIdResolver } from './resolvers/hotel-delete-guest-by-id.resolver';
import { HotelDeleteGuestsResolver } from './resolvers/hotel-delete-guests.resolver';

// import handlers
import { HotelCreateGuestHandler } from './handlers/hotel-create-guest.handler';
import { HotelCreateGuestsHandler } from './handlers/hotel-create-guests.handler';
import { HotelPaginateGuestsHandler } from './handlers/hotel-paginate-guests.handler';
import { HotelGetGuestsHandler } from './handlers/hotel-get-guests.handler';
import { HotelFindGuestByIdHandler } from './handlers/hotel-find-guest-by-id.handler';
import { HotelFindGuestHandler } from './handlers/hotel-find-guest.handler';
import { HotelUpdateGuestByIdHandler } from './handlers/hotel-update-guest-by-id.handler';
import { HotelUpdateGuestsHandler } from './handlers/hotel-update-guests.handler';
import { HotelUpsertGuestHandler } from './handlers/hotel-upsert-guest.handler';
import { HotelDeleteGuestByIdHandler } from './handlers/hotel-delete-guest-by-id.handler';
import { HotelDeleteGuestsHandler } from './handlers/hotel-delete-guests.handler';

// import seeder
import { HotelGuestSeeder } from './seeder/hotel-guest.seeder';

export const HotelGuestApiControllers = [
    HotelCreateGuestController,
    HotelCreateGuestsController,
    HotelPaginateGuestsController,
    HotelGetGuestsController,
    HotelFindGuestByIdController,
    HotelFindGuestController,
    HotelUpdateGuestByIdController,
    HotelUpdateGuestsController,
    HotelUpsertGuestController,
    HotelDeleteGuestByIdController,
    HotelDeleteGuestsController,
];

export const HotelGuestApiResolvers = [
    HotelCreateGuestResolver,
    HotelCreateGuestsResolver,
    HotelPaginateGuestsResolver,
    HotelGetGuestsResolver,
    HotelFindGuestByIdResolver,
    HotelFindGuestResolver,
    HotelUpdateGuestByIdResolver,
    HotelUpdateGuestsResolver,
    HotelUpsertGuestResolver,
    HotelDeleteGuestByIdResolver,
    HotelDeleteGuestsResolver,
];

export const HotelGuestApiHandlers = [
    HotelCreateGuestHandler,
    HotelCreateGuestsHandler,
    HotelPaginateGuestsHandler,
    HotelGetGuestsHandler,
    HotelFindGuestByIdHandler,
    HotelFindGuestHandler,
    HotelUpdateGuestByIdHandler,
    HotelUpdateGuestsHandler,
    HotelUpsertGuestHandler,
    HotelDeleteGuestByIdHandler,
    HotelDeleteGuestsHandler,
];

export const HotelGuestApiServices = [
    HotelGuestSeeder,
];
