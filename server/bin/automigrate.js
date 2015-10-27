var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var accounts = [
  {
    email: 'foo@bar.com',
    createdAt: new Date(),
    lastModifiedAt: new Date()
  },
  {
    email: 'baz@qux.com',
    createdAt: new Date(),
    lastModifiedAt: new Date()
  }
];
var dataSource = app.dataSources.kpDs;



dataSource.automigrate('user', function(err) {
  if (err) throw err;

  console.log('User model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('accessToken', function(err) {
  if (err) throw err;

  console.log('AccessToken model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('ACL', function(err) {
  if (err) throw err;

  console.log('ACL model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('RoleMapping', function(err) {
  if (err) throw err;

  console.log('RoleMapping model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('userCredential', function(err) {
  if (err) throw err;

  console.log('userCredential model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('userIdentity', function(err) {
  if (err) throw err;

  console.log('userIdentity model migrated');
  //dataSource.disconnect();
});

dataSource.automigrate('Role', function(err) {
  if (err) throw err;

  console.log('Role model migrated');
  //dataSource.disconnect();
});

dataSource.automigrate('AppModel', function(err) {
  if (err) throw err;

  console.log('AppModel model migrated');
  //dataSource.disconnect();
});

dataSource.automigrate('Category', function(err) {
  if (err) throw err;

  console.log('Category model migrated');
  //dataSource.disconnect();
});



dataSource.automigrate('ProductOrder', function(err) {
    if (err) throw err;

    console.log('Productorder model migrated');
    //dataSource.disconnect();
});

dataSource.automigrate('Supplier', function(err) {
    if (err) throw err;

    console.log('Supplier model migrated');
    //dataSource.disconnect();
});

dataSource.automigrate('Setting', function(err) {
  if (err) throw err;

  console.log('Setting model migrated');
  //dataSource.disconnect();
});

dataSource.automigrate('Order', function(err) {
    if (err) throw err;

    console.log('Order model migrated');
    //dataSource.disconnect();
});
dataSource.automigrate('Product', function(err) {
    if (err) throw err;

    console.log('Product model migrated');
    //dataSource.disconnect();
});

dataSource.automigrate('AuthProvider', function(err) {
  if (err) throw err;

  console.log('AuthProvider model migrated');
  dataSource.disconnect();
});

