import { TABLE_NAME } from '../config/constants.js';

export default (sequelize, { Model, DataTypes }) => {
    class Session extends Model {
        static associate(db) {
            // Each session belongs to one user
            Session.belongsTo(db.user, {
                foreignKey: 'userId',
                as: 'user',
            });
        }
    }

    Session.init(
        {
            jid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            postKey: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            postIv: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'Session',
            tableName: TABLE_NAME.SESSION,
            freezeTableName: true,
            timestamps: true,
            indexes: [{ unique: true, fields: ['jid'] }]
        }
    );

    return Session;
};