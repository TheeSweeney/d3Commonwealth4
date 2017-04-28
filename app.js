
var w = 800;
var h = 450;
var margin = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var x = d3.scale.linear()
          .domain([0, d3.max(data, function(d){
            return d['2004'];
          })])
          .range([0, width]);
var y = d3.scale.ordinal()
          .domain(data.map(function(entry){
            return entry.country
          }))
          .rangeBands([0, height])
var linearColorScale = d3.scale.linear()
                        .domain([0, data.length])
                        .range(['#572500', '#F68026'])
var svg = d3.select('body').append('svg')
            .attr('id', 'chart')
            .attr('width', w)
            .attr('height', h)
var chart = svg.append('g')
              .classed('display', true)
              .attr('transform','translate(' + margin.right  + ',' + margin.top + ')')

function plot(params){
  this.selectAll('.bar')
      .data(params.data)
      .enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', 0)
        .attr('y', function(d,i){
          return y(d.country)
        })
        .attr('width', function(d, i){
          return x(d['2004'])
        })
        .attr('height', function(d,i){
          return y.rangeBand()-1
        })
        .style('fill', function(d,i){
          return linearColorScale(i);
        })
  this.selectAll('.bar-label')
      .data(params.data)
      .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', function(d,i){
          return x(d['2004'])
        })
        .attr('dx', -4)
        .attr('y', function(d,i){
          return y(d.country)
        })
        .attr('dy', function(d, i){
          return y.rangeBand()/1.5+2
        })
        .text(function(d,i){
          return d.country
        })
}

plot.call(chart, {
  data: data
})


// var svg = d3.select("body").append("svg")
//       .attr("id", "chart")
//       .attr("width", w)
//       .attr("height", h);
// var chart = svg.append("g")
//       .classed("display", true)
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
