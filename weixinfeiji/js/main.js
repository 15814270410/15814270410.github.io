   //获得主界面
var mainDiv=document.getElementById("maindiv");
    //获得开始界面
var startdiv=document.getElementById("startdiv");
    //获得游戏中分数显示界面
var scorediv=document.getElementById("scorediv");
    //获得分数界面
var scorelabel=document.getElementById("label");
    //获得暂停界面
var suspenddiv=document.getElementById("suspenddiv");
    //获得游戏结束界面
var enddiv=document.getElementById("enddiv");
    //获得游戏结束后分数统计界面
var planscore=document.getElementById("planscore");
   //获取最父级div,用来算比例背景图高度
var contentdiv=document.getElementById("contentdiv");
var scorediv2=document.getElementById("scorediv2") ;
//初始化分数
var scores=0;

//为了算出背景图的真实高度的比例,因为有些移动端会把图片隐藏掉一部分,为了读取到整体高度包括被隐藏的高度,这样背景图滚动时就能无缝
var gaobili = 320/568;
var gao= contentdiv.offsetWidth/gaobili;
//防止移动端上下拖拉窗口
window.onload=test();//网页加载再执行
function test(){
     function stopDrop() {
        var lastY;//最后一次y坐标点
        $(document.body).on('touchstart', function(event) {
            lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
        });
        $(document.body).on('touchmove', function(event) {
            var y = event.originalEvent.changedTouches[0].clientY;//记录手指拖动的坐标
            var st = $(this).scrollTop(); //滚动条高度  
            if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。防止移动端下拖拉窗口
                lastY = y;
                event.preventDefault();
            }
            if (y <= lastY && st <= 10) {//防止移动端上拖拉窗口
                lastY = y;
                event.preventDefault();
            }
            lastY = y;
        });
    }
    stopDrop();
}

// window.onload=test();
// function test(){ 
// window.ontouchstart = function(event) { event.preventDefault(); };
// }
/*
 创建飞机类
 */
function plan(hp,X,Y,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    this.planX=X;
    this.planY=Y;
    this.imagenode=null;
    this.planhp=hp;
    this.planscore=score;
    this.plansizeX=sizeX;
    this.plansizeY=sizeY;
    this.planboomimage=boomimage;
    this.planisdie=false;
    this.plandietimes=0;
    this.plandietime=dietime;
    this.plansudu=sudu;
//行为
/*
移动行为
     */
     //敌机移动速度判断用分数判断
    this.planmove=function(){
        if(scores<=500){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+0+"px";

        }
        else if(scores>500&&scores<=800){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+0.3+"px";
        }
        else if(scores>800&&scores<=1100){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+0.6+"px";
        }
        else if(scores>1100&&scores<=1300){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+0.9+"px";
        }
        else if(scores>1300&&scores<=1600){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+1.2+"px";
        }
        else if(scores>1600&&scores<=1900){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+1.5+"px";
        }
        else if(scores>1900&&scores<=2200){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+1.9+"px";
        }
        else if(scores>2200&&scores<=2500){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+2.3+"px";
        }
        else if(scores>2500&&scores<=2800){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+3+"px";
        }
        else if(scores>2800&&scores<=3000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+4+"px";
        }
        else if(scores>3000&&scores<=5000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+5+"px";
        }
        else if(scores>5000&&scores<=8000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+8+"px";
        }
        else{
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+9+"px";
        }
    }
    this.init=function(){
        this.imagenode=document.createElement("img");
        this.imagenode.style.left=this.planX+"px";
        this.imagenode.style.top=this.planY+"px";
        this.imagenode.src=imagesrc;
        mainDiv.appendChild(this.imagenode);
    }
    this.init();
}

/*
创建子弹类
 */
function bullet(X,Y,sizeX,sizeY,imagesrc){
    this.bulletX=X;
    this.bulletY=Y;
    this.bulletimage=null;
    this.bulletattach=1;
    this.bulletsizeX=sizeX;
    this.bulletsizeY=sizeY;   
//行为
/*
 移动行为
 */
    this.bulletmove=function(){
        this.bulletimage.style.top=this.bulletimage.offsetTop-10+"px";
    }
    this.init=function(){
        this.bulletimage=document.createElement("img");
        this.bulletimage.style.left= this.bulletX+"px";
        this.bulletimage.style.top= this.bulletY+"px";
        this.bulletimage.src=imagesrc;
        mainDiv.appendChild(this.bulletimage);
    }
    this.init();
}

/*
 创建单行子弹类
 */
function oddbullet(X,Y){
    bullet.call(this,X,Y,6,14,"image/bullet1.png");
}

/*
创建敌机类
 */
function enemy(hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    plan.call(this,hp,random(a,b),-100,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc);
}
//产生min到max之间的随机数
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

/*
创建本方飞机类
 */
function ourplan(X,Y){
    var imagesrc="image/我的飞机.gif";
    plan.call(this,1,X,Y,66,80,0,660,0,"image/本方飞机爆炸.gif",imagesrc);
    this.imagenode.setAttribute('id','ourplan');
}

/*
 创建本方飞机
 */
var selfplan=new ourplan(120,485);

//移动事件
var zanBol = false;//用来判断暂停的
var ourPlan=document.getElementById('ourplan');
var yidong=function(){
   
    var oevent=window.event||arguments[0];
    var chufa=oevent.srcElement||oevent.target;
    
     if (!zanBol) {//当zanBol = false;执行下面移动功能
        var selfplanX=oevent.touches[0].clientX;
        var selfplanY=oevent.touches[0].clientY;
        cunX = selfplanX-selfplan.plansizeX/2; 
        ourPlan.style.left=selfplanX-selfplan.plansizeX/2+"px";
        ourPlan.style.top=selfplanY-selfplan.plansizeY/2+"px";
    }
    oevent.preventDefault();//阻止长按飞机出现事件
    return false;//阻止长按飞机出现事件
}

//键盘事件
 var sudu = 20;var suX = 0;var suY = 0;
    document.onkeydown=function(){
             var e = event || window.event || arguments.callee.caller.arguments[0];
             ourPlan.style.left=120+suX+"px"
             console.log(ourPlan.style.left)
             if(e.keyCode==37){ 
              suX-=sudu;
             // console.log(44,su)
               }
             if(e.keyCode==38){ 
                suY-=sudu;
                }            
              if(e.keyCode==39){ 
                suX+=sudu;
             }
             if(e.keyCode==40){ 
               suY+=sudu;
             }
            ourPlan.style.left=120+suX+"px"
            ourPlan.style.top=458+suY+"px"
         } 

/*
暂停事件
 */
var number=0;
var zanting=function(){
    if(number==0){
        suspenddiv.style.display="block";//继续界面出来
        scorediv2.style.display="none";//暂停div隐藏
        zanBol = true;//当zanBol = true;暂停移动功能
        suspenddiv.style.left=contentdiv.offsetWidth/2-suspenddiv.offsetWidth/2+"px";
        // if(document.removeEventListener){
        //     mainDiv.removeEventListener("mousemove",yidong,true);
        //     bodyobj.removeEventListener("mousemove",bianjie,true);
        // }
        // else if(document.detachEvent){
        //     mainDiv.detachEvent("onmousemove",yidong);
        //     bodyobj.detachEvent("onmousemove",bianjie);
        // }
        clearInterval(set);//暂停定时器
        number=1;
    }
    else{//再点击变成继续
        suspenddiv.style.display="none";
        if(document.addEventListener){
            mainDiv.addEventListener("touchmove",yidong,true);
            bodyobj.addEventListener("touchmove",bianjie,true);
        }
        else if(document.attachEvent){
            mainDiv.attachEvent("touchstart",yidong);
            bodyobj.attachEvent("touchstart",bianjie);
        }
        set=setInterval(start,20);
        number=0;
        zanBol = false;//移动zanBol = false;移动生效
        scorediv2.style.display="block";//暂停div显示
    }
}
//判断本方飞机是否移出边界,如果移出边界,则取消mousemove事件,反之加上mousemove事件
var bianjie=function(){
    var oevent=window.event||arguments[0];
    var bodyobjX=oevent.touches[0].clientX;
    var bodyobjY=oevent.touches[0].clientY;
    if(bodyobjX<5||bodyobjX>mainDiv.offsetWidth||bodyobjY<0||bodyobjY>mainDiv.offsetHeight){
        if(document.removeEventListener){
            mainDiv.removeEventListener("touchmove",yidong,true);
        }
        else if(document.detachEvent){
            mainDiv.detachEvent("touchstart",yidong);
        }
    }
    else{
        if(document.addEventListener){
            mainDiv.addEventListener("touchmove",yidong,true);
        }
        else if(document.attachEvent){
            mainDiv.attachEvent("touchstart",yidong);
        }
    }
    
}
//暂停界面重新开始事件
//function chongxinkaishi(){
//    location.reload(true);
//    startdiv.style.display="none";
//    maindiv.style.display="block";
//}
var bodyobj=document.getElementsByTagName("body")[0];
if(document.addEventListener){
    //为本方飞机添加移动和暂停
    mainDiv.addEventListener("touchmove",yidong,true);
    //为本方飞机添加暂停事件
    // selfplan.imagenode.addEventListener("click",zanting,true);
    //为body添加判断本方飞机移出边界事件
    bodyobj.addEventListener("touchmove",bianjie,true);
    //为暂停界面的继续按钮添加暂停事件
    suspenddiv.getElementsByTagName("button")[0].addEventListener("click",zanting,true);
//    suspenddiv.getElementsByTagName("button")[1].addEventListener("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    suspenddiv.getElementsByTagName("button")[2].addEventListener("click",jixu,true);
}
else if(document.attachEvent){
    //为本方飞机添加移动
    mainDiv.attachEvent("touchstart",yidong);
    //为本方飞机添加暂停事件
    // selfplan.imagenode.attachEvent("onclick",zanting);
    //为body添加判断本方飞机移出边界事件
    bodyobj.attachEvent("touchstart",bianjie);
    //为暂停界面的继续按钮添加暂停事件
    suspenddiv.getElementsByTagName("button")[0].attachEvent("onclick",zanting);
//    suspenddiv.getElementsByTagName("button")[1].attachEvent("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    suspenddiv.getElementsByTagName("button")[2].attachEvent("click",jixu,true);
}
//初始化隐藏本方飞机
selfplan.imagenode.style.display="none";//一开始先隐藏自己飞机

/*
敌机对象数组
 */
var enemys=[];

/*
子弹对象数组
 */
var bullets=[];
var mark=0;
var mark1=0;
var backgroundPositionY=0;
/*
开始函数
 */
function start(){
    mainDiv.style.backgroundPositionY=backgroundPositionY+"px";

    backgroundPositionY+=0.5;
    // console.log(mainDiv.offsetHeight)
    if(backgroundPositionY>=gao){
        backgroundPositionY=0;
    }
    mark++;
    /*
    创建敌方飞机
     */

    if(mark==20){
        mark1++;
        //中飞机
        if(mark1%5==0){
            enemys.push(new enemy(6,25,mainDiv.offsetWidth-70,46,60,50,360,random(1,3),"image/中飞机爆炸.gif","image/enemy3_fly_1.png"));
        }
        //大飞机
        if(mark1==20){
            enemys.push(new enemy(12,57,mainDiv.offsetWidth-110,110,164,3,540,1,"image/大飞机爆炸.gif","image/enemy2_fly_1.png"));
            mark1=0;
        }
        //小飞机
        else{
            enemys.push(new enemy(1,19,mainDiv.offsetWidth-40,34,24,10,360,random(1,4),"image/小飞机爆炸.gif","image/enemy1_fly_1.png"));
        }
        mark=0;
    }

/*
移动敌方飞机
 */
    var enemyslen=enemys.length;
    for(var i=0;i<enemyslen;i++){
        if(enemys[i].planisdie!=true){
            enemys[i].planmove();
        }
/*
 如果敌机超出边界,删除敌机
 */
 // console.log(mainDiv.offsetHeight)
        if(enemys[i].imagenode.offsetTop>mainDiv.offsetHeight){
            mainDiv.removeChild(enemys[i].imagenode);
            enemys.splice(i,1);
            enemyslen--;
        }
        //当敌机死亡标记为true时，经过一段时间后清除敌机
        if(enemys[i].planisdie==true){
            enemys[i].plandietimes+=20;
            if(enemys[i].plandietimes==enemys[i].plandietime){
                mainDiv.removeChild(enemys[i].imagenode);
                enemys.splice(i,1);
                enemyslen--;
            }
        }
    }

/*
创建子弹
*/
    if(mark%5==0){
            bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+31,parseInt(selfplan.imagenode.style.top)-10));
    }

/*
移动子弹
*/
    var bulletslen=bullets.length;
    for(var i=0;i<bulletslen;i++){
        bullets[i].bulletmove();
/*
如果子弹超出边界,删除子弹
*/
        if(bullets[i].bulletimage.offsetTop<0){
            mainDiv.removeChild(bullets[i].bulletimage);
            bullets.splice(i,1);
            bulletslen--;
        }
    }

/*
碰撞判断
*/
     
    for(var j=0;j<enemyslen;j++){
         //判断碰撞本方飞机
            // console.log(enemys[j].imagenode.offsetTop+enemys[j].plansizeX,selfplan.imagenode.offsetTop)
            if(enemys[j].planisdie==false){
                if(enemys[j].imagenode.offsetLeft+enemys[j].plansizeX>=selfplan.imagenode.offsetLeft&&enemys[j].imagenode.offsetLeft<=selfplan.imagenode.offsetLeft-10+selfplan.plansizeX){
                  if(enemys[j].imagenode.offsetTop+enemys[j].plansizeY>=selfplan.imagenode.offsetTop+40&&enemys[j].imagenode.offsetTop<=selfplan.imagenode.offsetTop-30+selfplan.plansizeY){
                      //碰撞本方飞机，游戏结束，统计分数
                      selfplan.imagenode.src="image/本方飞机爆炸.gif";
                      enddiv.style.display="block";
                      enddiv.style.left=contentdiv.offsetWidth/2-enddiv.offsetWidth/2+"px";
                      // var zuigao = [];// 创建数组
                      // zuigao.push(scores);
                      // console.log(zuigao);
                      planscore.innerHTML=scores;
                      if(document.removeEventListener){
                          mainDiv.removeEventListener("touchmove",yidong,true);
                          bodyobj.removeEventListener("touchmove",bianjie,true);
                      }
                      else if(document.detachEvent){
                          mainDiv.detachEvent("touchstart",yidong);
                          bodyobj.removeEventListener("touchmove",bianjie,true);
                      }
                      clearInterval(set);
                  }
                }
        for(var k=0;k<bulletslen;k++){

             //判断子弹与敌机碰撞
                if((bullets[k].bulletimage.offsetLeft+bullets[k].bulletsizeX>enemys[j].imagenode.offsetLeft)&&(bullets[k].bulletimage.offsetLeft<enemys[j].imagenode.offsetLeft+enemys[j].plansizeX)){
                    if(bullets[k].bulletimage.offsetTop<=enemys[j].imagenode.offsetTop+enemys[j].plansizeY&&bullets[k].bulletimage.offsetTop+bullets[k].bulletsizeY>=enemys[j].imagenode.offsetTop){
                        //敌机血量减子弹攻击力
                        enemys[j].planhp=enemys[j].planhp-bullets[k].bulletattach;
                        //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
                        if(enemys[j].planhp==0){
                            scores=scores+enemys[j].planscore;
                            scorelabel.innerHTML=scores;
                            enemys[j].imagenode.src=enemys[j].planboomimage;
                            enemys[j].planisdie=true;
                        }
                        //删除子弹
                        mainDiv.removeChild(bullets[k].bulletimage);
                            bullets.splice(k,1);
                            bulletslen--;
                            break;
                    }
                }
            }
        }
    }
}
/*
开始游戏按钮点击事件
 */

var set;
function begin(){

    startdiv.style.display="none";
    mainDiv.style.display="block";
    selfplan.imagenode.style.display="block";
    scorediv.style.display="block";
    /*
     调用开始函数
     */
    set=setInterval(start,20);
}
//游戏结束后点击继续按钮事件
function jixu(){
    location.reload(true);
    zanBol = false;
}

