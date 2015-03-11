/*  AJAX
    FetchProjects.js
    Friday, 6 March, 2015
    Alexander Rhett Crammer  */

/* Document Overview: Fill a list with project data retrieved dynamically */

$(document).ready(function () {
    var documentLocation = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
    $.ajax({
        "url":"Assets/Scripts/xhr/get_projects.php",
        "type":"GET",
        "dataType":"JSON",
        "success": function (fetchProjectsResponse) {
            if (fetchProjectsResponse.error) {
                /* There was a problem fetching the projects */
                alert("Your projects couldn't be loaded.");
                console.log(fetchProjectsResponse.error);
            } else {
                /* There wasn't an error */
                for (var projectIndex=0;projectIndex < fetchProjectsResponse.projects.length;projectIndex++) {
                    var projectAtCurrentIndex = fetchProjectsResponse.projects[projectIndex];
                    var projectElement = '<li id="' + projectAtCurrentIndex["id"] + '">';
                    projectElement += "<p>" + projectAtCurrentIndex["projectName"] + "</p>";
                    if (documentLocation == "/Dashboard.html") {
                        /* The user is visiting the 'Dashboard' page */
                        projectElement += "<p>" + projectAtCurrentIndex["projectDescription"] + "</p></li>";
                    } else {
                        /* The user is visiting another page, presumably the 'Projects' page */
                        projectElement += '<p><a class="button smaller-button delete-button">Delete</a>';
                        projectElement += '<a class="button smaller-button edit-button">Edit</a></p></li>';
                    }
                    $(".projects").append(projectElement);
                    $(".delete-button").click(function () {
                        $.ajax({
                            "url":"Assets/Scripts/xhr/delete_project.php",
                            "data": {
                                "projectID": projectAtCurrentIndex.id
                            },
                            "type":"POST",
                            "dataType":"JSON",
                            "success": function (deleteProjectResponse) {
                                if (deleteProjectResponse.error) {
                                    alert(deleteProjectResponse.error);
                                } else {
                                    window.location.reload();
                                }
                            }
                        });
                    });
                }
                if (fetchProjectsResponse.projects.length == 0) {
                    /* There are no projects to display so we'll note the user of that */
                    if (!documentLocation == "/Dashboard.html") {
                        var noProjectsElement = '<p class="noListElements">You don\'t have any projects at the moment.</p>';
                        $(".projects").replaceWith(noProjectsElement);
                    }
                }
            }
        }
    });
});