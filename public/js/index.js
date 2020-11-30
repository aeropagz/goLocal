function getProducts() {
    let location = $("#location").val();
    // now for the big event
    $.ajax({
        'url': '/products',
        'type': 'get',
        'dataType': 'json',
        'contentType': "application/json; charset=utf-8",
    })
        .done(function (response) {
            // what you want to happen when an ajax call to the server is successfully completed
            // 'response' is what you get back from the script/server
            // usually you want to format your response and spit it out to the page
            console.log("Products : " + JSON.stringify(response));
            createContent(response.products, location);
        })
        .fail(function (code, status) {
            // what you want to happen if the ajax request fails (404 error, timeout, etc.)
            // 'code' is the numeric code, and 'status' is the text explanation for the error
            // I usually just output some fancy error messages
            alert("Fetching of the products failed.");
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


    $('#location').on('change', function () {
        $("#content").html("");
        getProducts();
    });
});

function createContent(products, location) {
    let farmers = {};
    let product = {};
    for (var i = 0; i < products.length; i++) {
        product = products[i];
        if (!farmers.hasOwnProperty(product.farmerID)) {
            farmers[product.farmerID] = { name: "", product: [], location: "" }
        }
        farmers[product.farmerID]["name"] = product["farmer"]["name"];
        farmers[product.farmerID]["location"] = product["farmer"]["location"];
        farmers[product.farmerID]["product"].push(product);
    }
    console.log("farmers: " + JSON.stringify(farmers, null, 2));

    let content = "";
    for (let key in farmers) {
        let farmer = farmers[key]
        if (location != farmer["location"]) {
            continue;
        }
        content += `<div class="col-md-12 col-lg-6">
                        <div class="card"> 
                            <div class="card-header ">
                                 `+ farmer.name + `
                            </div>
                        <div class="card-group">`
        for (var i = 0; i < farmer["product"].length; i++) {
            product = farmer["product"][i];
            content += `
                    <div class="card" >
                    <div class="card-body">
                    <h4 class="card-text">`+ product["name"] + `</h3>
                    <p class="card-text"> Price: `+ product["price"] + `</p>
                    <p class="card-text"> MFG: `+ product["mfg-date"] + `</p>  
                    <p class="card-text"> Expiry: `+ product["exp-date"] + `</p> 
                    <p class="card-text"> Description: `+ product["description"] + `</p>
                    <p class="card-text"> Shipping: `+ product["delivery-method"] + `</p>
                    <p class="card-text"> Payment: `+ product["payment-methond"] + `</p>

                    </div>   
                </div>`
        }
        content +=
            `</div>
                    <div class="card-footer">
                    <a href="#" class="btn btn-info active" role="button" aria-pressed="true">Go to farmer Profile</a>
                    </div>
                 </div>   
            </div>`
    }
    $("#content").html(content);
}