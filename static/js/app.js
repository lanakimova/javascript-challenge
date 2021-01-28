

var button = d3.select('#button-addon2');
var form = d3.select("#form");

button.on('click', runEnter);
form.on('submit', runEnter);

function runEnter() {
    d3.event.preventDefault();

    var inputElement = d3.select("#observation-date");
    var inputValue = inputElement.property("value");
    console.log(`empty val: ${inputValue.value}`);
    
    if (inputValue.value == undefined) {
        alert("Enter a date of observation!");
    }
    else { 
        inputElement.property("value", "");
        console.log(`inputValue ${inputValue}`);

        var ufo_filter = data.filter(date => date.datetime === inputValue);
        console.log(`ufo_filter ${ufo_filter}`);

        var tableBody = d3.select("#tableBody");
        tableBody.text("");
    

        Object.entries(ufo_filter).forEach(([key, value]) => {
            tr = tableBody.append("tr");
            tr.append("td").text(value.datetime);
            tr.append("td").text(value.city);
            tr.append("td").text(value.state);
            tr.append("td").text(value.country);
            tr.append("td").text(value.shape);
            tr.append("td").text(value.comments);        

    });

    }
    
    
}









