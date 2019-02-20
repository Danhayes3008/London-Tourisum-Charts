queue()
    .defer(d3.csv, "Static/Data/international-visitors-london.csv")
    .await(makeGraphs);
    
function makeGraphs(error, londonData){
    var ndx = crossfilter(londonData);
    
    show_selector(ndx);
    // show_total_spent(ndx, "#spent");
    show_reason_for_visit(ndx);
    show_method_of_arrival(ndx);
     show_country_of_origin(ndx);
    
    dc.renderAll();
}


function show_selector(ndx){
    
    var dim = ndx.dimension(dc.pluck('market'));
    var group = dim.group();
    
    dc.selectMenu('#selectMenu')
        .dimension(dim)
        .group(group);
}

// function show_total_spent(ndx, spent, element){
//     var totalSpent = ndx.groupAll()
//     dc.numberDisplay()
        
// }

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
        .domain(["Argentina", "Australia", "Austria", "Bahrain", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", 
        "China", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "Hong Kong",
        "Hungary", "Iceland", "India", "Indonesia", "Irish Republic", "Israel", "Italy", "Japan", "Kenya",
        "Kuwait", "Luxembourg", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Nigeria", "Norway", "Omen"])
        .range(["#0481BB", "#048AC9", "#069CE3"]);
    var countryDim = ndx.dimension(dc.pluck("market"));
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