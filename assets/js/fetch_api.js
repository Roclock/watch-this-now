
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
                var movie = {
                    id: result.id,
                    title: result.title,
                    poster: IMAGE_URL + result.poster_path,
                    overview: result.overview,
                    ranking: result.vote_average,
                    trailer: result.id
                }

                results.append($("<h2>").text(`${i + 1}.- ${movie.title}`));
                results.append($("<p>").text(`Plot: ${movie.overview}`));
                results.append($("<p>").text(`Ranking: ${movie.ranking}`));
                results.append($('<img>')
                    .attr("src", movie.poster)
                    .attr("style", "width: 50px"));
                results.append($("<p>")
                    .append($("<button>")
                        .text("Trailer")
                        .attr("data-id", movie.id)
                        .on("click", function () {
                            watchTrailer($(this).attr("data-id"));
                        })
                    ));
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
