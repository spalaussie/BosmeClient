/*
*
 */
//Converter Class
var fs = require("fs");
var Promise = require('bluebird');
var app = require('../../server/server');
module.exports = function(UploadCSV) {
  var message = '';

   UploadCSV.logmsg=function(msg,cb) {
    console.log(msg);
  };

  var Category =undefined;
  var Supplier=undefined;
  var Product=undefined;

  var userId=undefined;
  var categories=undefined , suppliers=undefined ;

  UploadCSV.convertToJSON=function(UserId) {
    Category = UploadCSV.app.models.Category;
    Supplier = UploadCSV.app.models.Supplier;
    Product = UploadCSV.app.models.Product;

    userId=UserId;


    createCategories(userId)
      .then(function(inserted){
        categories=inserted;

        createSuppliers(userId)
          .then(function(inserted){
            suppliers=inserted;

            createProducts(userId,categories, suppliers)
              .then(function(inserted){
                products=inserted;
                console.log("inserted Products Data",inserted);
              });
            console.log("inserted Suppliers Data",inserted);
          })
          .catch(function(error){
            console.log("Error in creating suppliers ",error);
            createProducts(userId,categories, suppliers)
              .then(function(inserted){
                products=inserted;
                console.log("inserted Products Data",inserted);
              })
              .catch(function(error){
                console.log("Error in creating Products ",error);
              })
            ;
          })
        ;
          console.log("inserted Categories Data",inserted);
      })
      .catch(function(error){
        console.log("Error in creating categories ",error);
        createSuppliers(userId)
          .then(function(inserted){
            suppliers=inserted;

            createProducts(userId,categories, suppliers)
              .then(function(inserted){
                suppliers=inserted;
                console.log("inserted Products Data",inserted);
              });
            console.log("inserted Suppliers Data",inserted);
          })
          .catch(function(error){
            console.log("Error in creating suppliers ",error);
            createProducts(userId,categories, suppliers)
              .then(function(inserted){
                products=inserted;
                console.log("inserted Products Data",inserted);
              })
              .catch(function(error){
                console.log("Error in creating Products ",error);
              })
            ;
          })
        ;
      });





   // getCatsAndSups(createProducts);

  };
  function getCatsAndSups(callback){
   Supplier.find(
      {
        where: {userId:userId},
        fields: {name: true}
      }, function(err, supps, created) {
        if (err) {
          console.error('err', err);
        }
        suppliers=supps;
      });

    Category.find(
      {
        where: {userId:userId},
        fields: {name: true}
      }, function(err, cats, created) {
        if (err) {
          console.error('err', err);
        }
        categories=cats;
      });

    callback();

  }

   function createProducts2(userId, categories,suppliers) {

    /*var categories = [], suppliers = [];

    Category.find({where: {userId: userId}, fields: {id: true, name: true}}, function (err, cats, created) {
      if (err) {
        console.error('err', err);
      }
      categories = cats;
    });


    Supplier.find({where: {userId: userId}, fields: {id: true, name: true}}, function (err, supps, created) {
      if (err) {
        console.error('err', err);
      }
      suppliers = supps;
    });*/




  }

  var createProducts= function(userId, categories,suppliers) {
    return new Promise(function (resolve, reject) {
      var Converter = require("csvtojson").Converter;
      var fileStream = fs.createReadStream("storage/files/products.csv");

//new converter instance
      var param = {};
      var converter = new Converter(param);
      //end_parsed will be emitted once parsing finished

      converter.on("end_parsed", function (jsonProdObj) {

        var newProds=[];

        Product.find({where: {userId: userId}, fields: {id: true, name: true}}, function (err, prods, created) {
          if (err) {
            console.error('err', err);
          }
          products = prods;

          jsonProdObj.forEach(function (s) {
            if (ifExists(s, products)) {
            } else {
              newProds.push(s);
              // console.log(s.name);
            }
          });
          //console.log(newProds);
          if (newProds.length > 0) {
            newProds.forEach(function (d) {
              d.userId = userId,
              d.categoryId = getItemId(d.category, categories),
              console.log(d.categoryId);
              d.supplierId = getItemId(d.supplier, suppliers)
              console.log(d.supplierId);
            });

            Product.create(newProds, function (err, res) {
              if (err){reject(err);}
              else {
                var inserted = res;
                resolve(inserted);
              }
            });
          }
        });
      });
//read from file
      // This will wait until we know the readable stream is actually valid before piping
      fileStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        fileStream.pipe(converter);
      });

      // This catches any errors that happen while creating the readable stream (usually invalid names)
      fileStream.on('error', function(err) {
        //converter.end(err);
        reject(err);
        //console.log("File does not existing",err);
      });
      //fileStream.pipe(converter);
    });
  };


  function getItemId(name, objItem){
    var id=0;
    if(objItem!=undefined) {
      if (objItem.length > 0) {
        objItem.forEach(function (obj) {
          if (name === obj.name) {
            id = obj.id
            console.log(obj.id);
          }
        });
      }
    }
    return id;
  }


  var createSuppliers= function(userId){
    return new Promise(function(resolve, reject) {

      var Converter = require("csvtojson").Converter;
      var fileStream = fs.createReadStream("storage/files/suppliers.csv");
      //new converter instance
      var param = {};
      var converter = new Converter(param);

      //end_parsed will be emitted once parsing finished

      converter.on("end_parsed", function (jsonObj) {
        // console.log(jsonObj); //here is your result json object

        var newSupp=[];

        Supplier.find(
          {
            where: {userId:userId},
            fields: {id:true,name: true}
          }, function(err, suppliers, created) {
            if (err) {
              console.error('err', err);
            }

            jsonObj.forEach(function(s){
              if(ifExists(s,suppliers)){
              }else {
                newSupp.push(s);
                // console.log(s.name);
              }
            });
            //console.log(newSupp);
            if(newSupp.length>0) {
              newSupp.forEach(function (d) {
                d.userId = userId
              });

              Supplier.create(newSupp, function (err, res) {
                if (err){reject(err);}
                else {
                  var inserted = res.concat(suppliers);;
                  resolve(inserted);
                }
              });
            }
          });
      });

//read from file
      // This will wait until we know the readable stream is actually valid before piping
      fileStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        fileStream.pipe(converter);
      });

      // This catches any errors that happen while creating the readable stream (usually invalid names)
      fileStream.on('error', function(err) {
        //converter.end(err);
        reject(err);
        //console.log("File doesnot exists", err);
      });
      //fileStream.pipe(converter);
    });
};

  var createCategories= function(userId){
    return new Promise(function(resolve, reject){
      var Converter = require("csvtojson").Converter;
      var fileStream = fs.createReadStream("storage/files/categories.csv");

      //var categories=[];

//new converter instance
      var param = {};
      var converter = new Converter(param);

//end_parsed will be emitted once parsing finished
      converter.on("end_parsed", function (jsonObj) {
        // console.log(jsonObj); //here is your result json object

        var newCat=[];

        Category.find(
          {
            where: {userId:userId},
            fields: {id:true,name: true}
          }, function(err, categories, created) {
            if (err) {
              console.error('err', err);
            }

            jsonObj.forEach(function(d){
              if(ifExists(d,categories)){
              }else {
                newCat.push(d);
                console.log(d.name);
              }
            });
            // console.log(newCat);
            if(newCat.length>0) {
              newCat.forEach(function (d) {
                d.userId = userId
              });

              Category.create(newCat, function (err, res) {
                if (err){reject(err);}
                else {
                  var inserted = res.concat(categories);
                  resolve(inserted);
                }
              });
            }
          });
      });

//read from file
      // This will wait until we know the readable stream is actually valid before piping
      fileStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        fileStream.pipe(converter);
      });

      // This catches any errors that happen while creating the readable stream (usually invalid names)
      fileStream.on('error', function(err) {
        reject(err);
        //console.log("File doesnot exists", err);
      });
      //fileStream.pipe(converter);
    });
  };

/*  function createCategories(callback){
  }*/

  function ifExists(item, itemArray){
    var exists=false;
    itemArray.forEach(function(c) {
      if(item.name=== c.name){
        exists=true;
      }
    });
    return exists;
  }



  //SELECT p.name, p.unit, p.price, p.note, c.name,c.description,s.name,s.email FROM product p,category c, supplier s WHERE p.categoryId=c.id and p.supplierId=s.id
  function getCSVData(filePath){
    //Converter Class
    // Node packages for file system
   //    var fs = require('fs');
  //  var path = require('path');


   // var filePath = path.join(__dirname, '../../product.csv');
// Read CSV
    var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
      function(err){console.log(err);});

// Split on row
    f = f.split("\n");
    var Product = UploadCSV.app.models.Product;
    var Supplier = UploadCSV.app.models.Supplier;

// Get first row for column headers
    headers = f.shift().split(",");

    f.forEach(function(d){
      // Loop through each row
      cat = {};
      sup={};
      prod={};
      row = d.split(",")
      cat.name=row[6];
      cat.description=row[5];
      sup.name=row[6];
      sup.email=row[7];
      prod.name=row[0];
      prod.unit=row[1];
      prod.price=row[2];
      prod.note=row[3];
      findCreateCat(cat,sup,prod);

    });


  }
  function findCreateCat(cat,sup,prod){
    var Category = app.models.Category;
    //var Supplier = app.models.Supplier;
   // var Product = app.models.Product;
    Category.findOrCreate(
      {where:{name: cat.name}},
      {name: cat.name,description:cat.description},
      function(err, category, created) {
        if (err) {
          console.error('err', err);
        }
        (created) ? log('created Category', category.name)
          : log('found Category', category.name);

        Product.findOrCreate(
          {where:{name: prod.name}},
          {name: prod.name,supplierId:supplier.id,categoryId:category.id},
          function(err, product, created) {
            if (err) {
              console.error('err', err);
            }
            (created) ? log('created supplier', product.name)
              : log('found product', product.name);
          });



      });


  }

  function findCreateSup(sup){
    var Supplier = app.models.Supplier;
    Supplier.findOrCreate(
      {where:{name: sup.name}}, // find
      {name: sup.name,email:sup.email}, // create
      function(err, suplier, created) {
        if (err) {
          console.error('err', err);
        }
        (created) ? log('created suplier', suplier.name)
          : log('found suplier', suplier.name);
      });
    return suplier;
  }

  function findCreateProd(prod){
    Category.findOrCreate(
      {where:{name: prod.name}}, // find
      {name: prod.name,categoryId:prod.categoryId,suplierId:prod.suplierId}, // create
      function(err, product, created) {
        if (err) {
          console.error('err', err);
        }
        (created) ? log('created product', product.name)
          : log('found product', product.name);
      });
    return suplier;
  }
/*
function upserProd(prod,products,cb){
  vat tmpProf= products.match(p)

  return cp();
}

  /!*
  cat {name:'canename'}
  prod {name:'',des:'',......}
   *!/
  function upserCat(cat,categories){
    return category;
  }
*/



  UploadCSV.remoteMethod(
    'convertToJSON',
    {
      accepts: {arg: 'userId', type: 'string'}
    }
  );

  UploadCSV.remoteMethod(
    'logmsg',
    {
      accepts: {arg: 'msg', type: 'string'}
    }
  );


};





