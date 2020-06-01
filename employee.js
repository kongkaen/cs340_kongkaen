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

    function getPerson(res, mysql, context, id, complete){
          var sql = "SELECT employee_id as id, first_name, last_name, phone_number, job_title, skill FROM employees WHERE employee_id = ?";
          var inserts = [id];
          mysql.pool.query(sql, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.person = results[0];
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
        context.jsscripts = ["delete_item.js","filteremployee.js","searchemployee.js"];
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
        context.jsscripts = ["delete_item.js","filteremployee.js","searchemployee.js"];
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

    /*Display one employee for the specific purpose of updating */
    router.get('/:id', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["selectedemployee.js", "update_item.js"];
      context.css = ["employee_styles.css"]
      var mysql = req.app.get('mysql');
      getPerson(res, mysql, context, req.params.id, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
              res.render('update-employee', context);
          }

      }
  });

  /* The URI that update data is sent to in order to update an employee */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE employees SET first_name=?, last_name=?, phone_number=?, job_title=?, skill=? WHERE employee_id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.phone_number, req.body.job_title, req.body.skill, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete an employee, simply returns a 202 upon success. Ajax will handle this. */

        router.delete('/:id', function(req, res){
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM employees WHERE employee_id = ?";
            var inserts = [req.params.id];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    console.log(error)
                    res.write(JSON.stringify(error));
                    res.status(400);
                    res.end();
                }else{
                    res.status(202).end();
                }
            })
        })




    return router;
}();
