
// requestAnimationFrame Shim
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
})();

window.onload = function(e) {
  App.init();
  //initSocket(App.processEvent); // Uncomment/comment for show/hide live attacks
  //App.callApitogetLatLong();
  App.getXMLFileData();
};
i=1;
var CITY_COORD = [];
var attackTypeName = [];
var attackDataArr = [];
var App = {
  // reqDelay : 1000,
  countriesAttackCount: [],
  drawCanvas : null,
  drawContext : null,
  animationID : null,
  countRows : 0,
  attacks : [],
  attackCountryCounts: {},
  countryIsoToName: {},
  // typesColor : {
  //   'infection' : 'rgba(255, 153, 51, 0.7)',
  //   'attack' : 'rgba(204, 0, 0, 0.7)',
  //   'spam' : 'rgba(230, 230, 230, 0.7)',
  //   'phishing':'rgba(255, 192, 203, 0.7)',
  //   'mitm':'rgba(255, 246, 233, 0.7)',
  //   'ddos':'rgba(255, 152, 67, 0.7)',
  //   'malware':'rgba(52, 104, 192, 0.7)',
  //   'ransomware':'rgba(242, 133, 133, 0.7)'
  // },
  getXMLFileData: function(){
    $.ajax({
      type: "GET",
      // url: "./xml/cyber_attack_data_new.xml",
      url: "./getAttackXML.php",
      dataType: "xml",
      success: xmlParser,
      failure:function(){
        console.log('error in file');
      }
    });
    function xmlParser(xml) {
        //$('#attacks_data tr:last-child').remove();
        var XMLDatalen = $(xml).find("Attack").length;
        var counter = 0;
        $(xml).find("Attack").each(function () {
        
        var IP = $(this).find("IP").text();
        var attackType = $(this).find("AttackType").text();
        var attackMsg = $(this).find("AttackMsg").text();
        var SourceCountry = $(this).find("SourceCountry").text();
        var SourceCountryISO = $(this).find("SourceCountryISO").text();
        var TargetCountry = $(this).find("TargetCountry").text();
        var TargetCountryISO = $(this).find("TargetCountryISO").text();
        var Severity = $(this).find("Severity").text();
        var NodeLocation =  $(this).find("NodeLocation").text();
        var NodeLocationISO =  $(this).find("NodeLocationISO").text();
        //var lat = $(this).find("lat").text();
        //var lng = $(this).find("lng").text();
        // var SourceCountryLat = $(this).find("SourceCountryLat").text();
        // var SourceCountryLng = $(this).find("SourceCountryLng").text();
        // var TargetCountryLat = $(this).find("TargetCountryLat").text();
        // var TargetCountryLng = $(this).find("TargetCountryLng").text();
        var attackTypeClass = attackType.toLowerCase().replace(/\s/g, '');
        //CITY_COORD.push({"lat":lat, "lng":lng});
        // CITY_COORD.push({"source":{"lat":SourceCountryLat, "lng":SourceCountryLng}, "target":{"lat":TargetCountryLat, "lng":TargetCountryLng}});
        attackDataArr.push(
                            {
                              "IP":IP, 
                              "attackType":attackType, 
                              "attackMsg":attackMsg, 
                              "SourceCountry":SourceCountry, 
                              "SourceCountryISO":SourceCountryISO, 
                              "TargetCountry":TargetCountry, 
                              "TargetCountryISO":TargetCountryISO, 
                              "Severity":Severity, 
                              "NodeLocation":NodeLocation, 
                              "NodeLocationISO":NodeLocationISO
                            }
                          );
        if(attackDataArr.length > maxRecordsToShowOnMap){
          attackDataArr.shift();
        }
        // console.log(attackDataArr);
        attackTypeName.push(attackType.toLowerCase());
        $("#attacks_data").prepend('<tr><td>'+ IP + '</td>'+ '<td><span class="'+attackTypeClass+'">'+ attackType + '</span></td>' + '<td>'+ attackMsg +'</td>' + '<td><div class="inline-block flag flag-'+SourceCountryISO+'"></div><p class="nomargin ellipsis">'+ SourceCountry + '</p></td>' + '<td><div class="inline-block flag flag-'+TargetCountryISO+'"></div><p class="nomargin ellipsis">'+ TargetCountry + '</p></td>' + '<td>'+ Severity + '</td>' + '<td><div class="inline-block flag flag-'+NodeLocationISO+'"></div><p class="nomargin ellipsis">'+ NodeLocation + '</p></td></tr>');
        
        /*
        * Show Top Locations in descending order Starts
        */

        // console.log(NodeLocation);
        // if(App.countriesAttackCount.length > 0){
        //   countryFound = false;
        //   for(idx in App.countriesAttackCount){
        //     // console.log(idx);
        //     if(App.countriesAttackCount[idx]['countryName'] == NodeLocation.toLowerCase()){
        //       App.countriesAttackCount[idx]['attackCount']++;
        //       countryFound = true;
        //     }
        //   }
        //   if(!countryFound){
        //     idx++;
        //     App.countriesAttackCount[idx] = [];
        //     App.countriesAttackCount[idx]['countryName'] = NodeLocation.toLowerCase();
        //     App.countriesAttackCount[idx]['attackCount'] = 1;
        //   }
        // } else {
        //   App.countriesAttackCount[0] = [];
        //   App.countriesAttackCount[0]['countryName'] = NodeLocation.toLowerCase();
        //   App.countriesAttackCount[0]['attackCount'] = 1;
        // }
        // App.countriesAttackCount.sort(function (a, b) { 
        //   return b['attackCount'] - a['attackCount']; 
        // });

        // // console.log(App.countriesAttackCount);
        // locationList = '';
        // for(idx in App.countriesAttackCount){
        //   locationList += '<li><div class="inline-block flag flag-us"></div><p class="nomargin ellipsis">'+App.countriesAttackCount[idx]['countryName']+'</p></li>';
        // }
        // // $("#top_locations").prepend('<li><div class="inline-block flag flag-us"></div><p class="nomargin ellipsis">'+NodeLocation+'</p></li>');
        // $("#top_locations").html(locationList);

        /*
        * Show Top Locations in descending order Ends
        */

        // $("#inside_legend").prepend('<p class="'+attackTypeClass+'">'+attackType+'</p>');
        counter = counter+1;
        App.generateAttacksRandomly(CITY_COORD, attackTypeName, SourceCountryISO, TargetCountryISO);
      });
      // console.log(counter + "xmlrecords:"+XMLDatalen);
      /*if (counter == XMLDatalen){
        App.getXMLFileData();
      }*/
      setTimeout(App.getXMLFileData,reqDelay);
    }
  },
  // callApitogetLatLong: function(n){
  //   var city = 'Russia'
  //   $.ajax({
  //       method: 'GET',
        
  //       url: 'https://api.api-ninjas.com/v1/geocoding?city='+ city,
  //       headers: { 'X-Api-Key': 'vm+pVU9YxwB26irFC9Wv/A==4FU5dMSd2m76OmxZ'},
  //       contentType: 'application/json',
  //       success: function(result) {
  //           console.log(result);
  //       },
  //       error: function ajaxError(jqXHR) {
  //           console.error('Error: ', jqXHR.responseText);
  //       }
  //   });
  // },
  init : function(){
    this.drawCanvas = document.getElementById("drawCanvas");
    this.drawContext = this.drawCanvas.getContext("2d");

    this.fps = 15;
    this.then = Date.now();
    this.interval = 1000/this.fps;

    App.draw();

    // Simulate attack
    //App.attacks.push(new Attack (340,  259,  788,  173, 'infection'));
    //App.attacks.push(new Attack (440,  359,  588,  273, 'attack'));
    //App.attacks.push(new Attack (240,  459,  188,  473, 'spam'));

    //topLocations = [];


   //this.updateLocations(topLocations);

    // Set interval to update top attack locations
    /*setInterval(function() {
        var countries = [];
        for (var c_iso in App.attackCountryCounts) {
            if (App.attackCountryCounts.hasOwnProperty(c_iso)) {
                countries.push({'countryCode': c_iso, 'countryName': App.countryIsoToName[c_iso], 'count': App.attackCountryCounts[c_iso]});
            }
        }
        countries.sort(function(a, b) {
            return b.count - a.count;
        });
        var top_countries = countries.slice(0, 10);
        App.updateLocations(top_countries);
    }, 1000);
    */
  },

  generateAttacksRandomly : function(CITY_COORD, attackType, SourceCountryISO, TargetCountryISO){
    
    //console.log(JSON.stringify(CITY_COORD));
    // var lengthrecord = CITY_COORD.length;
    var lengthrecord = attackDataArr.length;
    console.log(lengthrecord);
    for (var i = 0; i<lengthrecord; i++){
      // console.log("I am calling"+i);
      // marginOffset = 10;
      //generate randomly based on canvas size and margin offset

      // x1 = Math.floor(Math.random() * (this.drawCanvas.width-marginOffset)) + marginOffset;
      // y1 = Math.floor(Math.random() * (this.drawCanvas.height-marginOffset)) + marginOffset;
      // x2 = Math.floor(Math.random() * (this.drawCanvas.width-marginOffset)) + marginOffset;
      // y2 = Math.floor(Math.random() * (this.drawCanvas.height-marginOffset)) + marginOffset;
      //console.log( "("+ x1 + ":"+ y1 + "), (" + x2 + ":" + y2 + ")");

      
      // var i1 = Math.floor(Math.random() * CITY_COORD.length);
      // var i2 = Math.floor(Math.random() * CITY_COORD.length);
      // var p1 = App.latLngToCanvasXY(CITY_COORD[i1].lat, CITY_COORD[i1].lng);
      // var p2 = App.latLngToCanvasXY(CITY_COORD[i2].lat, CITY_COORD[i2].lng);
      var source_country_ISO = attackDataArr[i].SourceCountryISO;
      var target_country_ISO = attackDataArr[i].TargetCountryISO;

      var p1 = App.latLngToCanvasXY(sourceLatLngJSON[source_country_ISO].latitude, sourceLatLngJSON[source_country_ISO].longitude);
      var p2 = App.latLngToCanvasXY(targetLatLngJSON[target_country_ISO].latitude, targetLatLngJSON[target_country_ISO].longitude);
      
      var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y;
      
      // console.log("x1 = "+x1+", x2 = "+x2);
      // console.log("y1 = "+y1+", y2 = "+y2);
      
      //console.log("sourcecountry_Latitude: "+sourceLatLngJSON[source_country_ISO].latitude+" "+"sourcecountryLongitude: "+sourceLatLngJSON[source_country_ISO].longitude);
      
      
      //console.log("counterow: "+i+"sourcecountry: "+source_country_ISO+" "+"targetcountry: "+target_country_ISO);
      
      //var randomType = parseInt((Math.random()*lengthrecord)%lengthrecord);
      /*if (randomType==0)
        type = 'infection';
      else if (randomType == 1)
        type = 'attack';
      else
        type = 'spam';
    */
    // type = attackType[i];
    type = attackDataArr[i].attackType.toLowerCase();
    
    //console.log(type);

      App.attacks.push(new Attack (x1, y1, x2, y2, type));
      //App.attacks.push(new Attack (x1, y1, x2, y2, type, date, countryAttack, countryVictim, malwareName ));
      if(App.attacks.length > maxRecordsToShowOnMap){
        App.attacks.shift();
      }
    }

  },

  latLngToCanvasXY : function(lat, lng) {
    var x1 = ((lng + 180) * (1200.0  / 360));
    var y1 = (((lat * -1) + 90) * (720.0/ 180));
    var c1 = {xf: 0.9, xd: 583, yf: 0.8, yd: 61};
    var xy1 = {x: x1 * c1.xf + c1.xd, y: y1 * c1.yf + c1.yd};
    var txy2 = function(a,b,d,e){return e=Math,a=e.sin(a*e.PI/180),{x:(b/360+.5)*d,y:(.5-e.log((1+a)/(1-a))/(4*e.PI))*d}}(lat, lng, 1200);
    var c2 = {xf: 0.9, xd: 42, yf: 0.85, yd: 158};
    var xy2 = {x: txy2.x * c2.xf + c2.xd, y: txy2.y * c2.yf - c2.yd};
    var f = {x: -270 + (xy1.x + xy2.x) / 2, y: (xy1.y + xy2.y) / 2};
    return {x: f.x * 1.045, y: f.y * 1.045};
  },

  drawMap : function(){
    var spacing = 6;
    var dotSize = 2;

    for (x=0;x<this.mapData.length;x++){
      for (y=0;y<this.mapData[0].length;y++){

        if (App.mapData[x][y]>0){
          this.drawContext.beginPath();
          this.drawContext.arc(45+x*spacing, 15+y*spacing, dotSize, 0, 2*Math.PI, false);
          this.drawContext.fillStyle = "rgba(255, 255, 255, 0.5)";
          this.drawContext.fill();
        }

      }
    }

    /*if (false) {  // Testing geo projection
      for (var i = 0; i < CITY_COORD.length; i++) {
        var coords = CITY_COORD[i];
        xy = App.latLngToCanvasXY(parseFloat(coords.lat), parseFloat(coords.lng));
        this.drawContext.beginPath();
        this.drawContext.arc(xy.x, xy.y, 2, 0, 2*Math.PI, false);
        this.drawContext.fillStyle = "rgba(255, 0, 0, 1)";
        this.drawContext.fill();
      }
    }*/

  },

  /*updateLocations: function(topLocations){
    document.getElementById("top_locations").innerHTML = "";

    for (var i=0;i<topLocations.length;i++){
      var li = document.createElement("li");
      li.classList.add("flex");
      li.innerHTML = '<div class="inline-block flag flag-'+topLocations[i].countryCode+'" ></div><p class="nomargin ellipsis">'+topLocations[i].countryName+'</p>';
      document.getElementById("top_locations").appendChild(li);

    }
  },*/

  draw: function() {


    App.now = Date.now();
    App.delta = App.now - App.then;

    App.animationId = window.requestAnimationFrame(App.draw);

    if (App.delta > App.interval) {
       App.drawContext.clearRect(0, 0, App.drawCanvas.width, App.drawCanvas.height);
     // App.drawMap();
      //console.log(App.attacks.length);
      for (var i = App.attacks.length - 1; i >= 0; i--) {
        App.attacks[i].drawPath();
      }
      App.then = App.now - (App.delta % App.interval);
    }






  },

  // drawOld: function() {



  //     App.drawContext.clearRect(0, 0, App.drawCanvas.width, App.drawCanvas.height);
  //     //App.drawMap();
  //     //console.log(App.attacks.length);
  //     for (var i = App.attacks.length - 1; i >= 0; i--) {
  //       App.attacks[i].drawPath();
  //     }

  //      App.animationId = window.requestAnimationFrame(App.draw);

  // },

  // processEvent: function(evt) {
  //     if (App.attacks.length>100)
  //       return;

  //     var type = '';
  //     var x1, y1, x2, y2;
  //     if (evt.n=='infections') {
  //         type = 'infection';
  //     } else if (evt.n == 'spam') {
  //         type = 'spam';
  //     } else {
  //         type = 'attack';
  //     }
  //     if ('loc' in evt) {
  //         var p1 = App.latLngToCanvasXY(evt.loc.lat, evt.loc.long);
  //         x1 = x2 = p1.x;
  //         y1 = y2 = p1.y;
  //        countryAttack = evt.loc.c;
  //        countryVictim = "n/a";

  //        if (!(evt.loc.c_iso in App.attackCountryCounts)) {
  //            App.attackCountryCounts[evt.loc.c_iso] = 0;
  //            App.countryIsoToName[evt.loc.c_iso] = evt.loc.c;
  //        }
  //        App.attackCountryCounts[evt.loc.c_iso] += 1;
  //     } else {
  //         var p1 = App.latLngToCanvasXY(evt.from.lat, evt.from.long);
  //         var p2 = App.latLngToCanvasXY(evt.to.lat, evt.to.long);
  //         x1 = p1.x;
  //         y1 = p1.y;
  //         x2 = p2.x;
  //         y2 = p2.y;
  //         countryAttack = evt.from.c;
  //         countryVictim = evt.to.c;

  //         if (!(evt.from.c_iso in App.attackCountryCounts)) {
  //             App.attackCountryCounts[evt.from.c_iso] = 0;
  //             App.countryIsoToName[evt.from.c_iso] = evt.from.c;
  //         }
  //         App.attackCountryCounts[evt.from.c_iso] += 1;
  //     }
  //     var malwareName = evt.detection;
  //     var date = moment(evt.ts)
  //     date = date.format("ddd D MMM h:mm:ss A")
  //     //console.log(evt);



  //     App.attacks.push(new Attack (x1, y1, x2, y2, type, date, countryAttack, countryVictim, malwareName ));
  // }

};
