$(document).ready(function() {
    // Array of preselected button categories to add
    var categories = ["dog", "cat", "rabbit", "hamster", "fish", "lion", "tiger", "snake", "elephant", "bear", "horse", "whale", 
                      "turtle", "crocodile", "dolphin", "wolf", "squirrel", "lizard", "frog", "penguin", "zebra"];
    var currentCategory = "";
    var offset = 0;

    // Add preselected button categories
    categories.forEach(function(category) {
        addButton(category);
    });

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
        addGifs($(this).val(), false);
    });

    // Adds 10 gifs of the provided search category
    function addGifs(category, append) {
        // Update the current category and offset if this is a new category
        if (!append) {
            currentCategory = category;
            offset = 0;
        } else {
            offset += 10;
        }

        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=JhQEPNAO39YRBWjqrT7TWAAbCLD9Gdpi&limit=10&offset=" + offset;
        $.get(queryUrl).then(function(response) {
            if (!append) {
                // Clear all gifs
                $("#gifs-container").empty();
            }

            var first = true;
            response.data.forEach(function(gif) {
                // Create a div for text that appears when hovered
                var newTextDiv = $("<div>");
                newTextDiv.addClass("gif-div-text");

                // Create a new p for the title
                var newTitle = $("<p>");
                newTitle.addClass("gif-title-text");
                newTitle.text(gif.title.replace(" GIF", "").toUpperCase());

                // Create a new p for the rating
                var newRating = $("<p>");
                newRating.addClass("gif-rating-text");
                newRating.text("Rating: " + gif.rating);

                // Add the p elements to the div
                newTextDiv.append(newTitle);
                newTextDiv.append(newRating);

                // Create a new img
                var newGif = $("<img>");
                newGif.addClass("img-fluid rounded gif-img");

                // Create a new div for the image and rating
                var newDiv = $("<div>");
                newDiv.addClass("gif-div");
                newDiv.append(newTextDiv);
                newDiv.append(newGif);

                // Save the still and animated urls
                newGif.attr("data-still", gif.images.fixed_height_still.url);
                newGif.attr("data-animated", gif.images.fixed_height.url);
                newGif.attr("src", newGif.attr("data-still"));

                // Add the img to the container
                $("#gifs-container").append(newDiv);

                // Scroll to the added gif if this is the first that we are appending
                if (first && append) {
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $(newDiv).offset().top
                    }, 1000);
                }
                first = false;
            })
        })
    }

    // Toggles the animation when a gif is clicked
    $("#gifs-container").on("click", ".gif-div", function() {
        var gif = $(this).find(".gif-img");
        if (gif.attr("src") === gif.attr("data-still")) {
            gif.attr("src", gif.attr("data-animated"));
        } else {
            gif.attr("src", gif.attr("data-still"));
        }
    });

    function submitCategory(e) {
        // Only respond to the submit button or the enter key
        if (e.which === 1 || e.which === 13) {
            // Prevent refreshing the page
            e.preventDefault();

            // Get the info entered into the textbox
            var newCategory = $("#category-textbox").val().trim().toLowerCase();

            // Ensure the textbox is not blank
            if (newCategory !== "") {
                // Check that the category does not already exist
                if (categories.indexOf(newCategory) < 0) {
                    addButton(newCategory);
                    categories.push(newCategory);
                }

                // Clear the textbox
                $("#category-textbox").val("");

                // Load the gifs
                addGifs(newCategory, false);
            }
        }
    }

    // Load more gifs of the same category
    $("#load-more-button").on("click", function() {
        addGifs(currentCategory, true);
    });

    $("#submit-button").on("click", submitCategory);
    $("#category-textbox").keypress(submitCategory);
})