/**
 * @author Qiufeng
 * @data 2013
 */
 // http://dict.youdao.com/speach?audio=cc
var body = document.getElementsByTagName("body")[0];
var styleInsert = document.createElement("style");
styleContent = document.createTextNode("#iTranslate{min-width:250px;max-width:400px;color:#252525;z-index:10086;background:#FFF;font-size:12px;border:1px solid;border-color:#4B7598;border-radius:5px;}#translateTop{height:22px;background:#F5F5F5;border-bottom:1px solid;border-color:#D5E7F3;border-top-left-radius:3;border-top-right-radius:3;}#translateBody p{margin:0 2 2 2;}");
styleInsert.type = "text/css";
styleInsert.appendChild(styleContent);
document.getElementsByTagName("head")[0].appendChild(styleInsert);
body.addEventListener("mouseup", OnEvent, false)
function OnEvent(e){
	// remove window if window exists.
	if (remove()) return true;
	var word = String(window.getSelection());
	if (word.match(/[a-zA-Z]/)){
		word = word.replace(/_/g," ");
		word = word.replace(/([a-z]+)([A-Z])/g,"$1 $2");
		var r = document.caretRangeFromPoint(event.clientX, event.clientY);
		if (!r) return true;
		pX = event.pageX;
		pY = event.pageY;
		var so = r.startOffset, eo = r.endOffset;
		getGoogleTrans(word,function(e){
			onWindow(e, pX, pY);
		});
	}
}
function getGoogleTrans(word,callback){
	var xmlhttp = new XMLHttpRequest();
	url = "http://translate.google.cn/translate_a/t?client=t&text=" + word + "&hl=zh-CN&sl=en&tl=zh-CN";
	xmlhttp.open("GET", url, true);
	xmlhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			callback(this.responseText);
		}
	};
	xmlhttp.send(null);
}
function onWindow(word, x, y){
	var frame = document.createElement("div");
	frame.id = "iTranslate";
	frame.style.left = x + "px";
	frame.style.top = y + "px";
	frame.style.position = "absolute";
	frame.style.cursor = "default";
	body.appendChild(frame);
	frame.innerHTML=getTable(word);
}
function remove(){
	iTranslate = document.getElementById("iTranslate")
	if ( ! iTranslate) return false;
	iTranslate.remove();
}
function getTable(word){
	word = eval("(" + word + ")");
	wTitle = word[0][0][1];
	if (wTitle.length >= 15){
		wTitle = wTitle.substring(0, 15) + " ...";
	}
	var wBody= String("");
	for( i in word[0]){
		wBody += "<p>" + word[0][i][0] + "</p>";
	}
	frm = '<div id="translateTop">' + wTitle + '</div>' + 
		'<div id="translateBody">' + wBody + '</div>';

	return frm;
}
