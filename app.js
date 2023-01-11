console.log("Hello Back to School!");
let viz;
// 1. Create a variable to store the vizContainer
// 2. Create a variable to store the dashboard options
// 3. Create a variable to store the URL if it doesn't load, we might need to specify height and width

const containerDiv = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  height: "800px",
  width: "1300px",
};
const url =
  "https://public.tableau.com/views/Training-EmbeddingExample/Dashboard?:language=en-US&:display_count=n&:origin=viz_share_link";
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

// put the viz here so it loads last
document.addEventListener("DOMContentLoaded", initViz);

// for the button, we create it in html, then create a constant in js that links to it (so it knows it exists)
// then we tell it what we want it to do with the function. The event listener identifies the click
const exportpdfbutton = document.getElementById("exportPDF");
exportpdfbutton.addEventListener("click", exportPDFfunction);
function exportPDFfunction() {
  viz.showExportPDFDialog();
}

// 1. Create the button in html
// 2. Create a constant or variable in javascript that links to the button via an ID so that js knows it exists
// 3. Create event so that it knows to fire an action if the button has been clicked (event listener)
// 4. Create a function to tell it what to do once the action has been picked up

const exportppbutton = document.getElementById("exportPP");
exportppbutton.addEventListener("click", exportPPfunction);
function exportPPfunction() {
  viz.showExportPowerPointDialog();
}

// This section is for the filters
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // need to get active sheet, but this could be a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  // inspect the sheets you want to filter
  console.log(sheets);
  // index of the sheets you want to filter
  const sheetToFilter0 = sheets[0];
  const sheetToFilter1 = sheets[1];
  // do the actual filtering
  sheetToFilter0
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
  sheetToFilter1
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);
