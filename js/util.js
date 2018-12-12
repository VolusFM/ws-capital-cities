var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function readTextFile(filename, callback) {
    $.get(filename, function(data) {
        callback(data);
    }, 'text');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function request(filename, fieldId, capital, format) {
    // console.log("request");
    // console.log(filename);
    readTextFile(filename, function(req) {
        req = req.replace('%CAPITAL_URL%', '"' + capital + '"');
        console.log(req);
        var reqUrl = 'http://dbpedia.org/sparql/?default-graph-uri=http%3A%2F%2Fdbpedia.org&query='+ encodeURIComponent(req) +'&format=json';
        $.getJSON(reqUrl+"&callback=?", function(resultatsReq) {
            console.log(resultatsReq);
            var first = result = resultatsReq.results.bindings[0];
            if (first !== undefined && first !== null) {
                var result = format(first);
                // console.log(result);
                $(fieldId).text(result);
            } else {
                $(fieldId).parent().hide();
                $(fieldId).text("UNDEFINED");
            }
        });
    });
}

function requestLink(filename, fieldId, capital, format) {
    // console.log("request");
    // console.log(filename);
    readTextFile(filename, function(req) {
        req = req.replace('%CAPITAL_URL%', '"' + capital + '"');
        // console.log(req);
        var reqUrl = 'http://dbpedia.org/sparql/?default-graph-uri=http%3A%2F%2Fdbpedia.org&query='+ encodeURIComponent(req) +'&format=json';
        $.getJSON(reqUrl+"&callback=?", function(resultatsReq) {
            // console.log(resultatsReq);
            var first = result = resultatsReq.results.bindings[0];
            if (first !== undefined && first !== null) {
                var result = format(first);
                // console.log(result);
                $(fieldId).attr("href", result);
            } else {
                $(fieldId).parent().parent().hide();
            }
        });
    });
}

function requestImage(filename, fieldId, capital, format) {
    // console.log("request");
    readTextFile(filename, function(req) {
        req = req.replace('%CAPITAL_URL%', '"' + capital + '"');
        // console.log(req);
        var reqUrl = 'http://dbpedia.org/sparql/?default-graph-uri=http%3A%2F%2Fdbpedia.org&query='+ encodeURIComponent(req) +'&format=json';
        $.getJSON(reqUrl+"&callback=?", function(resultatsReq) {
            // console.log(resultatsReq);
            var first = result = resultatsReq.results.bindings[0];
            if (first !== undefined && first !== null) {
                var result = format(first);
                // console.log(result);
                $(fieldId).attr("src", result);
            } else {
                $(fieldId).hide();
                $(fieldId).attr("alt", "Pas d'image trouvée");
            }
        });
    });
}