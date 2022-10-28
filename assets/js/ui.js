var myfoundMoviesCards = {};
var myToBeWatchedMoviesCards = {};
// Create movie card
function createMovieAvatarCard(movie) {
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

function createMovieTextCard(movie) {
    var item = $("<div>").addClass("card movie-text-card");
    var image = $("<img>")
        .addClass("ui floated right avatar image")
        .attr("src", movie.poster)
        .attr("alt", movie.title)
    var a = $("<a>").attr("href", movie.link());
    // a.append(image);
    var content = $("<div>")
        .addClass("extra content movie-text-card-body")
    //     .attr("style", "height:95%;");
    var header = $("<p>")
        .addClass("title movie-text-card-title")
        .text(movie.title)
    // .attr("style", "height:90%;");
    // var description = $("<div>").text(movie.plot.substring(0, 50) + "...");
    // var ranking = $("<div>").text(movie.ranking);
    a.append(header);
    content.append(image, header);
    item.append(content);
    return item;
}

function createMovieMiniCard2(movie) {
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
    var header = $("<p>").addClass("").text("⭐" + movie.title.substring(0, 30));
    // var description = $("<div>").text(movie.plot.substring(0, 50) + "...");
    // var ranking = $("<div>").text(movie.ranking);
    content.append(header);
    item.append(a, header);
    return item;
}

function createMovieMiniCard(movie) {
    var numChars = 50;
    var movieCard = $("<div>")
        .addClass("ui card movie-mini-card")
    // .attr("style", "max-height: 150px;");

    var image = $("<img>").addClass("right floated mini ui image").attr("src", movie.poster).attr("alt", movie.title);
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var movieBody = $("<div>")
        .addClass("header movie-card-mini-body")
    var title = movie.title;//.substring(0,numChars);

    var movieTitle = $("<h5>")
        .addClass("movie-card-mini-title")
        .text(title)
    // movieTitle.append(movieTitleFill);
    // var plot = movie.plot;
    // var moviePlot = $("<div>").addClass("extra-content").text(plot);
    // var movieRanking = $("<div>").addClass("extra content").text(`Ranking: ${movie.ranking}`);
    // movieTitle.append(moviePoster);
    movieCard.append(movieBody.append(a, movieTitle));
    return movieCard;
}

// Helper fuction to convert movie ranking to heart emoji list

function createMovieTinyCard(movie) {

    var movieCard = $("<div>").addClass("card movie-card-tiny");
    var image = $("<img>").addClass("right floated tiny ui image").attr("src", movie.poster).attr("alt", movie.title);
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var movieBody = $("<div>")
        .addClass("header movie-card-tiny-body")

    var movieTitle = $("<h4>")
        .addClass("title movie-card-tiny-title")
        .text(movie.title.substring(0, 30))

    var plot = movie.plot ? movie.plot.substring(0, 50) : "No plot available";
    var moviePlot = $("<p>")
        .addClass("extra content")
        .text(plot + "...");
    movieCard.append(movieBody.append(a, movieTitle), moviePlot);
    return movieCard;
}

// Create card buttons
function createCardButtons(button1, action1, button2, action2, movie, button3, action3) {
    var numBtns = button3 ? "three" : "two";
    var buttons = $("<div>").addClass(`ui ${numBtns} bottom attached buttons card-buttons`);
    var button1 = createButton(button1, movie, action1);
    var button2 = createButton(button2, movie, action2);
    if (button3) {
        var button3 = createButton(button3, movie, action3);
        buttons.append(button1, button2, button3);
    } else {
        buttons.append(button1, button2);
    }
    return buttons;
}

// Create card buttons
function createCardLinks(button1, action1, button2, action2, movie) {
    var links = $("<div>").addClass("header card-links");
    var link1 = createLink(button1, movie, action1);
    var link2 = createLink(button2, movie, action2);
    links.append(link1, link2);
    return links;
}

// fuction createButton
function createLink(iconName, movie, actionmethod) {

    var button = $("<a>")
        .addClass("ui movie-link-a")
        // .text(iconName)
        .attr("data-movie", movie.toString())

        .on("click", function (event) {
            var newMovie = Movie.parse($(this).attr("data-movie"));
            // console.log("Clicked-----",newMovie);
            actionmethod(newMovie);
        });
    // <i class="cloud icon"></i>
    var icon = $("<i>").addClass(iconName + " icon");
    button.append(icon);
    return button;
}

function findProviders(movie) {
    // Add provider images to card
    var cardLinks;
    var card = myfoundMoviesCards[movie.id];
    if (card){
        cardLinks = card.children(".movie-card-small-body");
    } else {
        card = myToBeWatchedMoviesCards[movie.id];
        cardLinks = card.children(".movie-card-tiny-body");

    }

     console.log("card",card,movie,"links:",cardLinks);
    var providerNum = movie.providers ? movie.providers.length : 0;
  
    for (var i = 0; i < providerNum; i++) {
        var pr = movie.providers[i];
        var providerLogo = movie.providersLogos[i];
        var providerLink = $("<a>")
            .attr("href", PROVIDERS_MOVIES_URL[pr]+movie.title)
            .attr("target", "_blank")
        var providerImage = $("<img>")
            .addClass("ui avatar image movie-card-small-avatar")
            .attr("src", providerLogo)
            .attr("alt", pr.name);
        providerLink.append(providerImage);
       
        // Add providerLink to the beggining of the cardLinks
        cardLinks.prepend(providerLink);
    } 

}

function found(movie) {
    var results = $("#search-results");
    var card = createMovieSmallCard(movie);
    // var buttons = createCardButtons("save", setToBeWatched, "play", trailer, movie,"file video",providers);
    var buttons = createCardButtons("save", setToBeWatched, "play", trailer, movie);
    card.append(buttons);
    // card.append(buttons);
    myfoundMoviesCards[movie.id] = card;
    results.append(card);
}

// Add addToWatched function will add the movie to the watched list
function setToBeWatched(movie) {
    movie.state = "to-be-watched";
    movie.store();
    findStreamingMovies(movie);
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
    // If a movie will be watch load its providers
    // searchProvidersMovie(movie);
    // var card = createMovieSmallCard(movie);
    var card = createMovieTinyCard(movie);
    var buttons = createCardLinks("eye", setWatching, "delete", deleteMovie, movie);

    myToBeWatchedMoviesCards[movie.id] = card;
    // Get card children by class name
    searchProvidersMovie(movie);
    // var link = createLink("video", movie, providers);
    // buttons.append(link);
    // buttons.append(toBeWatchedButton, deleteButton);
    card.append(buttons);
    results.append(card);
}

// Add watched function will add the movie to the database
function watching(movie) {
    // console.log("watching", movie);
    var results = $("#watching");
    // var card = createMovieSmallCard(movie);
    var card = createMovieMiniCard(movie);
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
    var card = createMovieMiniCard(movie);
    var buttons = $("<div>");//.addClass("ui two buttons");
    var button1 = createLink("archive", movie, deleteMovie);

    button1.text("👍");

    var button2 = createLink("archive", movie, goodMovie);
    button2.text("👎");

    buttons.append(button2, button1);
    card.append(buttons);
    results.append(card);
}

// Function to watch trailer
function trailer(movie) {

    if (isMobile()) {
        watchTrailer(movie.id);
    } else {
        $("#video-player").empty()
        $("#trailer-title").text(movie.title);
        var plot = movie ? movie.plot : "No plot available";
        $("#trailer-description").text(movie.plot);
        $("#trailer-modal").modal("show");
        watchTrailerEmbed(movie.id, $("#video-player"));
    }
}

function providers(movie) {
    console.log("providers", movie);
    $("#provider-modal-images").empty();
    for (var i = 0; i < movie.providers.length; i++) {
        $("#provider-modal-images")
            .append($("<img>")
                .attr("src", movie.providersLogos[i]))
            .addClass("ui tiny image");

    }
    $("#provider-modal").modal("show");
}


// Add removeMovie function will remove the movie from the database
function deleteMovie(movie) {
    movie.remove();
    reloadMovies();
}

// Add good movie function
function goodMovie(movie) {
    movie.state = "good";
    // movie.store();
    // reloadMovies();
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
        console.log("loading",movie);
        if (movie.isToBeWatched()) {
            toBeWatched(movie);
        } else if (movie.isWatching()) {
            watching(movie);
        } else if (movie.isWatched()) {
            watched(movie);
        }
    });
}


function initUI() {

    $("#searchBtn").on("click", function (event) {
        var keyword = $("#keyword").val().trim();
        console.log("click");
        $("#results").empty();

        // Clear movie card cache
        myfoundMoviesCards = {};

        var movies = searchMovie(keyword, $("#results"));

        // Comment starting here to disable search results modal
        // if (movies > 0) {

        $("#resultsmodal").modal({
            centered: false
        }).modal("show");

        setTimeout(function () {
            $('.ui.modal').modal('refresh');
        }, 300);
        // }
        // Comment end here to disable search results modal
    });

    $("#clearSearchBtn").on("click", function (event) {
        $("#keyword").val("");
        clearHistory();
    });

    $("#keyword").on("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#searchBtn").click();
        }
    });

    $("#results-close").on("click", function (event) {
        $("#search-results").empty();
        $("resultsmodal").modal("hide");
    });

    $("#trailer-close").on("click", function (event) {
        $("#video-player").attr("src", "");
        $("#trailer-modal").modal("hide");
    });

    // If the document is ready reload
}

$(document).ready(function () {
    // Reload the page
    initUI();
    console.log("ready...................");
    reloadMovies();
    $('.ui.search')
        .search({
            source: getSearchContent(),
            showNoResults: false
        });
});