# Node JS  - API Setup - JavaScript

### Node JS with JWT token
### Mysql with sequelize
### UAT and Prod setUp
### Log Capture - winston
### SignUp and Login API
### CURD API
### Encryption and Decryption
### Version for API
### Pagination and Search API
### Upload File and Download File



node-js-jwt-auth/
├── app/
│   ├── config/
│   │   └── db.config.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── authJwt.js
│   │   └── verifySignUp.js
│   ├── models/
│   │   ├── index.js
│   │   ├── role.model.js
│   │   └── user.model.js
│   └── routes/v1
│       ├── auth.routes.js
│       └── user.routes.js
├── package.json
└── server.js

1. Create a new directory and initialize the Node.js application:

mkdir node-js-jwt-auth
cd node-js-jwt-auth
npm init -y

2. Install the necessary packages:

npm install express sequelize mysql2 cors jsonwebtoken bcryptjs

3. Ensure your package.json includes the following script:

"scripts": {
  "start": "node server.js"
}

4. Update package.json for ESModules
{
  ...
  "type": "module",
  ...
}
5. sequelize example
```sh
const amount = await Project.count({
  where: {
    id: {
      [Op.gt]: 25,
    },
  },
});

await User.update(
  { lastName: 'Doe' },
  {
    where: {
      lastName: null,
    },
  },
);
  
Foo.findAll({
  where: {
    rank: {
      [Op.or]: {
        [Op.lt]: 1000,
        [Op.eq]: null
      }
    },
    // rank < 1000 OR rank IS NULL

    {
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    },
    // createdAt < [timestamp] AND createdAt > [timestamp]

    {
      [Op.or]: [
        {
          title: {
            [Op.like]: 'Boat%'
          }
        },
        {
          description: {
            [Op.like]: '%boat%'
          }
        }
      ]
    }
    // title LIKE 'Boat%' OR description LIKE '%boat%'
  }
});
 
 
 flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

myDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },


class User extends Model {
  static classLevelMethod() {
    return 'foo';
  }
  instanceLevelMethod() {
    return 'bar';
  }
  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  }
}
```



