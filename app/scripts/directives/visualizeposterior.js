'use strict';

/**
 * @ngdoc directive
 * @name bayesview3App.directive:visualizeposterior
 * @description
 * # visualizeposterior
 */
angular.module('bayesview3App')
  .directive('visualizeposterior', function () {
 
        var w = 1200;
        var h = 100;

        var margin = 20,
        width = w,
        height = h - .5 - margin,
        color = d3.interpolateRgb("#e0e0e0", "#609183");

    return {
        restrict: 'E',
        scope: {
            val: '=',
            grouped: '='
        },
        link: function (scope, element, attrs) {

            var vis = d3.select(element[0]);



            scope.$watch('val', function (newVal, oldVal) {

                if(!newVal || newVal.length===0)
                    return;

                // clear the elements inside of the directive
                vis.selectAll('*').remove();

                var svg = vis.append("svg");
                svg.attr("width", w).attr("height", h);

                var n = newVal.length; // number of layers
                var m = newVal[0].values.length; // number of samples per layer

                var stack = d3.layout.stack()
                    .values(function(d) {
                        return d.values;
                    })(newVal);



                var mx = m;
                var     my = d3.max(stack, function(d) {
                    return d3.max(d.values, function(d) {
                        return d.y0 + d.y;
                    });
                });
                var mz = d3.max(stack, function(d) {
                    return d3.max(d.values, function(d) {
                        return d.y;
                    });
                });

                var  x = function(d) {
                    return d.x * width / mx;
                };
                var y0 = function(d) {
                    return height - d.y0 * height / my;
                };
                var y1 = function(d) {
                    return height - (d.y + d.y0) * height / my;
                };
                var y2 = function(d) {
                    return d.y * height / mz;
                }; // or `my` not rescale

                // Layers for each color
                // =====================
                var layers = svg.selectAll("g.layer")
                    .data(stack)
                    .enter().append("g")
                    .style("fill", function(d, i) {
                        return color(i / (n - 1));
                    })
                    .attr("class", "layer");


                var bars = layers.selectAll("g.bar")
                    .data(function(d) {
                        return d.values;
                    })
                    .enter().append("g")
                    .attr("class", "bar")
                    .attr("transform", function(d) {
                        return "translate(" + x(d) + ",0)";
                    });

                bars.append("rect")
                    .attr("width", x({x: .9}))
                    .attr("x", 0)
                    .attr("y", height)
                    .attr("height", 0)
                    .transition()
                    .delay(function(d, i) { return i * 10; })
                    .attr("y", y1)
                    .attr("height", function(d) {
                        return y0(d) - y1(d);
                    });




                var hyplabels = svg.append("g");

                hyplabels.selectAll("text.label")
                    .data(newVal, function(d){
                        return d.name;})
                    .enter().append("text")
                    .attr("class", "label")
                    .attr("x", function(d,i){
                        return x({x: 0.9*i/n});
                    })
                    .attr("y", height - 12)

                    .attr("dy", ".71em")
                    .attr("dx", function(d,i){
                        return x({x: 0.9/n/2});
                    })
                    .attr("text-anchor", "middle")
                    .attr( "fill-opacity", 0 )
                    .transition()
                    .delay( function(d, i) { return 1000+i * 500; } )
                    .attr( "fill-opacity", 1 )
                    .text(function(d, i) {
                        return d.name;
                    });


                var datumlabels = svg.append("g");

                var labelContent = datumlabels.selectAll("text.label")
                    .data(newVal[0].datum)
                    .enter().append('g');


                var textLabels = labelContent.append("text")
                    .attr("class", "label")
                    .attr("x", function(d,i){
                        return x({x: i});
                    })
                    .attr("y", height + 12)
                    .attr("dx", x({x: .45}))
                    .attr("text-anchor", "middle")
                    .attr( "fill-opacity", 0 )
                    .transition()
                    .delay( function(d, i) { return 500+i * 200; } )
                    .attr( "fill-opacity", 1 )
                    .text(function(d, i) {
                        return d.shortName;
                    })
                    ;

                labelContent.append("title").text(function(d, i) {
                    return d.name;
                })

                function transitionGroup() {
                    svg.selectAll("g.layer rect")
                        .transition()
                        .duration(500)
                        .delay(function(d, i) { return (i % m) * 10; })
                        .attr("x", function(d, i) { return x({x: .9 * ~~(i / m) / n}); })
                        .attr("width", x({x: .9 / n}))
                        .each("end", transitionEnd);

                    function transitionEnd() {
                        d3.select(this)
                            .transition()
                            .duration(500)
                            .attr("y", function(d) { return height - y2(d); })
                            .attr("height", y2);
                    }
                }

                transitionGroup();
            })        
      }
    };
  });
