import { HotelGuestHandlers, HotelGuestServices, HotelGuestModel, HotelIGuestRepository, HotelSequelizeGuestRepository, HotelGuestSagas } from './guest';

export const HotelHandlers = [
    ...HotelGuestHandlers
];
export const HotelServices = [
    ...HotelGuestServices
];
export const HotelModels = [
    HotelGuestModel
];
export const HotelRepositories = [
    {
        provide : HotelIGuestRepository,
        useClass: HotelSequelizeGuestRepository
    }
];
export const HotelSagas = [
    HotelGuestSagas
];
