
var API_KEY = "b47e20bd83e9aac5340afcb226fa4def";
var BASE_URL = "https://api.themoviedb.org/3";
var IMAGE_URL = "https://image.tmdb.org/t/p/w500";
function searchMovie(query, results) {
    var queryURL = `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.results.length; i++) {
                var result = data.results[i];
                var movie = new Movie(result.id, result.title, result.overview, IMAGE_URL + result.poster_path, result.vote_average, result.id, "toBeWatched");
                found(movie);
            }
        })
}

        // Function to add trailer data to the page
        function watchTrailer(tmdbID) {
            // Add the trailer data to the page
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '7871a3a984msh9c8fac100c1803dp118287jsnb2f0f33c75ea',
                    'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
                }
            }
            fetch(`https://mdblist.p.rapidapi.com/?tm=${tmdbID}`, options)
                .then(response => response.json())
                .then(function (data) {
                    console.log("----------- trailer------")
                    console.log(data);
                    var trailer = data.trailer;
                    window.open(trailer, "_blank");
                })
                .catch(err => console.error(err));
        };
