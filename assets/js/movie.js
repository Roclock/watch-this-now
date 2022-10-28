// Create Movie Class
class Movie {

    constructor(id, title, plot, poster, ranking, trailer, state) {
        this.id = id;
        this.title = title;
        this.plot = plot;
        this.poster = poster;
        this.ranking = ranking;
        this.trailer = trailer;
        this.state = state;
    }

    isToBeWatched() {
        return this.state === "to-be-watched";
    }

    isWatched() {
        return this.state === "watched";
    }

    isWatching() {
        return this.state === "watching";
    }

    // Function to stringify the movie object
    toString() {
        return JSON.stringify(this);
    }

    // Return movie info link
    link() {
        // Return tmdb link
        var l = "https://www.themoviedb.org/movie/" + this.id;
        return l;
    }
    // Fuction to save movie to storage
    store() {
        // Get existing movies from storage
        var movies = JSON.parse(localStorage.getItem("movies"));
        // If no movies, create an array
        if (!movies) {
            movies = [];
        }

        // Check if the movie is in the array by comparing ids
        var found = false;
        for (var i = 0; i < movies.length; i++) {
            if (movies[i].id === this.id) {
                movies[i] = this;
                found = true;
                break;
            }
        }

        if (!found) {
            movies.push(this);
        }

        // Save movie to local storage
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // Add remove function to remove the movie from local storage
    remove() {
        // Get existing movies from storage
        var movies = JSON.parse(localStorage.getItem("movies"));
        // If no movies, create an array
        if (!movies) {
            movies = [];
        }
        // Find movie in array and remove it
        for (var i = 0; i < movies.length; i++) {
            if (movies[i].id === this.id) {
                movies.splice(i, 1);
                break;
            }
        }
        // Save movie to local storage
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // Add static methods to load movies from localStorge
    static loadJSON() {
        // Get existing movies from storage
        var movies = JSON.parse(localStorage.getItem("movies"));
        // If no movies, create an array
        if (!movies) {
            movies = [];
        }
        return movies;
    }

    static loadMovies() {
        var movies = Movie.loadJSON();
        var movieObjects = [];
        movies.forEach(function (movie) {
            movieObjects.push(new Movie(movie.id, movie.title, movie.plot, movie.poster, movie.ranking, movie.trailer, movie.state));
        });
        return movieObjects;
    }

    // Add static method to parse the movie object and return a new movie object
    static parse(movieJson) {
        var movie = JSON.parse(movieJson);
        return new Movie(movie.id, movie.title, movie.plot, movie.poster, movie.ranking, movie.trailer, movie.state);
    }
}
// // Create the godfather movie
// var godfather = new Movie(1,"The Godfather","The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.","https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",8.6,1,"toBeWatched");
// // Create Star Wars movie
// var starWars = new Movie(2,"Star Wars","Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the evil Darth Vader.","https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",8.1,2,"toBeWatched");
// // Save it to local storage
// // localStorage.setItem("godfather",godfather.toString());
// var movies = [godfather,starWars];
// console.log(movies);