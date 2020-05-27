module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getEmployee(res, mysql, context, complete){
        mysql.pool.query("SELECT employees.employee_id as id, first_name, last_name, phone_number, job_title, skill FROM employees", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employee = results;
            complete();
        });
    }




        function getPeopleWithNameLike(req, res, mysql, context, complete) {
           var query = "SELECT employees.employee_id as id, first_name, last_name, phone_number, job_title, skill FROM employees WHERE employees.first_name LIKE " + mysql.pool.escape(req.params.s + '%');
          console.log(query)

          mysql.pool.query(query, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.employee = results;
                complete();
            });
        }



    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getEmployee(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('employee', context);
            }

        }
    });


    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        context.css = ["employee_styles.css"]
        var mysql = req.app.get('mysql');
        getPeopleWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('employee', context);
            }
        }
    });




    router.post('/', function(req, res){

        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO employees (first_name, last_name, phone_number, job_title, skill) VALUES (?,?,?,?,?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.phone_number, req.body.job_title, req.body.skill];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/employee');
            }
        });
    });


    


    return router;
}();
