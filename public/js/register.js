function createUser() {
    // validation
    let name = $("#name").val();
    let password = $("#password").val();
    let repassword = $("#re-password").val();
    let role = "customer";
    let username = $("#username").val();
    if (password != repassword) {
        return alert("Your passwords don't match.");
    }
    if (name.trim() == "" || password.trim() == "" || username.trim() == "") {
        return alert("All fields are required.")
    }
    // now for the big event
    $.ajax({
        'url': '/user/register/customer',
        'data': JSON.stringify({
            name,
            password,
            role,
            username
        }),
        'type': 'post',
        'dataType': 'json',
        'contentType': "application/json; charset=utf-8",
    })
        .done(function (response) {
            // what you want to happen when an ajax call to the server is successfully completed
            // 'response' is what you get back from the script/server
            // usually you want to format your response and spit it out to the page
            window.location.replace('/');
        })
        .fail(function (code, status) {
            // what you want to happen if the ajax request fails (404 error, timeout, etc.)
            // 'code' is the numeric code, and 'status' is the text explanation for the error
            // I usually just output some fancy error messages
            alert("User creation failed.");
        })
        .always(function (xhr, status) {
            // what you want to have happen no matter if the response is success or error
            // here, you would "stop" your loading animations, and maybe output a footer at the end of your content, reading "done"
        });
}

function createFarmer() {
    // validation
    let name = $("#name").val();
    let password = $("#password").val();
    let repassword = $("#re-password").val();
    let role = "farmer";
    let username = $("#username").val();
    let license = $("#licenseKey").val();
    let location = $("select#location").val();
    let payment = $('input[type=checkbox][name=paymentOptions]:checked').map(function (_, el) {
        return $(el).val();
    }).get();;

    if (password != repassword) {
        return alert("Your passwords don't match.");
    }
    if (name.trim() == "" || password.trim() == "" || username.trim() == "" || license.trim() == "") {
        return alert("All fields are required.")
    }
    if (payment.length == 0) {
        return alert("Atleast one payment method required.")
    }
    user = {
        name,
        password,
        role,
        username,
        license,
        location,
        payment
    }
    console.log(user)
    // now for the big event
    $.ajax({
        'url': '/user/register/farmer',
        'data': JSON.stringify(user),
        'type': 'post',
        'dataType': 'json',
        'contentType': "application/json; charset=utf-8",
    })
        .done(function (response) {
            // what you want to happen when an ajax call to the server is successfully completed
            // 'response' is what you get back from the script/server
            // usually you want to format your response and spit it out to the page
            window.location.replace('/');
            
        })
        .fail(function (code, status) {
            // what you want to happen if the ajax request fails (404 error, timeout, etc.)
            // 'code' is the numeric code, and 'status' is the text explanation for the error
            // I usually just output some fancy error messages
            alert("User creation failed.");
        })
}

//validate farmer LicenseKey
function validateKey() {
    // validation
    let name = $("#name").val();
    let licenseKey = $("#licenseKey").val();
    if (name.trim() == "" || licenseKey.trim() == "") {
        return alert("Name and licensekey are required.")
    }
    // now for the big event
    $.ajax({
        'url': '/farmer/validateLicense',
        'data': JSON.stringify({
            name,
            key: licenseKey
        }),
        'type': 'post',
        'dataType': 'json',
        'contentType': "application/json; charset=utf-8",
    })
        .done(function (response) {
            // what you want to happen when an ajax call to the server is successfully completed
            // 'response' is what you get back from the script/server
            // usually you want to format your response and spit it out to the page
            if (response && response.result && response.result == "positive")
                return alert("Key is valid.");
            else
                return alert("Key is invalid.");
        })
        .fail(function (code, status) {
            // what you want to happen if the ajax request fails (404 error, timeout, etc.)
            // 'code' is the numeric code, and 'status' is the text explanation for the error
            // I usually just output some fancy error messages
            alert("Key Validation Failed");
        })
}