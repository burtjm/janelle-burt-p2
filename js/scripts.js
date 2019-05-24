$(document).ready(function(){
    getDate();
    getCurrentLocation();
    getCurrentWeather();
  }); 

  // Date
  function getDate (){
    var d = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dd = d.getDate();
    if (dd == 1|| dd == 21 || dd == 31){
      dd = "st";
    }
    else if (dd == 2|| dd == 22){
      dd = "nd";
    }
    else if (dd == 3 || dd == 23){
      dd = "rd";
    }
    else{
      dd = "th";
    };
    
    var  dateString = days[d.getDay()] + " " + d.getDate() + dd + " " + month[d.getMonth()] + " " + d.getFullYear();
    document.getElementById("currentDate").innerHTML = dateString;
  };
  
  
  //Forecast and Location
  function getCurrentLocation () {
    
  
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = (position.coords.latitude);
      var longitude = (position.coords.longitude);
      var googleApi = ("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key="+"AIzaSyA9BLLbrQvu_NsqNNaqc9waFPycSmhAFeI");
    
    
      $.getJSON(googleApi, function (response){
        console.log(response.results[0])
        var city = response.results[0].address_components[3].long_name;
        var country = response.results[0].address_components[5].short_name;
        $("#currentLoc").append(city+ ", " + country);
      });
    });
  };
    
        
  function getCurrentWeather(){
 
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = (position.coords.latitude);
      var longitude = (position.coords.longitude);
      var latLon = latitude+","+longitude;
      //allow broswer to access resource
      var proxy = "https://cors-anywhere.herokuapp.com/";
      var URL = "https://api.darksky.net/forecast/";
      var key = "de6331a13c6817a21cbb0646dbd6bd51/";
      var units = "?units=si";
     
      //getJSON jQuery method to make a request to the weather API url
      $.getJSON(proxy+URL+key+latLon+units, function(response) {
        
//Weather Condition and Temperature
        var currentSummary = response.currently.summary;
        $("#currentDesc").append(currentSummary);
        
        var currentTempCel = Math.floor(response.currently.temperature);
        var currentTempFah = Math.floor((currentTempCel*1.8)+32);
        $("#currentTemp").html(currentTempCel+"<i class='wi wi-degrees'></i>");

        
     
        
        //Get Icon depending on Weather Condition
        var currentIcon = response.currently.icon;
        switch(currentIcon) {
          case "clearday":
            $("#currentIcon").append("<i class='wi wi-day-sunny'></i>");
            break;
          case "clearnight":
            $("#currentIcon").append("<i class='wi wi-night-clear'></i>");
            break;
          case "rain":
            $("#currentIcon").append("<i class='wi wi-day-rain'></i>");
            break;
          case "snow":
            $("#currentIcon").append("<i class='wi wi-day-snow-wind'></i>");
            break;
          case "sleet":
            $("#currentIcon").append("<i class='wi wi-day-sleet'></i>");
            break;
          case "wind":
            $("#currentIcon").append("<i class='wi wi-day-cloudy-gusts'></i>");
            break;
          case "fog":
            $("#currentIcon").append("<i class='wi wi-day-fog'></i>");
            break;
          case "cloudy":
            $("#currentIcon").append("<i class='wi wi-day-cloudy'></i>");
            break;
          case "partly-cloudy-day":
            $("#currentIcon").append("<i class='wi wi-day-cloudy'></i>");
            break;
          case "partly-cloudy-night":
                
            $("#currentIcon").append("<i class='wi wi-night-alt-cloudy'></i>");
           
            break;
          default:
            $("#currentIcon").append("<i class='wi wi-day-sunny'></i>");
        };
        

//Hourly
function getHourlyTimes() {
    for (var i=0; i<=11; i++) {
      var time = new Date((response.hourly.data[i].time)*1000);
      var hours = (time.getHours());
      var str = i.toString();
      $("#hourlyTime"+str).append(hours);
    };
  };
  getHourlyTimes();
  
  //Get Celsius and Fahrenheit Hours, Temps, and Icons
  function getHourlyCelsius(){
    for (var i=0; i<=11; i++) {
      var temp = Math.floor(response.hourly.data[i].temperature);
      var str = i.toString();
      $("#hourlyTemp"+str).html(temp+"<i class='wi wi-degrees'></i>");
    };
  };
  getHourlyCelsius();
  
  function getHourlyFah(){
    for (var i=0; i<=11; i++) {
      var temp = (response.hourly.data[i].temperature);
      var fahTemp = Math.floor((temp*1.8)+32);
      var str = i.toString();
      $("#hourlyTemp"+str).html(fahTemp+"<i class='wi wi-degrees'></i>");
    };
  };

  //Hourly Icon for each column
  function getHourlyIcon () {
    for (var i=0; i<=11; i++){       
      var currentIcon = response.hourly.data[i].icon;
      var str = i.toString();
      var ID = "#hourlyIcon"+str;
      
      switch(currentIcon) {
        case "clear-day":
          $(ID).append("<i class='wi wi-day-sunny'></i>");
          break;
        case "clear-night":
          $(ID).append("<i class='wi wi-night-clear'></i>");
          break;
        case "rain":
          $(ID).append("<i class='wi wi-day-rain'></i>");
          break;
        case "snow":
          $(ID).append("<i class='wi wi-day-snow-wind'></i>");
          break;
        case "sleet":
          $(ID).append("<i class='wi wi-day-sleet'></i>");
          break;
        case "wind":
          $(ID).append("<i class='wi wi-day-cloudy-gusts'></i>");
          break;
        case "fog":
          $(ID).append("<i class='wi wi-day-fog'></i>");
          break;
        case "cloudy":
          $(ID).append("<i class='wi wi-day-cloudy'></i>");
          break;
        case "partly-cloudy-day":
          $(ID).append("<i class='wi wi-day-cloudy'></i>");
          break;
        case "partly-cloudy-night":
          $(ID).append("<i class='wi wi-night-alt-cloudy'></i>");
          break;
        default:
          $(ID).append("<i class='wi wi-day-cloudy'></i>");   
      };  
    };  
  };
  getHourlyIcon();
        
        
          
      
 
//Temperature Toggle Buttons
        $("#fahrenheitButton").click(function(){
          $("#currentTemp").fadeOut('slow', function(){
            $("#currentTemp").html(currentTempFah+"<i class='wi wi-degrees'></i>");
          });
          $("#currentTemp").fadeIn('slow');
         
          getHourlyFah();
        
        });
          
        $("#celsiusButton").click(function(){
          $("#currentTemp").fadeOut('slow', function(){
            $("#currentTemp").html(currentTempCel+"<i class='wi wi-degrees'></i>");
          });
          $("#currentTemp").fadeIn('slow');
          getHourlyCelsius();
        });       

       
    
        
        
        
      });
    }); 
  }; 