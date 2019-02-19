queue()
    .defer(d3.csv, "Static/Data/international-visitors-london.csv")
    .await(makeGraphs);
    
function makeGraphs(error, londonData){
    var ndx = crossfilter(londonData);
    
    show_selector(ndx);
    
    dc.renderAll();
}


function show_selector(ndx){
    
    var dim = ndx.dimension(dc.pluck('market'));
    var group = dim.group();
    
    dc.selectMenu('#selectMenu')
        .dimension(dim)
        .group(group);
}