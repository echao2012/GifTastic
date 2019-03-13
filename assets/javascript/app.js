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
        newBtn.addClass("category-button");
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
                // Create a new img
                var newGif = $("<img>");
                newGif.addClass("gif-item");

                // Save the still and animated urls
                newGif.attr("data-still", gif.images.fixed_height_still.url);
                newGif.attr("data-animated", gif.images.fixed_height.url);
                newGif.attr("src", newGif.attr("data-still"));

                // Add the img to the container
                $("#gifs-container").append(newGif);
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
})