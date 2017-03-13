import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


var d3 = require('d3');


var  data = {
    "nodes": [
        {"id": 0,"Object": 0, "text": "STATUS","Source":"55.34.23.54", "color": "blue"},
        {"id": 1,"Object": 1, "text": "STATUS","Destination":"SQLB", "color": "yellow"},
        {"id": 2,"Object": 2, "text": "STATUS","Destination":"SQLB23", "color": "yellow"},
        {"id": 3,"Object": 3, "Source":"55.34.23.54", "color": "green"},
        {"id": 4,"Object": 4, "Source":"55.34.23.54", "color": "green"},
        {"id": 5,"Object": 5, "Source":"55.34.23.54", "color": "green"},
        {"id": 6,"Object": 6, "Source":"55.34.23.54", "color": "green"},
        {"id": 7,"Object": 7, "Source":"55.34.23.54", "color": "green"},
        {"id": 8,"Object": 8, "Source":"55.34.23.54", "color": "green"},
        {"id": 9,"Object": 9, "Source":"55.34.23.54", "color": "green"},
        {"id": 10,"Object": 10, "Source":"55.34.23.54", "color": "green"},
        {"id": 11,"Object": 11, "Source":"55.34.23.54", "color": "green"},
        {"id": 12,"Object": 12, "Destination":"SQLB", "color": "red"},
        {"id": 13,"Object": 13, "Destination":"SQLB", "color": "red"},
        {"id": 14,"Object": 14, "Destination":"SQLB", "color": "red"},
        {"id": 15,"Object": 15, "Destination":"SQLB23", "color": "red"},
        {"id": 16,"Object": 16, "Destination":"SQLB", "color": "red"},
        {"id": 17,"Object": 17, "Destination":"SQLB", "color": "red"},
        {"id": 18,"Object": 18, "Destination":"SQLB", "color": "red"},
        {"id": 19,"Object": 19, "Destination":"SQLB", "color": "red"},
        {"id": 20,"Object": 20, "Destination":"SQLB", "color": "red"},
        {"id": 21,"Object": 21, "Destination":"SQLB", "color": "red"},
        {"id": 22,"Object": 22, "text": "DOMAINS", "color": "black"}
    ],

    "links": [
        {"source": 0, "target": 0, "value": 1},
        {"source": 0, "target": 3, "value": 1},
        {"source": 0, "target": 4, "value": 1},
        {"source": 0, "target": 5, "value": 1},
        {"source": 0, "target": 6, "value": 1},
        {"source": 0, "target": 7, "value": 1},
        {"source": 0, "target": 8, "value": 1},
        {"source": 0, "target": 9, "value": 1},
        {"source": 0, "target": 10, "value": 1},
        {"source": 0, "target": 11, "value": 1},
        {"source": 1, "target": 12, "value": 1},
        {"source": 1, "target": 13, "value": 1},
        {"source": 1, "target": 14, "value": 1},
        {"source": 2, "target": 15, "value": 1},
        {"source": 1, "target": 16, "value": 1},
        {"source": 1, "target": 17, "value": 1},
        {"source": 1, "target": 18, "value": 1},
        {"source": 1, "target": 19, "value": 1},
        {"source": 1, "target": 20, "value": 1},
        {"source": 1, "target": 21, "value": 1},
        {"source": 0, "target": 22, "value": 1},
        {"source": 1, "target": 22, "value": 1},
        {"source": 2, "target": 22, "value": 1}
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

        const link = svg.selectAll('line')
            .data(data.links)
            .enter()
            .append('line')
            .style('stroke-width', 3.5)
            .style('stroke', '#030100')
            .style('stroke-opacity', 0.6);

        const node = svg.selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r", 10)
            .style('stroke', '#FFFFFF')
            .style('stroke-width', 3.5)
            .style("fill", function(d){ return d.color});
          /*  .style("fill",function() {
                return "hsl(" + Math.random() * 360 + ",100%,50%)";
            });*/

        node.append("text")
            .attr("x", function(d) { return d.x-30; })
            .attr("y", function(d) { return d.y; })
            .text(function (d) { return d.text; });


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
                })
        });

        console.log(data.nodes);
        console.log(data.links);
    }

    render() {
        const {width, height } = this.props;
        const style = {
            width,
            height,
            margin: "100px",
            marginHeight: "300px",
            border: '1px solid #323232',
        };
        return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Welcome to React with D3! Relational graph!</h2>
            <div style={style} ref="mountPoint"></div>
        </div>

        );
    }
}

export default App;