
// Upload all data from data.js for page load.
var tdata = data;

var docBody = d3.select("#body").on('load', init());

function init() {
    var tBody = d3.select("#tableBody");
    allData = tdata.filter(x => x.datetime);
    buildTable(allData);
    
    // var datetime;
    var dates = availableData(datetime);
    console.log(dates);
    createMenu(availableDate(), 'selectDate');
    createMenu(availableCities(), 'selectCity');
};

function createMenu(dataList, elementID) {
    var dropDownMenu = document.getElementById(elementID);
    for (var i=0; i < dataList.length; i++) {
        var optn = dataList[i];
        var newEl = document.createElement('option');
        newEl.textContent = optn;
        dropDownMenu.appendChild(newEl);
    }
}

function availableData(fieldName) {
    var dataList = [];
    Object.values(tdata).forEach(value => {
        fieldValue = value.fieldName;
        if (dataList.indexOf(fieldValue) !== -1) {

        }
        else {
            dataList.push(fieldValue);
        }
    });
    return dataList;
}

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

function availableCities() {
    var cities = [];
    Object.values(tdata).forEach(value => {
        city = value.city;
        if(cities.indexOf(city) !== -1) {

        }
        else {
            cities.push(city);
        }
    });
    return cities;
}


var slct = d3.select("#selectDate").on("change", showData);

function showData() {
    var dropDownMenu = d3.select("#selectDate").node().value;
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
        
        for (var i=0; i < city.length; i++) {
            var temp_city = city[i];
            city_name = city_name + temp_city[0].toUpperCase() + temp_city.substring(1) + " ";    
        };
 
        tr.append("td").text(city_name);
        tr.append("td").text(value.state.toUpperCase());
        tr.append("td").text(value.country.toUpperCase());
        tr.append("td").text(value.shape);
        tr.append("td").text(value.comments); 
    });     
};



