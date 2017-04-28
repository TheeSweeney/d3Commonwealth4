
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
          .domain([0, data.length-1])
          .range([0, width])
var y = d3.scale.linear()
          .domain([0, 160])
          .range([height, 0])
var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom')
              .tickFormat(function(d){
                return data[d].country
              })
var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left')


function plotAxes(params){//duplicated in ex1
  this.append('g')
      .classed('x axis', true)
      .attr('transform','translate(0,' + height + ')')
      .call(params.axis.x)
  this.append('g')
      .classed('y axis', true)
      .attr('transform','translate(0,0)')
      .call(params.axis.y)
}

function plotPoints(params){
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

plotAxes.call(chart, {
  axis: {
    x: xAxis,
    y: yAxis
  }
})

plotPoints.call(chart, {
  data: data,
  year: '2004',
  class: 'oldPoints'
})

plotPoints.call(chart, {
  data: data,
  year: '2014',
  class: 'newPoints'
})