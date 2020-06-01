module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getEmployees(res, mysql, context, complete){
        mysql.pool.query("SELECT employee_id, first_name FROM employees", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employees  = results;
            complete();
        });
    }

    function getCustomer(res, mysql, context, complete){
        mysql.pool.query("SELECT customers.customer_id as id, customers.first_name, customers.last_name, address1, address2, city, zip_code, state, country, customers.phone_number, email, employees.first_name as sale_rep, employees.employee_id FROM customers INNER JOIN employees ON employees.employee_id = customers.employee_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results;
            complete();
        });
    }

    function getUpdate(res, mysql, context, id, complete){
            var sql = "SELECT customer_id as id, first_name, last_name, address1, address2, city, zip_code, state, country, phone_number, email, employee_id FROM customers WHERE customer_id = ?";
            var inserts = [id];
            mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.item = results[0];
                complete();
            });
        }

    function getCustomerByEmployee(req, res, mysql, context, complete){
      var query = "SELECT customers.customer_id as id, customers.first_name, customers.last_name, address1, address2, city, zip_code, state, country, customers.phone_number, email, employees.first_name as sale_rep, employees.employee_id FROM customers INNER JOIN employees ON employees.employee_id = customers.employee_id WHERE customers.employee_id = ?";
      console.log(req.params)
      var inserts = [req.params.employee_id]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results;
            complete();
        });
    }




        function getPeopleWithNameLike(req, res, mysql, context, complete) {

           var query = "SELECT customers.customer_id as id, first_name, last_name, address1, address2, city, zip_code, state, country, phone_number, email FROM customers WHERE customers.first_name LIKE " + mysql.pool.escape(req.params.s + '%');
          console.log(query)

          mysql.pool.query(query, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.customer = results;
                complete();
            });
        }




    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_item.js","filtercustomer.js","searchcustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('customer', context);
            }

        }
    });


    router.get('/filter/:employee_id', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercustomer.js","searchcustomer.js"];
        context.css = ["customer_styles.css"]
        var mysql = req.app.get('mysql');
        getCustomerByEmployee(req,res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('customer', context);
            }

        }
    });



    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercustomer.js","searchcustomer.js"];
        context.css = ["customer_styles.css"]
        var mysql = req.app.get('mysql');
        getPeopleWithNameLike(req, res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('customer', context);
            }
        }
    });



/* Insert data into table */
    router.post('/', function(req, res){
        console.log(req.body.employee_id)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customers (first_name, last_name, address1, address2, city, zip_code, state, country, phone_number, email, employee_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.address1, req.body.address2, req.body.city, req.body.zip_code, req.body.state, req.body.country, req.body.phone_number, req.body.email, req.body.employee_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customer');
            }
        });
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM customers WHERE customer_id = ?";
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
    //"delete_item.js"]

    /* Display one person for the specific purpose of updating people*/

        router.get('/:id', function(req, res){
            callbackCount = 0;
            var context = {};
            context.jsscripts = ["selectedemployee.js", "update_item.js"];
            var mysql = req.app.get('mysql');
            getUpdate(res, mysql, context, req.params.id, complete);
            getEmployees(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 2){
                    res.render('update-customer', context);
                }

            }
        });
        router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE customers SET first_name=?, last_name=?, address1=?, address2=?, city=?, zip_code=?, state=?, country=?, phone_number=?, email=?, employee_id=? WHERE customer_id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.address1, req.body.address2, req.body.city, req.body.zip_code, req.body.state, req.body.country, req.body.phone_number, req.body.email, req.body.employee_id, req.params.id];
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




    return router;
}();
