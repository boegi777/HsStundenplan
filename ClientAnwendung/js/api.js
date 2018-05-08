var serviceURL = "http://localhost:8080/hs-stundenplan/api"; //hs-stundenplan = Projektname (Gegebenenfalls ändern)
var wsURL = "ws://localhost:8080/hs-stundenplan/socket"; //hs-stundenplan = Projektname (Gegebenenfalls ändern)
var stundenplan = null;

function checkAuthentication(){
    var token = window.localStorage.getItem("AuthToken");
    authenticate(token);
}

function loadData(){
    var url = serviceURL + "/timetable";
    var req = new XMLHttpRequest;
    req.onload = onLoadTable;
    req.onerror = onError;
    req.open("GET", url, true);
    req.send();
}

function deleteTextContent(){
    document.getElementById("admin-textcontent").value = "";
}

function updateTimetable(){
    var timeSelector = document.getElementById("timer").children[1];
    var daySelector = document.getElementById("dayer").children[1];
    var entry = null;
    var text = "";

    if(stundenplan){
        entry = stundenplan[timeSelector.value]; 
        entry[daySelector.value] = document.getElementById("admin-textcontent").value;
        sendTimetablePostRequest();
    }
}

function sendTimetablePostRequest(){
    var url = serviceURL + "/timetable";
    var req = new XMLHttpRequest;
    var token = window.localStorage.getItem("AuthToken");
    req.onload = onUpdateTable;
    req.onerror = onError;
    req.open("POST", url, true);
    req.setRequestHeader("Authorization", "Basic " + token);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("timetable=" + JSON.stringify(stundenplan));
}

function onUpdateTable(){
    console.log("timetable updated");
}

function login(){
    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    var token = b64EncodeUnicode(username + ":" + password);
    authenticate(token);
    document.addEventListener("AuthSuccess", function(){
        hideLogin();
        showAdminPanel();
    });
    document.addEventListener("AuthFailed", function(){
        alert("Benutzername oder Passwort falsch!");
    });
    document.addEventListener("AuthError", function(){
        alert("Bei der Anmeldung ist ein Fehler aufgetreten!");
    })
}

function adminLogout(){
    window.localStorage.clear();
    showLogin();
    hideAdminPanel();
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
    if(this.status == 200){
        stundenplan = JSON.parse(this.responseText);
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
        setAdminPanelContent();
    } 
}

function setAdminPanelContent(){
    var timeSelector = document.getElementById("timer").children[1];
    var daySelector = document.getElementById("dayer").children[1];
    var entry = null;
    var text = "";

    if(stundenplan){
        entry = stundenplan[timeSelector.value]; 
        text = entry[daySelector.value];
        document.getElementById("admin-textcontent").value = text;
    }
}

function hideLogin(){
    document.getElementById("login").style.display = "none";
}

function hideLogin(){
    document.getElementById("login").style.display = "block";
}

function showAdminPanel(){
    var toppart = document.getElementById("toppart");
    var adminpanel = document.getElementById("adminpanel");
    var logout = document.getElementById("logout");
    logout.style.display = "none";
    adminpanel.style.display = "none";
    if (toppart.style.display === "none") {
        toppart.style.display = "block";
    } else {
        toppart.style.display = "none";
        adminpanel.style.display = "block";
        logout.style.display = "block";
    }

    setPanelEvents();
}

function setPanelEvents(){
    var timeSelector = document.getElementById("timer").children[1];
    var daySelector = document.getElementById("dayer").children[1];

    timeSelector.onchange = setAdminPanelContent;
    daySelector.onchange = setAdminPanelContent;
}

function hideAdminPanel(){
    document.getElementById("logout").style.display = 'none';
    document.getElementById("adminpanel").style.display = 'none';
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

function onSocketOpen(evt){
    websocket.send("connected");
}

function onSocketClose(evt){
    websocket.send("disconnected");
}

function onSocketMessage(evt){
    console.log(evt.data);
    if(evt.data == "200"){
        loadData();
    }
}

function onSocketError(evt){
    websocket.send("error occured");
}

function initWebsocket(){
    websocket = new WebSocket(wsURL);
    websocket.onopen = function(evt) { onSocketOpen(evt) }
    websocket.onoclose = function(evt) { onSocketClose(evt) }
    websocket.onmessage = function(evt) { onSocketMessage(evt) }
    websocket.onerror = function(evt) { onSocketError(evt) }
}

window.onload = function() {
    hideAdminPanel();
};

document.onreadystatechange = function(){
    if(document.readyState){
        checkAuthentication();
        document.addEventListener("AuthSuccess", function(elm){
            hideLogin();
            showAdminPanel();
        });
        loadData();
        initWebsocket();
    }
}

