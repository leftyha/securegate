// webshim.setOptions('forms-ext', {
//     replaceUI: 'auto',
//     types: 'date',
//     date: {
//         startView: 2,
//         inlinePicker: true,
//         classes: 'hide-inputbtns'
//     }
// });

// //start polyfilling
// webshim.polyfill('forms forms-ext');
// 	$("#select").change(function(){
// 	  var id = $(this).find("option:selected").attr("id");

// 	  switch (id){
// 	    case "valid":
// 	     	document.getElementById("inputs").style.display="block";
// 	      break;
// 	    case "option1":
// 	     	document.getElementById("inputs").style.display="none";
// 	      break;
// 	    case "option2":
// 	     	document.getElementById("inputs").style.display="none";
// 	      break;
// 	    case "option3":
// 	     	document.getElementById("inputs").style.display="none";
// 	      break;
// 	    case "option4":
// 	     	document.getElementById("inputs").style.display="none";
// 	      break;
// 	    case "option5":
// 	     	document.getElementById("inputs").style.display="none";
// 	      break;
// 	  }
// 	});

function ShowModal(e) {
	document.getElementById(e).style.display="block";
}

function HideModal(e) {
	document.getElementById(e).style.display="none";
}

function TogglePanel(header, e){
	var widthScreen = $(window).width();
	header.getElementsByClassName("fa")[0].classList.toggle("fa-angle-up");
	header.getElementsByClassName("fa")[0].classList.toggle("fa-angle-down");
	if(widthScreen <= 750){
		if (document.getElementById(e).style.display == "block"){
			document.getElementById(e).style.display = "none";	
		} else {
			document.getElementById(e).style.display = "block";		
		}
	} else{
		if (document.getElementById(e).style.display == "none"){
			document.getElementById(e).style.display = "block";	
		} else {
			document.getElementById(e).style.display = "none";		
		}
	}
}


function ShowModalicon(e, x, y) {
	document.getElementById(e).style.display="block";
	document.getElementById(x).style.display="none";
	document.getElementById(y).style.display="block";
}

function HideModalicon(e, x, y) {
	document.getElementById(e).style.display="none";
	document.getElementById(x).style.display="none";
	document.getElementById(y).style.display="block";
}