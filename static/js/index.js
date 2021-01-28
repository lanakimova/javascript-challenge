
// Upload all data from data.js for page load.
var tdata = data;
var tBody = d3.select("#tableBody");
tBody.on('load', init());

function init() {
    
    Object.values(tdata).forEach(value => {
        tr = tBody.append("tr");
        tr.append("td").text(value.datetime);

        var city = value.city;
        city = city[0].toUpperCase() + city.substring(1);
        tr.append("td").text(city);
        tr.append("td").text(value.state.toUpperCase());
        tr.append("td").text(value.country.toUpperCase());
        tr.append("td").text(value.shape);
        tr.append("td").text(value.comments);
    });
    console.log('loaded');
};

// get available dates 
function availableDate() {

    var dates = [];
    // console.log(`Dates1: ${dates}`);

    Object.values(tdata).forEach(value => {
        date = value.datetime;
        if (dates.indexOf(date) !== -1) {
            // console.log(`value ${date} exist`)
        }
        else {
            dates.push(date);
        }
        
    });
    // console.log(`Dates2: ${dates}`);
    return dates;
};
console.log(availableDate());

// Add available dates as dropDown menu options
var dates = availableDate();
var menuItems = document.getElementById("select-date");

function selectDateMenu() {   
    
    for (var i=0; i < dates.length; i++) {
       var optn = dates[i];
       var date = document.createElement("option");
       date.textContent = optn;
       menuItems.appendChild(date);
    };

};

// show data for selected date
// !! TODO: try to add buton and read value after click on the button
var slct = d3.select("#select-date");
slct.on("change", showData);



