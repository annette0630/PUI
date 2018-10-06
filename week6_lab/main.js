function addNewList() {
    alert('hello world alert!');
    console.log('hello world console');
}


$(document).ready(function(){
    $("#add-item").click(function() { // bind handler for click event
        var list = $("#grocery-list"); // get the ol list by id
        var itemInput = $("#new-list-item"); // get the new item input
      // append the input value within an li element
        list.append("<li>" + itemInput.val() + "</li>");
    });
});
