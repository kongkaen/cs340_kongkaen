module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getSchedule(res, mysql, context, complete){
        mysql.pool.query("SELECT work_orders.work_order_number as id, call_reason, date, arrival_windows_1, arrival_windows_2, status, work_orders.customer_id FROM work_orders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.schedule = results;
            complete();
        });
    }

    /* Find all work order with customer id */

        function getPeopleWithNameLike(req, res, mysql, context, complete) {
          //sanitize the input as well as include the % character
           var query = "SELECT work_orders.work_order_number as id, call_reason, date, arrival_windows_1, arrival_windows_2, status, work_orders.customer_id FROM work_orders WHERE work_orders.customer_id LIKE " + mysql.pool.escape(req.params.s + '%');
          console.log(query)

          mysql.pool.query(query, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.schedule = results;
                complete();
            });
        }


    /*Display all employee. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchschedule.js"];
        var mysql = req.app.get('mysql');
        getSchedule(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('schedule', context);
            }

        }
    });



    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */

    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchschedule.js"];
        context.css = ["schedule_styles.css"]
        var mysql = req.app.get('mysql');
        getPeopleWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('schedule', context);
            }
        }
    });


    /* Adds a person, redirects to the people page after adding */


    router.post('/', function(req, res){
        //console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO work_orders (call_reason, date, arrival_windows_1, arrival_windows_2, status, customer_id) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.call_reason, req.body.date, req.body.arrival_windows_1, req.body.arrival_windows_2, req.body.status, req.body.customer_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/schedule');
            }
        });
    });


    return router;
}();
