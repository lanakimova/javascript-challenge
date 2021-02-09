
// Upload all data from data.js for page load.
let tdata = data;

let docBody = d3.select("#body").on('load', init());

function init() {
    let tBody = d3.select("#tableBody");
    allData = tdata.filter(x => x.datetime);
    buildTable(allData);
    
    let dropDownMenu = document.getElementById("select-date");
    let dates = availableDate();
    console.log(`available dates: ${dates}`);
    for (let i=0; i < dates.length; i++) {
       let optn = dates[i];
       let date = document.createElement("option");
       date.textContent = optn;
       dropDownMenu.appendChild(date);
    };
};

// get available dates 
function availableDate() {
    let dates = [];
    Object.values(tdata).forEach(value => {
        date = value.datetime;
        if (dates.indexOf(date) !== -1) {
        }
        else {
            dates.push(date);
        }        
    });
    return dates;
};


let slct = d3.select("#select-date").on("change", showData);

function showData() {
    let dropDownMenu = d3.select("#select-date").node().value;
    let UFO_dateFilter;
    if (dropDownMenu === 'Show All') {
        UFO_dateFilter = tdata.filter(x => x.datetime);
    }
    else {
        UFO_dateFilter = tdata.filter(x => x.datetime === dropDownMenu);
    };
    buildTable(UFO_dateFilter);    
};

function buildTable(dateFilter) {
    let tableBody = d3.select("#tableBody").text("");
    Object.values(dateFilter).forEach(value => {
        tr = tableBody.append("tr");
        tr.append("td").text(value.datetime);
        let city = value.city.split(" ");
        let city_name = '';
        console.log(value.city.split(" "));
        for (let i=0; i < city.length; i++) {
            let temp_city = city[i];
            city_name = city_name + temp_city[0].toUpperCase() + temp_city.substring(1) + " ";    
        };
        console.log(`new city name: ${city_name}`);
        tr.append("td").text(city_name);
        tr.append("td").text(value.state.toUpperCase());
        tr.append("td").text(value.country.toUpperCase());
        tr.append("td").text(value.shape);
        tr.append("td").text(value.comments); 
    });     
};



