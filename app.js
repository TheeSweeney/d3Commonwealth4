
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
var controls = d3.select('body')
                .append('div')
                .attr('id', 'controls');
var x = d3.scaleLinear()
          .domain([-.5, data.initial.length-.5])
          .range([0, width])
var y = d3.scaleLinear()
          .domain([0, 160])
          .range([height, 0])
var xAxis = d3.axisBottom(x)
              .tickFormat(function(d){
                if(data.initial[d] !== undefined){
                  return data.initial[d].country
                }
              })
              .tickSize(0)

var yAxis = d3.axisLeft(y)
              .tickSize(0)
var sort2004_btn = controls.append('button')
                      .html('Sort Low to High by 2004 rate')
                      .attr('state', 0)
                      .attr('id','sort2004btn')
                      .classed('btn', true)
var sort2014_btn = controls.append('button')
                      .html('Sort Low to High by 2014 rate')
                      .attr('state', 0)
                      .attr('id','sort2014btn')
                      .classed('btn', true)
var sortdiff_btn = controls.append('button')
                      .html('Sort by amount of change')
                      .attr('state', 0)
                      .attr('id','sortdiffbtn')
                      .classed('btn', true)


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

function plotLines(params){
  //enter
  this.selectAll('.bar')
      .data(params.data)
      .enter()
        .append('rect')
        .classed('bar', true)
  //update
  this.selectAll('.bar')
      .transition()
      .duration(500)
      .attr('x', function(d,i){
        return x(i)
      })
      .attr('y', function(d,i){
        return y(d[params.year])
      })
      .attr('width', 1)
      .attr('height', function(d,i){
        return height - y(d[params.year])
      })
  //exit
  this.selectAll('.bar')
      .data(params.data)
      .exit()
      .remove();
}

function plotPoints(params){
  //enter
    this.selectAll('.'+params.class)
        .data(params.data)
        .enter()
            .append('circle')
            .classed(params.class, true)
  //update
  this.selectAll('.'+params.class)
      .transition()
      .duration(500)
      .attr('r', 4)
      .attr('cx', function(d,i){
        return x(i)
      })
      .attr('cy', function(d,i){
        return y(d[params.year])
      })
  //exit
  this.selectAll('.'+params.class)
      .data(params.data)//TODO factor this and following two lines into single function
      .exit()
      .remove();
}
var state='2004';
var ascending = function(a,b){
  return a[state] - b[state]
}
// var descending = function(a,b){
//   return b.value - a.value
// }
sort2004_btn.on('click', function(){
  state = "2004"
  data.initial.sort(ascending)
  plot();
})

sort2014_btn.on('click', function(){
  state = "2014"
  data.initial.sort(ascending)
  plot();
})

sortdiff_btn.on('click', function(){
  state = "diff"
  data.initial.sort(ascending)
  plot();
})

plotAxes.call(chart, {
  axis: {
    x: xAxis,
    y: yAxis
  }
})
function plot() {
  plotLines.call(chart,{
    data: data.initial,
    year: '2014'
  })

  plotPoints.call(chart, {
    data: data.initial,
    year: '2004',
    class: 'oldPoints'
  })

  plotPoints.call(chart, {
    data: data.initial,
    year: '2014',
    class: 'newPoints'
  })
}

plot()