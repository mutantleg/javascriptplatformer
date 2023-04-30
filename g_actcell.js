

/*
  var scrCell = { vec:[], numObj:0};
  
  function clearCell()
  {
    scrCell = { vec:[], numObj:0};
  }//clearcell
*/

  function remObj(cell, a)
  {
    //if (a.cellid == undefined) {}
    if (cell==null) { return; }
    if (a.cellid < 0) { return; }

    var b; 
    b = null;
    
    if (cell.numObj >= 2)
    {
     b = cell.vec[ cell.numObj - 1];
     b.cellid = a.cellid;
    }

    cell.vec[a.cellid] = b;
    cell.numObj -= 1;    

    a.cellid = -1;
    a.cell = null;
  }//remobj
  
  function addObj(cell, a)
  {
    if (a.cell == cell) { return; }
    if (a.cell != null) { remObj(a.cell, a); }
    
    cell.vec[cell.numObj] = a;
    a.cellid = cell.numObj;
    a.cell = cell;
    cell.numObj += 1;
  }//addobj
  
  var actGrid = 
  {
    vecGrid:[],
    mw:0,
    mh:0,    
    cx:0,
    cy:0,
    cw:128,
    ch:128,
    curTest:0
  };//actgrid 
  
  function initActGrid(ax,ay,aw,ah)
  {
     var a;
     a = actGrid;
     a.cx = ax;
     a.cy = ay;
     a.cw = 64;
     a.ch = 64;
     a.mw = (aw / a.cw) + 1;
     a.mh = (ah / a.ch) + 1;
    
     a.curTest = 1;
    
     a.vecGrid = [];
    
    var num; var i;
    num = a.mw * a.mh;
    for(i=0;i<num;i+=1)
    {
      a.vecGrid[i] = { vec:[], numObj:0, test:0, cx:0, cy:0};
      a.vecGrid[i].cx = (i%a.mw) * a.cw;
      a.vecGrid[i].cy = Math.floor(i/a.mw)*a.ch;
    }//nexti
  
    console.log("init act grid ",ax,ay,aw,ah);    
  }//initactgrid
  
  
  function putInGrid(a)
  {
    var g; var c;
    var ax, ay;
    
    g = actGrid;
    
    ax = Math.floor((a.cx - g.cx)/g.cw);
    ay = Math.floor((a.cy - g.cy)/g.ch);
    
    if (ax<0||ax>=g.mw ||ay<0||ay>=g.mh) 
    { remObj(a.cell, a); return; }
  
    c = g.vecGrid[ax +(ay*g.mw)];
    addObj(c, a);    
    
  }//putingrid
  
  
  function getCell(ax, ay)
  {
    var g; var c;
    
    g = actGrid;
      
    ax = Math.floor((ax - g.cx)/g.cw);
    ay = Math.floor((ay - g.cy)/g.ch);
    
    if (ax<0||ax>=g.mw ||ay<0||ay>=g.mh) { return null }
    
   // console.log(gt,"get cell ",ax,ay);
    
    return g.vecGrid[ax +(ay*g.mw)];

  }//getcell 
  
  var colVec = [];
  
  function getQuery(ax, ay, r)
  {
    var g; var c; var it;   
    g = actGrid;
    g.curTest += 1;
    it = 0;
    
    c = getCell(ax-r, ay-r);    if (c!= null) { if (c.test != g.curTest && c.numObj>0) { c.test = g.curTest; colVec[it] = c; it+=1; } }
    c = getCell(ax+r, ay-r);    if (c!= null) { if (c.test != g.curTest && c.numObj>0) { c.test = g.curTest; colVec[it] = c; it+=1; } }
    c = getCell(ax-r, ay+r);    if (c!= null) { if (c.test != g.curTest && c.numObj>0) { c.test = g.curTest; colVec[it] = c; it+=1; } }
    c = getCell(ax+r, ay+r);    if (c!= null) { if (c.test != g.curTest && c.numObj>0) { c.test = g.curTest; colVec[it] = c; it+=1; } }
    
    return it;    
  }//getquery 
  
  
  
  
  
  
  
  
  
  
  


