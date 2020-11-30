function createProduct() {
    // validation
    let name = $("#name").val();
    let description = $("#description").val();
    let quantity = $("#quantity").val();
    let price = $("#price").val();
    let manufactureDate = $("#manufactureDate").val();
    let expiryDate = $("#expiryDate").val();
    let payment = $('input[type=checkbox][name=paymentOptions]:checked').map(function (_, el) {
        return $(el).val();
    }).get();;
    let shipping = $('input[type=checkbox][name=shippingOptions]:checked').map(function (_, el) {
        return $(el).val();
    }).get();;


    if (payment.length == 0) {
        return alert("Atleast one payment method required.")
    }
    if (shipping.length == 0) {
        return alert("Atleast one payment method required.")
    }
    product = {
        name,
        description,
        quantity,
        price,
        manufactureDate,
        expiryDate,
        payment,
        shipping
    }
    console.log(product)
    // now for the big event
    $.ajax({
        'url': '/products/create',
        'data': JSON.stringify(product),
        'type': 'post',
        'dataType': 'json',
        'contentType': "application/json; charset=utf-8",
    })
        .done(function (response) {
            // what you want to happen when an ajax call to the server is successfully completed
            // 'response' is what you get back from the script/server
            // usually you want to format your response and spit it out to the page
            window.location.replace('/farmer');
            
        })
        .fail(function (code, status) {
            // what you want to happen if the ajax request fails (404 error, timeout, etc.)
            // 'code' is the numeric code, and 'status' is the text explanation for the error
            // I usually just output some fancy error messages
            alert("User creation failed.");
        })
}