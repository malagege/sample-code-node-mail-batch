/////////(1)
const csvFilePath='data.csv'
var mail_from = 'from@xxxx.com.tw'
var subject = '標題'


var nodemailer = require('nodemailer');
const csv=require('csvtojson')
/////////(2)
var transporter = nodemailer.createTransport({
    host: 'mail_server_url',
    port: 25 ,
    secure: false,
    auth: {
        user: 'from@xxxx.com.tw',
        pass: 'password'
    }
});
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 

    jsonObj.forEach(data => {
        /////////(3)
        let mail_to = data.usermail
        let email_template = `
        Hello World!!!!
        <img src="cid:00000001"/><br>
        姓名：${data.username}<br>
        訂單編號：${data.no}<br>
        `

        var mailOptions = {
          from: mail_from,
          to: mail_to,     //寄送人
          subject: subject,
          html: email_template,
          attachments: [{
            filename: data.img,
            path: data.img,
            cid: '00000001'
          }]
        };
        
      
      // verify connection configuration
      // transporter.verify(function(error, success) {
      //   if (error) {
      //        console.log(error);
      //   } else {
      //        console.log('Server is ready to take our messages');
      //   }
      // });
      
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log('mail_to:' + mail_to)
          console.log(error);
        } else {
          console.log(mail_to + ' , Email sent: ' + info.response);
        }
      });
      
      });

})