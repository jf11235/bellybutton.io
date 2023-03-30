const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {


//create a function to update the panel with the new sample when a new sample is selected in the dropdown menu
function optionChanged(currentSample) {

    let newSample = Number(currentSample.target.value)
    let metadata = data.metadata.find(d => d.id === newSample)
    let sample = data.samples.find(d => d.id == newSample)
    let wfreq = metadata.wfreq
    let panel = d3.select("#sample-metadata");
    panel.html("");
    if (metadata){
        console.log(Object.entries(metadata))
        Object.entries(metadata).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
                }
            )
        }
        console.log(sample)
        chartsAll(sample)
        gaugePlot(wfreq)
    };

   
    
//update the individual's demographic information when a new sample is selected in the dropdown menu

//initialze the panael with the first sample
let metadata = data.metadata[0];
let sample = data.samples[0]
let wfreq = metadata.wfreq

//calling the functions to initialize the plots and panels with the data from the first objects in the lists

chartsAll(sample)
gaugePlot(wfreq)
console.log(metadata)
let panel = d3.select("#sample-metadata");
panel.html("");
Object.entries(metadata).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
);

// setup the dropdown menu to display the sample names
let selector = d3.select("#selDataset");
data.names.forEach((sample) => {
    selector
    .append("option")
    .text(sample)
    .property("value", sample);
});


// 
const select = document.getElementById("selDataset");
select.addEventListener("change", optionChanged);


  // creating a function plot all the charts based on the dropdown menu

  function chartsAll(sample) {
    let sample_values = sample.sample_values;
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;

    let trace1 = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        name: "Top 10 OTUs",
        type: "bar",
        orientation: "h"
    };

    // creating the bubble chart

    let trace2 = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        mode: 'markers',
        marker: {
        color: otu_ids,
        size: sample_values
        }
    };

    let layout = {
        title: "Top 10 OTUs and Bubble Chart for Sample",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
    };

    let chartData1 = [trace1];
        Plotly.newPlot("bar", chartData1);


    let chartData2 = [trace2];
    Plotly.newPlot("bubble", chartData2, layout);

   


    
    }
  //creating a function for gauge plot
function gaugePlot(wfreq) {

        var data1 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Belly Button Washing Freq" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] }
                }
            }
        ];
        var layout1 = {
            width: 400,
            height: 300,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "darkblue", family: "Arial" }
        };
        Plotly.newPlot('gauge', data1, layout1);

    }
    

});

