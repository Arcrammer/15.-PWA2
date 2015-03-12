/*  jQuery UI
    FetchImage.js
    Thursday, 12 March, 2015
    Alexander Rhett Crammer  */

/* Document Overview: Fetch the users' image from the database and return it to the requesting document to display it within that page */
$.ajax({
    "url":"Assets/Scripts/xhr/get_user.php",
    "type":"POST",
    "dataType":"JSON",
    "success": function (userData) {
        var imageName = userData.user.avatar.split("\\")[2];
        var imagePath = "Assets/Images/UserAvatars/" + imageName;
        $("#usersImage").attr("src",imagePath);
        $("#usersImage").attr("alt",imageName);
    }
});