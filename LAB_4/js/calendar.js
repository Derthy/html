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

    createTable();
    addElement();

});

function createTable(){

    table = document.getElementById("timeTable");

        for (var i = 0; i < 8; i++){

        var tr = document.createElement('tr');
        for (var j=7; j<21; j++){

            var td = document.createElement('td');
            if((i==0 && j>7)){
                if(j>=10)
                    td.appendChild(document.createTextNode(j+':00'));
                else
                    td.appendChild(document.createTextNode('0'+j+':00'));
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
    document.getElementById("2x8").innerHTML = "<button style=\"width: 600px\" type=\"button\" class=\"btn btn-primary\">Save changes</button><button style=\"width: 600px;margin-left:620px\" type=\"button\" class=\"btn btn-primary\">Save changes</button>";
}