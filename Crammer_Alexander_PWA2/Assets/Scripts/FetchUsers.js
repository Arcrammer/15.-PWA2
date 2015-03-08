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
});