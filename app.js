
var w = 800;
var h = 450;
var margin = {
  top: 58,
  bottom: 100,
  left: 80,
  right: 40
};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
            .attr('id', 'chart')
            .attr('width', w)
            .attr('height', h)
var chart = svg.append('g')
              .classed('display', true)
              .attr('transform','translate(' + margin.right  + ',' + margin.top + ')')
var x = d3.scale.linear()
          .domain([0, data.length])
          .range([width, 0])
var y = d3.scale.linear()
          .domain([0, d3.max(data, function(d){
            return d['2014']
          })])
          .range([height, 0])
function plot(params){
  //enter
    this.selectAll('.'+params.class)
        .data(params.data)
        .enter()
            .append('circle')
            .classed(params.class, true)
            .attr('r', 4)
  //update
  this.selectAll('.'+params.class)
      .attr('cx', function(d,i){
        return x(i)
      })
      .attr('cy', function(d,i){
        return y(d[params.year])
      })
  //exit
  this.selectAll('.'+params.class)
      .data(params.data)
      .exit()
      .remove();
}

plot.call(chart, {
  data: data,
  year: '2004',
  class: 'oldPoints'
})

plot.call(chart, {
  data: data,
  year: '2014',
  class: 'newPoints'
})