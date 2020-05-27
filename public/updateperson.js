function updatePerson(id){
    $.ajax({
        url: '/employee/' + id,
        type: 'PUT',
        data: $('#update-person').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
