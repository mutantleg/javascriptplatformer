

  //for now only 1 image is supported 
//  loadImageToSpr("spr21.png");  
  
  loadImageToSpr(spr8png);

  
  //loadSound("zap.mp3", "zap");
  //loadSound("bgm.mp3", "bgm");
  

  var lastFpsTime = Date.now();
  var curFps = 0;
  var appTime = 0;
  function countFps()
  {
    appTime += 1;
    d = (Date.now() - lastFpsTime)/1000;
    lastFpsTime = Date.now();
    if (appTime % 5 == 0)
    { curFps = (1.0 / d) | 0; }
  }//countfps
  
  
  
  
  var manx = 160;
  var many = 120; 
  
  var tmanx = 10;
  var tmany = 28;
  var txmir = false;
  var twait = 1;
  var showMsg = 0;
  var anyHold = 0;
  var gameOver = 0;
  var showFat = 0;
  var fatShake = 0;
  var gameEnd = 0;
  //var showDelay = 0; //g_showmsg

  var startx = 0; 
  var starty = 0;
  
  var fade = 0.0;
  var fadeState = 0;
  
  
  function resetGame()
  {
   // clearCell();
    clearAct();
      
    gt = 0;
    gameOver = 0;
    setRandSeed(1000);
    clearPart();
    setMap(xmap_mid_mw, xmap_mid_mh, xmap_mid, xmap_back);
//    setMapSize(xmap_mid_mw, xmap_mid_mh);
    
    //playMus("bgm", 0.5);
    
    initActGrid(0,0, mapmw*tilew, mapmh * tileh);

    tileData = getImageAsData(tileImage);
    console.log("tiledata ", tileData);
    
       tmanx = 10;
       tmany = 28;
       twait = 1;
       showMsg = 0;
       anyHold = 0;
       showFat = 0;

      // actFromMap(xmap_act);
      
      actFromRect(xmap_rect);
      
  }//resetgame
  
  function init()
  {
    console.log("init");
    
    //make sure they are included in canvas.html 
    loadSound(snd1mp3, "snd1", 3);
    loadSound(snd2mp3, "snd2", 3);
    loadSound(snd3mp3, "snd3", 3);
    loadSound(snd4mp3, "snd4", 3);
    loadSound(snd5mp3, "snd5", 3);
    loadSound(snd6mp3, "snd6", 3);
    loadSound(snd7mp3, "snd7", 3);
    loadSound(snd8mp3, "snd8", 8); //flood 
    loadSound(snd9mp3, "snd9", 3);
    loadSound(snd10mp3, "snd10", 3);
    loadSound(snd11mp3, "snd11", 3);
    loadSound(snd12mp3, "snd12", 3);
    loadSound(snd13mp3, "snd13", 3);
    loadSound(snd14mp3, "snd14", 3);
    loadSound(snd15mp3, "snd15", 3);
    loadSound(snd16mp3, "snd16", 3);
    
    resetKeys();
    
    loadConfig();
    
    resetGame();
    
    fade = 1.0; //start full black 
    
    startx = tmanx;
    starty = tmany;
    
  }//init
  
  
  
  
  
  var inFocus = false;
  var prevPaused = false; 
    
  function controls()
  {

    mouseUpdate();
    keyCheck(); 
    limitMouse(0,0,320,240);
      
    inFocus = (mouseLook == true);
    if (inFocus == false) 
    {
      if (paused==false){pauseAllSnd();}
      paused = true; 
      clearKey();
    }//endif

    keyTime += 1;
    if (lastKey == keyTime-1 && inFocus) 
    {
      //f (lastKeyId!=27) { paused = false; }
      //P
      if (lastKeyId==80) { paused = !paused; }
    }//endif
    
    
    if (prevPaused != paused)
    {
      prevPaused = paused;
      if (paused) { pauseAllSnd(); }
      else { resumeAllSnd(); }
    }//endif 

    
    
  }//coreupdate 
  

  function  contPlayerPos()
  {
      var a; 
      a = getAct(playerId);
      if (a!=0)
      {
        a.tx = startx;
        a.ty = starty;
      }
  }//contpos  

  var tcamx = 0;
  var tcamy = 0;
  
  function updateCam()
  {
    var a;
    a = getAct(playerId);
    if(a!=0)
    { 
       tmanx = a.tx; 
       tmany = a.ty; 
       manx = a.cx;
       many = a.cy;       
    } 
    
//    manx = tmanx * tilew+8;
 //   many = tmany * tileh+8;

          
    
  //      camx = manx - 160;
  //     camy = many - 120;
  
        var dx; var dy;        var ms; 
        dx = (tcamx+160);
        dy = (tcamy+120); 

        ms = 20;
        if (many > dy + ms) { tcamy += many-(dy+ms); }
        if (many < dy - ms) { tcamy += many-(dy-ms); }
        
        if (manx > dx + ms) { tcamx += manx-(dx+ms); }
        if (manx < dx - ms) { tcamx += manx-(dx-ms); }

        if (tcamx < 0) { tcamx = 0; }
        if (tcamx > worldw-320) { tcamx = worldw-320; }
        if (tcamy < 0) { tcamy = 0; }
        if (tcamy > worldh-240) { tcamy = worldh-240; }
        
        
        
       
       camx += (tcamx-camx)*0.2;
       camy += (tcamy-camy)*0.2;
    
       
       camx = camx|0;
       camy = camy|0;
       
       wmx = vmx + camx;
       wmy = vmy + camy;
             
        
  }//upcam
  
  
  
  function update()
  { 
    
    if (firstRun==1){ firstRun = 0; init(); }
    controls()
    
    
    
    if (bDebug)
    {
      //r
      if (lastKey == keyTime-1 && lastKeyId == 82)
      { 
        playSnd("zap", 1.0); 
        resetGame();
        contPlayerPos();
        updateCam();
        
        gameEnd = 1;
      }
      
      //g 
      if (lastKey == keyTime-1 && lastKeyId == 71)
      {      playSnd("zap", 0.1); }
    }//endif    
    

    if (showMsg > 0)
    {
       //todo -- alt tabbing breaks this
        //its because a key is stuck 
       if (isAnyKeyDown()) { anyHold += 1; }
       else { anyHold = 0; }
       console.log("anyhold ", anyHold);
       showDelay += 1;
       if (showDelay < 32) { anyHold = 3; }
       if (anyHold == 1 && showDelay < 130000)
       { anyHold = 3; showDelay = 130001;   playSnd("snd4", 1); }         
       if (anyHold == 1) { showMsg = 0; playSnd("snd4", 1);  clearKey(); }
    }//endif
   
   //fade out 
    if (fadeState != 0)
    {
      if (fadeState == 3)
      { fade += 0.01; }
      else 
      {
        fade += 0.03;
        if (fade>=1)
        {
          fade = 1;
            resetGame();
            contPlayerPos();
            fadeState = 0;
          return; 
        }//endif5
      }//endif3
    }
    else
    { fade -= 0.03; if (fade<=0.0){ fade=0.0; } }
   
    
    
    
        //UPDATE
      var i; var num;
      num = 1;
      if (gameEnd > 0) { num = 0; }
      //if (curFps < 55 ) { num = 2; }
      if (bDebug && isKeyDown(key_u)) {num=16;}
      
      for (i=0;i<num;i+=1)
      {
        if (paused == false && showMsg <= 0)
        {
          //update game logic here 
           updateAct(vecAct);
           updateAct(vecBull);
           updatePart();
            
              updateCam();

           
           //71 KEY_G
               if ((mhold == 1 && isKeyDown(71)) && gt > 10 && bDebug)
               {
                 
                 var a; 
                 a = getAct(playerId);
                 if (a!=0)
                 {
                   a.cx = wmx;
                   a.cy = wmy;
                   //setTile(vecId, a.tx, a.ty, 0); 
                   //a.tx = Math.floor( wmx/tilew );
                   //a.ty = Math.floor( wmy/tileh );
                 }
                 //floodTile(wmx/tilew,wmy/tileh, false);
               }//endif
                   
             
             
             
          gt += 1;  
        }//endif 
      }//nexti

        //RENDER     
        

          //ctx.fillStyle = "#000000";
          ctx.fillStyle = "#b0b0b0";
          ctx.fillRect(0, 0, 320, 240);
          
          drawSpr("back", 160,120);
          

     
             var sx, sy;
             sx = Math.floor(camx/tilew);
             sy = Math.floor(camy/tileh);
            // console.log("sx sy ",sx,sy);
            
            var ox, oy;
            ox = camx - (sx*tilew);
            oy = camy - (sy*tileh);
             
       
         //    mw = xmap_mid_mw;
         //    mh = xmap_mid_mh;
             drawTileMap(vecBack,sx,sy, -ox,-oy);
             //drawTileMapAdv(shadImage, vecMid,sx,sy, -ox+3,-oy+3);
             drawTileMap(vecMid,sx,sy, -ox,-oy);

             
             resetBucket(); 
               addActBucket(vecAct);
               addActBucket(vecBull);
             drawAllBucket();
             drawPart();
             
             /*
                 drawAct(vecAct, -1);
                 drawAct(vecBull, -1);
                 drawPart();
*/

              var a;
              a = getAct(playerId);
              if (a==0)
              {
                gameOver += 1;
                if (gameOver == 30)
                {     playSnd("snd3", 1); }
                if (gameOver > 30) { drawLabel(160-16,120-8, 8, "OUCH"); }
                if (gameOver == 1) { anyHold = 3; }
                if (isAnyKeyDown()) { anyHold += 1; }
                else { anyHold = 0; }
                if (gameOver > 30 && anyHold == 1)
                { 
                  fadeState = 1;
                }
       
              }//endif

              if (showMsg > 0)
              { drawMsg(); }
  
       resetBtn(); resetBtnCol();  
     sprBtn(900, "pause",320-24, 4, 18,18);
     if (btnPush == 900)
     { paused = !paused; }
   
   
//    fade = 0.5;
    //fade += 0.01; if (fade>1){fade=0;}
    if (fade > 0.001)
    {
       ctx.fillStyle = "rgba(0,0, 0, " + fade +")"; // " +Math.floor(fade*255) +")";      
       ctx.fillRect(0, 0, 320, 240);
    }//endif
   
   
          if (gameEnd > 0)
          {
            fadeState = 3; 
            if (fade>=1){gameEnd = 2; }
          }
          
          if (gameEnd == 2)
          {
            var ax, ay;
            ax = 64; ay = 64;
            ay+=8;
            drawLabel(ax,ay, 8, "Thank you for playing");     ay+=8; 
            drawLabel(ax,ay, 8, "You have been "); ay+=8;
            drawLabel(ax,ay, 8, "really entertaining! "); ay+=8;
            ay+=32;
            
             drawFont3(ax,ay, "THE END");     ay+=8; 
        
          }//endif
                 
        
        
    //paused menu 
    drawMenu();
 
   //debug stuff 
   if (bDebug)
   {
    countFps();
    ctx.font = "8px Arial";
    ctx.fillStyle = "#ffFFff";
    //ctx.strokeStyle = "#000000"; 
    var ax, ay;
    ax = 3; ay = 8;
    ctx.fillText("fps:"+curFps,ax, ay); ay+=8;
    ctx.fillText("gt:"+gt, ax, ay); ay+=8;
    ctx.fillText("keyTime:"+keyTime, ax, ay); ay+=8;
    ctx.fillText("mvx:"+mvx, ax, ay); ay+=8;
    ctx.fillText("mvy:"+mvy, ax, ay); ay+=8;
    ctx.fillText("vmx:"+vmx, ax, ay); ay+=8;
    ctx.fillText("vmy:"+vmy, ax, ay); ay+=8;
    ctx.fillText("mbutton:"+mbutton, ax, ay); ay+=8;
    ctx.fillText("camx:"+camx, ax, ay); ay+=8;
    ctx.fillText("camy:"+camy, ax, ay); ay+=8;
    ctx.fillText("ox:"+ox, ax, ay); ay+=8;
    ctx.fillText("oy:"+oy, ax, ay); ay+=8;
    ctx.fillText("wmx:"+wmx, ax, ay); ay+=8;
    ctx.fillText("wmy:"+wmy, ax, ay); ay+=8;
    ctx.fillText("act:"+(vecAct.length), ax, ay); ay+=8;
    ctx.fillText("bull:"+(vecBull.length), ax, ay); ay+=8;
    ctx.fillText("msg:"+showMsg,ax,ay); ay+=8;
    ctx.fillText("tmanx:"+tmanx,ax,ay); ay+=8;
    ctx.fillText("tmany:"+tmany,ax,ay); ay+=8;
    ctx.fillText("startx:"+startx,ax,ay); ay+=8;
    ctx.fillText("starty:"+starty,ax,ay); ay+=8;
    ctx.fillText("fat:"+showFat,ax,ay); ay+=8;
   }
    
    if (inFocus == false)
    {  
      
     // ctx.font = "16px Arial";
        //ctx.fillText("out of focus", 32, 64);  
      ctx.fillStyle = "#00000080";
      ctx.fillRect(0, 0, 320, 240);
      drawFont3Scale(40,40, 2,2, "OUT OF FOCUS");
    }

  
  }//update

  