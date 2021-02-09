
// Upload all data from data.js for page load.
var tdata = data;

// listener for page load
var docBody = d3.select("#body").on('load', init());

// init function generate content that will be shown after page is loading
function init() {
    let tBody = d3.select("#tableBody");
    let allData = tdata.filter(x => x.datetime);
    buildTable(allData);

    createMenu(availableDate(), 'selectDate');
    createMenu(availableCities(), 'selectCity');
    createMenu(availableState(), 'selectState');
    createMenu(availableCountry(), 'selectCountry');
    createMenu(availableShape(), 'selectShape');
};

// createMenu function accept 2 parameter: list of specific data (list of dates or list of names) and element ID.
// Using with two parameter generate dropdown options for index.html
function createMenu(dataList, elementID) {
    let dropDownMenu = document.getElementById(elementID);
    for (let i=0; i < dataList.length; i++) {
        let optn = dataList[i];
        let newEl = document.createElement('option');
        newEl.textContent = optn;
        dropDownMenu.appendChild(newEl);
    }
}

// return available unique dates from data files
function availableDate() {
    let dates = [];
    Object.values(tdata).forEach(value => {
        let date = value.datetime;
        if (dates.indexOf(date) !== -1) {
        }
        else {
            dates.push(date);
        }        
    });
    return dates;
};

// return available unique city names from data files
function availableCities() {
    let cities = [];
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
            console.log("city_name");
        };
    });
    return cities;
}

// return available unique state names from data files
function availableState() {
    let states = [];
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

// return available unique country names from data files
function availableCountry() {
    let countries = [];
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

// return available unique shapes from data files
function availableShape() {
    let shapes = [];
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


// listener for every dropdown element
var slctDate = d3.select("#selectDate").on("change", showData);
var slctCity = d3.select('#selectCity').on("change", showData);
var slctState = d3.select('#selectState').on("change", showData);
var slctCountry = d3.select("#selectCountry").on("change", showData);
var slctShape = d3.select("#selectShape").on("change", showData);

// main function that check input from dropdown elements, call function to  show data according this input
function showData() {

    let showAll = 'Show All';

    let dropDownDate = d3.select("#selectDate").node().value;
    let dateValue;
    if (dropDownDate === showAll) {
        dateValue = x => x.datetime;
    }
    else {
        dateValue = x => x.datetime === dropDownDate;
    }
    
    let dropDownCity = d3.select("#selectCity").node().value;
    let cityValue;
    // instead of IF else use this: cityValue = (cond) ? do this: do that ;
    if (dropDownCity === showAll){
        cityValue = x => x.city;
    }
    else {
        cityValue = x => x.city === dropDownCity.toLowerCase();
    };

    let dropDownState = d3.select("#selectState").node().value;
    let stateValue;
    if (dropDownState === showAll){
        stateValue = x => x.state;
    }
    else {
        stateValue = x => x.state === dropDownState.toLowerCase();
    };

    let dropDownCountry = d3.select("#selectCountry").node().value;
    let countryValue;
    if (dropDownCountry === showAll){
        countryValue = x => x.country;
    }
    else {
        countryValue = x => x.country === dropDownCountry.toLowerCase();
    };

    let dropDownShape = d3.select("#selectShape").node().value;
    let shapeValue;
    if (dropDownShape === showAll) {
        shapeValue = x => x.shape;
    }
    else {
        shapeValue = x => x.shape === dropDownShape.toLowerCase();
    };

    let UFOfilter = tdata.filter(dateValue).filter(cityValue).filter(stateValue).filter(countryValue).filter(shapeValue);

    buildTable(UFOfilter);   
};

// function get filtered data and generate table content for it.
function buildTable(dateFilter) {
    let tableBody = d3.select("#tableBody").text("");
    Object.values(dateFilter).forEach(value => {
        tr = tableBody.append("tr");
        tr.append("td").text(value.datetime);

        let city = value.city.split(" ");
        let city_name = '';
        
        for (let i=0; i < city.length; i++) {
            let temp_city = city[i];
            city_name = city_name + temp_city[0].toUpperCase() + temp_city.substring(1) + " ";    
        };
 
        tr.append("td").text(city_name);
        tr.append("td").text(value.state.toUpperCase());
        tr.append("td").text(value.country.toUpperCase());
        tr.append("td").text(value.shape);
        tr.append("td").text(value.comments); 
    });     
};



