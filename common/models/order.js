
  var fs = require('fs')
    , cheerio = require('cheerio');
  var dateFormat = require('dateformat');
  module.exports = function(Order) {

    var message='';

  Order.sendemail = function(msg, cb) {
   // cb(null, 'Greetings... ' + msg);
   // var path = require('path');
    var templatesDir =  __dirname + '/view/emailtpl.html';

    fs.readFile(templatesDir, {encoding: 'utf8'}, function(error, data) {
      var $ = cheerio.load(data); // load in the HTML into cheerio

      var msgFrom= msg.user.bussinessname;
      var msgBody= '<p>Hi</p> <p> I would like to order following items to be delivered on <br/><strong>'+ dateFormat(msg.order.deliverydate, "dddd, mmmm dS, yyyy") +'</strong> </p> ';

      var msgReply='<p style="text-align: left"> Please <strong>Reply All</strong> once the order is processed   <br />';

     // console.log('User Name '+ msg.user.firstName );
      message = '<table><thead><tr style="text-align: left"><th>Item</th><th></th><th>Quantity</th></tr></thead><tbody>';
      for (var i = 0; i < msg.orderItems.length; i++) {
        message = message + '<tr><td>' + msg.orderItems[i].productName + '</td><td>&nbsp;&nbsp;</td> <td>' + msg.orderItems[i].quantity + ' ( '+msg.orderItems[i].unit + ' )</td></tr>';
      }
      message = message + '</tbody> </table>';

      var msgAddr='<p style="text-align: left">--------------------------------------------------------------------------- <br/>Please ship these items to following address: <br /> <br />'
        + '<strong>'+ msg.user.bussinessname +'</strong> <br />'
        + msg.user.address +'<br />'
        + msg.user.zip +'<br />'
        + msg.user.state +'<br />'
        + msg.user.country +'<br /> </p>'
        +'<p style="text-align: left">For any queries please email at: <strong>'+msg.user.email+' </strong> <br />'
        +' or call '+ msg.user.firstName + ' ' +msg.user.lastName+ ' on ' + msg.user.phone+ '</p> ';


     /* console.log(msgFrom);
      console.log(msgBody);
        console.log(message);
      console.log(msgAddr)*/
      $('.from').html(msgFrom);
      $('.msgBody').html(msgBody);
      $('.msgReply').html(msgReply);
      $('.flexibleContainerBox').html(message);
      $('.msgAddr').html(msgAddr);

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'abc@gmail.com',
          pass: 'abc'
        }
      });
      transporter.sendMail({
        from: 'abc@gmail.com',
        to: msg.supplier.email +','+ msg.user.email,
        subject: 'New Order from ' + msg.user.bussinessname,
        html: $.html()
      }, function () {
        console.log('EMail Message', message);
        // message='';
      });
    });
  };

  Order.remoteMethod(
    'sendemail',
    {
      accepts: {arg: 'msg', type: 'object'},
      returns: {arg: 'greeting', type: 'string'}
    }
  );



Order.afterSave = function(next) {
  next();

};


};
