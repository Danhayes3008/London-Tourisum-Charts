queue()
    .defer(d3.csv, "Static/Data/international-visitors-london.csv")
    .await(makeGraphs);
    
function makeGraphs(error, londonData){
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

    })
    
    show_selector(ndx);
    // show_total_spent(ndx, "#spent");
    show_reason_for_visit(ndx);
    show_method_of_arrival(ndx);
    show_country_of_origin(ndx);
    show_visit_per_year(ndx);
    nights_stayed_per_country(ndx);
    visits_per_country(ndx);
    visits_per_country1(ndx);

    dc.renderAll();
}


function show_selector(ndx){
    
    var countryDim = ndx.dimension(dc.pluck('market'));
    var group = countryDim.group();
    
    dc.selectMenu('#selectMenu')
        .dimension(countryDim)
        .group(group);
}

// function show_total_spent(ndx, spent, element){
//     var totalSpent = ndx.groupAll()
//     dc.numberDisplay()
        
// }

function show_reason_for_visit(ndx){
    var reasonDim = ndx.dimension(dc.pluck('market'));
    var group = reasonDim.group();

    dc.barChart("#reason")
        .width(600)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 40, left: 80 })
        .dimension(reasonDim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("country")
        .yAxis().ticks(5);
}

function show_method_of_arrival(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Tunnel", "Sea", "Air"])
        .range(["#0481BB", "#048AC9", "#069CE3" ]);
    var arrivalDim = ndx.dimension(dc.pluck("mode"));
    var methodOfArrival = arrivalDim.group();

    dc.pieChart("#arrival")
        .height(250)
        .radius(100)
        .transitionDuration(500)
        .dimension(arrivalDim)
        .group(methodOfArrival)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors);
}

function show_country_of_origin(ndx){
    var typeColors = d3.scale.ordinal()
        .domain(["Business", "Holiday", "Study", "Miscellaneous", "VFR"])
        .range(["#0481BB", "#048AC9", "#069CE3" ]);
    var countryDim = ndx.dimension(dc.pluck("purpose"));
    var countryOfOrigin = countryDim.group();
    
    dc.pieChart("#country")
        .height(250)
        .radius(100)
        .transitionDuration(500)
        .dimension(countryDim)
        .group(countryOfOrigin)
        .colorAccessor(function(d){ return d.key[0]; })
        .colors(typeColors);
}

function show_visit_per_year(ndx){
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
        .colorAccessor(function(d){ return d.key[0]; })
        .colors(typeColors);
}

function nights_stayed_per_country(ndx){
    var countryColors = d3.scale.ordinal()
        .domain(["Argentina", "Australia", "Austria", "Bahrain", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", 
        "China", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "Hong Kong",
        "Hungary", "Iceland", "India", "Indonesia", "Irish Republic", "Israel", "Italy", "Japan", "Kenya",
        "Kuwait", "Luxembourg", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Nigeria", "Norway", "Omen"])
        .range(["#0481BB", "#048AC9", "#069CE3"]);
    var countryDim = ndx.dimension(dc.pluck("nights"));
    var nDim = ndx.dimension(function(d){
        return [d.market, d.nights, d.year];
    });
    var nightsGroup = countryDim.group();
    var minNights = countryDim.bottom(1)[0].year;
    var maxNights = countryDim.top(1)[0].year;
    
    dc.scatterPlot("#scatter1")
        .width(800)
        .height(400)
        .x(d3.scale.linear().domain([minNights, maxNights]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .title(function(d) {
            return d.key[1] + " stayed " + d.key[2];
        })
        .colorAccessor(function(d) {
            return d.key[0];
        })
        .colors(countryColors)
        .dimension(countryDim)
        .group(nightsGroup)
        .margins({ top: 10, right: 50, bottom: 75, left: 75 })
        .xAxis().ticks(10);
}

function visits_per_country1(ndx) {
        
        
        var visit_dim = ndx.dimension(dc.pluck('visits'));
        
        var min_visited = visit_dim.bottom(1)[0].visits;
        var max_visited = visit_dim.top(1)[0].visits;
        
        var london_dim = ndx.dimension(function (d) {
            return [d.visits, d.spend, d.market, d.year, d.quarter, d.purpose];
        });
        
        var tradeColors = d3.scale.ordinal()
            .domain(["q1", "q2", "q3", "q4"])
            .range(["red", "green", "blue", "purple", "yellow"]);


        var london_group = london_dim.group();
        
        var subChart = function(c) {
            return dc.scatterPlot(c)
                        .symbolSize(4)
                        .highlightedSize(10);
        };

        
        var chart = dc.seriesChart("#scatter2");
        chart
        .width(770)
        .height(480)
        .chart(subChart)
        .x(d3.time.scale().domain([min_visited, max_visited]))
        .brushOn(false)
        .clipPadding(20)
        .yAxisLabel("year")
        .xAxisLabel("visits")
        .elasticY(true)
        .dimension(london_dim)
        .group(london_group)
        .mouseZoomable(true)
        .shareTitle(true) // allow default scatter title to work
        .seriesAccessor(function(d) {return d.key[5];})
        .keyAccessor(function(d) {return d.key[0];})
        .valueAccessor(function(d) {return +d.key[3];})
        .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(tradeColors)

        .legend(dc.legend().x(700).y(50).itemHeight(13).gap(5).horizontal(1).legendWidth(70).itemWidth(70));

        chart.margins().left += 40;
        chart.margins().bottom += 20;
        chart.margins().right = 150;
        dc.renderAll();
    }

function visits_per_country(ndx){
    var countryDim = ndx.dimension(dc.pluck('market'));
    var group = countryDim.group();

    dc.barChart("#market")
        .width(1600)
        .height(200)
        .margins({ top: 10, right: 50, bottom: 40, left: 80 })
        .dimension(countryDim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Visits per country")
        .yAxis().ticks(5);
}

function visits_per_year(ndx){
    var chart = dc.lineChart('#reason1');
  d3.csv('Static/Data/international-visitors-london.csv').then(function(counts) {
      var ndx            = crossfilter(counts),
          visitsDimension = ndx.dimension(function(d) {return d.visits;}),
          sumGroup       = visitsDimension.group().reduceSum(function(d) {return d.visits;});
      chart
          .width(768)
          .height(380)
          .x(d3.scaleBand())
          .xUnits(dc.units.ordinal)
          .brushOn(false)
          .xAxisLabel('Fruit')
          .yAxisLabel('Quantity Sold')
          .dimension(visitsDimension)
          .group(sumGroup);
      chart.render();
  });
} 