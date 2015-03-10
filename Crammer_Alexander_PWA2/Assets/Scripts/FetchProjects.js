/*  AJAX
    FetchProjects.js
    Friday, 6 March, 2015
    Alexander Rhett Crammer  */

/* Document Overview: Fill a list with project data retrieved dynamically */

$(document).ready(function () {
    /* The DOM has completely rendered so we'll send AJAX to the server in order to load the list */
    $.ajax({
        "url":"Assets/Scripts/xhr/get_projects.php",
        "type":"GET",
        "dataType":"JSON",
        "success": function (fetchProjectsResponse) {
            fetchProjectsResponse.projects.reverse(); /* Reverse the list in order to display projects chronologically */
            if (fetchProjectsResponse.error) {
                /* There was a problem fetching the projects */
                alert("Your projects couldn't be loaded.");
                console.log(fetchProjectsResponse.error);
            } else {
                /* There wasn't an error */
                var documentLocation = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
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
                    $(".projects").append(projectElement); /* Add the new project element to the list */
                    $(".delete-button").click(function () {
                        /* The 'Delete' button was clicked so we'll send AJAX to the server requesting its' deletion */
                        $.ajax({
                            "url":"Assets/Scripts/xhr/delete_project.php",
                            "data": {
                                "projectID": projectAtCurrentIndex.id
                            },
                            "type":"POST",
                            "dataType":"JSON",
                            "success": function (deleteProjectResponse) {
                                if (deleteProjectResponse.error) {
                                    /* There's a problem with the AJAX request */
                                    alert(deleteProjectResponse.error);
                                } else {
                                    /* The request has successfully completed and the new item has been deleted, so we'll refresh the page to show that */
                                    window.location.reload();
                                }
                            }
                        });
                    });
                }
                if (fetchProjectsResponse.projects.length == 0) {
                    /* There are no projects to display so we'll note the user of that */
                    if (!documentLocation == "/Dashboard.html") {
                        /* We're not at the page above */
                        var noProjectsElement = '<p class="noListElements">You don\'t have any projects at the moment.</p>';
                        $(".projects").replaceWith(noProjectsElement); /* Replace the list with the paragraph above */
                    }
                }
            }
        }
    });
    $(".projects").sortable({
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
                "padding":"0",
                "width":"100%"
            });
            if (documentLocation == "/Dashboard.html") {
                $(ui.item[0]).css({
                    /* Also add top and bottom padding */
                    "padding":"15px 0",
                });
            }
        }
    });
});
