import dotenv from 'dotenv';
import Sequelize from "sequelize";
import userModel from "./user.model.js";
import roleModel from "./role.model.js";
import sessionModel from "./session.model.js";
import * as path from "node:path";
import {BUILD_TYPE} from '../config/constants.js';

const env = process.env.NODE_ENV || BUILD_TYPE.UAT; // expected is 'uat' or 'prod'
const envPath = path.resolve(`.env.${env}`);
dotenv.config({ path: envPath });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: parseInt(process.env.DB_POOL_MAX, 10),
        min: parseInt(process.env.DB_POOL_MIN, 10),
        acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10),
        idle: parseInt(process.env.DB_POOL_IDLE, 10),
    },
    port: parseInt(process.env.DB_PORT, 10),
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);
db.session = sessionModel(sequelize, Sequelize);

// Set up associations after all models are initialized
Object.values(db).forEach((model) => {
    if (model.associate) {
        model.associate(db);
    }
});


export default db;