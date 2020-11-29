$('#registration-form').submit(function (event) {
    // prevent the usual form submission behaviour; the "action" attribute of the form
    event.preventDefault();
    // validation goes below...
    let name = $("#name").val();
    let password = $("#password").val();
    let repassword = $("#re-password").val();
    let role = "customer";
    let username = $("#username").val();
    if (password != repassword) {
        return alert("Your passwords don't match.");
    }
    // now for the big event
    $.ajax({
        'url': '/user/register/customer',
        'data': {
            name,
            password,
            role,
            username
        },
        'type': 'post',
        'dataType': 'json',
        'contentType': "application/json; charset=utf-8",
    })
        .done(function (response) {
            // what you want to happen when an ajax call to the server is successfully completed
            // 'response' is what you get back from the script/server
            // usually you want to format your response and spit it out to the page
            alert("User created");
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
            $('#registration-form').reset();
        });
});