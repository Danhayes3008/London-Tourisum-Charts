queue()
    .defer(d3.csv, "Static/Data/international-visitors-london.csv")
    .await(makeGraphs);
    
function makeGraphs(error, londonData){
    var ndx = crossfilter(londonData);
    
    show_selector(ndx);
    show_reason_for_visit(ndx);
    
    dc.renderAll();
}


function show_selector(ndx){
    
    var dim = ndx.dimension(dc.pluck('market'));
    var group = dim.group();
    
    dc.selectMenu('#selectMenu')
        .dimension(dim)
        .group(group);
}

function show_reason_for_visit(ndx){
    var dim = ndx.dimension(dc.pluck('purpose'));
    var group = dim.group();

    dc.barChart("#reason")
        .width(600)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 40, left: 80 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("method of transport")
        .yAxis().ticks(5);
}