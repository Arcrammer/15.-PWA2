/*  AJAX
    FetchUsers.js
    Friday, 6 March, 2015
    Alexander Rhett Crammer  */

/* Document Overview: Fill a list with user data retrieved dynamically */

$(document).ready(function () {
    $.ajax({
        "url":"Assets/Scripts/xhr/get_user_list.php",
        "type":"GET",
        "dataType":"JSON",
        "success": function (fetchUsersResponse) {
            if (fetchUsersResponse.error) {
                /* There was a problem fetching the users */
                alert("Users couldn't be loaded.");
                console.log(fetchUsersResponse.error);
            } else {
                /* There wasn't an error */
                for (var userIndex=0;userIndex < fetchUsersResponse.users.length;userIndex++) {
                    var userAtCurrentIndex = fetchUsersResponse.users[userIndex];
                    var userListElement = '<li id="' + userAtCurrentIndex["id"] + '">';
                    userListElement += "<p>" + userAtCurrentIndex["first_name"] + "</p>";
                    userListElement += "<p>@" + userAtCurrentIndex["user_n"] + "</p></li>";
                    $(".users").append(userListElement);
                }
                if (fetchUsersResponse.users.length == 0) {
                    /* There are no users to display so we'll note the user of that */
                    var noUsersElement = '<p class="noListElements">You don\'t have any users at the moment.</p>';
                    $(".users").replaceWith(noUsersElement);
                }
            }
        }
    });
    $(".users").sortable({
        "axis":"y", /* Prevent list items from being drug horizontally */
        "containment": $(".contentArea"), /* Prevent the user from dragging the list item down too far */
        "start": function (event, ui) {
            /* The user has begun to drag a list item */
            $(ui.item[0]).css({
                /* Add properties to the held list item */
                "background-color":"rgba(175,175,175,0.8)",
                "margin-left":"2.5%",
                "padding":"0",
                "width":"95%"
            });
        },
        "stop": function (event, ui) {
            /* The user has dropped the list item */
            $(ui.item[0]).css({
                /* Remove the properties set on pick-up */
                "background-color":"transparent",
                "font-size":"1em",
                "margin-left":"0",
                "padding":"15px 0",
                "width":"100%"
            });
        }
    });
});