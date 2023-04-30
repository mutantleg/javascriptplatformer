

function playOnScreen(tx, ty, sndName, vol)
{
  var ax, ay;
  
  ax = tx * tilew + 8;
  ay = ty * tileh + 8;
  ax -= camx;
  ay -= camy;

  if (ax<-16){ return;} 
  if (ax>340){ return;}
  if (ay<-16){ return;}      
  if (ay>260){ return;}

  playSnd(sndName, vol);
  
}//playonscr


    
function moveAct(a)
{
    var t;
    var dx, dy;
  
                          

}//moveact



  
  function updateAct(vec)
  {
    var i; var num; var a;
    var bclean = false;
    num = vec.length | 0; 
    
   
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
      if (a.dead){ bclean=true; continue;}
      
      //only update actor if it appeared on screen 
     // if (a.lastSee <= 0) { continue; }
      
      if (a.upfunc != undefined)
      {  a.upfunc(a); continue; }
      
      if (a.spec == 1)       { movePlayer(a); }
     // else if (a.spec == 3)       { moveBull(a); }
      else   { moveAct(a); }
      
      /*
      if (a.spec == 1) { upPlayer(a); continue; }
      if (a.spec == 3) { upMonst(a); continue; }
      if (a.spec == 99) { upBlock(a); continue; }
      */
    }//nexti 
    if (bclean) { cleanAct(vec); }
  }//updateact
  