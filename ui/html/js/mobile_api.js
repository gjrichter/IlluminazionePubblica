/**********************************************************************
mobile_api.js

$Comment: provides ixmaps.jsapi JavaScript extensions for maps in mobile browsers
$Source :mobile_api.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/07/19 $
$Author: guenter richter $
$Id:mobile_api.js 1 2012-07-19 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:mobile_api.js,v $
**********************************************************************/

/** 
 * @fileoverview This file defines mobile browser extensions to the ixmaps map ui api
 *
 * @author Guenter Richter guenter.richter@ixmaps.com
 * @version 0.9
 */

/**
 * define namespace ixmaps
 */

window.ixmaps = window.ixmaps || {};
ixmaps.jsapi = ixmaps.jsapi || {};
(function() {

	/* ...................................................................* 
	 *  handle views (map,list,both)                                      * 
	 * ...................................................................*/ 

	var __fHeaderTransparent = false;
	var __fFooterTransparent = false;
	var __fFullScreenList = false; 
	var __tAdaptMapWidth = null;

	/*
	 * make map visible 
	 */
	ixmaps.jsapi.forceMap = function(){
		if ( !__fFullScreenList ){
			return;
		}
		if ( ixmaps.jsapi.szAcualView && (ixmaps.jsapi.szAcualView == "list") ){
			this.setView("map");
		}
		if ( ixmaps.jsapi.szAcualView && (ixmaps.jsapi.szAcualView == "both") ){
		}
	};
	/*
	 * set actual view 
	 * @param szMode the new map view mode
	 */
	ixmaps.jsapi.setView = function(szMode){
		switch(szMode){
			case "map":
				__setMap();
				$("#view-select-icon").attr("src","resources/icons/list.png");
				$("#view-up-icon1").attr("src","resources/icons/expanded-blu.png");
				$("#view-up-icon2").attr("src","resources/icons/expanded-blu.png");
				$("#view-up-icon3").attr("src","resources/icons/expanded-blu.png");
				break;
			case "list":
				__setList();
				$("#view-select-icon").attr("src","resources/icons/close-left.png");
				$("#view-up-icon1").attr("src","resources/icons/collapsed-blu.png");
				$("#view-up-icon2").attr("src","resources/icons/collapsed-blu.png");
				$("#view-up-icon3").attr("src","resources/icons/collapsed-blu.png");
				break;
			case "next":
				if ( this.szAcualView == 'map' ){
					this.setView('list');
					return;
				}else if ( this.szAcualView == 'both' ){
					this.setView('list');
					return;
				}else if ( this.szAcualView == 'list' ){
					this.setView('map');
					return;
				}
				break;
			default:
				__setBoth();
		}
		ixmaps.jsapi.szAcualView = szMode;
	};
	/*
	 * get actual view 
	 * @return the actual view (map|list|both)
	 */
	ixmaps.jsapi.getView = function(){
		if ( $("#sidebar").css("visibility") == "hidden" ){
			return "map";
		} else
		if ( $("#map-content").css("visibility") == "hidden" ){
			return "list";
		} else {
			return "both";
		}
	};

	ixmaps.jsapi.initViewPort = function(){

		this.screenRatio = window.innerWidth / window.innerHeight;

		if ( this.screenRatio < 0.1 ){
			$("#view-up").css("visibility","visible");
		}else{
			$("#view-up").css("visibility","hidden");
		}
	};

	ixmaps.jsapi.initView = function(szMode){

		this.initViewPort();
		this.setView(szMode);
	};

	/*
	 * intercept window resize, and autoadapt the map view to the aspect ratio  
	 */
	ixmaps.jsapi.onWindowResize = function(){

		this.initViewPort();

		if ( this.screenRatio > 1.3 ){
			if ( ixmaps.jsapi.szAcualView == "both" ){
				ixmaps.jsapi.checkResize();
				return;
			}
			ixmaps.jsapi.setView("both");
		}else{
			ixmaps.jsapi.setView("map");
		}
	};

	/*
	 * show only the map 
	 */
	__setMap = function(){

		if ( __tAdaptMapWidth ){
			clearTimeout(__tAdaptMapWidth);
			__tAdaptMapWidth = null;
		}

		var headerHeight = $("#hdr").height();
		var footerHeight = $("#ftr").height();
		var maxHeight = window.innerHeight - headerHeight - footerHeight;
		var maxWidth  = window.innerWidth;

		$("#content").css("height",(maxHeight-1)+"px");
		$("#content").css("width",(maxWidth)+"px");
		$("#content").css("overflow","hidden");

		$("#map").css("top",(0)+"px");
		$("#map").css("width",(maxWidth)+"px");
		//setTimeout('$("#map").css("width","'+(maxWidth)+'px");',400);
		$("#map").css("height",(maxHeight)+"px");
		$("#map").animate({left:(0)+'px'},500);
		//setTimeout('$("#map").animate({left:"0px"},500);',500);

		if ( __fHeaderTransparent ){
			$("#map").css("top",(-headerHeight)+"px");
		}

		$("#sidebar").css("position","absolute");
		$("#sidebar").css("top","0px");
		$("#sidebar").css("left","0px");
//		$("#sidebar").css("width","0px");
		$("#sidebar").css("height",(maxHeight)+"px");

		$("#layer-dialog-button").css("visibility","visible");

		setTimeout('$("#myIntroDiv").animate({opacity:0},2000)',3000);

	};

	/*
	 * show only the list of the map items 
	 */
	__setList = function(){

		var headerHeight = $("#hdr").height();
		var footerHeight = $("#ftr").height();
		var maxHeight = window.innerHeight - headerHeight - footerHeight;
		var maxWidth  = window.innerWidth;

		$("#content").css("height",(maxHeight-1)+"px");
		$("#content").css("width",(maxWidth)+"px");
		$("#content").css("overflow","hidden");

		$("#sidebar").css("position","absolute");
		$("#sidebar").css("top","0px");
		$("#sidebar").css("left","0px");
		$("#sidebar").css("width","0px");
		$("#sidebar").css("height",(maxHeight)+"px");

		__fFullScreenList = (maxWidth <= 500);
		
		if ( __fFullScreenList ){
			$("#sidebar").css("position","relative");
			$("#sidebar").css("width",(maxWidth-1)+"px");
			$("#sidebar").css("height",(maxHeight-1)+"px");
			$("#map").css("position","");
			$("#map").css("height","0px");
			$("#map").css("left",maxWidth);
		}else{
			if ( ixmaps.jsapi.screenRatio < 0.1 ){
				var sidebarHeight = Math.min(300,Math.floor(maxHeight/2));
				$("#sidebar").css('weight',(sidebarHeight)+'px');
				$("#sidebar").css('width',(maxWidth)+'px');
				$("#sidebar").css('top',(maxHeight-sidebarHeight)+'px');
				$("#map").animate({height:(maxHeight-sidebarHeight)+'px'},200);
				$("#view-up").css("visibility","visible");
			}else{
				var sidebarWidth = Math.max(250,Math.floor(maxWidth/4));
				$("#sidebar").css('width',(sidebarWidth)+'px');
				$("#map").animate({left:(sidebarWidth)+'px'},500);
				__tAdaptMapWidth = setTimeout('$("#map").css("width","'+(maxWidth-sidebarWidth)+'px");',2000);
				$("#view-up").css("visibility","hidden");
			}
		}


		$("#layer-dialog-button").css("visibility","hidden");

		if ( 0 && !__fFullScreenList ){
			if ( !document.getElementById("sidebar-delete-button") ){
				var deleteButton = document.createElement("div");
				deleteButton.setAttribute("id","sidebar-delete-button");
				var szHTML = "<a href=\"javascript:ixmaps.jsapi.setView('map');\"><img src='resources/icons/delete.png' height='22' style=\"position:absolute;top:10px;right:10px;\" /></a>";
				deleteButton.innerHTML = szHTML;
				$("#sidebar")[0].appendChild(deleteButton);
			}
		}

		try{
			$('#story-board').css("height",String($('#story-board').parent().height()-$('#story-board').offset().top+25)+"px");
			ixmaps.touchScroll("story-board");
		}catch (e){}

	};


	/*
	 * show map and list (sidebar)
	 */
	__setBoth = function(){

		var headerHeight = $("#hdr").height();
		var footerHeight = $("#ftr").height();
		var maxHeight = window.innerHeight - headerHeight - footerHeight;
		var maxWidth  = window.innerWidth;

		$("#content").css("height",(maxHeight-1)+"px");
		$("#content").css("width",(maxWidth)+"px");
		$("#content").css("overflow","hidden");

		if ( 1 ){
			var sidebarWidth = Math.max(250,maxWidth*0.3);
			$("#sidebar").css("position","absolute");
			$("#sidebar").css("top",(0)+"px");
			//$("#sidebar").css("left",(maxWidth-sidebarWidth)+"px");
			$("#sidebar").css("width",sidebarWidth+"px");
			$("#sidebar").css("height",maxHeight+"px");
			$("#sidebar").animate({left:(maxWidth-sidebarWidth)+'px'},500);

			$("#map").css("top",(0)+"px");
			$("#map").css("left","0px");
			$("#map").animate({width:(maxWidth-sidebarWidth)+'px'},500);
			//$("#map").css("width",(maxWidth-sidebarWidth)+"px");
			$("#map").css("height",(maxHeight)+"px");


		}else{
			$("#map").css("width","100%");
			$("#map").css("height",maxHeight*0.66+"px");
			$("#sidebar").css("position","relative");
			$("#sidebar").css("top","0px");
			$("#sidebar").css("left","0px");
			$("#sidebar").css("width","100%");
			$("#sidebar").css("height","100%");
		}

		$("#layer-dialog-button").css("visibility","hidden");

		try{
			$('#story-board').css("height",String($('#story-board').parent().height()-$('#story-board').offset().top+25)+"px");
			ixmaps.touchScroll("story-board");
		}catch (e){}

		ixmaps.jsapi.checkResize();
	};

	/**
	 * open/close the layer select dialog (menu like)  
	 * @param flag 'show' or 'hide'
	 * @type void
	 */
	ixmaps.jsapi.layerDialog = function(flag){

		if ( $("#layer-dialog").css("display") == "block" ){
			flag = 'hide';
		}
		if ( flag && flag == 'hide' ){
			$("#layer-dialog").hide('slide', {direction: 'right'}, 150);
		}else{
			$('#layer-dialog').load('./layer.html'+' #layerlist', function(response, status, xhr) {
				  if (status == "error") {
					var msg = "Sorry but there was an error: ";
					alert(msg + xhr.status + "\n" + xhr.statusText);
				  }
				$("#layer-dialog").css("visibility","visible");
				$("#layer-dialog").css("height","100%");
				$("#layer-dialog").hide();
				$("#layer-dialog").show('slide', {direction: 'right'}, 150);
			});
		}
	};

})();

/**
 * end of namespace
 */
/* ...................................................................* 
 *  scroll div workaround for adroid browser < 4.0                   * 
 * ...................................................................*/ 

window.ixmaps = window.ixmaps || {};
(function() {

	/*
	 * local helper function
	 */

	var __TS_lastTouchY = 0;
	var __TS_lastTouchOff = 0;
	var __TS_lastTouchElement = 0;

	__TS_isTouchDevice = function(){
		try{
			document.createEvent("TouchEvent");
			return true;
		}catch(e){
			return false;
		}
	};

	/*
	 * continue scrolling a while
	 */
	__TS_touchScrollTail = function(){
		if ( __TS_lastTouchElement && __TS_lastTouchOff ){
			__TS_lastTouchElement.scrollTop -= __TS_lastTouchOff;
			var dOff = Math.abs(Math.round(__TS_lastTouchOff/3));
			if ( dOff ){
				__TS_lastTouchOff -= __TS_lastTouchOff<0?-dOff:dOff;
				setTimeout("__TS_touchScrollTail()",20);
			}else{ 
				var mouseupEvent = document.createEvent ("MouseEvent");
				mouseupEvent.initMouseEvent ("mouseup", true, true, window, 0, 
											event.screenX, event.screenY, event.clientX, event.clientY, 
											event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
											0, null);
                __TS_lastTouchElement.dispatchEvent (mouseupEvent);
			}
		}
	};

	/*
	 * exported:
	 * apply scroll workaround to one HTML element (div) given by its id
	 * @param id the id of the element (div)
	 */
	ixmaps.touchScroll = function(id){
		if(__TS_isTouchDevice()){ //if touch events exist...
			var el=document.getElementById(id);
			var scrollStartPos=0;

			document.getElementById(id).addEventListener("touchstart", function(event) {
				scrollStartPos=this.scrollTop+event.touches[0].pageY;
				__TS_lastTouchY = event.touches[0].pageY;
				//event.preventDefault();
			},false);

			document.getElementById(id).addEventListener("touchmove", function(event) {
				this.scrollTop=scrollStartPos-event.touches[0].pageY;
				__TS_lastTouchOff = event.touches[0].pageY-__TS_lastTouchY;
				__TS_lastTouchY = event.touches[0].pageY;
				event.preventDefault();
			},false);

			document.getElementById(id).addEventListener("touchend", function(event) {
				setTimeout("__TS_touchScrollTail()",20);
				__TS_lastTouchElement = this;
				//event.preventDefault();
			},false);
		}
	};

	/*
	 * exported:
	 * test if device is touch device
	 * @type boolean
	 * @return true / false
	 */
	ixmaps.isTouchDevice = function(){
		return __TS_isTouchDevice();
	};

})();

/**
 * end of namespace
 */

// -----------------------------
// EOF
// -----------------------------
