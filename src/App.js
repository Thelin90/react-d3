import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var d3 = require('d3');


var  data = {
    "nodes": [{
        "reference": 5,
        "year": 0,
        "text": "Gaming",
        "tags": ["Academic disturbance"]
    }, {
        "reference": 5,
        "year": 0,
        "text": "Drinking",
        "tags": ["Addiction"]
    }, {
        "reference": 58,
        "year": 0,
        "text": "Running",
        "tags": ["Addiction"]
    }, {
        "reference": 77,
        "year": 0,
        "text": "Having fun",
        "tags": ["Adults"]
    }, {
        "reference": 64,
        "year": 0,
        "text": "Apathetic users spend short times on web pages, follow no logical order, and make random selections",
        "tags": ["Apathetic hypertext users3"]
    }, {
        "reference": 8,
        "year": 0,
        "text": "49.8% of sessions are shorter than 5 seconds",
        "tags": ["App usage"]
    }],
    "links": [{
        "source": 0,
        "target": 2
    }, {
        "source": 0,
        "target": 5
    }, {
        "source": 1,
        "target": 5
    }, {
        "source": 1,
        "target": 3
    }, {
        "source": 1,
        "target": 2
    }
    ]
};


class App extends Component {

    /*
     * D3 hook on to this
     */
    componentDidMount() {
        const {width, height } = this.props;

        d3.forceSimulation(data.nodes)
            .force("links", d3.forceLink(data.links).distance(50))
            .force("charge", d3.forceManyBody().strength(-120))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const svg = d3.select(this.refs.mountPoint)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const node = svg.selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .style('stroke', '#FFFFFF')
            .style('stroke-width', 3.5)
            .style("fill",function() {
                return "hsl(" + Math.random() * 360 + ",100%,50%)";
            });

        const link = svg.selectAll('line')
            .data(data.links)
            .enter()
            .append('line')
            .style('stroke', '#030100')
            .style('stroke-opacity', 0.6);

        d3.forceSimulation().on('tick', () => {
            link
                .attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                });

            node
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                });
        });

        console.log(data.nodes);
        console.log(data.links);
    }



    render() {
        const {width, height} = this.props;

        const style = {
            width,
            height,
            margin: "100px",
            marginHeight: "300px",
            border: '1px solid #323232',
        };

        return (
            <div style={style} ref="mountPoint">

            </div>
        );
    }
}

export default App;