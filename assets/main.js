month_names = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
films_remove_btn = true;


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
    today_yesterday_init();
    window.scroll(0, 0);
}




function today_yesterday_init(){
    
    //  преобразование дат в текст
    
    var NowDate = new Date(); 
    now_date = NowDate.getFullYear() +'-'+('0' + (NowDate.getMonth()+1)).slice(-2) + '-'+('0' + NowDate.getDate()).slice(-2);  
    
    var TomorrowDate = new Date(NowDate.getTime() + (24 * 60 * 60 * 1000));
    tomorrow_date = TomorrowDate.getFullYear() +'-'+('0' + (TomorrowDate.getMonth()+1)).slice(-2) + '-'+('0' + TomorrowDate.getDate()).slice(-2);  
    
    var TomorrowDate2 = new Date(NowDate.getTime() + (48 * 60 * 60 * 1000));
    tomorrow_date2 = TomorrowDate2.getFullYear() +'-'+('0' + (TomorrowDate2.getMonth()+1)).slice(-2) + '-'+('0' + TomorrowDate2.getDate()).slice(-2);  
    

    //если у дня нет событий, то вообще убрать его
    date_list = document.getElementsByClassName("date-block");
    for (i = 0; i < date_list.length; i++) {
        p=0;
        all_date_count = document.getElementsByClassName("date-block")[i].children.length - 1;

        for(j=1; j<document.getElementsByClassName("date-block")[i].children.length; j++){
            if(document.getElementsByClassName("date-block")[i].children[j].style.display == "none") p++;
        }

        if(all_date_count == p) document.getElementsByClassName("date-block")[i].style.display = "none";
        else document.getElementsByClassName("date-block")[i].style.display = "block";
    }
    
    
    //скрыть вчерашние события
    for(i=0; i<document.getElementsByClassName("date-name").length; i++){
        el = document.getElementsByClassName("date-name")[i];
        date = el.innerText;
        
        month = el.innerText.substr(5, 2);
        if(month[0] == 0) month = month[1];
        month_str = month_names[month-1]
        
        day = el.innerText.substr(8, 2);
        if(day[0] == 0) day = day[1];
            
        if(date == now_date){
            document.getElementsByClassName("date-name")[i].innerHTML = "<time><div><red>Сегодня</red>, "+day+" "+month_str+"</div><div></div></time>";
            document.getElementsByClassName("date-name")[i].parentNode.classList.add("date-today");
        }
        
        if(date == tomorrow_date) document.getElementsByClassName("date-name")[i].innerHTML = "<time><black>Завтра</black>, "+day+" "+month_str+"</time>";
        if(date == tomorrow_date2) document.getElementsByClassName("date-name")[i].innerHTML = "<time><black>Послезавтра</black>, "+day+" "+month_str+"</time>";
        
        if(new Date(date) < new Date(now_date)) el.parentNode.style.display='none';

        
    }
}



function rubric_filter(el){
    
    
    if(window.scrollY > 200) window.scroll(0, 200);
    
    //отобразить активность элемента меню
    menu_list = document.getElementsByClassName("catalog-item");
    for (i = 0; i < menu_list.length; i++) {
        menu_list[i].classList.remove("selected");
    }
    el.classList.add("selected");
    
    //убрать кнопку Ещё успею
    document.getElementsByClassName("date-today")[0].children[0].children[0].children[1].innerHTML = "";
    
    //вывести только события рубрики, остальные скрыть
    menu_rubric_id = el.getAttribute("data-rubric");

    if(menu_rubric_id == "all" || menu_rubric_id == "kino"){
//        console.log("extra rubric")
        
        if(menu_rubric_id == "all"){
            for(i = 0; i < document.getElementsByClassName("event-item").length; i++) {
                document.getElementsByClassName("event-item")[i].style.display = "flex";
            }
            for(i = 0; i < document.getElementsByClassName("kino-item").length; i++) {
                document.getElementsByClassName("kino-item")[i].style.display = "none";
            }
        }
        
        if(menu_rubric_id == "kino"){
            for(i = 0; i < document.getElementsByClassName("kino-item").length; i++) {
                document.getElementsByClassName("kino-item")[i].style.display = "block";
            }
            for(i = 0; i < document.getElementsByClassName("event-item").length; i++) {
                document.getElementsByClassName("event-item")[i].style.display = "none";
            }
            
            //вставить кнопку "Ещё успею"
            document.getElementsByClassName("date-today")[0].children[0].children[0].children[1].innerHTML = "<div class='films-remove-btn' onclick='old_films_switch();'>Все сеансы</div>"
            hide_old_films();
            remove_old_films();
            
        }        
        
    }
    else{
        event_list = document.getElementsByClassName("item");
        for (i = 0; i < event_list.length; i++) {
            event_rubric_id = document.getElementsByClassName("item")[i].getAttribute("data-rubric")
            if(menu_rubric_id != event_rubric_id) document.getElementsByClassName("item")[i].style.display = "none";
            else document.getElementsByClassName("item")[i].style.display = "flex";
        }
    }
    
    //убрать дескрипшн блок и пустые даты дней
    document.getElementById("description_block").style.display = "none";
    today_yesterday_init();
    
}




function highlight(obj){
   var orig_border = obj.style.border;
   var orig_color = obj.style.border;
   obj.style.border = '2px solid tomato';
   obj.style.color = 'black';
   setTimeout(function(){
        obj.style.border = orig_border;
        obj.style.color = orig_color;
   }, 30000);
}


function hide_old_films(){
    
    var date_now = new Date();
    var time_item = new Date();

    times_arr = document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-time");
    
    for(i=0; i<times_arr.length; i++){
        
        item_hour = times_arr[i].innerText.slice(0,2)
        item_min = times_arr[i].innerText.slice(-2)
        time_item.setHours(item_hour, item_min);
        
        if(item_hour == '00' || item_hour == '01'){
            time_item.setDate(time_item.getDate() + 1);
        }
        else if(time_item.getDate() != date_now.getDate()) time_item.setDate(date_now.getDate());
        
        if(date_now.getTime() > time_item.getTime()){
            document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-time")[i].classList.add("kino-over");
        }
        else document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-time")[i].classList.remove("kino-over");
        
    }

}



function remove_old_films(){

    if (document.getElementsByClassName("films-remove-btn").length != 0) document.getElementsByClassName("films-remove-btn")[0].classList.remove("films-remove-btn-active");

    // спрятать те фильмы, что уже помечены как закончившиеся
    for(i=0; i<document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-over").length; i++){
        document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-over")[i].classList.add("kino-remove");
    }

    // спрятать кинотеатры, в которых сегодня нет сеансов на фильм
    for(i=0; i<document.getElementsByClassName("date-today")[0].getElementsByTagName("tr").length; i++){
        seance_all_count = document.getElementsByClassName("date-today")[0].getElementsByTagName("tr")[i].children[1].children.length;
        seance_remove_count = document.getElementsByClassName("date-today")[0].getElementsByTagName("tr")[i].children[1].getElementsByClassName("kino-over").length;
        if(seance_all_count == seance_remove_count){
            document.getElementsByClassName("date-today")[0].getElementsByTagName("tr")[i].classList.add("kino-remove");
        }
    }

    // спрятать фильмы, на которые нигде нет сеансов
    for(i=0; i<document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-item").length; i++){

        place_all_count = document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-item")[i].getElementsByTagName("tbody")[0].children.length;
        place_remove_count = 0;
        for(j=0; j<place_all_count; j++){
            if(document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-item")[i].getElementsByTagName("tbody")[0].children[j].classList.value == 'kino-remove') place_remove_count++;
        }

        if(place_all_count == place_remove_count){
            document.getElementsByClassName("date-today")[0].getElementsByClassName("kino-item")[i].classList.add("kino-remove");
        }

    }

}


function old_films_switch(){
    
    if(!films_remove_btn) films_remove_btn = true;
    else films_remove_btn = false
    
    if(films_remove_btn) remove_old_films();
    else{
        document.getElementsByClassName("films-remove-btn")[0].classList.add("films-remove-btn-active");
        
        elements = document.querySelectorAll('*');
        elements.forEach((element) => {
          element.classList.remove('kino-remove');
        })
    }
    
}


// Задумка скрывать события, которые закончились
//function hide_old_events(){
//
//    var date_now = new Date();
//    var time_item = new Date();
//    var time_item_start = new Date();
//    var time_item_end = new Date();
//    
//    for(i=0; i<document.getElementsByClassName("date-today")[0].getElementsByClassName("event-item").length; i++){
//    
//        item_time_str = document.getElementsByClassName("date-today")[0].getElementsByClassName("event-item")[i].children[0].innerText;
//        
////        console.log(item_time_str.length)
//        
//        if(item_time_str.length == 5){
//            item_hour = item_time_str.slice(0,2)
//            item_min = item_time_str.slice(-2)
//            time_item.setHours(item_hour, item_min);
//            
//            if(date_now.getTime() > time_item.getTime()){
//                document.getElementsByClassName("date-today")[0].getElementsByClassName("event-item")[i].classList.add("event-over");
//            }
//        }
//        
//        if(item_time_str.length == 13){
//
//            item_hour = item_time_str.slice(8,10)
//            item_min = item_time_str.slice(11,13)
//            time_item.setHours(item_hour, item_min);
//            
//            if(date_now.getTime() > time_item.getTime()){
//                document.getElementsByClassName("date-today")[0].getElementsByClassName("event-item")[i].classList.add("event-over");
//            }
//            
//        }
//
//        
//    }
//    
//}


function event_eid_nofind(eid){
    
    for(i=0; i<document.getElementsByClassName("date-block").length; i++){
        document.getElementsByClassName("date-block")[i].style.display = "none";
    }
    

    //Данные для передачи на сервер например	id товаров и его количество
    target_end_date = ""
    fetch('https://akratko.ru/events_last.json')
        .then(response => response.json())
        .then((data) => {
            data = data['events'];
            target_data = false;

            for(i=0; i<data.length; i++){
                if(eid == data[i]['id']){
                    target_rubric = data[i]['rubric_id'];
                    target_end_date = data[i]['date'];
                    break;
                }
            }

            if(target_end_date != ""){
                
                month = target_end_date.substr(5, 2);
                if(month[0] == 0) month = month[1];
                month_str = month_names[month-1]

                day = target_end_date.substr(8, 2);
                if(day[0] == 0) day = day[1];

                year = target_end_date.substr(0, 4);

                document.getElementById("event_end_date").innerHTML = day+" "+month_str+" "+year+" г.";


                // тут писать .... посмотрите что-то похожее из рубрики "Выставки" ...
                if(target_rubric != "" || target_rubric != "kino"){
                    menu_el_name = document.querySelector('[data-rubric="'+target_rubric+'"]').innerText;
                    document.getElementById("event_target_rubric").innerHTML = "Посмотрите что-то похожее в рубрике <span onclick='rubric_link_from_html("+target_rubric+")' class='link-blue'>"+menu_el_name+"</span>";
                }

                
            }

        })


    document.getElementById("description_block").innerHTML = "<h2>Мероприятие закончилось <span id='event_end_date'></span></h2><p id='event_target_rubric'></p>";
    document.getElementById("description_block").innerHTML += "<br><div class='back-link' onclick='all_show();'>Посмотреть все мероприятия</div>"
    document.getElementById("description_block").style.display = "block";
}



function rubric_link_from_html(target_rubric){
    rubric_filter(document.querySelector('[data-rubric="'+target_rubric+'"]'));            
}





document.addEventListener('DOMContentLoaded', function(){

    events = [];
    
    for(i=0; i<document.getElementsByClassName("item").length; i++){
        id = document.getElementsByClassName("item")[i].id.substr(6);
        events.push(id);
    }
    
    today_yesterday_init();
    
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
    event_id = queryDict['eid'];
    if (event_id != undefined){
        if(events.includes(event_id)){
            el = document.getElementById("event_"+event_id);
            event_description(el);
        }
        else event_eid_nofind(event_id)

        if(event_id.substr(0, 4) == "kino"){
            rubric_filter(document.querySelector('[data-rubric="kino"]'));            
            kino_id = event_id.substr(5)
            if(kino_id > 0 && document.getElementById(event_id) !== null){
                highlight(document.getElementById(event_id));
                document.getElementById(event_id).scrollIntoView();
                window.scrollBy(0,-115)
            }
        }
    }
    

    
    var items = document.getElementsByClassName('catalog-item');
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            rubric_filter(this);
//            console.log(this)
        });
    }


}, false);

