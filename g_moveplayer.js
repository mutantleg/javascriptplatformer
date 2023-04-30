/*
        a = { 
          cx:0, cy:0, cz:0, 
          vx:0, vy:0, vz:0,
          tx:0, ty:0,
          ang:0,          pitch:0,          id:-1,
          hp:10,          team:0,          spec:0,  
          crad:8,            size:16,          dmg:5,
          reload:0,          wait:0,          yoff:0,
          walkFrame:0,          sprName:"beast",          lastSee:0,
          ownerid:-1,          visible:true,         
          xmir:false,          ymir:false,        
          
          dead:false,
          upfunc:undefined

        };
        
        a = addAct();
         a.sprName="whatever";
         a.spec = 1; 
              
        */
        

        
        
       
function moveBull(m)
{
  var i; var num; var a;
  var dx; var dy; var d;
  var ix; var iy;  
  
  m.cx += m.vx;
  m.cy += m.vy;

  if (m.cy < 0) { m.hp = -1; }

  if (isWall(m.cx, m.cy)) 
  {
    setWall(m.cx, m.cy, 0);    
    m.hp = -1;  
  }
  
   m.hp -= 1;


  num = getQuery(m.cx, m.cy, m.crad+8);
//  console.log("bull query ", gt, num);
  var c; var k;
  for (i=0;i<num;i+=1)
  {
    c = colVec[i];
   //console.log(gt,m.id,"numobj ",c.numObj);
    for (k=0;k<c.numObj;k+=1)
    {
      a = c.vec[k];
      
      /*
      var p;
       p = addPart();
       p.cx = a.cx;
       p.cy = a.cy;
       p.sprName = "brick";
       p.grow = -0.5;
    */
    
      if (m.cx + m.crad < a.cx - a.crad) { continue; }
      if (m.cx - m.crad > a.cx + a.crad) { continue; }
      if (m.cy + m.crad < a.cy - a.crad) { continue; }
      if (m.cy - m.crad > a.cy + a.crad) { continue; }
      if (a.id == m.ownerid) { continue; }
      if (a.dead) { continue; }

        if (a.spec == 5)
        { 
          if (m.cx < a.cx - a.xrad) { ix = a.cx - a.xrad; }
          else if (m.cx > a.cx + a.xrad) { ix = a.cx + a.xrad; }
          else { ix = m.cx; }

          if (m.cy < a.cy - a.yrad) { iy = a.cy - a.yrad; }
          else if (m.cy > a.cy + a.yrad) { iy = a.cy + a.yrad; }
          else { iy = m.cy; }

            dx = m.cx - ix;
            dy = m.cy - iy;
            
            d = Math.sqrt(dx*dx+dy*dy);
            if (d > m.crad) { continue; }
        }//endif
        
       a.hp  -= m.dmg;
       if (a.hp<0 )
       {
         if (a.destfunc != undefined)
         { a.destfunc(a); } 
         a.dead= true;        
       }//endif
       
       a.vx += Math.cos(m.ang)*3;
       a.vy += Math.sin(m.ang)*3;
       
       //m.cx = a.cx;
       //m.cy = a.cy;
       m.hp = -1;

       num = -1;//break from i
      break;  
    
    }//nextk 
  }//nexti
   
   /*
  num = vecAct.length;
  if (m.hp<0) { num = 0; }
  
  
  
  for (i=0;i<num;i+=1)
  {
    a = vecAct[i];

    if (m.cx + m.crad < a.cx - a.crad) { continue; }
    if (m.cx - m.crad > a.cx + a.crad) { continue; }
    if (m.cy + m.crad < a.cy - a.crad) { continue; }
    if (m.cy - m.crad > a.cy + a.crad) { continue; }
    if (a.id == m.ownerid) { continue; }

     a.hp  -= m.dmg;
     if (a.hp<0) { a.dead= true; }
     
     m.cx = a.cx;
     m.cy = a.cy;
     m.hp = -1;

    break;  
  }//nexti
  */

 
  if (m.hp <= 0) 
  {

    for (i=0;i<3;i+=1)
    {
      var p;
      p = addPart();
      p.cx = m.cx;
      p.cy = m.cy;
      p.vx = fxRand2() * 1;
      p.vy = fxRand2() * 1;
      p.size *= 0.55;
      p.grow = -0.25;
      p.sprName = m.sprName;
    }//nexti 

    m.dead = true; 
  }//endif
  
 //  console.log("movebull ", m.id, m.hp, m.cx, m.cy);
  
}//movebull 


function fireBull(ax, ay)
{
  var a;
  a = addBull();
  a.cx = ax;
  a.cy = ay;
   a.hp = 300;
   a.vy = -3;
   a.sprName = "magic";
   a.spec = -1;
   a.upfunc = moveBull;
   
  return a;
}//firebull 

function checkActCol(m)
{
  var c; var k; var dot;
  var d; var dx; var dy;
  var ix, iy;  var ret;
  ret = false ;

  num = getQuery(m.cx, m.cy, m.crad+8);
  for (i=0;i<num;i+=1)
  {
    c = colVec[i];
    for (k=0;k<c.numObj;k+=1)
    {
      a = c.vec[k];
    
      if (m.cx + m.crad < a.cx - a.crad) { continue; }
      if (m.cx - m.crad > a.cx + a.crad) { continue; }
      if (m.cy + m.crad < a.cy - a.crad) { continue; }
      if (m.cy - m.crad > a.cy + a.crad) { continue; }
      if (m == a) { continue; }
    
    
        if (a.spec == 5)
        { 
          if (m.cx < a.cx - a.xrad) { ix = a.cx - a.xrad; }
          else if (m.cx > a.cx + a.xrad) { ix = a.cx + a.xrad; }
          else { ix = m.cx; }

          if (m.cy < a.cy - a.yrad) { iy = a.cy - a.yrad; }
          else if (m.cy > a.cy + a.yrad) { iy = a.cy + a.yrad; }
          else { iy = m.cy; }

        }
        else 
        {  ix = a.cx; iy = a.cy;}
      
      /*
        if (m.spec == 1 && a.spec == 5)
        {
        var p;
         p = addPart();
         p.cx = ix;
         p.cy = iy;
         p.sprName = "magic";
         p.grow = -0.5;
        }
        */
    
      dx = m.cx - ix;
      dy = m.cy - iy;
      
      d = Math.sqrt(dx*dx+dy*dy);
      if (d > m.crad) { continue; }
      if (d == 0.0) { continue; }
      dx /= d;
      dy /= d;
      
      dot = dx*m.vx + dy*m.vy;
      if (dot <= 0)
      {
        m.vx -= dx * dot;
        m.vy -= dy * dot;
        ret = true;
      }    

      if (a.spec == 0)
      {
       m.vx += dx;
       m.vy += dy;
      }
      
    }//nextk 
  }//nexti
  return ret;
}//actcol  

 function checkWall(m,  ms)
 {
  var dx, dy;
   dx = m.vx > 0 ? ms : -ms;
    dy = m.vy > 0 ? ms : -ms;
 
 if (isWall(m.cx, m.cy)==false) 
    {
      if (m.vx!=0 && isWall(m.cx+dx, m.cy))
      {
       if (isWall(m.cx+dx+m.vx, m.cy+8) == false)  {  m.vy = 1;  }
       else if (isWall(m.cx+dx+m.vx, m.cy-8) == false)  {  m.vy = -1;  }
      }
        
      if (m.vy!=0 && isWall(m.cx, m.cy+dy))
      {
       if (isWall(m.cx+8, m.cy+dy+m.vy) == false)  {  m.vx = 1;  }
       else if (isWall(m.cx-8, m.cy+dy+m.vy) == false)  {  m.vx = -1;  }
      }
        
        
      if (isWall(m.cx+dx, m.cy)) { m.vx = 0; }
      if (isWall(m.cx, m.cy+dy)) { m.vy = 0; }
      if (isWall(m.cx+m.vx, m.cy+m.vy))  { m.vx = 0; m.vy = 0;  }
    }//endif    

 }//checkwall
 
 function moveTarget(m)
{

  //m.vx = getRand2();
//  m.vy = getRand2();

  //m.vx = Math.cos(m.ang);
//  m.vy = Math.sin(m.ang);
  
  m.ang += getRand2();
  
  //m.vx=0;m.vy=0;
  
  var ms;
  ms = 0.5;
  m.vx *= ms;
  m.vy *= ms;
  
  checkActCol(m);
  
  checkWall(m, 8);

  m.cx += m.vx;
  m.cy += m.vy;
  
  /*
  if ((gt+m.id*5)%30 == 0)
  {
   a = fireBull(m.cx, m.cy);   
   a.ownerid = m.id;
   var ta;
   ta = getRand()*6.28;
    a.vx = Math.cos(ta) * 3;
    a.vy = Math.sin(ta) * 3;
    a.sprName = "brick";    
  }//endif
*/

 // m.hp -= 1;
  if (m.hp<=0) { m.dead = true; }
  
  putInGrid(m);

}//movetarget 

function addTarget(ax, ay)
{
  
  if (ax<0){ax=0;}
  if (ay<0){ay=0;}
  if (ax>worldw){ax=worldw;}
  if (ay>worldh){ay=worldh;}
  
  var a;
  a = addAct();
   a.cx = ax;
   a.cy = ay;
   a.sprName = "cat";
   a.hp = 90;
   a.upfunc = moveTarget;
   
   a.spec = 5; //rect collision
   a.crad = 24;
   a.xrad = 16;
   a.yrad = 16;
   a.sprName = "brick2";
  
  return a;
}//addtarget 



function movePlat(m)
{
 
  
  var i;

  m.onGround = false;
   
 

  if (m.vy >=0 && (isPlat(m.cx,m.cy+7+1) || isPlat(m.cx+5,m.cy+7+1) || isPlat(m.cx-5,m.cy+7+1)) ) 
  { m.canJump =true; m.onGround = true; }

   
  if (m.jumpy>0 == false) { m.vy += 0.15; }
  if (m.vy >4) {m.vy = 4; }
  
  m.wallhit = 0;
  if (m.vx > 0 && isWall(m.cx+8+m.vy, m.cy-7)) { m.vx = 0; m.wallhit  = 1; }
  if (m.vx < 0 && isWall(m.cx-8+m.vy, m.cy-7)) { m.vx = 0; m.wallhit  = 2; }
  
  if (m.vy < 0 && isWall(m.cx, m.cy-8+m.vy))  { m.vy = 0; }
  
  if (m.vy >=0 && isPlat(m.cx, m.cy+7+m.vy))  { m.vy = 0; m.canJump = true; }
  if (m.vy >=0 && isPlat(m.cx+5, m.cy+7+m.vy))  { m.vy = 0; m.canJump = true; }
  if (m.vy >=0 && isPlat(m.cx-5, m.cy+7+m.vy))  { m.vy = 0; m.canJump = true; }
  
  
  m.cx += m.vx;
  m.cy += m.vy;
   
  if ( m.vy < 0) { m.onGround = false; }
  //if (isPlat(m.cx,m.cy+7)==false && isPlat(m.cx,m.cy+7+8)==false  ) {m.onGround = false; }
  
  if (m.onGround)
  {
    m.onGround = false;
    m.cy = m.cy|0;
    
    for (i=0;i<22;i+=1)
    { if (isPlat(m.cx,m.cy+i)) { m.onGround = true; break; } }    
  }
  
  if (m.onGround)
  {
    m.cy = m.cy|0;
   // console.log("m.onGround ",gt, m.cy);

    for (i=0;i<9;i+=1)
    {if ( isPlat(m.cx, m.cy+7) && isWall(m.cx,m.cy-8)==false) { m.cy -= 1; }else{break;} }
  
    for (i=0;i<9;i+=1)
    {if (isPlat(m.cx, m.cy+8)==false ) { m.cy += 1; } else { break;} }
   
  }//endif
  
  //  m.yhack = m.onGround;

  if (m.onGround)
  { 
    m.drawy += ((m.cy - m.drawy)*0.2);
    if (Math.abs(m.drawy-m.cy)<=1.0) {   m.drawy = m.cy; }
    if (Math.abs(m.drawy-m.cy)>16.0) {   m.drawy = m.cy; }
    
  }
  else { m.drawy = m.cy; }
  

  
}//moveplat 



function moveGib(m)
{
  
  m.vx *= 0.99;
  m.vy *= 0.99;
  
  m.hp -= 1;
  if (m.onGround) { m.hp -= 2; }
  if (m.hp <= 0) { m.dead = true; }
  
  if (m.onGround) { m.vx *= 0.95; }
  
  movePlat(m);
}//movegib 

function addGib(ax, ay)
{
  
  if (ax<0){ax=0;}
  if (ay<0){ay=0;}
  if (ax>worldw){ax=worldw;}
  if (ay>worldh){ay=worldh;}
  
  var a;
  a = addAct();
   a.cx = ax;
   a.cy = ay;
   a.sprName = "gib";
   a.hp = 30;
   a.upfunc = moveGib;
   a.yoff = 4;
   a.yhack = true;
   a.drawy = ay;
   a.drawOrder = 2;
     
  return a;
}//addgib 

function gibExplo(m)
{
  var i;    var a;
  
 // console.log("gibexplo ",gt);

    var p;
       p = addPart();
       p.cx = m.cx;
       p.cy = m.cy;
       p.size = 16;
       p.sprName = "brick";
       p.grow = -0.5;
  
  for (i=0;i<8;i+=1)
  {
    a = addGib(m.cx, m.cy);
    a.vx = getRand2() * 5;
    a.vy = getRand() * -3 - 1;
    a.hp = getRand() * 120 + 85;
    
  }//nexti 
  
}//gibexplo 



var vecRun = ["februn0", "februn1", "februn2", "februn3", "februn4"];
var vecDoub = ["febdoub0", "febdoub1", "febdoub2", "febdoub3"];

function playerPlat(m)
{
  
    var ms; 
    ms = 0.3;
      
  if (keyLeft)  { m.vx += -ms; m.xmir = true; }     
  if (keyRight) { m.vx += ms;  m.xmir = false;  }   
  
  m.yoff = -4;
  
  if (m.onGround == false)
  {
  
    if (m.vy < 0) { m.sprName =  "februn3"; }
    else { m.sprName =  "februn2"; } 
  
    if (m.djump >= 1)
    { m.sprName = vecDoub[((gt/3)|0)%4]; }
  
  }
  else 
  if (keyLeft || keyRight)
  {    
    m.sprName = vecRun[((gt/6)|0)%5];
  }
  else
  {
    m.sprName = "febstand";
  }
  
    m.vx *= 0.85;
  
  if (m.vy > 1.5) { m.canJump = false; }

   if (jumpHold == 1 && m.canJump==false && m.djump < 1)
  { m.djump += 1; m.vy = -3; m.jumpy =0; }
  if (jumpHold==1 && m.canJump)
  { m.canJump = false; m.vy = -2; m.jumpy=16; m.djump=0; }
  if (m.jumpy > 0 && jumpHold == 0) { m.jumpy=0;}
  if (m.jumpy > 0) {  m.jumpy -= 1; }
  if (m.onGround) { m.djump = 0; }

  movePlat(m);
}//playerplat


function moveJumper(m)
{
  var ms;
  ms = 0.5;
  
  //dir 0   +
  //dir 1   -
  
  if (m.wait<=0)
  { m.vx = m.dir == 0 ? ms : -ms; }
  
  m.xmir = (m.dir != 0);

  //if (m.canJump && m.vy > 1) { m.vy = -5; m.canJump = false; }
  
 // if (m.wait > 0)
    { m.wait -=1; }
  
 //  if (m.canJump && m.onGround==false && m.wait<=0)
 //    { m.dir = (m.dir == 0) ? 1 : 0; ms = 0; m.vy=0; m.canJump = false; m.wait=5;}
  
  
  //hit wall on jump
  if (m.canJump == false && m.wallhit > 0) 
  { m.vx = m.wallhit == 1 ? -1 : 1; m.dir = m.wallhit == 1 ? 1 : 0; m.wait = 8;   }
  
  if (m.canJump && m.onGround)
  {  
     ms = m.wait;
   
     if (m.wait<=0)
     {
       //dont fall of edge 
      if ( m.dir == 0 && isPlat(m.cx+1, m.cy+7+1)==false  && isPlat(m.cx+5, m.cy+7+8+1)==false  ) { m.dir = 1; m.vx = 0;  m.wait=8; }
       else if ( m.dir != 0 && isPlat(m.cx-1, m.cy+7+1)==false && isPlat(m.cx-5, m.cy+7+8+1)==false) { m.dir = 0; m.vx = 0; m.wait=8; }
      //hit wall
       if (m.wallhit > 0) { m.dir = m.wallhit == 1 ? 1 : 0; m.wallhit = 0; m.vx= 0;  m.wait = 8; }
     
       if (ms > -25 && m.wait > 0) { m.vy = -3; m.canJump = false; }
     }//endif3
     
  }//endif

  if ( isWall(m.cx,m.cy) ) { m.cy -= 1; }
//  else if (isWall(m.cx,m.cy-5)) { m.cy += 1; }
 
  movePlat(m);
 
 putInGrid(m);
   
}//movejumper 

function addJumper(ax, ay)
{
  
  if (ax<0){ax=0;}
  if (ay<0){ay=0;}
  if (ax>worldw){ax=worldw;}
  if (ay>worldh){ay=worldh;}
  
  var a;
  a = addAct();
   a.cx = ax;
   a.cy = ay;
   a.drawy = ay;
   a.sprName = "devilfire";
   a.hp = 30;
   a.upfunc = moveJumper;
   a.destfunc = gibExplo;
   a.yhack = true;
     
  return a;
}//addtarget 




function movePlayer(m)
{

  m.yhack = true;
  
  m.drawOrder = 5;

  playerPlat(m); 
  
  if (m.cx < 0) { m.cx = 0; }
  if (m.cy < 0) { m.cy = 0; }
  if (m.cx > worldw) { m.cx = worldw; }
  if (m.cy > worldh+16) { m.cy = worldh+16; m.vy = -6; }
  
   if (vecAct.length < 39 && gt%3 == 0)
   {
     addJumper(getRand2()*256+m.cx, getRand2()*256 +m.cy);
      
   }
  
    if (fire2Hold == 1)
    { 
      m.ang = m.xmir ?  3.1415 : 0.0;
      
      var i; var ta; var d;
      for (i=0;i<8;i+=1)
      {
        ta = m.ang;
        ta += getRand2()*0.25;
        d = 5 + getRand()*1;
        
        //console.log("fire ",gt);
        a = fireBull(m.cx, m.cy);   
        a.vx = Math.cos(ta)*d;
        a.vy = Math.sin(ta)*d;
        a.ang = m.ang;
        a.ownerid = m.id;
        a.dmg = 8;
        a.crad = 5;
        a.sprName = "shot";
        a.hp = 45;
        
        if (a.dead==false) { moveBull(a); }
        if (a.dead==false) { moveBull(a); }
        if (a.dead==false) { moveBull(a); }
      }//nexti      
    }//endif
    
  putInGrid(m);
  
}//moveplayer 

//8 dir zelda like move   
function moveMapPlayer(m)
{
  
  m.wait += 1;
 // if (m.wait <= 6) { return; }
       
  var ms;
   ms = 1.5;
   var dx, dy;
   dx=0;dy=0;
   
     
   if (vecAct.length < 39 && gt%3 == 0)
   {
     addTarget(getRand2()*256+m.cx, getRand2()*256 +m.cy);
      
   }

   
   // setTile(vecId, m.tx, m.ty, 0);        
   
    if (keyUp)    { dy -= ms; m.wait= 0; }     
    if (keyDown)  { dy += ms; m.wait= 0; }     
    if (keyLeft)  { dx -= ms; m.wait= 0; }     
    if (keyRight) { dx += ms; m.wait= 0; }      
    
    if (m.wait == 0)
    {
      m.ang = Math.atan2(dy, dx);
    }
    
    if (fireHold == 1)
    { 
      //console.log("fire ",gt);
      a = fireBull(m.cx, m.cy);   
      a.vx = Math.cos(m.ang)*5;
      a.vy = Math.sin(m.ang)*5;
      a.ang = m.ang;
      a.ownerid = m.id;
      a.dmg = 80;
    }//endif
    
    
    m.vx = 0;
    m.vy = 0;
    
    
    m.vx += dx;
    m.vy += dy;
    
    checkWall(m, 8);
    
    var i;
    for (i=0;i<5;i+=1)
    { if ( checkActCol(m)==false) { break; } }
    
    
    m.cx += m.vx;
    m.cy += m.vy;
    
   if (m.wait==0 && gt%8==0) { m.xmir = !m.xmir; }

   
   ms = 8;
   if (keyLeft == false && keyRight == false)
   {
   if (isWall(m.cx+ms,m.cy) && isWall(m.cx-ms-1,m.cy)==false) { m.cx -= 1; }
   if (isWall(m.cx-ms,m.cy) && isWall(m.cx+ms+1,m.cy)==false) { m.cx += 1; }
   }
   
   if (keyUp == false && keyDown == false)
   {
   if (isWall(m.cx, m.cy+ms) && isWall(m.cx, m.cy-ms-1)==false) { m.cy -= 1; }
   if (isWall(m.cx, m.cy-ms) && isWall(m.cx, m.cy+ms+1)==false) { m.cy += 1; }
   }
   
   putInGrid(m);
   
}//moveplayer

