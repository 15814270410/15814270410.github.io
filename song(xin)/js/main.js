var main = document.querySelector(".main");
var jiazai = document.querySelector(".jiazai");
var bfb = document.querySelector(".bfb");
var jiemian1 = document.querySelector(".jiemian1");
var jiemian2 = document.querySelector(".jiemian2");
var anniu1 = document.querySelector(".anniu");
var music = document.querySelector("audio");

var fang = document.querySelector(".fang");
var lamp = document.querySelector(".lamp");
var shelf = document.querySelector(".shelf");
var sofa = document.querySelector(".sofa");

var jiemian3 = document.querySelector(".jiemian3");
var shou = document.querySelector(".shou"); 
var btn = document.querySelector(".btn"); 

var tmp = document.querySelector(".timu p");
var tmdiv = document.querySelectorAll(".timu div");
var tmspan = document.querySelectorAll(".timu span");

var jiemian4 = document.querySelector(".jiemian4");
var defen = document.querySelector(".fen");
var pj = document.querySelector(".jiemian4 p");
var jj = document.querySelector(".jiejue");
var fx = document.querySelector(".fx");
var fxtu = document.querySelector(".fxtu");
move(lamp);
move(shelf);
move(sofa);

//加载完成函数
var arrSrc = ["all_page_bg.jpg","header.png","heart.png","heart1.png","face.png","demond.png","head1.png","head2.png","head3.png","head4.png","song.png","lamp.png","next_btn.jpg","p2_shou.png","page1_btn.png","page2_bg.jpg","scroll_btn.png","share.png","shelf_bg.png","shelf.png","xuan.png","sofa.png","test_text.jpg","zaogao.png","bg.mp3"];//放进所有图片和音乐
var index=0;
// var arrImg=[]
for(var i=0;i<arrSrc.length;i++){//按上面所以文件的长度来下标循环,把文件一一加载出来
	if(i<arrSrc.length-1){//加载图片
		var img=new Image();
		img.src = "img/" + arrSrc[i];//加载图片
		// arrImg.push(img.src);
		img.onload = function(){
			index++;
			jindu();//实时运行下面要执行的进度条函数
			if(index==arrSrc.length){
				begin();//加载完运行下面要执行的下一页函数
			}
		}
	}else{//加载音乐
		var sound = new Audio();

		sound.src = "music/" +arrSrc[i];//加载音乐
		sound.onloadeddata = function(){
			index++;
			jindu();//实时运行下面要执行的进度条函数
			if(index==arrSrc.length){
				begin();//加载完运行下面要执行的下一页函数
			}
		}
	}
	
}
//进度条
function jindu(){
	bfb.innerHTML = Math.round(index/arrSrc.length*100)+"%"//用index(加载完的数量来除以文件总数)
}
//加载完成之后执行的函数
function begin(){
	jiazai.style.display = "none";
	jiemian1.style.display="block";
	main.style.backgroundSize = "100% 100%";
	main.style.backgroundImage = "url(img/all_page_bg.jpg)";
	music.play();
}

//首页(界面一)点击隐藏首页显示界面二
anniu1.addEventListener("touchstart",function (e) {
	jiemian1.style.display = "none";
	jiemian2.style.display = "block";
	main.style.backgroundImage = "url(img/page2_bg.jpg)"
	
})

//界面二 点击拖拽事件 用obj传参,例如传沙发move(沙发)来执行函数
function move(obj){
	obj.addEventListener("touchstart",function (e) {
		var dx = e.touches[0].clientX - obj.offsetLeft;
		var dy = e.touches[0].clientY - obj.offsetTop;
		obj.addEventListener("touchmove",function(e){
			shou.style.display="none";
			var x = e.touches[0].clientX - dx;
			var y = e.touches[0].clientY - dy;
			if(x < 0){x = 0;}
			if(y < 0){y = 0;}
			if(x > main.offsetWidth - obj.offsetWidth){
				x = main.offsetWidth - obj.offsetWidth;
			}
			if(y > main.offsetHeight - obj.offsetHeight){
				y = main.offsetHeight - obj.offsetHeight;
			}
			obj.style.left = x + "px";
			obj.style.top = y +  "px";
		})
	})
}

// 放置完成 判断是否合格 合格则进入进入答题界面
jiaju();
function jiaju(){
	document.addEventListener("touchend",fangzhi,false)
	function fangzhi(){
		lamp.bol = false;
		shelf.bol = false;
		sofa.bol = false;
		var bilidi = 75/480;//这个是房子图里地板位置除以房子图总高的比例
		var divh = fang.offsetHeight;//获取房子的高
		var divg = fang.offsetTop;//获取房子图上面部分距离窗口顶部的高度
		var di = divh*bilidi;//算出房子的地板最高位置
		function panduan(obj){//判断函数(obj的左边不要超出房子图的最左边边界&&obj的上面不要超出房子图的地板最上面边界&&obj的底部不要超出房子图的地板底部边边界)
			if(obj.offsetLeft > fang.offsetLeft && obj.offsetLeft<fang.offsetLeft+fang.offsetWidth-obj.offsetWidth&&divg + divh-di <= obj.offsetTop+obj.offsetHeight && divg + divh >= obj.offsetTop + obj.offsetHeight){
				obj.bol  = true;//判断然后传进来的家具就变成true
			}
		}
		panduan(lamp);//传参运行判断函数
		panduan(shelf);//传参运行判断函数
		panduan(sofa);//传参运行判断函数

		if(lamp.bol && shelf.bol && sofa.bol){//当三个家具都是判断过关了就进去界面三
			setTimeout(function(){//延时定时器为了三个都放进去后不是马上进去,而是延时两秒之后进入
				// 延时2s进入答题界面
				jiemian2.style.display = "none";
				jiemian3.style.display = "block";
				main.style.backgroundImage = "url(img/all_page_bg.jpg)"
			},2000)
			document.removeEventListener("touchend",fangzhi);
		}
	}
}

// 答题界面 要求第一题和第二题是从道前四道题里随机,然后第三题一定是下面第五题的内容
var xbol = false;//点击ABC后变成true让判断下一题用
var timu = []
//写出要随机的五道题
timu[0]={ti:"装修好的房子你知道怎么检验吗？",a:"会",b:"不会",c:"略懂一点"};
timu[1]={ti:"关于家具的颜色你怎样选择？",a:"自己选",b:"听老公的",c:"听装修师傅的"};
timu[2]={ti:"装修开工后的第一步应该做什么？",a:"水电改造",b:"吊顶",c:"贴瓷砖"};
timu[3]={ti:"地砖应该比实际铺设面积多购买多少？",a:"20%",b:"15%",c:"10%"};
timu[4]={ti:"装修风格选择你的选择是",a:"我喜欢",b:"老公喜欢",c:"多照顾一下对方喜欢"};
var ti=1;
var t=ranFn();//t等于随机0到3
var fen=0;//记录总分
var jf=0;//记录每次选abc的分数
//随机0到3
function ranFn(){
	return Math.floor(Math.random()*4);
}

//判断是否能点击下一题,没有点击ABC的话点击下一题没反应
btn.addEventListener("touchstart",function(){
	if(xbol){//由于下面点击ABC函数把xbol=true;就可以进去判断
		if(ti<3){//
			xbol=false;//为了下一题按钮在没点击ABC函数的情况下不能点击本按钮
			fen+=jf;//记录上一次的得分加到总分里
			chushi();//运行下面函数,清除之前给点击哪一个ABC的样式(选中的字体颜色和左边给以一个绿色勾样式)
			next();
			txs();//运行下面读取题目的内容
		}else{
			fen+=jf;//最后一次点击下一题也要记录本次得分
			jiemian3.style.display="none";
			jiemian4.style.display="block";
			ping();//运行下面判断总分选弹出上面的哪一个得分内容
		}
		

	}
})
// next();
txs();//读取ABC的内容

//循环点击哪一个ABC,然后改变选中的字体颜色和左边给以一个绿色勾样式
for(var i=0;i<3;i++){
	tmspan[i].index=i;
	tmspan[i].addEventListener("touchstart",function(){
		
		xbol=true;
		chushi();
		tmdiv[this.index].style.display="block";
		tmspan[this.index].style.color="#f77fa8";
		jf=this.index+1;
	})
}
//清除之前给点击哪一个ABC的样式(选中的字体颜色和左边给以一个绿色勾样式)
function chushi(){
	for(var j = 0;j<3;j++){
			tmdiv[j].style.display="none";
			tmspan[j].style.color="#e13771";
		}
}
//让每一次的随机题目前面都有序的排1,2,3
function next(){
	
	if(ti==1){//一开始因为上面定义了ti=1,进去判断运行随机题目
		for(var i = 0;i<1;i++){
			var tt=ranFn();
			if(t!=tt){t=tt}else{//(为了让第一二题随机题不要重复)判断上一次的t和tt随机到数是否一样,不一样的话就赋值给t,否则就i--重新循环再判断
				i--;
			}
		}
	}else if(ti==2){//当题第二题的时候,下一题就会是要求的第三题一定是数组第五题的内容
		t=4;//数组第五题的内容
	}
	ti++;
}
//读取题目的内容
function txs(){
	tmp.innerHTML=ti+"."+timu[t].ti;
	tmspan[0].innerHTML="A、"+timu[t].a;
	tmspan[1].innerHTML="B、"+timu[t].b;
	tmspan[2].innerHTML="C、"+timu[t].c;
}
var pingjia=[];
pingjia[0]=["你的居家技能只适合做宋仲基的保姆，因为对装修也不了解，什么都听他的，完全没有自己的主见，这种模式完全是听命于宋仲基，所以只能是保姆。解决办法：不要盲目的崇拜宋仲基，要将自己放在与宋仲基对等的立场思考问题，对于装修自己也要多多了解。"];
pingjia[1]=["你的居家技能只适合做宋仲基的妹妹，自认为对家装很了解，什么都要按照你的意见来，别人的意见你完全听不进，在这种状态下宋仲基还愿意和你一起生活只能是妹妹了。解决方法：要学尊重对方，多为对方考虑，多听听对方的意见"]
pingjia[2]=["你的居家技能这么棒，宋仲基的太太头衔属于你啦！对于家装你知道前期备课，你相当理性，尊重对方的意见，知道怎样持家，但是对于持家你还要不断地摸索。"]

//判断总分选弹出上面的哪一个得分内容
function ping(){
	var k = 2;
	if(fen<6){
		k=0;
	}else if(fen<8){
		k=1;
	}
	defen.innerHTML="得分："+fen;
	pj.innerHTML = pingjia[k];
	jj.addEventListener("touchstart",function(){
		self.location='http://m.525j.com.cn/ajzx/home_5.shtml'; 
	})
	fx.addEventListener("touchstart",function(){
		fxtu.style.display = "block";
	})
	fxtu.addEventListener("touchstart",function(){
		fxtu.style.display = "none";
	})
}


