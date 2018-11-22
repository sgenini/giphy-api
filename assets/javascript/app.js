var categoryArray = ["cat", "dog", "chicken", "hamster", "monkey", "parakeet", "tiger", "gopher", "panda", "alpaca", "lion"];

$("#add-category").on("click", function(event) {
    event.preventDefault();
    var newCategory = $("#user-input").val().trim();
    $("#user-input").val('');
    categoryArray.push(newCategory);
    buildButtons();
});

function buildButtons(){
    $("#button-container").empty();
    for (var j = 0; j < categoryArray.length; j++){
        var newButton = $('<button>');
            newButton.addClass("btn btn-light gif-button mx-1 my-1");
            newButton.attr('data-keyword', categoryArray[j]);
            newButton.text(categoryArray[j]);
        $("#button-container").append(newButton);
    }
}

buildButtons();

$(document).on("click", ".gif-button", function() {
    var keyword = $(this).attr("data-keyword");
    var populateNumber = $("#numberOfGifs").val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      // keyword + "&api_key=mNFvoqdlvdsUiXEwJutQjX7o74jxV4hh&limit=" + populateNumber;
    //   In case of "Failed to load resource: the server responded with a status of 429 ()" 
    //   (due to overuse of personal API key), use the following key (BootCamp API key):
      keyword + "&api_key=dc6zaTOxFJmzC&limit=" + populateNumber;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var keywordDiv = $('<div>');
        keywordDiv.addClass("figure text-center col-lg-3");
        keywordDiv.attr('style', "height: 200px");

        var keywordImage = $('<img>');
        keywordImage.addClass("card-img gif");
        keywordImage.attr('data-animate', results[i].images.fixed_height.url);
        keywordImage.attr('data-still', results[i].images.fixed_height_still.url);
        keywordImage.attr('data-state', "still");
        keywordImage.attr('alt', keyword);
        keywordImage.attr('src', results[i].images.fixed_height_still.url);
        
        // keywordImage.attr('data-rating', results[i].rating)

        var bodyDiv = $('<div class="figurecaption">');
        var p = $('<strong><p>');
        p.text("Rating: " + results[i].rating);
        bodyDiv.append(p);

        keywordDiv.append(keywordImage);
        keywordDiv.prepend(bodyDiv);

        $('#gif-container').prepend(keywordDiv);
      }

    });
  });

  
  $(document).on("click", ".gif", function() {
    var state = $(this).attr('data-state');
    console.log(state);

    if (state === 'still'){
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    }
    else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }

  });