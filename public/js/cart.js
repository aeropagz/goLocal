function getProducts() {
    let location = $("#location").val();
    // now for the big event
    $.ajax({
        'url': 'products/cartDetails',
        'type': 'get',
        'dataType': 'json',
        'contentType': "application/json; charset=utf-8",
    })
        .done(function (response) {
            // what you want to happen when an ajax call to the server is successfully completed
            // 'response' is what you get back from the script/server
            // usually you want to format your response and spit it out to the page
            console.log("Cart Products : " + JSON.stringify(response));
            createContent(response);
        })
        .fail(function (code, status) {
            // what you want to happen if the ajax request fails (404 error, timeout, etc.)
            // 'code' is the numeric code, and 'status' is the text explanation for the error
            // I usually just output some fancy error messages
            alert("Fetching of the cart details failed.");
        })
        .always(function (xhr, status) {
            // what you want to have happen no matter if the response is success or error
            // here, you would "stop" your loading animations, and maybe output a footer at the end of your content, reading "done"
        });
}

$(function () {
    // Handler for .ready() called.
    console.log("ready!");
    getProducts();


});

function createContent(res) {
    let cart = res["cart"];
    let products = res["products"];
    let content = "";
    for (var i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemDetails = {};
        for (var j = 0; j < products.length; j++) {
            let temp = products[i];
            if (temp["id"] == item["productID"]) {
                itemDetails = temp;
                break
            }
        }
        content += `<li class="list-group-item d-flex justify-content-between align-items-center">
            `+ itemDetails["name"] + `
            <span class="badge badge-primary badge-pill">`+ item["quantity"] + `</span>
        </li>`
    }


    $("#content").html(content);
}