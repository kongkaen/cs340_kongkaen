module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getService(res, mysql, context, complete){
        mysql.pool.query("SELECT service_id as id, service_name, unit_price, service_description, warranty FROM services", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.service = results;
            complete();
        });
    }


        function getServiceByName(req, res, mysql, context, complete) {
           var query = "SELECT service_id as id, service_name, unit_price, service_description, warranty FROM services WHERE service_name LIKE " + mysql.pool.escape('%' + req.params.s + '%');
          console.log(query)

          mysql.pool.query(query, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.service = results;
                complete();
            });
        }



    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchservice.js"];
        var mysql = req.app.get('mysql');
        getService(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('service', context);
            }

        }
    });




    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchservice.js"];
        context.css = ["service_styles.css"]
        var mysql = req.app.get('mysql');
        getServiceByName(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('service', context);
            }
        }
    });




    router.post('/', function(req, res){
        //console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO services (service_name, unit_price, service_description, warranty) VALUES (?,?,?,?)";
        var inserts = [req.body.service_name, req.body.unit_price, req.body.service_description, req.body.warranty];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/service');
            }
        });
    });


    return router;
}();
