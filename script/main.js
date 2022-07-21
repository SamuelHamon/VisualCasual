$(document).ready(function () {
    $(".movieInfos").hide();
    $(".movieResume").hide();
    $("#search").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "http://www.omdbapi.com/?apikey=14dbc9a6&s=" + $("#search").val(),
                data: {
                    q: request.term
                },
                dataType: "json",
                success: function (data) {
                    response($.map(data.Search, function (item) {
                        return {
                            label: item.Title + ' (' + item.Type + ' ' + item.Year + ')',
                            id: item.imdbID,
                        };
                    }));
                }
            });
        },
        select: function (event, ui) {
            $.ajax({
                url: "https://imdb-api.com/fr/API/Title/k_uggjnm6p/" + ui.item.id + "/Trailer,",
                dataType: "json",
                success: function (data) {
                    //on enlève le logo
                    $(".logo").css("display", "none");

                    if ($(".movieTitle").is(':empty') == false) {
                        $(".movieTitle").empty();
                        $(".movieImage").empty();
                        $(".movieInfos").empty();
                        $(".movieResume").empty();
                        $(".movieVideo").empty();
                        $(".otherMovies").empty();
                    }

                    //Titre du film
                    const title = "<h2>" + data.fullTitle + "</h2>";
                    document.querySelector('.movieTitle').innerHTML += title;

                    //Image du film
                    const image = "<img src =" + data.image + " height=400 width=300>";
                    document.querySelector('.movieImage').innerHTML += image;

                    //Infos du film
                    var infosData = {
                        "Studio(s)": data.companies,
                        "Pays": data.countries,
                        "Genre(s)": data.genres,
                        "Contenu classé": data.contentRating,
                        "Durée": data.runtimeStr,
                        "Récompense(s)": data.awards,
                        "Écrit par": data.writers
                    };
                    if (data.imDbRating != null) {
                        infosData["Note (imDb)"] = data.imDbRating + "/10 (" + data.imDbRatingVotes + " votes)";
                    }
                    if (data.tvSeriesInfo != null) {
                        infosData["Saison(s)"] = data.tvSeriesInfo.seasons.length;
                        infosData["Auteur(s)"] = data.tvSeriesInfo.seasons.creators;
                    }
                    var infos = "<ul>";
                    for (var key in infosData) {
                        var value = infosData[key];
                        if (value != null && value != "") {
                            infos += "<li>" + key + " : " + value + "</li>";
                        }
                    }
                    infos += "</ul>";
                    $(".movieInfos").show();
                    document.querySelector('.movieInfos').innerHTML += infos;

                    //Résumé du film
                    if (data.plotLocal != null) {
                        const resume = "<p>" + data.plotLocal + "</p>";
                        $(".movieResume").show();
                        document.querySelector('.movieResume').innerHTML += resume;
                    } else if (data.plot != null) {
                        const resume = "<p>" + data.plot + "</p>";
                        $(".movieResume").show();
                        document.querySelector('.movieResume').innerHTML += resume;
                    }

                    //Trailer du film
                    if (data.trailer != null) {
                        const video = "<iframe src=" + data.trailer.linkEmbed + "></iframe>";
                        document.querySelector('.movieVideo').innerHTML += video;
                    }

                    //Films similaires
                    if (data.similars != null) {
                        const otherTitle = "<h2>Films/Séries similaires</h2>";
                        var other = "<div class=container>";
                        for (let i = 0; i < data.similars.length; i++) {
                            const element = data.similars[i];
                            other += "<div class=item><p>" + element.title + " (" + element.imDbRating + ")</p>";
                            other += "<img src =" + element.image + " height=200 width=150></div>";
                        }
                        other += "</div>";
                        document.querySelector('.otherMovies').innerHTML += otherTitle + other;
                    }

                    //repositionnement du footer
                    $("footer").css("position", "initial");
                }
            });
        }
    });
});