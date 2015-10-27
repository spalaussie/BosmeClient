#loopback-example-mysql

Basic instructions:

```
$ git clone https://github.com/strongloop/loopback-example-mysql.git
$ cd loopback-example-mysql
$ npm install
```

Then run any script in `server/bin` (for example, `node server/bin/discover-schema.js`).

##Prerequisites

###Tutorials

- [Getting started with LoopBack](http://docs.strongloop.com/display/LB/Getting+started+with+LoopBack)

###Knowledge
- [LoopBack models](http://docs.strongloop.com/display/LB/Defining+models)

##Procedure

###Create the application

####Application information

- Name: `loopback-example-mysql`
- Directory to contain the project: `loopback-example-mysql`

```
$ slc loopback loopback-example-mysql
... # follow the prompts
$ cd loopback-example-mysql
```

###Install the connector

```
$ npm install --save loopback-connector-mysql
```

###Configure the datasource

####Datasource information
- Datasource: `accountDs`
- Connector: `MySQL`

```
$ slc loopback:datasource accountDs
... # follow the prompts
```

Add the [datasource configurations](/server/datasources.json#L9-L13) to
[`server/datasources.json`](/server/datasources.json).

> We provide a demo server for convenience sake, but feel free to use your own database server.

###Add a model

####Model information
- Name: `Account`
  - Datasource: `accountDs`
  - Base class: `PersistedModel`
  - Expose via REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties
    - `email`
      - String
      - Not required
    - `createdAt`
      - Date
      - Not required
    - `lastModifiedAt`
      - Date
      - Not required

```
$ slc loopback:model Account
... # follow the prompts
```

###Add a script to migrate data

Create a directory for to store scripts.

```
$ mkdir server/bin
```

Create [`automigrate.js`](/server/bin/automigrate.js) inside the
[`bin`](/server/bin) directory.

> [`datasSource.automigrate()`](/server/bin/automigrate.js) requires INSERT object, CREATE DDL, and DROP DDL rights to execute properly.

####Test the script

> #####WARNING
> [`dataSource.automigrate()`](/server/bin/automigrate.js#L18) creates a new table in the database if it doesn't exist. If the table already exists, it is **destroyed** and **all** existing data is dropped. If you want to keep the existing data, use `datasource.autoupdate()` instead.

```
$ node server/bin/automigrate.js
```

This script creates [two models](/server/bin/automigrate.js#L5-L14) in the
[specified data source](/server/bin/automigrate.js#L16).

> You can view the newly inserted data using built-in [API explorer](http://docs.strongloop.com/display/LB/Use+API+Explorer). Start the application with `slc run` and browse to [`localhost:3000/explorer`][explorer] to inspect the data.

###Add a script to discover a schema

> *Discovery* is the process of reverse engineering a LoopBack model from an existing database schema.

Create [`discover-schema.js`](/server/bin/discover-schema.js) inside the
[`bin` directory](/server/bin).

####Test the script

```
$ node server/bin/discover-schema.js
```

You should see:

```
{
  "name": "Account",
  "options": {
    "idInjection": false,
    "mysql": {
      "schema": "loopback-example-mysql",
      "table": "Account"
    }
  },
  "properties": {
    "id": {
      "type": "Number",
      "required": true,
      "length": null,
      "precision": 10,
      "scale": 0,
      "id": 1,
      "mysql": {
        "columnName": "id",
        "dataType": "int",
        "dataLength": null,
        "dataPrecision": 10,
        "dataScale": 0,
        "nullable": "N"
      }
    },
    "email": {
      "type": "String",
      "required": false,
      "length": 1536,
      "precision": null,
      "scale": null,
      "mysql": {
        "columnName": "email",
        "dataType": "varchar",
        "dataLength": 1536,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "Y"
      }
    },
    "createdat": {
      "type": "Date",
      "required": false,
      "length": null,
      "precision": null,
      "scale": null,
      "mysql": {
        "columnName": "createdAt",
        "dataType": "datetime",
        "dataLength": null,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "Y"
      }
    },
    "lastmodifiedat": {
      "type": "Date",
      "required": false,
      "length": null,
      "precision": null,
      "scale": null,
      "mysql": {
        "columnName": "lastModifiedAt",
        "dataType": "datetime",
        "dataLength": null,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "Y"
      }
    }
  }
}
```

###Add a script to discover and build models

Create [`discover-and-build.js`](/server/bin/discover-and-build.js) in the
[`bin` directory](/server/bin).

####Test the script

```
$ node server/bin/discover-and-build.js
```

You should see:

```
[ { id: 1,
    email: 'foo@bar.com',
    createdat: Tue Jan 06 2015 14:09:16 GMT-0800 (PST),
    lastmodifiedat: Tue Jan 06 2015 14:09:16 GMT-0800 (PST) },
  { id: 2,
    email: 'baz@qux.com',
    createdat: Tue Jan 06 2015 14:09:16 GMT-0800 (PST),
    lastmodifiedat: Tue Jan 06 2015 14:09:16 GMT-0800 (PST) } ]
```

> Your `createdat` and `lastmodifiedat` dates will be different.

The resulting objects are fully functional
[LoopBack models](/server/bin/discover-and-build.js#L7) and thus contain all the
features provided by LoopBack such as
[`find()`](/server/bin/discover-and-build.js#L10), and so on.

---

- [Next tutorial][next-tutorial]
- [All tutorials][all-tutorials]

[all-tutorials]: https://github.com/strongloop/loopback-example
[explorer]: http://localhost:3000/explorer
[localhost]: http://localhost:3000
[next-tutorial]: https://github.com/strongloop/loopback-example-model-relations
