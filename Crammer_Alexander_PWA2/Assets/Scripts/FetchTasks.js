/*  AJAX
    FetchTasks.js
    Friday, 6 March, 2015
    Alexander Rhett Crammer  */

/* Document Overview: Fill a list with task data retrieved dynamically */

$(document).ready(function () {
    var documentLocation = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
    $.ajax({
        "url":"Assets/Scripts/xhr/get_tasks.php",
        "type":"GET",
        "dataType":"JSON",
        "success": function (fetchTasksResponse) {
            if (fetchTasksResponse.error) {
                /* There was a problem fetching the tasks */
                alert("Your tasks couldn't be loaded.");
                console.log(fetchTasksResponse.error);
            } else {
                /* There wasn't an error */
                for (var taskIndex=0;taskIndex < fetchTasksResponse.tasks.length;taskIndex++) {
                    var taskAtCurrentIndex = fetchTasksResponse.tasks[taskIndex];
                    var tastElement = '<li id="' + taskAtCurrentIndex["id"] + '">';
                    tastElement += "<p>" + taskAtCurrentIndex["taskName"] + "</p>";
                    if (documentLocation == "/Dashboard.html") {
                        /* The user is visiting the 'Dashboard' page */
                        tastElement += "<p>" + taskAtCurrentIndex["taskDescription"] + "</p></li>";
                    }
                    $(".tasks").append(tastElement);
                    $(".delete-button").click(function () {
                        $.ajax({
                            "url":"Assets/Scripts/xhr/delete_task.php",
                            "data": {
                                "taskID": taskAtCurrentIndex.id
                            },
                            "type":"POST",
                            "dataType":"JSON",
                            "success": function (deleteTaskResponse) {
                                if (deleteTaskResponse.error) {
                                    alert(deleteTaskResponse.error);
                                } else {
                                    window.location.reload();
                                }
                            }
                        });
                    });
                }
                if (fetchTasksResponse.tasks.length == 0) {
                    /* There are no tasks to display so we'll note the user of that */
                    if (!documentLocation == "/Dashboard.html") {
                        var noTasksElement = '<p class="noListElements">You don\'t have any tasks at the moment.</p>';
                        $(".tasks").replaceWith(noTasksElement);
                    }
                }
            }
        }
    });
});