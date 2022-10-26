// Create movie card
function createMovieIconCard(movie) {
    var item = $("<div>").addClass("item");
    var image = $("<img>")
        .addClass("ui avatar image")
        .attr("src", movie.poster)
        .attr("alt", movie.title)
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    // var content = $("<div>").addClass("content");
    // var header = $("<div>").addClass("header").text(movie.title);
    // var description = $("<div>").text(movie.plot.substring(0, 50) + "...");
    // var ranking = $("<div>").text(movie.ranking);
    // content.append(header);
    item.append(a);
    return item;
}

function createMovieListItem2(movie) {
    var item = $("<div>").addClass("card");
    var image = $("<img>")
        .addClass("ui tiny image right floated")
        .attr("src", movie.poster)
        .attr("alt", movie.title)
        .attr("data-title", movie.title)
        .attr("data-content", movie.plot)
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var content = $("<div>").addClass("content");
    var header = $("<p>").addClass("").text("⭐"+movie.title.substring(0,30));
    // var description = $("<div>").text(movie.plot.substring(0, 50) + "...");
    // var ranking = $("<div>").text(movie.ranking);
    content.append(header);
    item.append(a, header);
    return item;
}

function createMovieListItem(movie) {
    var numChars = 50;
    var movieCard = $("<div>")
                        .addClass("ui card")
                        .attr("style", "max-height: 150px;");

    var image = $("<img>").addClass("right floated mini ui image").attr("src", movie.poster).attr("alt", movie.title);
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var movieBody = $("<h5>")
        .addClass("header")
        .attr("style", "background-color:grey; color:white;height:90%;");
    var title = movie.title;//.substring(0,numChars);

    var movieTitle = $("<p>")
        .addClass("title")
        .text(title)
        // movieTitle.append(movieTitleFill);
    // var plot = movie.plot;
    // var moviePlot = $("<div>").addClass("extra-content").text(plot);
    // var movieRanking = $("<div>").addClass("extra content").text(`Ranking: ${movie.ranking}`);
    // movieTitle.append(moviePoster);
    movieCard.append(movieBody.append(a,movieTitle));
    return movieCard;
}

// Helper fuction to convert movie ranking to heart emoji list
function rankingIcon(ranking) {
    var heartEmojies = [ "💛", "💙","💚","💜","💜","❤️", "❤️", "❤️", "❤️"];
    var emojieCount = 0;
    var rank = "";
    for(var i=0;i<Math.round(ranking);i++) {
        rank += heartEmojies[emojieCount];
        emojieCount++;
        if(emojieCount >= heartEmojies.length) {
            emojieCount = 0;
        }
    }
    return rank + " " + ranking;
}

function createMovieCard(movie) {
    var movieCard = $("<div>").addClass("blue card");
    var image = $("<img>").addClass("right floated small ui image").attr("src", movie.poster).attr("alt", movie.title);
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var movieBody = $("<div>")
        .addClass("content")
        .attr("style", "background-color:#e0e1e2; color:black");
    var movieTitle = $("<h3>")
        .addClass("header")
        .text(movie.title)
    var movieExtraContent = $("<div>")
        .addClass("extra content")
    var moviePlot = $("<div>").addClass("description").text(movie.plot.substring(0, 100) + "...");
    var movieRanking = $("<div>").addClass("extra content").text(rankingIcon(movie.ranking));
    movieExtraContent.append(moviePlot, movieRanking);
    // movieTitle.append(moviePoster);
    movieCard.append(movieBody.append(a, movieTitle), movieExtraContent);
    return movieCard;
}


function createMovieListCard(movie) {

    var movieCard = $("<div>").addClass("red card");
    var image = $("<img>").addClass("right floated tiny ui image").attr("src", movie.poster).attr("alt", movie.title);
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var movieBody = $("<div>")
        .addClass("header")
        .attr("style", "background-color:grey; color:white");
    var movieTitle = $("<h4>")
        .addClass("title")
        .text(movie.title.substring(0,30))
        // movieTitle.append(movieTitleFill);
    var moviePlot = $("<div>").addClass("extra-content").text(movie.plot.substring(0, 50) + "...");
    // var movieRanking = $("<div>").addClass("extra content").text(`Ranking: ${movie.ranking}`);
    // movieTitle.append(moviePoster);
    movieCard.append(movieBody.append(a, movieTitle),moviePlot);
    return movieCard;
}


// fuction createButton
function createButton(iconName, movie, actionmethod) {
    var button = $("<button>")
        .addClass("ui icon button")
        // .text(text)
        .attr("data-movie", movie.toString())
        .on("click", function (event) {
            var newMovie = Movie.parse($(this).attr("data-movie"));
               //    Get event target element
            var target = $(event.target);
            // Set button to loading
            target.addClass("green");
            target.text("✔");
            // Get target children
            var children = target.children()[0];
            actionmethod(newMovie);
        });
    var icon = $("<i>")
        .addClass(iconName + " icon")
        .on("click", function (event) {
            event.stopPropagation();
            // Get parent button
            var parent = $(this).parent();
            // Send click event to parent
            parent.trigger("click");
        });
    button.append(icon);
    return button;
}

// Create card buttons
function createCardButtons(button1,action1,button2,action2,movie) {
    var buttons = $("<div>").addClass("ui two bottom attached buttons");
    var button1 = createButton(button1, movie, action1);
    var button2 = createButton(button2, movie, action2);
    buttons.append(button1,button2);
    return buttons;
}

// Create card buttons
function createCardLinks(button1,action1,button2,action2,movie) {
    var links = $("<div>").addClass("header");
    var link1 = createLink(button1, movie, action1);
    var link2 = createLink(button2, movie, action2);
    links.append(link1,link2);
    return links;
}

// fuction createButton
function createLink(iconName, movie, actionmethod) {

    var button = $("<a>")
        .addClass("ui")
        // .text(iconName)
        .attr("data-movie", movie.toString())

        .on("click", function (event) {
            var newMovie = Movie.parse($(this).attr("data-movie"));
            actionmethod(newMovie);
        });
        // <i class="cloud icon"></i>
    var icon = $("<i>").addClass(iconName + " icon");
    button.append(icon);
    return button;
}

function found(movie) {
    var results = $("#results");
    var card = createMovieCard(movie);
    var buttons = createCardButtons("save",setToBeWatched,"play",trailer,movie);
    card.append(buttons);
    results.append(card);
}

// Add addToWatched function will add the movie to the watched list
function setToBeWatched(movie) {
    movie.state = "to-be-watched";
    movie.store();
    reloadMovies();
}

function setWatching(movie) {
    movie.state = "watching";
    movie.store();
    reloadMovies();
}

function setWatched(movie) {
    movie.state = "watched";
    movie.store();
    reloadMovies();
}
// Add toBeWatched function will add the movie to the database

function toBeWatched(movie) {
    var results = $("#to-be-watched");
    // var card = createMovieCard(movie);
    var card = createMovieListCard(movie);
    var buttons = createCardLinks("eye",setWatching,"delete",deleteMovie,movie);
    // buttons.append(toBeWatchedButton, deleteButton);
    card.append(buttons);
    results.append(card);
}

// Add watched function will add the movie to the database
function watching(movie) {
    console.log("watching",movie);
    var results = $("#watching");
    // var card = createMovieCard(movie);
    var card = createMovieListItem(movie);
    var buttons = $("<div>");//.addClass("ui buttons");
    var watchedButton = createLink("check", movie, setWatched);
    var deleteButton = createLink("delete", movie, deleteMovie);
    buttons.append(watchedButton, deleteButton);
    card.append(buttons);
    results.append(card);

}

// Add watched function will add the movie to the database
function watched(movie) {
    var results = $("#watched");
    var card = createMovieIconCard(movie);
    var buttons = $("<div>");//.addClass("ui two buttons");
    var deleteButton = createLink("archive", movie, deleteMovie);
    buttons.append(deleteButton);
    card.append(buttons);
    results.append(card);
}

// Function to watch trailer
function trailer(movie) {
    $("#video-player").empty()
    $("#trailer-title").text(movie.title);
    $("#trailer-description").text(movie.plot);
    $("#trailer-modal").modal("show");

    watchTrailerEmbed(movie.id,$("#video-player"));
}


// Add removeMovie function will remove the movie from the database
function deleteMovie(movie) {
    movie.remove();
    reloadMovies();
}

// Add nextCategory function will change the category to the next one
function nextCategory(movie) {


}
// Add createNote function will add the note to the database
function createNote(movie) {

}

// Add function to reload local storage and reload the page
function reloadMovies() {

    $("#to-be-watched").empty();
    $("#watching").empty();
    $("#watched").empty();
    var movies = Movie.loadMovies();
    movies.forEach(function (movie) {
        console.log(movie);
        if(movie.isToBeWatched()) {
            toBeWatched(movie);
        } else if(movie.isWatching()) {
            watching(movie);
        } else if(movie.isWatched()) {
            watched(movie);
        }
    });
}
