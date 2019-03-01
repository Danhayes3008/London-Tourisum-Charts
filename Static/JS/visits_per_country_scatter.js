queue()
        .defer(d3.csv, "Static/Data/international-visitors-london.csv")
        .await(makeGraphs);

function makeGraphs(error, londonData) {
        
        var ndx = crossfilter(londonData);

       londonData.forEach(function(d){
           d.mode = parseInt(d.mode);
           d.market = parseInt(d.market);
           d.spend = parseInt(d.spend);
           d.year = parseInt(d.year);
           d.purpose = parseInt(d.purpose);
           d.quarter = parseInt(d.quarter);
           d.visits = parseInt(d.visits);
       });
        
        var visit_dim = ndx.dimension(dc.pluck('visits'));
        
        var min_visited = visit_dim.bottom(1)[0].visits;
        var max_visited = visit_dim.top(1)[0].visits;
        
        var london_dim = ndx.dimension(function (d) {
            return [d.visits, d.spend, d.market, d.year, d.quarter, d.purpose];
        });
        
        var tradeColors = d3.scale.ordinal()
            .domain(["q1", "q2", "q3", "q4"])
            .range(["red", "green", "blue", "purple"]);


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
        .shareTitle(false) // allow default scatter title to work
        .seriesAccessor(function(d) {return d.key[2];})
        .keyAccessor(function(d) {return d.key[0];})
        .valueAccessor(function(d) {return +d.key[3];})
        .colorAccessor(function (d) {
            return d.key[4];
        })
        .colors(tradeColors)

        .legend(dc.legend().x(700).y(50).itemHeight(13).gap(5).horizontal(1).legendWidth(70).itemWidth(70));

        chart.margins().left += 20;
        chart.margins().bottom += 20;
        chart.margins().right = 150;
        dc.renderAll();
    }