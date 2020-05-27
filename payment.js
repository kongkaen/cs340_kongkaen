module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getPayment(res, mysql, context, complete){
        mysql.pool.query("SELECT transaction_id as id, payment_date, amount, type_payment, invoice_number FROM payments", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.payment = results;
            complete();
        });
    }


        function getPaymentById(req, res, mysql, context, complete) {
           var query = "SELECT transaction_id as id, payment_date, amount, type_payment, invoice_number FROM payments WHERE transaction_id LIKE " + mysql.pool.escape(req.params.s + '%');
          console.log(query)

          mysql.pool.query(query, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.payment = results;
                complete();
            });
        }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchpayment.js"];
        var mysql = req.app.get('mysql');
        getPayment(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('payment', context);
            }

        }
    });


    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchpayment.js"];
        context.css = ["payment_styles.css"]
        var mysql = req.app.get('mysql');
        getPaymentById(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('payment', context);
            }
        }
    });



    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO payments (payment_date, amount, type_payment, invoice_number) VALUES (?,?,?,?)";
        var inserts = [req.body.payment_date, req.body.amount, req.body.type_payment, req.body.invoice_number];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/payment');
            }
        });
    });


    return router;
}();
