

  var vecPart = [];
  var itPart = 0;
  var numPart = 128;
  
  function clearPart()
  {
    vecPart = [];
    var i; var a;
    for (i=0;i<numPart;i+=1)
    {
       a = { cx:0, cy:0, cz:0, 
             vx:0, vy:0, vz:0,
             dec:1.0,
             grav:0.0,
             ang:0,
             spin:0,
             hp:0,
             sprName:"magic",
             size:16,
             grow:0,
             crad:0.0,
             cdot:2.0,
             animName:"nuke", // sprName = animName + curFrame 
             curFrame:-1, //-1 for noanim
             animSpeed:0.2
           }
      vecPart.push(a);
    }//nexti
  }//clearPart
  
  clearPart();
  
  function addPart()
  {
    itPart += 1; 
    if (itPart >= numPart) { itPart = 0; }
    var a;
    a = vecPart[itPart];
     a.vx = 0.0;
     a.vy = 0.0;
     a.vz = 0.0;
     a.dec = 1.0;
     a.grav = 0.0;
     a.ang = 0.0;
     a.spin = 0.0;
     a.hp = 100.0;
     a.size = 16.0;
     a.grow = 0.0;
     a.crad = 0.0;
     a.cdot = 2.0;
     a.sprName = "magic";
     a.curFrame = -1; //-1 for noanim
     a.animSpeed = 0.2;
    return a;    
  }//addpart 
  
  function updatePart()
  {
    var i; var num; var a;
    num = numPart;
    for (i=0;i<num;i+=1)
    {
      a = vecPart[i];
      if (a.hp <= 0) { continue; }
      a.hp -= 1;
      
      
      if (a.curFrame >= 0.0)
      {
        a.curFrame += a.animSpeed;
        a.sprName = a.animName + (a.curFrame|0);
        if (vecSpr[a.sprName]==undefined) { a.hp=-1; continue; }
      }

      
      a.cx += a.vx;
      a.cy += a.vy;
      a.cz += a.vz;
      
      a.vy += a.grav;
      
      a.vx *= a.dec;
      a.vy *= a.dec;
      a.vz *= a.dec;
      
      a.ang += a.spin;
      
      a.size += a.grow;
      if (a.size < 0) { a.hp = -1; }
    
    }//nexti
  }//updatepart 
  
  
  /*
    // ang     -- angle in radians  (to deg: 45*(3.1415/180.0) )
  // scx scy -- scale  e.g. scx -1 for mirror horizontally
  function drawSprAdv(spname, ax, ay, ang, scx, scy)
  
    //instead of scale use fixed size 
  function drawSprAdv3(spname, ax, ay, ang, sx, sy)
  
  */
  
  function drawPart()
  {
    var i; var num; var a;
    num = numPart;
    

    for (i=0;i<num;i+=1)
    {
      a = vecPart[i];
      if (a.hp <= 0) { continue; }

      drawSprAdv3(a.sprName, a.cx-camx, a.cy-camy, a.ang, a.size,a.size);
    }//nexti      
    

  }//drawpart 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  