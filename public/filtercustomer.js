function filterPeopleByName() {
    //get the id of the selected homeworld from the filter dropdown
    var homeworld_id = document.getElementById('employee_filter').value
    //construct the URL and redirect to it
    window.location = '/customer/filter/' + parseInt(homeworld_id)
}
