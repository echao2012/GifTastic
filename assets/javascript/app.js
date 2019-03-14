$(document).ready(function() {
    // Array of preselected button categories to add
    var categories = ["dog", "cat", "rabbit", "hamster"];

    // Add preselected button categories
    categories.forEach(function(category) {
        addButton(category);
    })

    // Adds a search category button with the provided name
    function addButton(category) {
        // Create a new search category button
        var newBtn = $("<button>");
        newBtn.addClass("btn btn-primary category-button");
        newBtn.val(category);
        newBtn.text(category);

        // Add the button to the container
        $("#buttons-container").append(newBtn);
    }

    // Handles events when a search category button is clicked
    $("#buttons-container").on("click", ".category-button", function(){
        addGifs($(this).val());
    })

    // Adds 10 gifs of the provided search category
    function addGifs(category) {
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=JhQEPNAO39YRBWjqrT7TWAAbCLD9Gdpi&limit=10"
        $.get(queryUrl).then(function(response) {
            // Clear all gifs
            $("#gifs-container").empty();

            response.data.forEach(function(gif) {
                // Create a new p for the rating
                var newP = $("<p>");
                newP.text("Rating: " + gif.rating);

                // Create a new img
                var newGif = $("<img>");
                newGif.addClass("gif-item");

                // Create a new div for the image and rating
                var newDiv = $("<div>");
                newDiv.addClass("gif-div");
                newDiv.append(newP);
                newDiv.append(newGif);

                // Save the still and animated urls
                newGif.attr("data-still", gif.images.fixed_height_still.url);
                newGif.attr("data-animated", gif.images.fixed_height.url);
                newGif.attr("src", newGif.attr("data-still"));

                // Add the img to the container
                $("#gifs-container").append(newDiv);
            })
        })
    }

    // Toggles the animation when a gif is clicked
    $("#gifs-container").on("click", ".gif-item", function() {
        if ($(this).attr("src") === $(this).attr("data-still")) {
            $(this).attr("src", $(this).attr("data-animated"));
        } else {
            $(this).attr("src", $(this).attr("data-still"));
        }
    })

    function submitCategory(e) {
        // Only respond to the submit button or the enter key
        if (e.which === 1 || e.which === 13) {
            // Prevent refreshing the page
            e.preventDefault();

            // Get the info entered into the textbox
            var newCategory = $("#category-textbox").val().trim();

            // Ensure the textbox is not blank
            if (newCategory !== "") {
                // Check that the category does not already exist
                if (categories.indexOf(newCategory) < 0) {
                    addButton(newCategory);
                    categories.push(newCategory);
                }

                // Clear the textbox
                $("#category-textbox").val("");
            }
        }
    }

    $("#submit-button").on("click", submitCategory);
    $("#category-textbox").keypress(submitCategory);
})