module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getInvoice(res, mysql, context, complete){
        mysql.pool.query("SELECT invoices.invoice_number as id, total_price, status, due_date, work_order_number, transaction_id FROM invoices", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.invoice = results;
            complete();
        });
    }


    /* Find all work order with customer id */

        function getInvoiceById(req, res, mysql, context, complete) {
          //sanitize the input as well as include the % character
           var query = "SELECT invoice_number as id, total_price, status, due_date, work_order_number, transaction_id FROM invoices WHERE invoice_number LIKE " + mysql.pool.escape(req.params.s + '%');
          console.log(query)

          mysql.pool.query(query, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.invoice = results;
                complete();
            });
        }


    /*Display all employee. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchinvoice.js"];
        var mysql = req.app.get('mysql');
        getInvoice(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('invoice', context);
            }

        }
    });



    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */

    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchinvoice.js"];
        context.css = ["invoice_styles.css"]
        var mysql = req.app.get('mysql');
        getInvoiceById(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('invoice', context);
            }
        }
    });


    /* Adds a person, redirects to the people page after adding */


    router.post('/', function(req, res){
        //console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO invoices (total_price, status, due_date, work_order_number) VALUES (?,?,?,?)";
        var inserts = [req.body.total_price, req.body.status, req.body.due_date, req.body.work_order_number];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/invoice');
            }
        });
    });


    return router;
}();
