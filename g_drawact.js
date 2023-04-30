
/*
  // ang     -- angle in radians  (to deg: 45*(3.1415/180.0) )
  // scx scy -- scale  e.g. scx -1 for mirror horizontally
  function drawSprAdv(spname, ax, ay, ang, scx, scy)
  *///
  
 //   ctx.fillStyle = "#000000";
 //   ctx.fillRect(0, 0, 320, 240);
          
  function lineRect(ax, ay, aw, ah)
  {
    ctx.fillRect(ax,ay, aw, 1);
    ctx.fillRect(ax,ay+ah-1, aw, 1);

    ctx.fillRect(ax,ay, 1, ah);
    ctx.fillRect(ax+aw-1,ay, 1, ah);
      
  }//linerect 
  
  

  
  function drawAct(vec, numDraw)
  {
    var ax, ay;
    var sx, sy;
    var i; var num; var a;
    num = vec.length | 0; 
    
    if (numDraw<0){numDraw=num;} 
    if (num > numDraw) { num = numDraw; }
    
    var showRect;
    showRect = false;
    if (isKeyDown(key_g)) { showRect = true; }
    
    ctx.strokeStyle = "#FF0000";    
    ctx.fillStyle = "#ffFFff";
      
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
      
       if (a.visible == false) { continue; }
  
      ax = (a.cx - camx)|0;
      ay = (a.cy - camy)|0;
      
      if (a.yhack)
      { ay = (a.drawy - camy) |0; }
      
      
      /*
      //see if in screen (all chars are 16x16)
      if (ax<-16){ continue;} 
      if (ax>340){ continue;}
      if (ay<-16){ continue;}      
      if (ay>260){ continue;}
      */
      
     // a.lastSee = gt;
     
     /*
      if (a.cell!=null)
      {
        ctx.beginPath();
         ctx.moveTo(ax, ay);
         ctx.lineTo(a.cell.cx-camx, a.cell.cy-camy);
        ctx.stroke(); 
      }
      */

      if (a.xmir || a.ymir)
      {
        
        sx=1; sy=1;
        if (a.xmir) { sx*=-1; }
        if (a.ymir) { sy*=-1; }
         drawSprAdv(a.sprName, ax, ay+a.yoff, 0, sx,sy); 
       // continue;        
      }
      else
      {
        drawSpr(a.sprName, ax, ay+a.yoff);       
      }//endif
        
        
        if (bDebug == false) { continue; }
        if (showRect == false) { continue; }
        
        
      if (a.spec==5)
      { 
          lineRect(ax - a.xrad, ay - a.yrad, a.xrad*2, a.yrad*2);
          continue;
      }

      lineRect(ax - a.crad, ay - a.crad, a.crad*2, a.crad*2);
        
    }//nexti   
  }//drawact
 
 
 
  var vecBucket = [[0],[0],[0],[0],  [0],[0],[0],[0] ];
  var bucketNum = [0,0,0,0, 0,0,0,0]; 
  
  
  function resetBucket()
  {
    var i;
    for (i=0;i<8;i+=1)
    { bucketNum[i] = 0; }    
  }//resetBucket
  
  
  function addActBucket(vec)
  {    
    var i; var num; var a;
    num = vec.length | 0; 
    
    for (i=0;i<num;i+=1)
    {
       a = vec[i];
       if (a.drawOrder < 0) { a.drawOrder = 0; }
       if (a.drawOrder > 7) { a.drawOrder = 7; }
       
       (vecBucket[ a.drawOrder ])[bucketNum[a.drawOrder] ] = a;
       bucketNum[a.drawOrder] += 1;
       
    }//nexti
    
  }//addact
  
  function drawAllBucket()
  {
    var i;
    for (i=0;i<8;i+=1)
    {
      drawAct(vecBucket[i], bucketNum[i]);
    }
    
  }//drawallbucket 
  
  
  
  