var serviceURL = "http://localhost:8080/hs-stundenplan/api";

function checkAuthentication(){
    var token = window.localStorage.getItem("AuthToken");
    authenticate(token);
}

function loadData(){
    var url = serviceURL + "/stundenplan";
    var req = new XMLHttpRequest;
    req.onload = onLoadTable;
    req.onerror = onError;
    req.open("GET", url, true);
    req.send();
}

function login(){
    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    var token = b64EncodeUnicode(username + ":" + password);
    authenticate(token);
    document.addEventListener("AuthSuccess", function(){
        hideLogin();
        showEditForm();
    });
    document.addEventListener("AuthFailed", function(){
        alert("Benutzername oder Passwort falsch!");
    });
    document.addEventListener("AuthError", function(){
        alert("Bei der Anmeldung ist ein Fehler aufgetreten!");
    })
}

function authenticate(token){
    var url = serviceURL + "/auth";
    var req = new XMLHttpRequest;
    req.onload = onLogin;
    req.onerror = onError;
    req.open("POST", url, true);
    req.setRequestHeader("Authorization", "Basic " + token);
    req.send();
}

function onLogin(){
    console.log(this);
    if(this.status == 200){
        window.localStorage.setItem("AuthToken", this.responseText);
        var success = new CustomEvent("AuthSuccess");
        document.dispatchEvent(success);
        return
    }
    if(this.status == 401){
        var failed = new CustomEvent("AuthFailed");
        document.dispatchEvent(failed)
        return;
    }
    var error = new CustomEvent("AuthError");
    document.dispatchEvent(error);
}

function onLoadTable() {
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

function hideLogin(){
    document.getElementById("login").style.display = "none";
    console.log("hide-login");
}

function showEditForm(){

}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function onError(e) {
    console.log(this);
    console.error(e);
}

document.onreadystatechange = function(){
    if(document.readyState){
        checkAuthentication();
        document.addEventListener("AuthSuccess", function(elm){
            hideLogin();
            showEditForm();
        });
        loadData();
    }
}

