/*  Application Setup
    Main.js
    Tuesday, 3 March, 2015
    Alexander Rhett Crammer  */

$(document).ready(function () {
    $("#loginButton").click(function (submission) {
        submission.preventDefault(); /* Prevent the form from submitting and reloadig the current page */
        var usernameProvided = $('input[name="username_provided"').val(); /* Store the provided username after converting it to lower case */
        var keywordProvided = $('input[name="password_provided"').val(); /* Store the provided password */
        $.ajax({ /* Sending an object to jQuery's .ajax() method */
            "url":"Assets/Scripts/xhr/login.php",
            "type":"POST",
            "dataType":"JSON",
            "data": {
                "username": usernameProvided,
                "password": keywordProvided
            },
            "success": function (loginResponseData) {
                if (loginResponseData.error) {
                    /* There was a problem so we'll log it to the console */
                    console.log("Login Oopsie! - " + loginResponseData.error);
                } else {
                    /* The user was successfully verified against the database, so we'll send them to the dashboard */
                    window.location.replace("Dashboard.html");
                }
            }
        });
    });
    $("#logoutButton").click(function () {
        /* The 'Logout' button was clicked, so we'll attempt to log the user out. */
        $.get("Assets/Scripts/xhr/logout.php", function () {
            window.location.replace("index.html");
        });
    });
    $("#registerButton").click(function (registration) {
        registration.preventDefault();
        /* The 'Register' button was clicked */
        var usernameProvided = $('input[name="desired_username"').val(),
        firstNameProvided = $('input[name="first_name"').val(),
        lastNameProvided = $('input[name="last_name"').val(),
        emailAddressProvided = $('input[name="email_address"').val(),
        passwordProvided = $('input[name="keyword"').val();
        $.ajax({
            "url":"Assets/Scripts/xhr/register.php",
            "type":"POST",
            "dataType":"JSON",
            "data": {
                "firstname": firstNameProvided,
                "lastname": lastNameProvided,
                "username": usernameProvided,
                "email": emailAddressProvided,
                "password": passwordProvided,
                "phone": "",
                "city": "",
                "state": "",
                "zipcode": 0,
                "avatar": ""
            },
            "success": function (registrationResponseData) {
                if (registrationResponseData.error) {
                    /* There was a problem so we'll log it to the console and show a classic alert to the user */
                    alert(registrationResponseData.error);
                    console.log("Registration Oopsie! - " + registrationResponseData.error);
                } else {
                    /* The user was successfully verified against the database, so we'll send them to the dashboard */
                    window.location.replace("Dashboard.html");
                }
            }
        });
    });
    $.getJSON("Assets/Scripts/xhr/check_login.php", function (checkLoginData) {
        if (!checkLoginData.error) {
            /* The user has logged in so we'll personalise the welcome message. */
            $(".welcome").text("Welcome, " + checkLoginData["user"]["first_name"] + "!");
        }
    });
    $("#creationButton").click(function () {
        var projectName = $("#name").val(),
        projectDescription = $("#brief").val(),
        projectCompletionDate = $("#date").val(),
        projectStatus = $('input[type="radio"]:checked').prop("id");
        
        $.ajax({
            "url":"Assets/Scripts/xhr/new_project.php",
            "type":"POST",
            "dataType":"JSON",
            "data": {
                "projectName": projectName,
                "projectDescription": projectDescription,
                "dueDate": projectCompletionDate,
                "status": projectStatus
            },
            "success": function (newProjectResponseData) {
                if (newProjectResponseData) {
                    /* The new project has been added, so we'll dismiss the creation modal. */
                    $(".creationModalView").css("visibility","hidden");
                } else {
                    alert("The project couldn't be created. :(");
                }
            }
        });
    });
});