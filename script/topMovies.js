$(document).ready(function () {
    $.ajax({
        url: "https://imdb-api.com/en/API/Top250Movies/k_uggjnm6p",
        dataType: "json",
        success: function (data) {
            data = data.items;
            const title = "<h2>Top 100 films (IMDb)</h2>";
            var movies = "<div class=container>";
            for (let i = 0; i < 100; i++) {
                const element = data[i];
                movies += "<div class=item><p>" + element.rank + ". " + element.fullTitle + "<br/>";
                movies += "<i>" + element.imDbRating + " (" + element.imDbRatingCount + ")</i></p>";
                movies += "<img src =" + element.image + " height=200 width=150></div>";
            }
            movies += "</div>";
            document.querySelector('.topMovies').innerHTML += title + movies;
            //repositionnement du footer
            $("footer").css("position", "initial");
        }
    });
});