// This queue() keeps all the JavaScript waiting until all the dashboard is loaded.

/*global queue*/
queue()

// This section tells the JavaScript were the dataset is and to wait for the makeGraph function.

/*global d3*/
    .defer(d3.csv, "Static/Data/international-visitors-london.csv")
    .await(makeGraphs);


// This function is what creates all the charts.
    
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
    
    showSelector(ndx);
    showTotalSpent(ndx);
    showTotalVisits(ndx);
    showReasonForVisit(ndx);
    showMethodOfArrival(ndx);
    showCountryOfOrigin(ndx);
    visitsPerCountry(ndx);
    CountryOfOrigin(ndx);
    
    /*global dc*/
    dc.renderAll();
}


// This function creates the country selector.
function showSelector(ndx) {
    var countryDim = ndx.dimension(dc.pluck('market'));
    var group = countryDim.group();

    dc.selectMenu('#selectMenu')
        .dimension(countryDim)
        .group(group);
}

// This function adds up all the amounts spent in the dataset and shows it on the dashboard.

function showTotalSpent(ndx) {
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

// This function adds up all the visits to London in the dataset and displays it in the dashboard.

function showTotalVisits(ndx){
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

// This function creates a bar-chart that shows how the visiters to london arrived.

function showReasonForVisit(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Tunnel", "Sea", "Air"])
        .range(["#54C3D2", "#54A0D2", "#D26D54", "#54D291"]);
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

// This function creates a pie-chart displaying how the visiters came to london, it also provides us a percentage of how many arrived per mode of
// transport.

function showMethodOfArrival(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Tunnel", "Sea", "Air"])
        .range(["#54C3D2", "#54A0D2", "#D26D54", "#54D291"]);
    var arrivalDim = ndx.dimension(dc.pluck("mode"));
    var methodOfArrival = arrivalDim.group();

    dc.pieChart("#arrival")
        .height(400)
        .radius(200)
        .transitionDuration(500)
        .dimension(arrivalDim)
        .group(methodOfArrival)
        .colorAccessor(function(d) { return d.key[0]; })
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        })
        .colors(typeColors);
}

// This function shows us in the form of a pie-chart what reason the visiters to London had, it also provides us a percentage of how many vistied
// for what reason.

function showCountryOfOrigin(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Business", "Holiday", "Study", "Miscellaneous", "VFR"])
        .range(["#65D254", "#54C3D2", "#54A0D2", "#D26D54", "#54D291"]);
    var countryDim = ndx.dimension(dc.pluck("purpose"));
    var countryOfOrigin = countryDim.group();

    dc.pieChart("#country")
        .height(400)
        .radius(400)
        .transitionDuration(500)
        .dimension(countryDim)
        .group(countryOfOrigin)
        .colorAccessor(function(d) { return d.key[0]; })
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        })
        .colors(typeColors);
}

// This function creates a stacked bar-chart comparing method of arrival to reason for there visit. 

function visitsPerCountry(ndx) {
    
    var typeColors = d3.scale.ordinal()
        .domain(["Air", "Tunnel", "Sea"])
        .range(["#54A0D2", "#54C3D2", "#65D254"])

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
        .legend(dc.legend().x(420).y(50).itemHeight(15).gap(5))
        .margins({top: 10, right: 100, bottom: 80, left: 20})
        .colors(typeColors);
}

// this function creates a simple bar-chart showing how many peop-le visited London by what vountry they arrived from.

function CountryOfOrigin(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["market"])
        .range(["#65D254", "#D28B54", "#D26D54", "#54D291", "#54D2AC", "#54C3D2", "#54A0D2"]);
    var countryDim = ndx.dimension(dc.pluck('market'));
    var group = countryDim.group();

    console.log(group.all());

    dc.barChart("#market")
        .width(1100)
        .height(500)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors)
        .margins({ top: 10, right: 80, bottom: 200, left: 50 })
        .useViewBoxResizing(true)
        .dimension(countryDim)
        .group(group)
        ._rangeBandPadding(1)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxis().ticks(10);
}
