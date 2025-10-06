function Attack(x1, y1, x2, y2, type, ts, countryAttack, countryVictim, malwareName){
	// console.log("function Attack");
  	this.x1 = x1;
  	this.y1 = y1;
  	this.x2 = x2;
  	this.y2 = y2;

  	this.originCountry = countryAttack;
  	this.destinationCountry = countryVictim;
  	this.timestamp = ts;
  	this.malwareName = malwareName

  	this.type = type;	
  	this.finishedDraw = false;
  	this.finishedDelete = false;

	this.startAngle = null;
  	this.endAngle = null;
  	this.originRadius = 4;
  	this.destinationRadius = 4;
  	this.counterDeanimate = 0;

  	this.increment = 2	; // Larger means more segments therefore slower

  	var dx = this.x2 - this.x1;
	var dy = this.y2 - this.y1;
  	var distance = Math.sqrt( dx*dx + dy*dy );

  	//console.log(this.x1, this.y1, this.x2, this.y2);

  	var p = 500/distance;

	if (this.x2 - this.x1<0)
		p = -1*p; //Make arc center to be always below arc

	var el = document.getElementById("attacks_data");

	var t = 40;
	if (App.countRows%t==0)
		//this.addToPanel(el, this.timestamp, this.type, this.originCountry, this.destinationCountry, this.malwareName);
	App.countRows++;

	if (App.countRows>t-1)
		App.countRows = 0;
	

	this.calculateAngles(p);

	if (this.startAngle>this.endAngle){
  		for (var i=this.startAngle;i>this.endAngle; i-=1/this.increment/Math.PI){
  			if (this.oy + this.radius*Math.sin(i)<0 || this.ox + this.radius*Math.cos(i)<0){
  				this.calculateAngles(p*5);
  			}
  		}
  	} else {
		for (var i=this.startAngle;i<this.endAngle; i+=1/this.increment/Math.PI){
			if (this.oy + this.radius*Math.sin(i)<0 || this.ox + this.radius*Math.cos(i)<0){
				this.calculateAngles(p*5);
			}

  		}
  	}

  	App.drawContext.lineWidth = 2;


}
// Attack.prototype.addToPanel = function(el, ts, type,  a, v, m){

	
	
	
// 	//console.log(el.childNodes.length);
// 	if (el.childNodes.length>500) {
// 		jQuery("#attacks_data tr:last-child").remove();
// 		App.attacks.splice(0, 1);
// 	}

	
// 	var elChild = document.createElement("tr");

// 	var elTimestamp = document.createElement("td");
// 	//elTimestamp.classList.add("timestamp");
// 	elTimestamp.innerText = ts;
// 	elChild.appendChild(elTimestamp);

// 	var elMalware = document.createElement("td");
// 	//elMalware.classList.add("malware");
// 	if (!m)
// 		m = "N/A";

// 	elMalware.innerText = m;
// 	elChild.appendChild(elMalware);

	
// 	var elType = document.createElement("td");
// 	elType.classList.add("type_"+type);
// 	elType.innerText = type;
// 	elChild.appendChild(elType);

// 	var elCountryA = document.createElement("td");
// 	//elCountryA.classList.add("country");
// 	elCountryA.innerText = a;
// 	elChild.appendChild(elCountryA);
	
// 	var elCountryB = document.createElement("td");
// 	//elCountryB.classList.add("country");
// 	elCountryB.innerText = v;
// 	elChild.appendChild(elCountryB);

	

						
// 	el.insertBefore(elChild, el.firstChild);

// 	//console.log(ts+ ":" + a +" : "+ v + ":" + m);
// }


// Attack.prototype.addToPanel2 = function(el, ts, type,  a, v, m){


	
	
// 	//console.log(el.childNodes.length);
// 	if (el.childNodes.length>500) {
// 		jQuery("#attacks_data tr:last-child").remove();
// 		App.attacks.splice(0, 1);
// 	}

// 	var fragment = document.createDocumentFragment();
// 	var elChild = document.createElement("tr");

// 	var elTimestamp = document.createElement("td");
// 	//elTimestamp.classList.add("timestamp");
// 	elTimestamp.innerText = ts;
// 	elChild.appendChild(elTimestamp);

// 	var elMalware = document.createElement("td");
// 	//elMalware.classList.add("malware");
// 	elMalware.innerText = m;
// 	elChild.appendChild(elMalware);

	
// 	var elType = document.createElement("td");
// 	elType.classList.add("type_"+type);
// 	elType.innerText = type;
// 	elChild.appendChild(elType);

// 	var elCountryA = document.createElement("td");
// 	//elCountryA.classList.add("country");
// 	elCountryA.innerText = a;
// 	elChild.appendChild(elCountryA);
	
// 	var elCountryB = document.createElement("td");
// 	//elCountryB.classList.add("country");
// 	elCountryB.innerText = v;
// 	elChild.appendChild(elCountryB);

// 	fragment.appendChild(elChild);

						
// 	el.insertBefore(fragment, el.firstChild);

// 	//console.log(ts+ ":" + a +" : "+ v + ":" + m);
// }


Attack.prototype.calculateAngles = function(p){
	// console.log("function calculateAngles");
	var dx = this.x2 - this.x1;
	var dy = this.y2 - this.y1;

	this.ox = this.x1 + (dx - p * dy) / 2;
	this.oy = this.y1 + (p * dx + dy) / 2;

	this.radius = Math.sqrt( (this.x1-this.ox)*(this.x1-this.ox) + (this.y1-this.oy)*(this.y1-this.oy) );

	var angleP1 = Math.atan2(this.y1-this.oy, this.x1-this.ox);
	var angleP2 = Math.atan2(this.y2-this.oy, this.x2-this.ox);

	this.startAngle = angleP1;
	this.endAngle = angleP2;

	//console.log("ANGLE P1: "+ this.startAngle*180/Math.PI);
	//console.log("ANGLE P2: "+ this.endAngle*180/Math.PI);



	if ((Math.abs(this.startAngle)+Math.abs(this.endAngle))*180/Math.PI > 270 ){
		if (this.startAngle<0){
			this.startAngle += 2*Math.PI;
		}

		if (this.endAngle<0){
			this.endAngle += 2*Math.PI;
		}

	}

	this.currentAngle = this.startAngle;




}

// Attack.prototype.drawHelpLines = function(){
// 	console.log("function drawHelpLines");
// 	this.drawPoint(this.x1, this.y1, this.originRadius-this.counterDeanimate, App.typesColor[this.type]); //Origin
// 	this.drawPoint(this.x2, this.y2, this.destinationRadius-this.counterDeanimate,  App.typesColor[this.type]); //Destination

// 	App.drawContext.beginPath();
// 	App.drawContext.lineWidth = 1;
// 	App.drawContext.moveTo(0, this.oy)
// 	App.drawContext.lineTo(this.radius*Math.cos(0), this.oy+this.radius*Math.sin(0));
// 	App.drawContext.strokeStyle = "#CCCCCC";
// 	App.drawContext.stroke();


// 	App.drawContext.beginPath();
// 	App.drawContext.lineWidth = 1;
// 	App.drawContext.moveTo(this.ox, this.oy)
// 	App.drawContext.lineTo(this.ox+this.radius*Math.cos(this.startAngle), this.oy+this.radius*Math.sin(this.startAngle));
// 	App.drawContext.strokeStyle = "#00CC00";
// 	App.drawContext.stroke();
// 	App.drawContext.beginPath();
// 	App.drawContext.lineWidth = 1;
// 	App.drawContext.moveTo(this.ox, this.oy)
// 	App.drawContext.lineTo(this.ox+this.radius*Math.cos(this.endAngle), this.oy+this.radius*Math.sin(this.endAngle));
// 	App.drawContext.strokeStyle = "#EE0000";
// 	App.drawContext.stroke();

// 	this.drawPoint(this.ox, this.oy, 40, "blue");

// 	cancelAnimationFrame(App.animationId);

// 	return;
// }

Attack.prototype.drawPath = function(){
	// console.log("function drawPath");
	// Comment/Uncomment for debug
	// this.drawHelpLines();

	//console.log("CURRENT ANGLE: "+this.currentAngle*180/Math.PI);

	if (this.startAngle>this.endAngle){
		this.currentAngle = this.currentAngle - 1/this.increment/Math.PI;
	} else {
		this.currentAngle = this.currentAngle + 1/this.increment/Math.PI;
	}

	if (!this.finishedDraw){
		//console.log("Animate...");
	  	this.animateAttack();
	} else {
		//console.log("Deanimate...");
		this.deanimateAttack();
	}


};

// Attack.prototype.drawPoint = function(x, y, radius, color){
// 	console.log("function drawPoint");
// 	App.drawContext.beginPath();
// 	//App.drawContext.lineWidth = 2;
// 	App.drawContext.strokeStyle = color;
// 	App.drawContext.arc(x, y, radius, 0, 2 * Math.PI, false);
// 	App.drawContext.stroke();
// }

Attack.prototype.drawDestination = function(x, y, radius, color){
	// console.log("function drawDestination");
	App.drawContext.beginPath();
	App.drawContext.fillStyle = color;
	App.drawContext.arc(x, y, radius, 0, 2 * Math.PI, false);
	App.drawContext.fill();

	App.drawContext.beginPath();
	App.drawContext.fillStyle = color;
	App.drawContext.arc(x, y, radius*1.5, 0, 2 * Math.PI, false);
	App.drawContext.fill();
 	
	App.drawContext.beginPath();
	App.drawContext.moveTo (x +  radius * 3 * Math.cos(0), y +  radius * 3 *  Math.sin(0));          
 
	for (var i = 1; i <= 6;i += 1) {
    	App.drawContext.lineTo (x + radius * 3 * Math.cos(i * 2 * Math.PI / 6), y + radius * 3 * Math.sin(i * 2 * Math.PI / 6));
	}
 
	App.drawContext.strokeStyle = color;
	//App.drawContext.lineWidth = 2;
	App.drawContext.stroke();

}

Attack.prototype.drawOrigin = function(type, x, y, radius, color){
	// console.log("function drawOrigin");
	if (type=='spam'){
		App.drawContext.beginPath();
		App.drawContext.fillStyle = color;
		App.drawContext.arc(x, y, radius, 0, 2 * Math.PI, false);
		App.drawContext.fill();
	} else if (type=='infection') {
		App.drawContext.beginPath();
		App.drawContext.fillStyle = color;
		App.drawContext.arc(x, y, radius, 0, 2 * Math.PI, false);
		App.drawContext.fill();

		App.drawContext.beginPath();
		App.drawContext.fillStyle = 'rgba(255, 100, 0, 0.4)';
		App.drawContext.arc(x, y, radius*1.5, 0, 2 * Math.PI, false);
		App.drawContext.fill();

		App.drawContext.beginPath();
		App.drawContext.strokeStyle = color;
		//App.drawContext.lineWidth = 2;
		App.drawContext.arc(x, y, radius*2.5, 0, 2 * Math.PI, false);
		App.drawContext.stroke();


	} else if (type=='attack'){
		App.drawContext.beginPath();
		App.drawContext.fillStyle = color;
		App.drawContext.arc(x, y, radius, 0, 2 * Math.PI, false);
		App.drawContext.fill();
	} else {
		App.drawContext.beginPath();
		App.drawContext.fillStyle = color;
		App.drawContext.arc(x, y, radius, 0, 2 * Math.PI, false);
		App.drawContext.fill();
	}
}

Attack.prototype.deanimateAttack = function(){
	// console.log("function deanimateAttack");
	// console.log(App.typesColor[this.type]);

	if (this.counterDeanimate<this.originRadius){
		if (this.finishedDelete){
			this.counterDeanimate = this.counterDeanimate +1;
		}

		this.drawOrigin(this.type, this.x1, this.y1, this.originRadius-this.counterDeanimate, App.typesColor[this.type]); //Origin

		if (this.type != "spam" && this.type != "infection"){
			this.drawDestination(this.x2, this.y2, this.destinationRadius-this.counterDeanimate,  App.typesColor[this.type]); //Destination
		} 

	} else {
		var index = App.attacks.indexOf(this);
		App.attacks.splice(index, 1);
		return;
	}

	if (this.type != "spam" && this.type != "infection"){
		//Deanimate path
		App.drawContext.beginPath();

		if (this.startAngle<this.endAngle){
			if (this.currentAngle<this.endAngle){
				App.drawContext.arc(this.ox, this.oy, this.radius, this.currentAngle, this.endAngle, false);
			} else {
				this.currentAngle = this.endAngle;
				this.finishedDelete = true;
			}

		} else {
			if (this.currentAngle>this.endAngle){

				App.drawContext.arc(this.ox, this.oy, this.radius, this.endAngle, this.currentAngle, false);
			} else {
				this.currentAngle = this.endAngle;
				this.finishedDelete = true;
			}
		}

		App.drawContext.strokeStyle = App.typesColor[this.type];
		//App.drawContext.lineWidth = 2;
		App.drawContext.stroke();

	} else {
		this.finishedDelete = true;
	}
}



Attack.prototype.animateAttack = function (){
	// console.log("function animateAttack");
	if (!this.finishedDraw) {
		this.drawOrigin(this.type, this.x1, this.y1, this.originRadius, App.typesColor[this.type]); //Origin

		if (this.type != "spam" && this.type != "infection"){
			this.drawDestination(this.x2, this.y2, this.destinationRadius, App.typesColor[this.type]); //Destination
		}

		//if (this.type== "spam"){

		//	this.finishedDraw = true;

		//}

	} else {

		return;
	}

	//Center point

	// console.log("START ANGLE: "+this.startAngle);
	// console.log("END ANGLE: "+this.endAngle);
	// console.log("CURRENT ANGLE: "+this.currentAngle);

	if (this.type != "spam" && this.type != "infection"){
		App.drawContext.beginPath();

		if (this.startAngle<this.endAngle){
			if (this.currentAngle<this.endAngle){
				App.drawContext.arc(this.ox, this.oy, this.radius, this.startAngle, this.currentAngle, false);
			} else {
				App.drawContext.arc(this.ox, this.oy, this.radius, this.startAngle, this.endAngle, false);
				this.finishedDraw = true;
				this.currentAngle = this.startAngle;
			}

		} else {
			if (this.currentAngle>this.endAngle){
				App.drawContext.arc(this.ox, this.oy, this.radius, this.currentAngle, this.startAngle, false);
			} else {
				App.drawContext.arc(this.ox, this.oy, this.radius, this.endAngle, this.startAngle, false);
				this.finishedDraw = true;
				this.currentAngle = this.startAngle;
			}
		}

		//to change arc color into map

		App.drawContext.strokeStyle = App.typesColor[this.type];
		App.drawContext.lineWidth = 2;
		App.drawContext.stroke();
		
		//console.log("Animateattack:"+App.drawContext.strokeStyle);

	} else {
		this.finishedDraw = true;
	}
}
