function filterInvoicebyStatus() {
    //get the id of the selected homeworld from the filter dropdown
    var status = document.getElementById('homeworld_filter').value
    //construct the URL and redirect to it
    window.location = '/employee/filter/' + parseInt(status)
}
