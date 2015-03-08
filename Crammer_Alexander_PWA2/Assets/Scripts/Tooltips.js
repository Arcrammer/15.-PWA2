/*  Animation
    Tooltips.js
    Thursday, 5 March, 2015
    Alexander Rhett Crammer  */

$(".tooltip").hover(function () {
    /* Element with the class 'tooltip' has been hovered over */
    var text = $(this).attr("title"); /* Storing the value of the elements' 'title' attribute to the 'text' variable */
    $(this).data("tooltipTitle", text) /* Setting the 'title' data to the elements' 'tooltipTitle' key */
    .removeAttr("title"); /* Removing the 'title' attribute from the element */
    $('<p class="tooltip"></p>').text(text) /* Creating a 'p' element with the class of 'tooltip', then setting its' inner HTML to the 'text' value */
    .appendTo("body") /* Adding the 'p' element to 'body' */
    .fadeIn("slow"); /* Fade it into the viewport lastly */
}, function () {
    /* Element with the class 'tooltip' has been hovered away from */
    $(this).attr("title", $(this).data("tooltipTitle")); /* Set the attribute of the elements' 'title' attribute to the arbitrary 'tooltipTitle' data */
    $("p.tooltip").remove(); /* Remove the 'p' element from 'body' */
}).mousemove(function (mouseMovement) {
    /* The user is hovering over an element with the class 'tooltip' and the mouse has moved */
    var positionUpdate = {
            "position":"absolute",
            "top": mouseMovement.pageY + 15, /* Vertical position of the mouse added with 20 */
            "left": mouseMovement.pageX - 40, /* Horizontal position of the mouse subtracted by 30 */
            "z-index":"1"
        }; /* Defining the CSS properties to be applied to the 'p' element as the mouse moves */
    $("p.tooltip").css(positionUpdate); /* Applying the new position of the 'p' element */
});