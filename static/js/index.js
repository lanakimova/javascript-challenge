
// Upload all data from data.js for page load.
var tdata = data;

var docBody = d3.select("#body").on('load', init());

function init() {
    var tBody = d3.select("#tableBody");
    allData = tdata.filter(x => x.datetime);
    buildTable(allData);
    
    var dropDownMenu = document.getElementById("select-date");
    var dates = availableDate();
    console.log(`available dates: ${dates}`);
    for (var i=0; i < dates.length; i++) {
       var optn = dates[i];
       var date = document.createElement("option");
       date.textContent = optn;
       dropDownMenu.appendChild(date);
    };
};

// get available dates 
function availableDate() {
    var dates = [];
    Object.values(tdata).forEach(value => {
        date = value.datetime;
        if (dates.indexOf(date) !== -1) {
            // console.log(`value ${date} exist`)
        }
        else {
            dates.push(date);
        }        
    });
    return dates;
};


var slct = d3.select("#select-date").on("change", showData);

function showData() {
    var dropDownMenu = d3.select("#select-date").node().value;
    var UFO_dateFilter;
    if (dropDownMenu === 'Show All') {
        UFO_dateFilter = tdata.filter(x => x.datetime);
    }
    else {
        var UFO_dateFilter = tdata.filter(x => x.datetime === dropDownMenu);
    };
    buildTable(UFO_dateFilter);    
};

function buildTable(dateFilter) {
    var tableBody = d3.select("#tableBody").text("");
    Object.values(dateFilter).forEach(value => {
        tr = tableBody.append("tr");
        tr.append("td").text(value.datetime);
        var city = value.city.split(" ");
        var city_name = '';
        console.log(value.city.split(" "));
        for (var i=0; i < city.length; i++) {
            var temp_city = city[i];
            city_name = city_name + temp_city[0].toUpperCase() + temp_city.substring(1) + " ";    
        };
        console.log(`new city name: ${city_name}`);
        // city = city[0].toUpperCase() + city.substring(1);
        tr.append("td").text(city_name);
        tr.append("td").text(value.state.toUpperCase());
        tr.append("td").text(value.country.toUpperCase());
        tr.append("td").text(value.shape);
        tr.append("td").text(value.comments); 
    });     
};



