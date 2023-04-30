 

/*
var xmap_rect_numrect = 2;
var xmap_rect = [ 
{ name:"test",  type:"test",  cx:175,  cy:152,  ang:0.00,  rx:144,  ry:128,  rw:63,  rh:48  },
{ name:"player",  type:"player",  cx:244,  cy:140,  ang:0.00,  rx:232,  ry:128,  rw:24,  rh:24  } 
];
*/

function actFromRect(vec)
{ 
  var a;  var i; var num; var xr;
  num = vec.length;
  
  for (i=0;i<num;i+=1)
  {
    xr = vec[i];
    
    if (xr.name == "player")
    {
      
      a = addAct();
       a.cx = xr.cx;
       a.cy = xr.cy;

        a.sprName = "man"; 
        a.spec = 1; 
        playerId = a.id; 
        a.lastSee = 1; //important
        continue;    
    }//endifplayer
  }//nexti
  
}//actfromrect


/*
function actFromMap(tmap)
  {
    var k, i; var t;
    for (i=0;i<mapmh;i+=1)
    {
      for (k=0;k<mapmw;k+=1)
      {
        t = getTile(tmap, k,i);
         if (t > 0)
         {


            var a;
            a = addAct();
             a.tx = k;
             a.ty = i;
             a.cx = k*tilew;
             a.cy = i*tileh;
            
            
            //hamster
            if (t == 18) 
            { a.sprName = "man"; 
              a.spec = 1; 
              playerId = a.id; 
              tmanx = k; 
              tmany = i;
              a.lastSee = 1; //important
              continue;    
            }//endif3 

            
            if (t == 19) { a.sprName = "nerd";   a.spec = 3; continue;     }
            if (t == 20) { a.sprName = "beast";  a.spec = 5; continue;     }
            
            
            if (t >= 21 && t < 30) { a.sprName = "qmark0"; a.spec = 1000 + t-20; continue;   }
            
//            if (t == 21) { a.sprName = "qmark0"; a.spec = 1001; continue;  }
   //         if (t == 22) { a.sprName = "qmark0"; a.spec = 1002; continue;  }

            if (t == 35) { a.sprName = "cat";    a.spec=500; continue;     }
            if (t == 36) { a.sprName = "devil";  a.spec = 300;  continue;     }
            if (t == 37) { a.sprName = "chomp0";  a.spec = 350;  continue;     }
            
             
         }//endif
      }//nextk 
    }//nexti       
    
  }//actfrommap
  */
  