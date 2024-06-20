import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import * as d3 from 'd3';
import Loading from '../Loading/Loading';

const Visualization = () => {
  const { addressId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/visualization/${addressId}?offset=100`);
        console.log('API response data:', response.data);
        setData(response.data.result || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [addressId]);

  useEffect(() => {
    if (!isLoading && Array.isArray(data) && data.length > 0) {
      const nodes = new Set();
      const links = [];

      data.forEach((txn) => {
        if (txn.from && txn.to) {
          nodes.add(txn.from);
          nodes.add(txn.to);
          links.push({
            source: txn.from,
            target: txn.to,
            value: (parseInt(txn.value) / 10 ** 18).toFixed(5),
          });
        }
      });

      const nodesArray = Array.from(nodes).map(id => ({
        id,
        isCentral: id === addressId,
        isSender: data.some(txn => txn.from === id),
        isReceiver: data.some(txn => txn.to === id),
      }));

      const width = 1000;
      const height = 800;
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const svg = d3.select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left + -100},${margin.top})`)  // Adjust the graph position to the right by adding 200 to margin.left
        .classed('bg-gray-100', true);

      const simulation = d3.forceSimulation(nodesArray)
        .force('link', d3.forceLink(links).id(d => d.id).distance(100).strength(0.1))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter((width / 2) + 200, height / 2))  // Adjust the center force to the right by adding 200
        .force('collision', d3.forceCollide().radius(50));

      svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 23)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 13)
        .attr('markerHeight', 13)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#999')
        .style('stroke', 'none');

      const link = svg.append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

      const linkLabels = svg.append('g')
        .selectAll('text')
        .data(links)
        .enter().append('text')
        .attr('fill', '#666')
        .attr('font-size', '10px')
        .attr('text-anchor', 'middle')
        .text(d => `${d.value} ETH`);

      const node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('g')
        .data(nodesArray)
        .enter().append('g')
        .each(function (d) {
          if (d.isCentral) {
            d3.select(this).append('circle')
              .attr('r', 20)
              .attr('fill', '#ffcc00');

            d3.select(this).append('rect')
              .attr('x', -10)
              .attr('y', -10)
              .attr('width', 20)
              .attr('height', 20)
              .attr('fill', '#0066cc');
          } else if (d.isReceiver) {
            d3.select(this).append('rect')
              .attr('x', -15)
              .attr('y', -15)
              .attr('width', 30)
              .attr('height', 30)
              .attr('fill', d3.schemeCategory10[Math.floor(Math.random() * 10)]);
          } else {
            d3.select(this).append('circle')
              .attr('r', 15)
              .attr('fill', d3.schemeCategory10[Math.floor(Math.random() * 10)]);
          }
        })
        .style('cursor', 'pointer')
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip bg-white p-2 rounded shadow-lg border border-gray-300 text-sm')
        .style('position', 'absolute')
        .style('pointer-events', 'none')
        .style('opacity', 0);

      node.on('mouseover', (event, d) => {
        const transactions = links.filter(link => link.source.id === d.id || link.target.id === d.id);
        const tooltipContent = transactions.map(txn =>
          `From: ${txn.source.id}<br>To: ${txn.target.id}<br>Value: ${txn.value} ETH`
        ).join('<br><br>');

        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(tooltipContent)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      }).on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });

      link.on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`From: ${d.source.id}<br>To: ${d.target.id}<br>Value: ${d.value} ETH`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      }).on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });

      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);

        linkLabels
          .attr('x', d => (d.source.x + d.target.x) / 2)
          .attr('y', d => (d.source.y + d.target.y) / 2);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }
  }, [isLoading, data]);

  return (
    <div className="w-full h-full flex justify-center p-6 bg-[#111F2C] overflow-hidden">
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div className="w-full mt-6 mb-20 p-6 bg-white rounded-xl shadow-md overflow-auto">
          <h2 className="text-black text-lg font-bold mb-4">
            <strong>Visualization for Address:</strong> <p className="text-green-600">{addressId}</p>
          </h2>
          {data.length > 0 && (
            <div className="mb-6">
              <p className="text-lg text-black"><strong>Contract Name:</strong> {data[0].contractName || 'N/A'}</p>
              <p className="text-lg text-black"><strong>Contract Address:</strong> {data[0].contractAddress || 'N/A'}</p>
            </div>
          )}
          <div className="bg-gray-100 p-5 rounded-xl  overflow-hidden">
            <h3 className="text-lg text-green-600 mb-4"><strong>History of Transactions</strong></h3>
            <div className="bg-gray-100 p-5">
              
              <p className="text-sm text-black flex items-center"><div className="w-4 h-4 rounded-full bg-blue-500 inline-block mr-2"></div>Sender nodes are displayed as circles with different colors.</p>
              <p className="text-sm text-black flex items-center mt-2"><div className="w-4 h-4 bg-green-500 inline-block mr-2"></div>Receiver nodes are displayed as rectangles with different colors.</p>
              <p className="text-sm text-black flex items-center mt-2"><div className="w-4 h-4 rounded-full bg-yellow-500 inline-block mr-2 flex justify-center items-center"><div className="w-2 h-2 bg-blue-500"></div></div>The central node is displayed as a rectangle within a circle.</p>
            </div>

            <svg ref={svgRef}></svg>

          </div>
          <div className="flex justify-center mt-5">
            <Link
              to={`/search/${addressId}`}
              className="text-sm text-white bg-gradient-to-br from-green-600 to-green-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Back to Search
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualization;
