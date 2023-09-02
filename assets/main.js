
function event_description(el){
    
    for(i=0; i<document.getElementsByClassName("date-block").length; i++){
        document.getElementsByClassName("date-block")[i].style.display = "none";
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
    for(i=0; i<document.getElementsByClassName("date-block").length; i++){
        document.getElementsByClassName("date-block")[i].style.display = "block";
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
    
    
    //  преобразование дат в текст
    
    month_names = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    var NowDate = new Date(); 
    now_date = NowDate.getFullYear() +'-'+('0' + (NowDate.getMonth()+1)).slice(-2) + '-'+('0' + NowDate.getDate()).slice(-2);  
    
    var TomorrowDate = new Date(NowDate.getTime() + (24 * 60 * 60 * 1000));
    tomorrow_date = TomorrowDate.getFullYear() +'-'+('0' + (TomorrowDate.getMonth()+1)).slice(-2) + '-'+('0' + TomorrowDate.getDate()).slice(-2);  
    
    var TomorrowDate2 = new Date(NowDate.getTime() + (48 * 60 * 60 * 1000));
    tomorrow_date2 = TomorrowDate2.getFullYear() +'-'+('0' + (TomorrowDate2.getMonth()+1)).slice(-2) + '-'+('0' + TomorrowDate2.getDate()).slice(-2);  
    

    
    for(i=0; i<document.getElementsByClassName("date-name").length; i++){
        el = document.getElementsByClassName("date-name")[i];
        date = el.innerText;
        
        month = el.innerText.substr(5, 2);
        if(month[0] == 0) month = month[1];
        month_str = month_names[month-1]
        
        day = el.innerText.substr(8, 2);
        if(day[0] == 0) day = day[1];
            
        if(date == now_date){
            document.getElementsByClassName("date-name")[i].innerHTML = "<red>Сегодня</red>, "+day+" "+month_str;
            document.getElementsByClassName("date-name")[0].parentNode.classList.add("date-today");
        }
        
        if(date == tomorrow_date) document.getElementsByClassName("date-name")[i].innerHTML = "Завтра, "+day+" "+month_str
        if(date == tomorrow_date2) document.getElementsByClassName("date-name")[i].innerHTML = "Послезавтра, "+day+" "+month_str
        
    }
    
    
    

}, false);
