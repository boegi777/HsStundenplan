var url = "http://localhost:8080/TestWeb/webresources/stundenplan";
var req = new XMLHttpRequest();
req.onload = onLoad;
req.onerror = onError;
req.open("GET", url, true);
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
req.setRequestHeader("Access-Control-Allow-Origin", "*");
req.send();

function onLoad() {
    console.log(this);
    if(this.status == 200){
        var stundenplan = JSON.parse(this.responseText);
        var table = "<table class='table table-hover'>";
        table += "<thead>";
        table += "<tr>";
        table += "<th scope='col'>Uhrzeit</th>";
        table += "<th scope='col'>Montag</th>";
        table += "<th scope='col'>Dienstag</th>";
        table += "<th scope='col'>Mittwoch</th>";
        table += "<th scope='col'>Donnerstag</th>";
        table += "<th scope='col'>Freitag</th>";
        table += "</tr>";
        table += "</thead>";
        table += "<tbody>";
        for (i in stundenplan){
            console.log(stundenplan[i]);
            var row = "<tr>";
            row += "<td>" + stundenplan[i].time + "</td>";
            row += "<td>" + stundenplan[i].dayOne + "</td>";
            row += "<td>" + stundenplan[i].dayTwo + "</td>";
            row += "<td>" + stundenplan[i].dayThree + "</td>";
            row += "<td>" + stundenplan[i].dayFour + "</td>";
            row += "<td>" + stundenplan[i].dayFive + "</td>";
            row += "</tr>";
            table += row;
        }
        table += "</tbody>"
        table += "</table>";

        document.getElementById("content").innerHTML = table;
    } 
}

function onError(e) {
    console.log(this);
    console.error(e);
}