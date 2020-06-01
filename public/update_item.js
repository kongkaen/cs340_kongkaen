function updateService(id){
    $.ajax({
        url: '/service/' + id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("/service");
        }
    })
};

function updateEmployee(id){
    $.ajax({
        url: '/employee/' + id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("/employee");
        }
    })
};

function updatePayment(id){
    $.ajax({
        url: '/payment/' + id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("/payment");
        }
    })
};

function updateSchedule(id){
    $.ajax({
        url: '/schedule/' + id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("/schedule");
        }
    })
};

function updateInvoice(id){
    $.ajax({
        url: '/invoice/' + id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("/invoice");
        }
    })
};

function updateCustomer(id){
    $.ajax({
        url: '/customer/' + id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("/customer");
        }
    })
};
