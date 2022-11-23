var score;
var duration =10;

var startTime; 
var ended = true; 
var timerTxt = document.getElementById("timer");
var scoreTxt = document.getElementById("score");
var clicksTxt = document.getElementById("clicks");
var startBtn = document.getElementById("start");
var clickSection = document.getElementById("clicksectiondiv");
var btnClose = document.getElementById("btnclose");
var btnRestart = document.getElementById("btnrestart");

var show = function(elem) {
  elem.style.display = 'inline';
};
var hide = function(elem) {
  elem.style.display = 'none';
};
function startGame() {
  hide(startBtn);
  score = 0;
  ended = false;
  startTime = new Date().getTime();
  var timerId = setInterval(function() {
	var total = (new Date().getTime() - startTime) / 1000;
	if (total < duration) {
	  timerTxt.textContent = total.toFixed(3);
	  clicksTxt.textContent = (score / total).toFixed(2);
	} else {
	  ended = true;
	  clearInterval(timerId);
	  endGame();
	}
  }, 1);
}
function endGame() {
	var clicsBySeconds = (score / duration).toFixed(2);
	timerTxt.textContent = duration.toFixed(3);
	clicksTxt.textContent = clicsBySeconds;
	setTimeout(function() {
		if(clicsBySeconds>0){
			$('#largesizemodal').modal('hide');
			setTimeout(function() {
				$('#largesizemodal').modal('show');
			});
		}
	}, 10);
}

function refreshGame(){
	show(startBtn);
	$('#timer').text(0);
	$('#clicks').text(0);
	$('#score').text(0);
}
startBtn.addEventListener("click", function(e) {
	startGame();
	$("#effect").show();
});
clickSection.addEventListener("click", function(e) {
	if (!ended) {
		score++;
		scoreTxt.textContent = score;
		$( "#effect" ).effect( "bounce", {  
			  times: 1,  
			  distance: 100  
		   }, 100, function() {  
		   $( this ).css( "background", "#ff4040" );  
		}); 
	}
});
btnClose.addEventListener("click", function(e) {
	refreshGame();
	$("#effect").hide();
});

btnRestart.addEventListener("click", function(e) {
	refreshGame();
	$("#effect").hide();
});

$('body').on('click', 'a[target="_blank"]', function(e){
    e.preventDefault();
    chrome.tabs.create({url: $(this).prop('href'), active: false});
    return false;
});
function callback() {
	setTimeout(function() {
		$( "#effect" ).removeAttr( "style" ).hide().fadeIn();
	}, 1000 );
}
