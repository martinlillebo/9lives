var scrollTop = 0;
window.addEventListener('scroll',function(){
 scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
});


var events=[
    {"startdate":"2018-08-23","enddate":"2018-09-28","eventName":"Wimdutest","description":"","channelid":3,"booking":true},

          ];


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];






function assignStartDate(date){
  if(date){
   var today = new Date(date);
  }
  else{
    var today = new Date();
  }
  var month = today.getMonth()+1;
  var year = today.getFullYear();
  var checkDate = new Date(''+month+' 01, '+year+'');
  startDate = checkDate.getDay() + 1;
  currentMonth = month;
}
function daysInThisMonth(date) {
  if(date){
   var now = new Date(date);
  }
  else{
   var now = new Date();
  }
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}
assignStartDate();


var startDate;
var currentMonth;
var totalDays = daysInThisMonth();
var totalViewDates= document.querySelectorAll(".date").length;
var viewDates=document.querySelectorAll(".date");
var lastcol =[];
var bookeddates =[];
var eventclick = false;

function reAssign(el){
  var value = el.value;
  assignStartDate(value);
  totalDays = daysInThisMonth(value);
  clearDates();
  assignDates();
  var changedmonth = new Date(value).getMonth();
  var changedyear = new Date(value).getFullYear();
  changedmonth = monthNames[changedmonth];
  console.log(changedmonth,changedyear);
  document.getElementById('currentMonth').textContent = changedmonth+ ' ' +changedyear;
  removeEvents();
  lastcol=[];
  checkLastCol()
  assignEvents(events);
}

function assignDates(){
  for(i=0;i<totalViewDates;i++){
    var dateValue = (i+1) - startDate + 1;
    viewDates[i].textContent=dateValue;
    if(dateValue<1){
      viewDates[i].parentNode.style.opacity=0;
    }
    if(dateValue>totalDays){
      viewDates[i].parentNode.style.opacity=0;
    }
  }
}
function clearDates(){
  for(i=0;i<totalViewDates;i++){
    viewDates[i].textContent="";
    viewDates[i].parentNode.style.opacity=1;
    }

}

assignDates();









function checkLastCol(){
   for(i=0;i<5;i++){
   var local = i*7 + 6;
   var value = viewDates[local].textContent;
   lastcol.push(value)
  }
}

checkLastCol()

function assignchannel(value,item){
  switch(value){
    case 1:
      item.classList.add("booking-com");
      break
    case 2:
      item.classList.add("airbnb");
      break
    case 3:
      item.classList.add("expedia");
      break
    case 4:
      item.classList.add("homestay");
      break
    case 5:
      item.classList.add("instastay");
      break
  }
}

function setDetails(el,eventname,eventduration,booking,i){
  el.setAttribute('data-eventname', ''+eventname+'');
  el.setAttribute('data-duration', ''+eventduration+'');
  el.setAttribute('data-booking', ''+booking+'');
  el.setAttribute('data-index', i);
}

function createEvent(){
   var newEvent = new Object();
   newEvent.startdate = "2018-08-10";
   newEvent.enddate = "2018-08-11";
   newEvent.eventName="cool work by chattap";
   newEvent.booking=false;
   newEvent.channelid = '';
   events.push(newEvent);
   removeEvents();
   assignEvents(events);
}

function removeEvent(el){
  var i = el.getAttribute('data-index');
  events.splice(i,1);
  removeEvents()
  assignEvents(events);
  document.getElementById('pop-up').style.display="none";
}
// createEvent();

 function removeEvents(){
    var uievents = document.querySelectorAll(".event");
    var uieventscount = document.querySelectorAll(".event").length;
    for(i=0;i<uieventscount;i++){
      uievents[i].remove();
    }
    for(i=0;i<totalViewDates;i++){
      viewDates[i].parentNode.classList.remove("blocked");
      viewDates[i].parentNode.classList.remove("booked");
    }
 }





function assignEvents(el){
  var eventsTotal = el.length;
  console.log(eventsTotal);
  for(i=0;i<eventsTotal;i++){
    bookeddates=[];
    var temp = document.getElementById('eventTemplate');
    var clon = document.importNode(temp.content, true);
    item = clon.querySelector(".event");
     var actualStartDate = new Date(el[i]['startdate']);
     var actualEndDate = new Date(el[i]['enddate']);
     var displayStartDate = actualStartDate.getDate();
     var displayEndDate = actualEndDate.getDate();
     var actualStartDateMonth = actualStartDate.getMonth() +1;
     var actualEndDateMonth = actualEndDate.getMonth()+1;
     var startMonth = monthNames[actualStartDateMonth - 1 ];
     var EndMonth = monthNames[actualEndDateMonth - 1];
     if (actualStartDateMonth < currentMonth){
         actualStartDate = new Date(''+currentMonth+' 01, 2018');
         console.log(actualStartDate);
     }
     if (currentMonth < actualEndDateMonth){
       actualEndDate = new Date(''+currentMonth+' '+totalDays+', 2018');
     }
    var DateStart = actualStartDate.getDate();
    var EndDate = actualEndDate.getDate();
    console.log(DateStart,EndDate);
    var Days = Math.abs(EndDate - DateStart) + 1 ;
    var EventName = el[i]['eventName'];
    var booking=el[i]['booking'];
    var channel = el[i]['channelid'];
    var lastDate = DateStart + Days - 1 ;
    var Duration =  displayStartDate+'  '+startMonth+ ' - '+displayEndDate+'  '+EndMonth;
    if (startMonth == EndMonth){
      Duration = displayStartDate+' - '+displayEndDate+'  '+EndMonth;
    }
    var dividerCount = 0;
    var dividerDate;
    var dividerDates = [];
      for(j=0;j<Days;j++){
        viewDates[ DateStart + startDate - 2 + j ].parentNode.classList.add("blocked");
        if(booking){
          viewDates[ DateStart + startDate - 2 + j ].parentNode.classList.add("booked");
          assignchannel(channel,item)

        }
        else{
             setDetails(item,EventName,Duration,booking,i);
           }
        var dividerDate = viewDates[ DateStart + startDate - 2 + j ].textContent;
        bookeddates.push(dividerDate);
        //Breaking Days
        if(lastcol.includes(dividerDate)){
          dividerCount++;
          dividerDates.push(dividerDate);

        }

      }
    function NewMethod(){
      for(k=0;k<dividerCount+1;k++){
        var end = dividerDates[k];
        var diff = end - DateStart + 1;
        if( k == dividerCount){
          diff = lastDate - DateStart + 1;
        }
        var widthp = (diff * 100)+"%";
        var extrap = (diff*2 - 1)+"px";
        var w = 'calc('+widthp+' + '+extrap+')';
        item.style.width= w;
        item.querySelector(".event-text").textContent = EventName;
        if(DateStart<= lastDate){
          if(k==0){
            item.classList.add('open-start');
          }
          else{
            item.classList.remove('open-start');
          }
          if(k==dividerCount){
            item.classList.add('open-end');
          }
          if(dividerDates[k] == lastDate){
             item.classList.add('open-end');
          }

          if (actualStartDateMonth < currentMonth){
         item.classList.remove('open-start');
     }
      if (actualEndDateMonth > currentMonth){
         item.classList.remove('open-end');
     }


          viewDates[ DateStart + startDate - 2 ].parentNode.appendChild(clon.cloneNode(true));
          DateStart = parseInt(end) + 1;
        }

      }
       if(booking){
          assignchannel(channel,item)
         }
        else{
             setDetails(item,EventName,Duration,booking,i);
         }
    }
    console.log(bookeddates,dividerDates);
    if(dividerCount>0){
      NewMethod();
    }
    else{

       var widthp = (Days * 100)+"%";
        var extrap = (Days*2 - 1)+"px";
        var w = 'calc('+widthp+' + '+extrap+')';
        item.style.width= w;
        item.querySelector(".event-text").textContent = EventName;
        item.classList.add('open-start');
        item.classList.add('open-end');
        if (actualStartDateMonth < currentMonth){
           item.classList.remove('open-start');
       }
        if (actualEndDateMonth > currentMonth){
           item.classList.remove('open-end');
       }
           viewDates[ DateStart + startDate - 2 ].parentNode.appendChild(clon.cloneNode(true));
      if(booking){
          assignchannel(channel,item)
         }
        else{
             setDetails(item,EventName,Duration,booking,i);
         }

    }

  }

}

assignEvents(events);




function showPopUp(el,event){
  eventclick = true;
  var booking = el.getAttribute('data-booking');
  var name= el.getAttribute('data-eventname');
  var duration = el.getAttribute('data-duration');
  var popUp = document.getElementById('pop-up');
  var index = el.getAttribute('data-index');
  document.getElementById('unlock').setAttribute('data-index',index);
  if(booking=="false"){
    popUp.style.display="inline-block";
    popUp.querySelector('.duration').textContent=duration;
    popUp.querySelector('.event-name').textContent=name;
    var Wx = window.innerWidth;
    var position = el.getBoundingClientRect();
    var x = position.left;
    var y =position.top + 34 + scrollTop ;
    if(x + 340 < Wx){
      popUp.classList.add("left");
      popUp.classList.remove("right");
      popUp.style.top= y+'px';
      popUp.style.left= x+'px';
    }
    else{
       x = x-180;
       popUp.classList.remove("left");
       popUp.classList.add("right");
       popUp.style.top= y+'px';
       popUp.style.left= x+'px';
    }

  }

}

function hidePopUp(){
  document.getElementById('pop-up').style.display="none";
}

window.addEventListener('click', function(e){
  if (eventclick ==true){
    document.getElementById('pop-up').style.display="inline-block";
    eventclick = false;
  }
  else{
    document.getElementById('pop-up').style.display="none";
  }
});

window.addEventListener('resize',function(e){
    document.getElementById('pop-up').style.display="none";

});

