
var w = 800;
var h = 500;
var margin = {
  top: 108,
  bottom: 100,
  left: 40,
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
                return
              })
              .tickSize(0)

var yAxis = d3.axisLeft(y)
              .tickSize(0)
var sort2004_btn = controls.append('button')
                      .html('Sort Low to High by 2004 rate')
                      .attr('id','sort2004btn')
                      .classed('btn', true)
var sort2014_btn = controls.append('button')
                      .html('Sort Low to High by 2014 rate')
                      .attr('id','sort2014btn')
                      .classed('btn', true)
var sortdiff_btn = controls.append('button')
                      .html('Sort by Amount of Improvement')
                      .attr('id','sortdiffbtn')
                      .classed('btn', true)


function plotAxes(params){//duplicated in ex1

  svg.insert('text')//Title
      .attr('x', 20)
      .attr('y', 40)
      .attr('id', 'chartTitle')
      .html("Mortality Amenable to Health Care, 2004 and 2014")

  this.select('.x.axis').remove()
  this.select('.y.axis').remove()

  this.append('g')
      .classed('x axis', true)
      .attr('transform','translate(0,' + height + ')')
      .call(params.axis.x)
  this.append('g')
      .classed('y axis', true)
      .attr('transform','translate(0,0)')
      .call(params.axis.y)

  this.select('.y.axis')//Top Label
        .append('text')
        .style('font-size', '12px')
        .style('fill', '#808080')
        .attr('x', 150)
        .attr('y',-20)
        .text('Deaths per 100,000 population')

  for(var i = 1; i < 6; i++){
    d3.select('#note' + i)
    .remove()
  }
  d3.select('.display')//Note
    .append('text')
    .attr('id', 'note1')
    .attr('x',0)
    .attr('y', height + 50)
    .classed('alignLeft note', true)
    .html('Source: European Observatory on Health Systems and Policies (2017). Trends in amenable mortality for selected countries, 2000-2014.')
  d3.select('.display')//Note
    .append('text')
    .attr('id', 'note2')
    .attr('x',0)
    .attr('y', height + 60)
    .classed('alignLeft note', true)
    .html('Data for 2014 in all countries except Canada (2011), France (2013), Netherlands (2013), New Zealand (2012), Switzerland (2013), UK (2013).')
  d3.select('.display')//Note
    .append('text')
    .attr('id', 'note3')
    .attr('x',0)
    .attr('y', height + 70)
    .classed('alignLeft note', true)
    .html('Amenable mortality causes based on Nolte & McKee (2004). Mortality and population data derived from WHO mortality files, September 2016;')
  d3.select('.display')//Note
    .append('text')
    .attr('id', 'note4')
    .attr('x',0)
    .attr('y', height + 80)
    .classed('alignLeft note', true)
    .html('Population data for Canada and the USA derived from the Human Mortality Database. Age-specific rates standardised to the European Standard Population 2013.')
d3.select('.display')//Note
    .append('text')
    .attr('id', 'note5')
    .attr('x',0)
    .attr('y', height + 90)
    .classed('alignLeft note', true)
    .html('Contact: Marina.Karanikolos@lshtm.ac.uk')
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
        return x(d.rank - 1)
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
    this.selectAll('.label')
        .data(params.data)
        .enter()
            .append('text')
            .classed('label', true)

  //update
  this.selectAll('.'+params.class)
      .transition()
      .duration(500)
      .attr('r', 4)
      .attr('cx', function(d,i){
        return x(d.rank - 1)
      })
      .attr('cy', function(d,i){
        return y(d[params.year])
      })
  this.selectAll('.label')
      .transition()
      .duration(500)
      .attr('x', function(d){
        return x(d.rank - 1) - (d.country.length*2.5)
      })
      .attr('y', height + 15)
      .attr('fill', 'black')
      .text(function(d, i){
        return d.country
      })
  //exit
  this.selectAll('.'+params.class)
      .data(params.data)//TODO factor this and following two lines into single function
      .exit()
      .remove();
  this.selectAll('.label')
      .data(params.data)
      .exit()
      .remove()
}
sort2004_btn.on('click', function(){
  plotAxes.call(chart, {
    axis: {
      x: xAxis,
      y: yAxis
    }
  })
  plot(data.initial);
})

sort2014_btn.on('click', function(){
  plotAxes.call(chart, {
    axis: {
      x: xAxis,
      y: yAxis
    }
  })
  plot(data['2014Ascending']);
})

sortdiff_btn.on('click', function(){
  plotAxes.call(chart, {
    axis: {
      x: xAxis,
      y: yAxis
    }
  })
  plot(data['diffAscending']);
})

plotAxes.call(chart, {
  axis: {
    x: xAxis,
    y: yAxis
  }
})

function plot(data) {
  plotLines.call(chart,{
    data: data,
    year: '2014'
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
}

plot(data.initial)