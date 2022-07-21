$(document).ready(function () {
    $.ajax({
        url: "https://imdb-api.com/en/API/Top250TVs/k_uggjnm6p",
        dataType: "json",
        success: function (data) {
            data = data.items;
            const title = "<h2>Top 100 Séries (IMDb)</h2>";
            var series = "<div class=container>";
            for (let i = 0; i < 100; i++) {
                const element = data[i];
                series += "<div class=item><p>" + element.rank + ". " + element.fullTitle + "<br/>";
                series += "<i>" + element.imDbRating + " (" + element.imDbRatingCount + ")</i></p>";
                series += "<img src =" + element.image + " height=200 width=150></div>";
            }
            series += "</div>";
            document.querySelector('.topSeries').innerHTML += title + series;
            //repositionnement du footer
            $("footer").css("position", "initial");
        }
    });
});