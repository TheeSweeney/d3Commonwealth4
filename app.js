
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
var sort_btn = controls.append('button')
                      .html('Sort data: ascending')
                      .attr('state', 0)




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
      .data(params.data)//TODO factor this and following two lines into single function
      .exit()
      .remove();
}

sort_btn.on('click', function(){
  var self = d3.select(this);
  var ascending = function(a,b){
    return a.value - b.value
  }
  var descending = function(a,b){
    return b.value - a.value
  }
  var state = +self.attr('state');
  var txt = "Sort data: ";
  if(state == 0){
    data.initial.sort(ascending)
    state = 1;
    txt += 'descending';
  }else if(state === 1){
    data.initial.sort(descending)
    state = 0;
    txt += 'ascending';
  }
  console.log(data.initial)
  self.attr('state', state)
  self.html(txt)
})

plotAxes.call(chart, {
  axis: {
    x: xAxis,
    y: yAxis
  }
})

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