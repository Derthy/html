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
        $('#BeginHour').append("<option>"+i+"</option>");
    }
    
    for(i=8;i<19;i++){
        $('#EndHour').append("<option>"+i+"</option>");
    }

    for (var i=0; i<7; i++){
        $('#Day').append("<option>"+days[i]+"</option>");
    }

    for(i=8;i<19;i++){
        $('#BeginHourEd').append("<option>"+i+"</option>");
    }
    
    for(i=8;i<19;i++){
        $('#EndHourEd').append("<option>"+i+"</option>");
    }

    for (var i=0; i<7; i++){
        $('#DayEd').append("<option>"+days[i]+"</option>");
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
                var desc = tmp[x]['DESCRIPTION'];
                var id = tmp[x]['ID'];
                var margin = (begin - 8)*300;

                var htmlValue = document.getElementById(cell+"x8").outerHTML;

                if(document.getElementById(id) == null)
                document.getElementById(cell+"x8").innerHTML = htmlValue + "<button id="+id+" onClick=\"edit('"+id+"','"+title+"','"+desc+"','"+cell+"','"+begin+"','"+end+"')\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#editModal\" data-dismiss=\"modal\" style=\"width:"+(lenght*300)+"px;margin-left:"+margin+"px\" type=\"button\" class=\"btn btn-primary\">"+title+"</button>";
              }
            }
        }
    });
}

function edit(id,title,desc,day,begin,end){
    document.getElementById('IDEd').value=id;
    document.getElementById('titleEd').value=title;
    document.getElementById('descEd').value=desc;
    document.getElementById('DayEd').value=days[day-1];
    document.getElementById('BeginHourEd').value=begin;
    document.getElementById('EndHourEd').value=end;
}

function update(){
    var id = document.getElementById("IDEd").value;
    var begin = document.getElementById("BeginHourEd").value;
    var end = document.getElementById("EndHourEd").value;
    var cell = days.indexOf(document.getElementById("DayEd").value)+1;
    var title = document.getElementById("titleEd").value;
    var desc = document.getElementById("descEd").value;

    document.getElementById(id).remove();

    var data = {ID:id,TITLE:title,DESCRIPTION:desc,DAY:cell,BEGIN_TIME: begin, END_TIME: end}; 
    $.ajax({
        type: "POST",
        url: "server.php?p=update",
        data: data,
        success: function(msg){
            view();
        }
    });
}

function remove(){
    var id = document.getElementById("IDEd").value;

    var data = {ID:id}; 
    $.ajax({
        type: "POST",
        url: "server.php?p=delete",
        data: data,
        success: function(msg){
            view();
        }
    });

    document.getElementById(id).remove();
}