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

function createMovieListItem(movie) {
    var item = $("<div>").addClass("item");
    var image = $("<img>")
        .addClass("ui mini image")
        .attr("src", movie.poster)
        .attr("alt", movie.title)
        .attr("data-title", movie.title)
        .attr("data-content", movie.plot)
    var a = $("<a>").attr("href", movie.link());
    // a.append(image);
    var content = $("<div>").addClass("content");
    var header = $("<h5>").addClass("header").text("⭐"+movie.title.substring(0,30));
    // var description = $("<div>").text(movie.plot.substring(0, 50) + "...");
    // var ranking = $("<div>").text(movie.ranking);
    content.append(header);
    item.append(image, content);
    return item;
}

function createMovieCard(movie) {
    var movieCard = $("<div>").addClass("blue card");
    var image = $("<img>").addClass("right floated medium ui image").attr("src", movie.poster).attr("alt", movie.title).attr("width", "90%");
    var a = $("<a>").attr("href", movie.link);
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
    var movieRanking = $("<div>").addClass("extra content").text(`❤💚💛💜💙⭐ ${movie.ranking}`);
    movieExtraContent.append(moviePlot, movieRanking);
    // movieTitle.append(moviePoster);
    movieCard.append(movieBody.append(a, movieTitle), movieExtraContent);
    return movieCard;
}


function createMovieListCard(movie) {

    var movieCard = $("<div>").addClass("red card");
    var image = $("<img>").addClass("right floated small ui image").attr("src", movie.poster).attr("alt", movie.title).attr("width", "90%");
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
        .on("click", function () {
            var newMovie = Movie.parse($(this).attr("data-movie"));
            actionmethod(newMovie);
        });
    var icon = $("<i>").addClass(iconName + " icon");
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

        .on("click", function () {
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
    // var buttons = $("<div>")
        // .addClass("header");
    // var toBeWatchedButton = createButton("eye", movie, watching);
    // var deleteButton = createButton("delete", movie, deleteMovie);
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
    watchTrailer(movie.id);
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
