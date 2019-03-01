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
        
        var date_dim = ndx.dimension(dc.pluck('visits'));
        
        var min_spent = date_dim.bottom(1)[0].visits;
        var max_spent = date_dim.top(1)[0].visits;
        
        var spend_dim = ndx.dimension(function (d) {
            return [d.visits, d.spend, d.market, d.year, d.quarter, d.purpose];
        });
        
        var tradeColors = d3.scale.ordinal()
            .domain(["Q1", "Q2", "Q3", "Q4"])
            .range(["red", "green", "blue", "purple"]);


        var spend_group = spend_dim.group();
        
        var subChart = function(c) {
            return dc.scatterPlot(c)
                        .symbolSize(8)
                        .highlightedSize(10);
        };

        
        var chart = dc.seriesChart("#scatter2");
        chart
        .width(770)
        .height(480)
        .chart(subChart)
        .x(d3.time.scale().domain([min_spent, max_spent]))
        .brushOn(false)
        .clipPadding(10)
        .yAxisLabel("Spend")
        .xAxisLabel("Date")
        .elasticY(true)
        .dimension(spend_dim)
        .group(spend_group)
        .mouseZoomable(true)
        .shareTitle(false) // allow default scatter title to work
        .seriesAccessor(function(d) {return d.key[2];})
        .keyAccessor(function(d) {return d.key[0];})
        .valueAccessor(function(d) {return +d.key[3];})
        .colorAccessor(function (d) {
            return d.key[4].market;
        })
        .colors(tradeColors)

        .legend(dc.legend().x(700).y(50).itemHeight(13).gap(5).horizontal(1).legendWidth(70).itemWidth(70));

        chart.margins().left += 20;
        chart.margins().bottom += 20;
        chart.margins().right = 150;
        dc.renderAll();
    }