function _chart(d3,width,height,nodes,links,rootAuthor,scale,drag,invalidation)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [-width / 1, -height / 1, width*10, height*10])

  let transform;
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(2)
        .strength(0.7)
    )
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const movement = width/0.3;
  const link = svg
    .append("g")
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("stroke-opacity", 0.8)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", (d) => (d.target.children ? null : "#160A40"))
    .attr("stroke-width", (d) => (d.target.children ? null : 1.5))
    .attr("transform", function(d){
      return "translate(" + movement + "," + movement + ")"; 
    });
  const nodeGroup = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("transform", function(d){
      return "translate(" + movement + "," + movement + ")"; 
    });

  const node = nodeGroup
    .append("circle")
    .attr("fill", (d) => scale.c(d.height))
    .attr("r", (d) => (d.data.name == rootAuthor.data ? (scale.r(d.height)*5) : (d.children == undefined ? 
      (scale.r(d.height)*13) : (scale.r(d.height)*3))))
    .attr("id", (d) => (d.data.name == rootAuthor.data ? "author" : null))
    .call(drag(simulation));
  
 nodeGroup.selectAll('g > #author') // author node: fill = 'black'
 .select(function(){return this.parentNode;})
 .style("fill", "black")
 .attr("font-size", "1.4rem")
 .attr("filter", "drop-shadow(0px 0px 1px black)");

node.append("title").text((d) => d.data.name);

  const labels = nodeGroup
  .append("text")
  .text((d) => d.data.name)
  .attr("x", d => d.x - 80)
  .attr("y", d => d.y)
  .attr("class", "label");

  node.on('click', function(){
      console.log('click')});

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
    labels
      .attr("x", d => d.x - 80)
      .attr("y", d => d.y);
  });

  invalidation.then(() => simulation.stop());

  const g = svg.append("g");
  const zoom = d3.zoom().on("zoom", e => {
    g.attr("transform", (transform = e.transform));
    link.attr("stroke-width", (d) => (d.target.children ? 3: 1.5) / Math.sqrt(transform.k));
    node.attr("r", (d) => (d.data.name == rootAuthor.data ? (scale.r(d.height)*5) : (d.children == undefined ? 
      (scale.r(d.height)*13) : (scale.r(d.height)*3))) / Math.sqrt(transform.k));
      simulation.force("charge", d3.forceManyBody().strength(-5000 / Math.sqrt(transform.k)));
    labels.style("font-size", `${2 / Math.sqrt(transform.k)}em`)
  });

  return svg
  .call(zoom)
  .call(zoom.transform, d3.zoomIdentity)
  .node();
}


function _2(md){return(
md` ## Interactivity`
)}

function _drag(d3){return(
simulation => {
  
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
  /*function click(event, d) {
    delete d.fx;
    delete d.fy;
    d3.select(this).classed("fixed", false);
    simulation.alpha(1).restart();
  }*/
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
      //.on("click", click);
}
)}

function _4(md){return(
md` ## Scale`
)}

function _scale(d3,nodes)
{
  let r = d3
    .scaleLinear()
    .domain([0, d3.max(nodes, (d) => d.height)])
    .range([0.9, 18]);

  let c = d3
    .scaleLinear()
    .domain([0, d3.max(nodes, (d) => d.height)])
    .range(["#05f2a8", "#131B26"]);

  return { c: c, r: r };
}


function _6(md){return(
md` ## Data`
)}
function _nodes(root){return(
root.descendants()
)}

function _links(root){return(
root.links()
)}
function _rootAuthor(d3,tree_data,authorIndex){return(
  d3.hierarchy(tree_data.data[authorIndex].name)
  )}

function _root(d3,tree_data,authorIndex){return(
d3.hierarchy(tree_data.data[authorIndex])
)}
function _authorIndex(tree_data)
{
  for (let i = 0; i < tree_data.data.length; i++) 
  {
    if(tree_data.data[i].name == localStorage.getItem("author")) return i;  
  }
  return(0);
}

function _tree_data(FileAttachment){return(
FileAttachment("tree_data@3.json").json()
)}

function _11(md){return(
md` 
---
## Appendix`
)}

function _height(){return(
800
)}

function _width(){return(
600
)}

function _d3(require){return(
require("d3")
)}

function _style(html){return(
html`<style>

@import url("https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;1,100;1,300&display=swap");

body {
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight:400;
  font-size:13px;
  background-color:white;
}
.label
{
  pointer-events: none;
  color: white;
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

svg {
  background-color:white;
}
g
{
  fill:white;
}
#author
{
  fill: black;
}

/*Defining text stylings*/

h1 {
  margin-top: 50;
  font-size: 1.3rem;
  color:#f20666;
  margin-bottom: 50;
  font-weight:600;
}

h2 {
  margin-top: 5px;
  font-size: 1.1rem;
  margin-bottom: 5px;
  color:#f20666;
  font-weight:500;
}

h3 {
  margin-top: 5px;
  font-size: 1rem;
  margin-bottom: 10px;
  color:#f20666;
  font-weight:400;
}

h4 {
  margin-top: 5px;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color:#f20666;
  font-weight:300;
}

h5 {
  margin-top: 5px;
  font-size: 1rem;
  margin-bottom: 0px;
  color:#f20666;
  font-weight:400;
}

a:link, a:active, a:visited {
  margin-top:0.5px;
  color:#662e9b;
  font-size:12px;
  font-weight:400;
}

a:hover {
  margin-top:0.5px;
  color:#662e9b;
  font-size:12px;
  font-weight:400;
}
  
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["tree_data@3.json", {url: new URL("../data/100k.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("chart")).define("chart", ["d3","width","height","nodes","links","rootAuthor","scale","drag","invalidation"], _chart);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("scale")).define("scale", ["d3","nodes"], _scale);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("nodes")).define("nodes", ["root"], _nodes);
  main.variable(observer("links")).define("links", ["root"], _links);
  main.variable(observer("authorIndex")).define("authorIndex", ["tree_data"], _authorIndex);
  main.variable(observer("root")).define("root", ["d3","tree_data","authorIndex"], _root);
  main.variable(observer("rootAuthor")).define("rootAuthor", ["d3","tree_data","authorIndex"], _rootAuthor);
  main.variable(observer("tree_data")).define("tree_data", ["FileAttachment"], _tree_data);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("style")).define("style", ["html"], _style);
  return main;
}
