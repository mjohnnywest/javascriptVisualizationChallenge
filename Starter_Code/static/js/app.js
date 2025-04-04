// Build the metadata panel

function buildMetadata(sample) {

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field

    console.log(data); // looking at datatype to find metadata field

    console.log(data.metadata);

    let mdata = data.metadata // storing the metadata list

    // Filter the metadata for the object with the desired sample number

    let samp = mdata.filter(item => item.id == sample)[0] // finding sample with corresponding ID
    console.log(samp)

    // Use d3 to select the panel with id of `#sample-metadata`

    let panel = d3.select("#sample-metadata"); //the <"sample-metadata"> field on the HTML

    console.log(panel);

    // Use `.html("") to clear any existing metadata

    panel.html("");

    // Inside a loop, you will need to use d3 to append new tags for each key-value in the filtered metadata.

    for (let i = 0; i < Object.keys(samp).length; i++){
      let [key,value] = Object.entries(samp)[i]; // pulling the data from the sample
      panel.append("p").text(`${key}: ${value}`); // apppending data into panel as key: value

    }


  });
  
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    console.log(data) // checking data format 
    let samp_data = data.samples


    // Filter the samples for the object with the desired sample number
   
    let samp = samp_data.filter(item => item.id == sample) // finding sample with corresponding ID


    // Get the otu_ids, otu_labels, and sample_values
    //returns a 1 item list, thus [0]
    let otu_id = samp[0].otu_ids

    let labels = samp[0].otu_labels

    let val = samp[0].sample_values


    // creating key:values for easy manipulation in graping
    let id_value = {}
    for (let i = 0; i < otu_id.length; i++){
      id_value[`ID #${otu_id[i]}`] = val[i];
    }
    console.log(id_value)
    let sorted_ids = Object.entries(id_value).sort(([, a], [, b]) => b - a); // is this really the simplest way??? 
    let top_10 = sorted_ids.slice(0,10)

    x_vals =[]
    y_ids = []
    for (let i = 0; i < top_10.length; i++){
      x_vals.push(top_10[i][0].toString())
      y_ids.push(top_10[i][1])
    }

    // Build a Bubble Chart
    //the following was pulled directly from plotly documentation


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    var data = [{
      type: 'bar',
      x: y_ids,
      y: x_vals,
      orientation: 'h'
    }];
    

    Plotly.newPlot('bar', data);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let name_list = data.names
    
    // Use d3 to select the dropdown with id of `#selDataset`
    let panel2 = d3.select("#selDataset")


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    panel2.html("");

    for (let i = 0; i<name_list.length; i++) {
      panel2.append("option").text(name_list[i]); // must be an option to go into dropdown
    }

    // Get the first sample from the list
    selection = d3.select("#selDataset").node().value; //pulling the value of what's in the dropdown
    console.log(selection)

    // Build charts and metadata panel with the first sample
    buildMetadata(selection)
    buildCharts(selection)
  });
}

// Function for event listener
// function optionChanged(newSample) {
// Build charts and metadata panel each time a new sample is selected

//this builds new charts whenever seldataset is changed
d3.select('#selDataset')
.on('change', function() {
  newSel = d3.select("#selDataset").node().value;
  buildMetadata(newSel)
  buildCharts(newSel)
})

// Initialize the dashboard
init();
