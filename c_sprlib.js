

//https://developer.mozilla.org/en-US/docs/Web/API/ImageData
//imagedata is     width   height     data   (data is Uint8ClampedArray )

  // https://stackoverflow.com/questions/10754661/javascript-getting-imagedata-without-canvas
  //thanks to chrome we cannot do this

  var sprImage;

   //loading the image itself is blocked .. 
  function loadImageToSpr(imgName)
  {
    var img= new Image();    
    img.src = imgName;
    img.crossOrigin = "Anonymous"; //doesnt work
    img.onload = function()  
    {
      console.log("image loaded ", sprImage);
    }
    sprImage = img;
  }//loadimagetoskin
  
  function loadImage(imgName)
  {
    var img= new Image();    
    img.src = imgName;
    img.crossOrigin = "Anonymous"; //doesnt work
    img.onload = function()  
    {
      console.log("image loaded ", this);
    }
    return img;
  }//loadimage 
  
  
  //ImageData { width: 256, height: 256, data: Uint8ClampedArray(262144) }
  function getImageAsData(img)
  {
   var canvas = document.createElement('canvas');
   var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0 );
    var myData = context.getImageData(0, 0, img.width, img.height);
   return myData;   
  }//getasdata

  
  function getSpr(spname)
  {
    var a;
    a = vecSpr[spname];
    return a;
  }//getspr
  
  function drawSpr(spname, ax, ay)
  {
    var a;
    a = vecSpr[spname];
    if ( a == undefined) { return; }
    
    ctx.drawImage(sprImage,  a.x,a.y,a.sw,a.sh, 
    ax-a.sw*0.5, ay-a.sh*0.5,  a.sw, a.sh);
  }//drawspr 
  
  // ang     -- angle in radians  (to deg: 45*(3.1415/180.0) )
  // scx scy -- scale  e.g. scx -1 for mirror horizontally
  function drawSprAdv(spname, ax, ay, ang, scx, scy)
  {
    a = vecSpr[spname];
    if ( a == undefined) { return; }
    ctx.save();
    ctx.translate(ax|0, ay|0);
    ctx.rotate(ang);
    ctx.scale(scx, scy);
    ctx.drawImage(sprImage,  a.x, a.y,a.sw,a.sh, 
    -a.sw*0.5, -a.sh*0.5,  a.sw, a.sh);
    ctx.restore();
  }//drawspradv
  
  
  //instead of scale use fixed size 
  function drawSprAdv3(spname, ax, ay, ang, sx, sy)
  {
    a = vecSpr[spname];
    if ( a == undefined) { return; }
    ctx.save();
    ctx.translate(ax|0, ay|0);
    ctx.rotate(ang);
    //ctx.scale(scx, scy);
    ctx.drawImage(sprImage,  a.x, a.y,a.sw,a.sh, 
    -sx*0.5, -sy*0.5,  sx, sy);
    ctx.restore();
  }//drawspradv
  

  
  function drawSprRect(spname, ax, ay, aw, ah)
  {
    a = vecSpr[spname];
    if ( a == undefined) { return; }
    
    ctx.drawImage(sprImage,  a.x,a.y,a.sw,a.sh, 
    ax, ay,  aw, ah);
  }//drawsprrect
  
  

    
    