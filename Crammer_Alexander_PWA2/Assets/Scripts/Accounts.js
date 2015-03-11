/*  Presentation
    Accounts.js
    Wednesday, 11 March, 2015
    Alexander Rhett Crammer  */

$(document).ready(function () {
    $.ajax({
        "url":"Assets/Scripts/xhr/get_user.php",
        "type":"POST",
        "dataType":"JSON",
        "success": function (userData) {
            var userData = userData.user;
            // The users' information was loaded so we'll update the page to display all of it
            if (userData.last_name != "") {
                $(".contentArea").append('<p><span class="userDataName">Name:</span> ' + userData.first_name + ' ' + userData.last_name + '</p>');
            }
            if (userData["id"] != "") {
                $(".contentArea").append('<p><span class="userDataName">ID:</span> ' + userData["id"] + '</p>');
            }
            if (userData.user_n != "") {
                $(".contentArea").append('<p><span class="userDataName">Handle:</span> @' + userData.user_n + '</p>');
            }
            if (userData.email != "") {    
                $(".contentArea").append('<p><span class="userDataName">Email Address:</span> ' + userData.email + '</p>');
            }
            if (userData.city != "") {
                $(".contentArea").append('<p><span class="userDataName">City:</span> ' + userData.city + '</p>');
            }
            if (userData.state != "") {
                $(".contentArea").append('<p><span class="userDataName">State:</span> ' + userData.state + '</p>');
            }
            // Set the modals' content to the retrieved results
            $("#firstName").val(userData.first_name);
            $("#lastName").val(userData.last_name);
            $("#emailAddress").val(userData.email);
            $("#city").val(userData.city);
            $("#state").val(userData.state);
        }
    });
    $("#cancelButton").click(function () {
        $(".modalView").css("display","none");
        $(".creationModalContent").css("display","none");
    });
    $("#editButton").click(function () {
        $(".modalView").css("display","block");
        $(".creationModalContent").css("display","block");
    });
    $("#updateButton").click(function () {
        $.ajax({
            "url":"Assets/Scripts/xhr/update_user.php",
            "type":"POST",
            "dataType":"JSON",
            "data": {
                "first_name": $("#firstName").val(),
                "last_name": $("#lastName").val(),
                "email": $("#emailAddress").val(),
                "city": $("#city").val(),
                "state":  $("#state").val()
            },
            "success": function () {
                
                window.location.reload();
            }
        });
    });
});