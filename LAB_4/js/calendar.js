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
            $('#BeginHour').append("<option>"+i+"</option>");
        else
            $('#BeginHour').append("<option>"+i+"</option>");
    }
    
    for(i=8;i<19;i++){
        if(i<10)
            $('#EndHour').append("<option>"+i+"</option>");
        else
            $('#EndHour').append("<option>"+i+"</option>");
    }

    for (var i=0; i<7; i++){
        $('#Day').append("<option>"+days[i]+"</option>");
    }

    createTable();
    view();
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

function insert(){
    var begin = document.getElementById("BeginHour").value;
    var end = document.getElementById("EndHour").value;
    var lenght = end - begin;
    var cell = days.indexOf(document.getElementById("Day").value)+1;
    var margin = (document.getElementById("BeginHour").value - 8)*300;
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;

    var htmlValue = document.getElementById(cell+"x8").outerHTML;

    //if(lenght>0)
    //document.getElementById(cell+"x8").innerHTML = htmlValue + "<button style=\"width:"+(lenght*300)+"px;margin-left:"+margin+"px\" type=\"button\" class=\"btn btn-primary\">"+title+desc+begin+end+"</button>";
    
    var data = {TITLE:title,DESCRIPTION:desc,DAY:cell,BEGIN_TIME: begin, END_TIME: end}; 
    $.ajax({
        type: "POST",
        url: "server.php?p=insert",
        data: data,
        success: function(msg){
            view()
        }
    });
}

function addElement(lenght,cell,margin,id){
    var htmlValue = document.getElementById(cell+"x8").outerHTML;
    document.getElementById(cell+"x8").innerHTML = htmlValue + "<button id="+id+" style=\"width:"+(lenght*300)+"px;margin-left:"+margin+"px\" type=\"button\" class=\"btn btn-primary\">Save changes</button>";
}

function view(){

    //document.getElementById("added").remove();
    $.ajax({
        type: "GET",
        url: "server.php",
        success: function(data){
            var tmp = JSON.parse(data)
            for (var x in tmp){
              if (tmp.hasOwnProperty(x)){
                var begin = tmp[x]['BEGIN_TIME'];
                var end = tmp[x]['END_TIME'];
                var lenght = end - begin;
                var cell = tmp[x]['DAY'];
                var title = tmp[x]['TITLE'];
                var id = tmp[x]['ID'];
                var margin = (begin - 8)*300;

                var htmlValue = document.getElementById(cell+"x8").outerHTML;

                if(document.getElementById(id) == null)
                document.getElementById(cell+"x8").innerHTML = htmlValue + "<button id="+id+" style=\"width:"+(lenght*300)+"px;margin-left:"+margin+"px\" type=\"button\" class=\"btn btn-primary\">"+title+"</button>";
              }
            }
        }
    });
}