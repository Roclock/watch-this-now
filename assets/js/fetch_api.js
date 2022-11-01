
var API_KEY = "b47e20bd83e9aac5340afcb226fa4def";
var BASE_URL = "https://api.themoviedb.org/3";
var IMAGE_URL = "https://image.tmdb.org/t/p/w500";
var TMDB_TYPE = "movie"; // movie, tv or multi
var NOW_PLAYING = [];

var MDBLIST_URL = "https://mdblist.p.rapidapi.com/?tm=";
const MDBLIST_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7871a3a984msh9c8fac100c1803dp118287jsnb2f0f33c75ea',
        'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
    }
}

var SA_API_KEY = "7871a3a984msh9c8fac100c1803dp118287jsnb2f0f33c75ea";
var SA_BASE_URL = "streaming-availability.p.rapidapi.com";
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': BASE_URL
    }
};

var SERVICES = "netflix,prime,disney,hbo,hulu,peacock,paramount,starz,showtime,apple,mubi";
var LOGOS = {
    "netflix": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/330px-Netflix_2015_logo.svg.png",
    "prime": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/338px-Amazon_Prime_Video_logo.svg.png",
    "disney": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/300px-Disney%2B_logo.svg.png",
    "hbo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/330px-HBO_Max_Logo.svg.png",
    "hulu": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/330px-Hulu_Logo.svg.png",
    "peacock": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/NBCUniversal_Peacock_Logo.svg/330px-NBCUniversal_Peacock_Logo.svg.png",
    "paramount": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Paramount%2B_logo.png/330px-Paramount%2B_logo.png",
    "starz": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Starz_2022.svg/375px-Starz_2022.svg.png",
    "showtime": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Showtime_Networks.svg/330px-Showtime_Networks.svg.png",
    "apple": "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Apple_TV_%28logo%29.svg/177px-Apple_TV_%28logo%29.svg.png",
    "mubi": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mubi_logo.svg/330px-Mubi_logo.svg.png"
};

var PROVIDERS_URL = {
    "Netflix": "http://netflix.com",
    "Hulu": "http://hulu.com",
    "Amazon Prime Video": "http://amazon.com",
    "Disney Plus": "http://disneyplus.com",
    "HBO Max": "http://hbomax.com",
    "Peacock": "http://peacocktv.com",
    "Paramount+": "http://paramountplus.com",
    "Starz": "http://starz.com",
    "Showtime": "http://showtime.com",
    "Apple TV Plus": "http://appletvplus.com",
    "Mubi": "http://mubi.com",
    "DIRECTV": "http://directv.com",
    "TNT": "http://tntdrama.com",
    "TBS": "http://tbs.com",
    "Crackle": "http://crackle.com",
    "FuboTV": "http://fubo.tv",
    "HBO": "http://hbo.com",
    "HBO Go": "http://hbogo.com",
    "HBO Now": "http://hbogo.com",
    "Hulu Live TV": "http://hulu.com",
    "Sling TV": "http://sling.com",
    "YouTube TV": "http://youtube.com",
    "CBS All Access": "http://cbs.com",
    "CBS": "http://cbs.com",
    "CBS All Access": "http://cbs.com",
    "tru TV": "http://tru.tv",
};

PROVIDERS_MOVIES_URL = {
    "Netflix": "https://www.netflix.com/title/",
    "Hulu": "https://www.hulu.com/movie/",
    "Amazon Prime Video": "https://www.amazon.com/gp/video/detail/",
    "Disney Plus": "https://www.disneyplus.com/movies/",
    "HBO Max": "https://www.hbomax.com/movies/",
    "Peacock": "https://www.peacocktv.com/movie/",
    "Paramount+": "https://www.paramountplus.com/movies/",
    "Starz": "https://www.starz.com/movies/",
    "Showtime": "https://www.showtime.com/movies/",
    "Apple TV Plus": "https://tv.apple.com/movie/",
    "Mubi": "https://mubi.com/films/",
    "DIRECTV": "https://www.directv.com/searchResults?keyword=",
    "TNT": "https://www.tntdrama.com/movies/",
    "TBS": "https://www.tbs.com/movies/",
    "Crackle": "https://www.crackle.com/movies/",
    "FuboTV": "https://www.fubo.tv/movies/",
    "HBO": "https://www.hbo.com/movies/",
    "HBO Go": "https://www.hbogo.com/movies/",
    "HBO Now": "https://www.hbogo.com/movies/",
    "Hulu Live TV": "https://www.hulu.com/movie/",
    "Sling TV": "https://www.sling.com/movies/",
    "YouTube TV": "https://www.youtube.com/movies/",
    "CBS All Access": "https://www.cbs.com/shows/",
    "CBS": "https://www.cbs.com/shows/",
    "CBS All Access": "https://www.cbs.com/shows/",
    "tru TV": "https://www.tru.tv/shows/"
};

// Function to keep track of search history
function saveToHistory(query) {
    // Keep track of the search history
    var searchHistory = loadSearchHistory();

    // Check if the query is already in the search history
    var found = false;
    for (var i = 0; i < searchHistory.length; i++) {
        if (searchHistory[i] === query) {
            found = true;
            break;
        }
    }
    if (!found) {
        searchHistory.push(query);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
}

function getSearchContent() {
    var searchHistory = loadSearchHistory();
    var content = [];
    for (var i = 0; i < searchHistory.length; i++) {
        var query = searchHistory[i];
        content.push({ title: query });
    }
    return content;
}

// Fuction to load search history
function loadSearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (!searchHistory) {
        searchHistory = [];
    }
    return searchHistory;
}

// Function to clear the search history
function clearHistory() {
    // Delete search history from local storage
    localStorage.removeItem("searchHistory");
}
//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
function getNowPlaying(){
    return NOW_PLAYING;
}
function searchNowPlaying() {
    var queryURL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
          
            for (var i = 0; i < data.results.length; i++) {
                var result = data.results[i];
              
                // this.id = id;
                // this.title = title;
                // this.plot = plot;
                // this.poster = poster;
                // this.ranking = ranking;
                // this.trailer = trailer;
                // this.state = state;
                // this.providers = providers;
                // this.providersLogos = providersLogos;
                // 
                var poster = IMAGE_URL+result.poster_path;
                var movie = new Movie(result.id,result.title,result.overview,poster,result.vote_average);
                movie.releaseDate = result.release_date;

                NOW_PLAYING.push(movie);
            }
        })
        .catch(err => console.error(err));
}

function searchMovie(query, results) {
    var queryURL = `${BASE_URL}/search/${TMDB_TYPE}?query=${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            for (var i = 0; i < data.results.length; i++) {
                var result = data.results[i];
                var movie = new Movie(result.id, result.title, result.overview, IMAGE_URL + result.poster_path, result.vote_average, result.id, "toBeWatched");
                searchProvidersMovie(movie);
                // console.log("result for " + query + ": ", result);
                found(movie);
            }
        })
        .catch(err => console.error(err));
    saveToHistory(query);
}

// Search for watch providers
function searchProviders() {
    var queryURL = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${API_KEY}&language=en-US&watch_region=us`;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("providers: ", data);
        });
}

function searchProvidersMovie(movie) {
    // console.log("Searching for providers for movie: ", movie);
    if(movie.providers) {
        return;
    }

    // console.log("----------------------searchProvidersMovie: ", movie,movie.providers);
    var queryURL = `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${API_KEY}`;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Will select only streaming providers
            if (data.results.US && data.results.US.flatrate) {
               
                var providersNames = data.results.US.flatrate.map(provider => provider.provider_name);
                var providersLogos = data.results.US.flatrate.map(provider => `${IMAGE_URL}${provider.logo_path}`);
                // console.log("providers: ", movie,providersNames, providersLogos);
                movie.providers = providersNames;
                movie.providersLogos = providersLogos;
                // movie.store();
                findProviders(movie);
            }
        });
}

// searchProviders();

// Function to add trailer data to the page
function watchTrailer(tmdbID) {
    // Add the trailer data to the page
    fetch(`${MDBLIST_URL}${tmdbID}`, MDBLIST_OPTIONS)
        .then(response => response.json())
        .then(function (data) {
            // console.log("----------- trailer------")
            // console.log(data);
            var trailer = data.trailer;
            window.open(trailer, "_blank");
        })
        .catch(err => console.error(err));
};


// Function to add trailer data to the page
function watchTrailerEmbed(tmdbID, videoPlayer) {
    // Add the trailer data to the page
    console.log("get trailer:", tmdbID);
    fetch(`${MDBLIST_URL}${tmdbID}`, MDBLIST_OPTIONS)
        .then(response => response.json())
        .then(function (data) {
            // console.log("----------- trailer------")
            // console.log(data);
            var trailer = data.trailer;
           
            var embed = "https://www.youtube.com/embed/" + trailer.split("=")[1];
            videoPlayer.attr("src", embed);
        })
        .catch(err => console.error(err));
};


function findStreamingMovies(movie) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': SA_API_KEY,
            'X-RapidAPI-Host': SA_BASE_URL
        }
    };
    var query = movie.title;
    var queryURL = `https://${SA_BASE_URL}/search/ultra?country=us&services=${SERVICES}&type=movie&order_by=imdb_vote_count&desc=true&language=en&keyword=${query}&output_language=en`;

    fetch(queryURL, options)
        .then(response => response.json())
        .then(function (data) {
            var results = data.results;
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                // console.log("Streaming results " + query, movie, results);
                if (result.tmdbID == movie.id) {
                    console.log("found streaming movie", movie, result);

                    return;
                }
            }
        });

}