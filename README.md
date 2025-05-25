# Node JS  - API Setup - JavaScript MySQL

### 1. Node JS with JWT token
### 2. Mysql with sequelize
### 3. UAT and Prod setUp
### 4. Log Capture - winston
### 5. SignUp and Login API
### 6. CURD API
### 7. Encryption and Decryption
### 8. Version for API
### 9. Pagination and Search API
### 10. Upload File and Download File

### Postman Collection -> Project Directory -> Node-Sample.postman_collection.json

# Steps to create Node.js application - JavaScript

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



