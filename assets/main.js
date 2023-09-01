
function event_description(el){
    
    for(i=0; i<document.getElementsByClassName("item").length; i++){
        document.getElementsByClassName("item")[i].style.display = "none";
    }
    
    time = el.children[0].innerText;
    name = el.children[1].children[0].innerText;
    place = el.children[1].children[1].innerText;
    description = el.children[2].innerText;
    price = el.children[3].innerText;
    
    document.getElementById("description_block").innerHTML = "<h2>"+name+"</h2>";
    document.getElementById("description_block").innerHTML += "<p><img src='./assets/location.svg'>"+place+"</p>";
    document.getElementById("description_block").innerHTML += "<p><img src='./assets/time.svg'>"+time+"</p>";
    document.getElementById("description_block").innerHTML += "<p><img src='./assets/ruble.svg'>"+price+"</p>";
    document.getElementById("description_block").innerHTML += "<p class='p-description'>"+description+"</p>";
    document.getElementById("description_block").innerHTML += "<div class='back-link' onclick='all_show();'>Назад к мероприятиям</div>"
    document.getElementById("description_block").style.display = "block";
}


function all_show(){
    document.getElementById("description_block").style.display = "none";
    for(i=0; i<document.getElementsByClassName("item").length; i++){
        document.getElementsByClassName("item")[i].style.display = "flex";
    }
}


document.addEventListener('DOMContentLoaded', function(){

    events = [];
    
    for(i=0; i<document.getElementsByClassName("item").length; i++){
        id = document.getElementsByClassName("item")[i].id.substr(6);
        events.push(id);
    }
    
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
    event_id = queryDict['eid'];
    
    if (event_id != undefined){
        if(events.includes(event_id)){
            el = document.getElementById("event_"+event_id);
            event_description(el);
        }
    } 

}, false);

