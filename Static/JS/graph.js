/*global queue*/
queue()
/*global d3*/
    .defer(d3.csv, "Static/Data/international-visitors-london.csv")
    .await(makeGraphs);
    
function makeGraphs(error, londonData){
    /*global crossfilter*/
    var ndx = crossfilter(londonData);
    
    londonData.forEach(function(d) {
        d.country = parseInt(d.market);
        d.arrival = parseInt(d.mode);
        d.reason = parseInt(d.purpose);
        d.nights = parseInt(d.nights);
        d.year = parseInt(d.year);
        d.spend = parseInt(d.spend);
        d.visits = parseInt(d.visits);
        d.quarter = parseInt(d.quarter);
        d.sample = parseInt(d.sample);
        d.area = parseInt(d.area);

    });
    
    show_selector(ndx);
    show_total_spent(ndx);
    show_total_visits(ndx);
    show_reason_for_visit(ndx);
    show_method_of_arrival(ndx);
    show_country_of_origin(ndx);
    show_visit_per_year(ndx);
    visits_per_country(ndx);
    Country_of_origin(ndx);
    
    /*global dc*/
    dc.renderAll();
}


function show_selector(ndx) {
    var countryDim = ndx.dimension(dc.pluck('market'));
    var group = countryDim.group();

    dc.selectMenu('#selectMenu')
        .dimension(countryDim)
        .group(group);
}

function show_total_spent(ndx) {
    var totalSpend = ndx.groupAll().reduce(
        function(p, v) {
            if (v.spend === 1) {
                p.Spend++;
            }
            return p;
        },
        function(p, v) {
            if (v.spend === 1) {
                p.Spend--;
            }
            return p;
        },
        function() {
            return {
                Spend: 0
            };
        }
    );

    dc.numberDisplay("#spent")
        .formatNumber(d3.format("1"))
        .valueAccessor(function(d) {
            return d.Spend;
        })
        .group(totalSpend);
}

function show_total_visits(ndx){
    var totalVisits = ndx.groupAll().reduce(
        function(p, v) {
            if (v.visits === 1) {
                p.visits++;
            }
            return p;
        },
        function(p, v) {
            if (v.visits === 1) {
                p.visits--;
            }
            return p;
        },
        function() {
            return {
                visits: 0
            };
        }
    );

    dc.numberDisplay("#visits")
        .formatNumber(d3.format("1"))
        .valueAccessor(function(d) {
            return d.visits;
        })
        .group(totalVisits);
}

function show_reason_for_visit(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Tunnel", "Sea", "Air"])
        .range(["#B3DC81", "#85C850", "#74B044"]);
    var reasonDim = ndx.dimension(dc.pluck('mode'));
    var group = reasonDim.group();

    dc.barChart("#reason")
        .width(600)
        .height(400)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors)
        .margins({ top: 10, right: 50, bottom: 40, left: 80 })
        .dimension(reasonDim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("method of arrival")
        .yAxis().ticks(5);
        
}

function show_method_of_arrival(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Tunnel", "Sea", "Air"])
        .range(["#B3DC81", "#85C850", "#74B044"]);
    var arrivalDim = ndx.dimension(dc.pluck("mode"));
    var methodOfArrival = arrivalDim.group();

    dc.pieChart("#arrival")
        .height(400)
        .radius(200)
        .transitionDuration(500)
        .dimension(arrivalDim)
        .group(methodOfArrival)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors);
}

function show_country_of_origin(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Business", "Holiday", "Study", "Miscellaneous", "VFR"])
        .range(["#B3DC81", "#85C850", "#74B044", "#57AD13", "#519F14"]);
    var countryDim = ndx.dimension(dc.pluck("purpose"));
    var countryOfOrigin = countryDim.group();

    dc.pieChart("#country")
        .height(350)
        .radius(200)
        .transitionDuration(500)
        .dimension(countryDim)
        .group(countryOfOrigin)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors);
}

function show_visit_per_year(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["1-3 nights", "4-7 nights", "8-14 nights", "15+ nights"])
        .range(["#0481BB", "#048AC9", "#069CE3"]);
    var countryDim = ndx.dimension(dc.pluck("dur_stay"));
    var countryOfOrigin = countryDim.group();

    dc.pieChart("#pie-spend")
        .height(250)
        .radius(100)
        .transitionDuration(500)
        .dimension(countryDim)
        .group(countryOfOrigin)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors);
}

function visits_per_country(ndx) {
    
    var typeColors = d3.scale.ordinal()
        .domain(["Air", "Tunnel", "Sea"])
        .range(["#B3DC81", "#85C850", "#74B044"])

    function modeArrivedBy (dimension, mode) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.mode == mode) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.mode == mode) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    var dim = ndx.dimension(dc.pluck("purpose"));
    var tunnelOfArrival = modeArrivedBy(dim, "Air");
    var airOfArrival = modeArrivedBy(dim, "Tunnel");
    var seaOfArrival = modeArrivedBy(dim, "Sea");
    
    console.log(tunnelOfArrival.all());
    
    dc.barChart("#VPC")
        .width(500)
        .height(400)
        .dimension(dim)
        .group(tunnelOfArrival, "Air")
        .stack(airOfArrival, "Tunnel")
        .stack(seaOfArrival, "Sea")
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(430).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 100, bottom: 30, left: 50})
        .colors(typeColors);
}

function Country_of_origin(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["country"])
        .range(["#B3DC81", "#85C850", "#74B044"]);
    var countryDim = ndx.dimension(dc.pluck('market'));
    var group = countryDim.group();

    dc.barChart("#market")
        .width(1100)
        .height(200)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors)
        .margins({ top: 10, right: 50, bottom: 40, left: 80 })
        .dimension(countryDim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxis().ticks(5);
}
