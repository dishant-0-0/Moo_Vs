var xhr = new XMLHttpRequest();
xhr.open('GET', '/static/movie_details.json', true);

xhr.onload = function () {

    if (this.status == 200) {

        var data = JSON.parse(this.responseText);
    }
    else {
        console.log('failed');
    }

    /*Search bar*/
    document.getElementById("search_bar").addEventListener("keyup", search => {
        const searchText = search.target.value;
        console.log(searchText)
        const filteredSearch = data.filter((movie) => {
            return movie.title.toLowerCase()===searchText.toLowerCase()
        });
        console.log(filteredSearch);
        moviesPage(filteredSearch);
    });
    /*Search bar*/


    /*Routes*/
    if (location.pathname === "/") {
        indexPage();
    } else if (location.pathname === "/movies") {
        moviesPage(data);
    } else {
        var pathRE = new RegExp("^" + location.pathname + ".*$")
        if (location.pathname.match(pathRE)) {
            individualMoviePage();
        } else {
            document.getElementById("movie_header").innerHTML = "Page Not Found!";
        }
    }
    /*Routes*/


    /*Index Page Function*/
    function indexPage() {

        output = ''

        var rand = Math.floor(Math.random() * 15);
        for (let i = rand; i < rand + 10; i++) {
            output +=
                '<div class="col random_movies">' +
                '<a class="nav-link text-dark" aria-current="page" href="/movies/' + i + '"><img src="' + data[i].poster + '" class="rounded" width="300" height="400">' +
                '<div>' + data[i].title + '</div></a>' +
                '</div>';
        }
        document.getElementById("movie_header").innerHTML = "Featured Movies";
        document.getElementById("movies").innerHTML = output;
    }
    /*Index Page Function*/

    /*Movie Page Function*/
    function moviesPage(data) {

        output = ''

        for (let i in data) {

            output +=
                '<div class="col random_movies">' +
                '<a class="nav-link text-dark" aria-current="page" href="/movies/' + (data[i].index - 1) + '"><img src="' + data[i].poster + '" class="rounded" width="300" height="400">' +
                '<div>' + data[i].title + '</div></a>' +
                '</div>';
        }
        document.getElementById("movie_header").innerHTML = "Movies";
        document.getElementById("movies").innerHTML = output;
    }
    /*Movie Page Function*/

    /*Individual Movie Page Function*/
    function individualMoviePage() {

        let i = parseInt(location.pathname.split('/').at(-1));

        output = ''

        output +=
            '<div class="col-6 random_movies"><a class="nav-link text-dark" aria-current="page" href="#"><img src="' + data[i].poster + '" class="rounded" width="300" height="400"></a></div>' +
            '<div class="col-6 align-middle movie_info">' +
            '<div><b>Title:</b> ' + data[i].title + '</div>' +
            '<div><b>Rating:</b> ' + data[i].avg_rating + '</div>' +
            '<div><b>Director:</b> ' + data[i].director + '</div>' +
            '<div><b>Languages:</b> ' + data[i].languages + '</div>' +
            '<div><b>Genre:</b> ' + data[i].genre + '</div>' +
            '<div><b>Actors:</b> ' + data[i].actors + '</div>' +
            '<div><b>Release Date:</b> ' + data[i].release_date + '</div>' +
            '</div>' +
            '<div class="col movie_info align-middle">' +
            '<div><b>Story Line:</b><br>' + data[i].story_line + '</div><br>' +
            '<div><b>Description:</b><br>' + data[i].description + '</div><br>' +
            '</div>';
        document.getElementById("movie_header").innerHTML = data[i].title;
        document.getElementById("movies").innerHTML = output;
    }
    /*Individual Movie Page Function*/
}

xhr.send();