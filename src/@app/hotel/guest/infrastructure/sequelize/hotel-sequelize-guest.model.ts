/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'HotelGuest',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['code'],
			unique: true,
		},

    ],
})
export class HotelGuestModel extends Model<HotelGuestModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(63),
    })
    name: string;

    @Column({
        field: 'lastname',
        allowNull: false,
        type: DataTypes.STRING(63),
    })
    lastname: string;

    @Column({
        field: 'code',
        allowNull: false,
        type: DataTypes.STRING(127),
    })
    code: string;

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}
