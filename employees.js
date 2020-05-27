module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveEmployees(req, res){
        var query = 'SELECT employee_id, first_name FROM employees';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfEmployees(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)

          context.employees = results;

          res.render('employees', context)
        }

        mysql.pool.query(query, handleRenderingOfEmployees)

    }




    router.get('/', serveEmployees);
    return router;
}();
