
// Upload all data from data.js for page load.
var tdata = data;

var docBody = d3.select("#body").on('load', init());

function init() {
    var tBody = d3.select("#tableBody");
    allData = tdata.filter(x => x.datetime);
    buildTable(allData);

    createMenu(availableDate(), 'selectDate');
    createMenu(availableCities(), 'selectCity');
    createMenu(availableState(), 'selectState');
    createMenu(availableCountry(), 'selectCountry');
    createMenu(availableShape(), 'selectShape');
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

// get available dates 
function availableDate() {
    var dates = [];
    Object.values(tdata).forEach(value => {
        let date = value.datetime;
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
        let city = value.city.split(" ");
        let city_name = ""
        for (let i=0; i < city.length; i++){
            let temp = city[i];
            city_name = city_name + temp[0].toUpperCase() + temp.substring(1) + " ";
        };
        if(cities.indexOf(city_name) !== -1) {

        }
        else {
            cities.push(city_name);
        }
    });
    return cities;
}

function availableState() {
    var states = [];
    Object.values(tdata).forEach(value => {
        let state = value.state.toUpperCase();
        if(states.indexOf(state) !== -1) {

        }
        else {
            states.push(state);
        }
    });
    return states;
}

function availableCountry() {
    var countries = [];
    Object.values(tdata).forEach(value => {
        let country = value.country.toUpperCase();
        if(countries.indexOf(country) !== -1) {

        }
        else {
            countries.push(country);
        }
    });
    return countries;
}

function availableShape() {
    var shapes = [];
    Object.values(tdata).forEach(value => {
        let shape = value.shape;
        shape = shape[0].toUpperCase() + shape.substring(1);
        if(shapes.indexOf(shape) !== -1) {

        }
        else {
            shapes.push(shape);
        }
    });
    return shapes;
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



