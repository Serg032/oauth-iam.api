import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { HotelSeeder } from './hotel.seeder';
import { HotelModels, HotelHandlers, HotelServices, HotelRepositories, HotelSagas } from '../../@app/hotel';
import { HotelGuestApiControllers, HotelGuestApiResolvers, HotelGuestApiHandlers, HotelGuestApiServices } from './guest';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...HotelModels
            ])
    ],
    controllers: [
        ...HotelGuestApiControllers
    ],
    providers: [
        HotelSeeder,
        ...HotelHandlers,
        ...HotelServices,
        ...HotelRepositories,
        ...HotelSagas,
        ...HotelGuestApiResolvers,
        ...HotelGuestApiHandlers,
        ...HotelGuestApiServices
    ],
})
export class HotelModule {}
