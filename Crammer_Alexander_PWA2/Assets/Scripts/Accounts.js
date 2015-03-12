/*  Presentation
    Accounts.js
    Wednesday, 11 March, 2015
    Alexander Rhett Crammer  */

$(document).ready(function () {
    $("#imageUpload").css("display","none");
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
                $("#userImageUploadID").val(userData["id"]);
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
            if (!userData.avatar) {
                // The user hasn't uploaded an avatar so we'll remove the display of the element
                $("#usersImage").css("display","none");
            } else {
                // We have an image to display
                var imageName = userData.avatar.split("\\")[2]; // Trim away 'C:\fakepath\'. I'm a Mac hunty.
                var usersAvatarPath = "Assets/Images/UserAvatars/" + imageName;
                $("#usersImage").attr("src",usersAvatarPath);
                $("#usersImage").attr("alt",imageName);
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
    $("#editOverlay").css("display","none");
    $("#usersImage").hover(function () {
        console.log("You should choose from an image in the Assets/Images/UserAvatars/ directory because you can't actually upload files with jQuery.");
        // The user has hovered over the '#usersImage' image
        $("#editOverlay").css("display","block");
    });
    $("#editOverlay").mousedown(function () {
        // The user has clicked but hasn't yet released the click over the '#editOverlay' image
        $("#editOverlay").css({
            "background-color":"rgba(0,0,0,0.5)",
        });
    });
    $("#editOverlay").mouseup(function () {
        // The user has clicked and released the click over the '#editOverlay' image
        $("#editOverlay").css({
            "background-color":"transparent"
        });
    });
    $("#editOverlay").click(function () {
        // The user has clicked the '#editOverlay' image
        $("#profileImageUploaded").click(); // Basically forwarding a click on the image to a click on the hidden form of type 'file'
        $("#profileImageUploaded").change(function () {
            // The user has chosen an image to upload so we'll submit the form with AJAX
            $.ajax({
                "url":"Assets/Scripts/xhr/update_user.php",
                "type":"POST",
                "dataType":"JSON",
                "data": {
                    "avatar": $("#profileImageUploaded").val() // Name of the image uploaded
                },
                "success": function (imageUpdateResponseData) {
                    // The image was uploaded so we'll reload the page to demonstrate it
                    if (imageUpdateResponseData.error) {
                        // There was a problem
                        alert("There was a problem uploading the image.");
                        console.log("Oopsie - " + imageUpdateResponseData.error);
                    } else {
                        // The image was successfully uploaded
                        window.location.reload();
                    }
                }
            });
        });
    });
    $("#editOverlay").mouseleave(function () {
        // The user has hovered away from the '#editOverlay' image
        $("#editOverlay").css("display","none");
    });
});