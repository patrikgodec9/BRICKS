function drawIt(){
    var x = 150, y = 250;
		var dx = 2, dy = 5;
		var WIDTH;
		var HEIGHT;
		var r=5;
		var ctx; 
		var canvas;
    var paddlex;
	var paddleh; 
	var paddlew;
    var rightDown = false, leftDown = false;
    var bricks;
	var vrstice, 
	stolpci;
	var BrickW;
	var BrickH;
    var PADDING;
    var canvasMinX;
    var canvasMaxX;
    var f=1;		
    var tocke = 0;
    var start=true;
	var oblak = new Image();
	oblak.src = "slike/brick1.jpg";
	oblak.src = "slike/brick2.jpg";
	
    function init() {
			canvas=document.getElementById('canvas');
			ctx = $('#canvas')[0].getContext("2d");
			WIDTH = $("#canvas").width();
      HEIGHT = $("#canvas").height();
		sekunde = 0;
      izpisTimer = "00:00";
      intTimer = setInterval(timer, 1000);
      return setInterval(draw, 10);
    }
	
    function onKeyDown(evt){
			if (evt.keyCode == 39){
				rightDown = true;
			}
			else if (evt.keyCode == 37){
				leftDown = true;
			}
		}

		function onKeyUp(evt){
			if (evt.keyCode == 39){
				rightDown = false;
			}
			else if (evt.keyCode == 37){
				leftDown = false;
			}
    }

    function init_mouse() {
      canvasMinX = $("canvas").offset().left;
      canvasMaxX = canvasMinX + WIDTH-39;
  }
    
  function onMouseMove(evt) {
  if (evt.pageX > canvasMinX+35 && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX-40;
  }
}
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp); 
  $(document).mousemove(onMouseMove);



    function initbricks() { 
			vrstice = 6,stolpci = 4;
			BrickW = (WIDTH/stolpci) - 1;
			BrickH = 30;
			PADDING = 1;
      bricks = new Array(vrstice);
			for (i=0; i < vrstice; i++) {
				bricks[i] = new Array(stolpci);
				for (j=0; j < stolpci; j++) {
					bricks[i][j]=1;
				}				
			}
    }	


    

    function timer(){
      if(start==true){
        sekunde++;
        
        sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
        minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
        izpisTimer = minuteI + ":" + sekundeI;
        
        $("#cas").html(izpisTimer);
      }
      else{
        sekunde=0;
        $("#cas").html(izpisTimer);
      }
    }

    
    function draw() {
			ctx.clearRect(0,0,600,500);
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
      ctx.fillStyle="black";
	rect(paddlex, 500-paddleh, paddlew, paddleh);
			

      for (i=0; i < vrstice; i++){
				for (j=0; j < stolpci; j++){
					if (bricks[i][j] == 1) {
						ctx.drawImage(oblak, (j * (BrickW + PADDING)) + PADDING,
						(i * (BrickH + PADDING)) + PADDING, BrickW, BrickH);
						
					}
				}
			}

      if(rightDown){
	if((paddlex+paddlew) < WIDTH){
	paddlex += 5;
	}
	else{
		paddlex = WIDTH-paddlew;
	}
}
  else if(leftDown){
		if(paddlex>0){
		paddlex -=5;
		}else{
		paddlex=0;
		}
	}
	
if(document.getElementById("demo").innerHTML=="start")
    if (x + dx > 600-r || x + dx < 0+r)
      dx = -dx;
    if (y + dy < 0+r)
      dy = -dy;
    else if (y + dy > HEIGHT -(r+f)) { 
        if (x > paddlex && x < paddlex + paddlew) {
          dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
          dy = -dy;
          start = true; 
        }
    else if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else{
        window.location.reload();
      }
}

      if (x + dx > 600 -r|| x + dx < 0 +r){
        dx = -dx;
      }
      if (y + dy > 500 -r|| y + dy < 0 +r){
      dy = -dy;
      }  
    rowheight = BrickH + PADDING + f/2;
		colwidth = BrickW + PADDING + f/2;
		row = Math.floor(y/rowheight);
    col = Math.floor(x/colwidth);
    
    if (y < vrstice * rowheight && row >= 0 && col >= 0 && bricks[row][col] > 0)  {
      dy = -dy; bricks[row][col] = bricks[row][col]-1;
      
      if(bricks[row][col]==0){
        tocke += 1;
        $("#tocke").html(tocke);
      }
    }
      

		if(tocke==24){
     
      start = false;
      
      swal({title: "ZMAGA!", text: "Čestitam za zmago!"}).then(function(){
        location.reload();
      });
        clearInterval(draw);
        tocke = 0;
			}
		
      x += dx;
      y += dy;
      
  }


  function init_paddle(){
      paddlex = 500 / 2;
      paddleh = 10;
      paddlew = 100;
  }
    

  function rect(x,y,w,h){
	  if(x<0){
		  x=0;
	  }
	  if(x+w>WIDTH){
		  x=WIDTH-paddlew;
	  }
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  }
    init();
    timer();
    init_paddle();
    init_mouse();
	initbricks();
}