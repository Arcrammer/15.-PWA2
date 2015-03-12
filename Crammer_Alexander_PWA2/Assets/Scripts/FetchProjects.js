/*  AJAX
    FetchProjects.js
    Friday, 6 March, 2015
    Alexander Rhett Crammer  */

/* Document Overview: Fill a list with project data retrieved dynamically */

$(document).ready(function () {
    if (window.location.href.indexOf("?") != -1) {
        // There was GET data sent with the request
        var GETData = window.location.href.split("?")[1].split("&"); // Return the GET data to an array
        var deletionNotificationShouldDisplay = GETData[0].split("=")[1]; // Find the first object of that array and retrieve its' value
        if (deletionNotificationShouldDisplay == "true") {
            /* We'll display a Growl-like notification to the user */
            $(".notification").css("display","block");
            var notification = '<p class="notificationText"><strong>Successfully Deleted</strong><br />';
            notification += 'The project was successfully deleted.</p>';
            $(".notificationText").replaceWith(notification);
        }
    } else {
        // The request wasn't sent with GET data
        $(".notification").css("display","none");
    }
    /* The DOM has completely rendered so we'll send AJAX to the server in order to load the list */
    var documentLocation = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
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
                for (var projectIndex=0;projectIndex < fetchProjectsResponse.projects.length;projectIndex++) {
                    var projectAtCurrentIndex = fetchProjectsResponse.projects[projectIndex];
                    switch (projectAtCurrentIndex.status) {
                        case "completed":
                            var statusIcon = "Assets/Images/Icons/Check%20mark.png";
                            break;
                        case "successful":
                            var statusIcon = "Assets/Images/Icons/List%20with%20checkmarks%20free%20icon.png";
                            break;
                        case "urgent":
                            var statusIcon = "Assets/Images/Icons/Warning%20exclamation%20sign%20in%20filled%20triangle%20free%20icon.png";
                            break;
                        case "delayed":
                            var statusIcon = "Assets/Images/Icons/Clock%20time%20control%20tool.png";
                            break;
                    }
                    var projectElement = '<li id="' + projectAtCurrentIndex["id"] + '">';
                    projectElement += "<p>" + projectAtCurrentIndex["projectName"] + "</p>";
                    if (documentLocation == "/Dashboard.html") {
                        /* The user is visiting the 'Dashboard' page */
                        projectElement += "<p>Completion: " + projectAtCurrentIndex["dueDate"];
                        projectElement += '<img class="statusIcon" src="' + statusIcon + '" alt=""></p></li>';
                    } else {
                        /* The user is visiting another page, presumably the 'Projects' page */
                        projectElement += '<p><a class="button smaller-button delete-button">Delete</a>';
                        projectElement += '<a class="button smaller-button edit-button">Edit</a></p></li>';
                    }
                    $(".projects").append(projectElement); /* Add the new project element to the list */
                }
                if (fetchProjectsResponse.projects.length == 0) {
                    /* There are no projects to display so we'll note the user of that */
                    if (!documentLocation == "/Dashboard.html") {
                        /* We're not at the page above */
                        var noProjectsElement = '<p class="noListElements">You don\'t have any projects at the moment.</p>';
                        $(".projects").replaceWith(noProjectsElement); /* Replace the list with the paragraph above */
                    }
                }
                $(".delete-button").click(function (event, ui) {
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
                                window.location.replace("Projects.html?notification=true");
                            }
                        }
                    });
                });
                $(".edit-button").click(function (event, ui) {
                    // The 'Edit' button was clicked so we'll display the modal and send AJAX upon completion
                    $.ajax({
                        /* Fetch the selected projects' information from the database */
                        "url":"Assets/Scripts/xhr/get_projects.php?projectID=" + $(event.target.parentNode.parentNode).attr("id"),
                        "type":"GET",
                        "dataType":"JSON",
                        "success": function (projectData) {
                            /* The AJAX request has successfully loaded */
                            var projectAtSelectedIndex = projectData.projects[0]; // Assign the project object to a local variable
                            $(".modalView").css("display","block"); // Show the modal view
                            $(".editModalContent").css("display","block"); // Show the edit view
                            var modalTitle = $(".editModalContent > h1:first-of-type"); // Select the header element
                            modalTitle.text("Edit " + projectAtSelectedIndex.projectName + ":"); // Set the header element to match the projects' name
                            if (modalTitle.text().length > 23) {
                                // The title of the edit view is more than 23 characters long, so we'll make it a bit smaller.
                                modalTitle.css("font-size","24px");
                            } else {
                                // The title of the edit view is less than 23 characters long, so we'll use the default size.
                                // This needs to be set each time the edit view is called because the property doesn't reset upon dismissal
                                modalTitle.css("font-size","2.5em");
                            }
                            /* Set the fields' values relative to the selected project */
                            $("#editName").val(projectAtSelectedIndex.projectName);
                            $("#editBrief").val(projectAtSelectedIndex.projectDescription);
                            $("#editDate").val(projectAtSelectedIndex.dueDate);
                            switch (projectAtSelectedIndex.status) {
                                case "successful":
                                    $("#editSuccessful").prop("checked","checked");
                                    break;
                                case "urgent":
                                    $("#editUrgent").prop("checked",true);
                                    break;
                                case "delayed":
                                    $("#editDelayed").prop("checked",true);
                                    break;
                                case "completed":
                                    $("#editCompleted").prop("checked",true);
                                    break;
                            }
                            $(".updateButton").click(function () {
                                // The user has edited the fields and clicked the 'Update' button so we'll use AJAX to update the selected project
                                var selectedRadioValue = $(".editStatusRadioButtons input[type='radio']:checked").attr("value");
                                $.ajax({
                                    "url":"Assets/Scripts/xhr/update_project.php",
                                    "type":"POST",
                                    "dataType":"JSON",
                                    "data": {
                                        "projectID": projectAtSelectedIndex.id,
                                        "projectName": $("#editName").val(),
                                        "projectDescription": $("#editBrief").val(),
                                        "dueDate": $("#editDate").val(),
                                        "status": selectedRadioValue
                                    },
                                    "success": function (editedProjectResponseData) {
                                        // The project was updated
                                        $(".modalView").css("display","none");
                                        $(".editModalContent").css("display","none");
                                        /* Reload the page to demonstrate the new changes */
                                        window.location.reload();
                                        window.location.href = window.location.href;
                                    }
                                });
                            });
                        }
                    });
                });
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
    $("#accountButton").click(function () {
        window.location.replace("Accounts.html");
    });
    $(".dismissNotification").click(function () {
        $(".notification").css("display","none");
    });
});