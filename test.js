
// The recommended indentation pattern for method chaining is four spaces for methods 
// that preserve the current selection and two spaces for methods that change the selection.

// var mydata = [4, 8, 15, 16, 23, 42];

let margin = {top: 20, right: 30, bottom: 30, left: 30};
let width = 960 - (margin.left + margin.right);
let height = 500 - (margin.top + margin.bottom);

let yScale = d3.scaleLinear()
                .range([height, 0]);

let xScale = d3.scaleLinear()
                .range([0, width]);

// we define the x axis by binding it to the x scale.
// Since our x-axis will appear below the bars, here we use the "bottom" orientation.
        
let xAxis = d3.axisBottom(xScale);

let yAxis = d3.axisLeft(yScale);

// apply the margins to the SVG container by setting the width and height of the SVG element to the outer dimensions,
// and add a g element to offset the origin of the svg area by the top-left margin. 

let svg = d3.select('body').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
        .append('g')
                .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

d3.tsv('data.tsv', type, function(error, data){
        if(error) throw error;

        xScale.domain(data.map(function(d){ return d.name; }));
        yScale.domain([0, d3.max(data, function(d){ return d.value; })]).nice();

svg.append('g')
        .attr('class', 'xScale axis')
        .attr('transform', 'translate(0, ' + height + ')') // **
        .call(xAxis);

svg.append('g')
        .attr('class', 'yScale axis')
        .call(yAxis);

svg.selectAll('.bar')
    .data(data)
  .enter().append('rect')
    .attr('class', 'bar')
    .attr('xScale', function(d){ return xScale(d.name); })
    .attr('yScale', function(d){ return yScale(d.value); })
    .attr('height', function(d){ return height - yScale(d.value)})
    .attr('width', xScale.rangeBand());

});

function type(d){
        d.value = +d.value // coerce to number
        return d;
}