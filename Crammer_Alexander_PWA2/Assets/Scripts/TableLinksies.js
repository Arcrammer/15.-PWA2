/*  Animation
    TableLinksies.js
    Thursday, 5 March, 2015
    Alexander Rhett Crammer  */

/* Document Overview: Send POST data to a given page for a given property then load that page accounting for the POST data sent. */

function sendPOSTData(processingDocument, properties) {
    var currentIndex = 0; /* This is a simple integer to be incremented by 1 throughout each loop in the following 'for ()' */
    var postFormElement = '<form action="' + processingDocument + '" method="POST" id="tableLinksies">'; /* This will be appended after the 'for ()' */
    for (propertyName in properties) {
        /* This 'for ()' will iterate once for each property in the object passed */
        postFormElement += '<input type="hidden" name="' + propertyName + '" value="' + properties[propertyName] + '">'; /* Hidden HTML input element */
        currentIndex++; /* Increasing the 'currentIndex' variable once for each loop */
    }
    postFormElement += "</form>"; /* This is the closing form element to be appended later (the next line, actually) */
    $(document.body).append(postFormElement); /* Appending the elements of the 'postFormElement' string to the 'body' element */
    currentIndex = keys = postFormElement = null; /* Clearing all of the variables (Not that this is a large application, but still) */
    $("form#tableLinksies").submit(); /* Submitting the form thus sending the user to the 'processingDocument' page carrying the POST data, too */
}