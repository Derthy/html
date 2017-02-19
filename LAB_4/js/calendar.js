var days = new Array(5);
var dayCount = 0;
var table = document.createElement('table');
var tbdy = document.createElement('tbody');

days[0] = "Monday";
days[1] = "Tuesday";
days[2] = "Wednesday";
days[3] = "Thursday";
days[4] = "Friday";
days[5] = "Saturday";
days[6] = "Sunday";

$(document).ready(function(){

    for(i=8;i<19;i++){
        if(i<10)
            $('#BeginHour').append("<option>0"+i+"</option>");
        else
            $('#BeginHour').append("<option>"+i+"</option>");
    }
    
    for(i=8;i<19;i++){
        if(i<10)
            $('#EndHour').append("<option>0"+i+"</option>");
        else
            $('#EndHour').append("<option>"+i+"</option>");
    }

    for (var i=0; i<7; i++){
        $('#Day').append("<option>"+days[i]+"</option>");
    }

    createTable();

});

function createTable(){

    table = document.getElementById("timeTable");

        for (var i = 0; i < 8; i++){

        var tr = document.createElement('tr');
        for (var j=7; j<21; j++){

            var td = document.createElement('td');
            if((i==0 && j>7)){
                td.appendChild(document.createTextNode(j+':15'));
            }
            else if((j==7 && i>0)){
                td.appendChild(document.createTextNode(days[i-1]));
            }
            td.setAttribute("id",i+"x"+j);
            tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    table.appendChild(tbdy);

}

function addElement(){
    var lenght = document.getElementById("EndHour").value - document.getElementById("BeginHour").value;
    var cell = days.indexOf(document.getElementById("Day").value)+1;
    var margin = (document.getElementById("BeginHour").value - 8)*300;
    //document.getElementById("2x8").innerHTML = cell;

    var htmlValue = document.getElementById(cell+"x8").outerHTML;

    if(lenght>0)
    document.getElementById(cell+"x8").innerHTML = htmlValue + "<button id=\"added\" style=\"width:"+(lenght*300)+"px;margin-left:"+margin+"px\" type=\"button\" class=\"btn btn-primary\">Save changes</button>";
}

function tmp(){
    document.getElementById("2x8").innerHTML = "<button style=\"width: 600px\" type=\"button\" class=\"btn btn-primary\">Save changes</button><button style=\"width: 600px;margin-left:620px\" type=\"button\" class=\"btn btn-primary\">Save changes</button>";
    var value = document.getElementById("2x8").outerHTML;
    document.getElementById("2x8").innerHTML = value + "<button id=\"added\" style=\"width: 600px;margin-left:620px\" type=\"button\" class=\"btn btn-primary\">Save changes</button>";
    document.getElementById("added").remove();
}