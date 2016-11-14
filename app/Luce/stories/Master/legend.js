/**********************************************************************
 theme_legend.js

$Comment: provides JavaScript for ixmaps UI theme legends in HTML
$Source : theme_legend.js,v $

$InitialAuthor: guenter richter $
$InitialDate: $
$Author: guenter richter $
$Id: theme_legend.js 8 2015-02-10 08:14:02Z Guenter Richter $

Copyright (c) Guenter Richter
$Log: theme_legend.js,v $
**********************************************************************/

window.ixmaps = window.ixmaps || {};
window.ixmaps.legend = window.ixmaps.legend || {};

(function() {

	ixmaps.legend.legendA = [];

	var szControls = "small";
	var szSvgLegendFlag = "nolegend";
	var szHTMLLegendFlag = "1";
	var szLegendId = null;
	var fLegendDialog = false;
	var fOnRemove = false;
	var fLegendCompact = true;
	var fButton = true;

	// -------------
	// little helper
	// -------------

	ixmaps.legend.sortList = function(a,b){
		if ( a.count < b.count){
			return 1;
		}
		return -1;
	};

	ixmaps.toggleValueDisplay = function(szThemeId){
		var szThemeStyle = ixmaps.getThemeStyleString(szThemeId);
		if ( szThemeStyle && szThemeStyle.match(/VALUES/) ){
			ixmaps.changeThemeStyle(szThemeId,'type:VALUES;','remove');
		}else{
			ixmaps.changeThemeStyle(szThemeId,'type:VALUES;','add');
			ixmaps.changeThemeStyle(szThemeId,'type:NOINLINETEXT;','add');
			ixmaps.changeThemeStyle(szThemeId,'type:VALUEBACKGROUND;','add');
		}
	};

	ixmaps.changeThemeDynamic = function(szThemeId,szParameter,szFactor){

		var szThemeStyle = ixmaps.getThemeStyleString(szThemeId);

		if ( szThemeStyle.match(/CHOROPLETHE/) ){
			switch (szParameter) {
				case "amplify":
					ixmaps.changeThemeStyle(szThemeId,'dopacitypow:'+String(1/Number(szFactor)),'factor');
					break;
				case "scale":
					ixmaps.changeThemeStyle(szThemeId,'dopacityscale:'+String(szFactor),'factor');
					break;
				case "opacity":
					ixmaps.changeThemeStyle(szThemeId,'opacity:'+String(szFactor),'factor');
					break;
			}
		}else
		if ( szThemeStyle.match(/GRIDSIZE/) || szThemeStyle.match(/AUTOSIZE/) ){
			switch (szParameter) {
				case "amplify":
					ixmaps.changeThemeStyle(szThemeId,'gridwidth:'+String(szFactor),'factor');
					break;
				case "scale":
					ixmaps.changeThemeStyle(szThemeId,'scale:'+String(szFactor),'factor');
					break;
				case "opacity":
					ixmaps.changeThemeStyle(szThemeId,'fillopacity:'+String(szFactor),'factor');
					break;
				case "aggregation":
					ixmaps.changeThemeStyle(szThemeId,'gridwidth:'+String(szFactor),'factor');
					break;
			}
		}else{
			switch (szParameter) {
				case "amplify":
					if ( szThemeStyle.match(/BAR/) || szThemeStyle.match(/PLOT/) || szThemeStyle.match(/STAR/) ){
						ixmaps.changeThemeStyle(szThemeId,'rangescale:'+String(szFactor),'factor');
					}else{
						ixmaps.changeThemeStyle(szThemeId,'normalsizevalue:'+String(1/Number(szFactor)),'factor');
					}
					break;
				case "scale":
					ixmaps.changeThemeStyle(szThemeId,'scale:'+String(szFactor),'factor');
					break;
				case "opacity":
					ixmaps.changeThemeStyle(szThemeId,'fillopacity:'+String(szFactor),'factor');
					break;
				case "aggregation":
					ixmaps.changeThemeStyle(szThemeId,'gridwidth:'+String(szFactor),'factor');
					break;
			}
		}
	};


	// -------------------------------------- //

	ixmaps.legend.makeColorLegendHTML = function(szId,szLegendId,szMode){

		fLegendCompact = (szMode && szMode == "compact")?true:false;

		szLegendId = szLegendId || "generic";

		var themeObj = ixmaps.getThemeObj(szId);

		if ( fLegendCompact && !themeObj.szFlag.match(/EXACT/) && themeObj.partsA.length >= 5 && !( !(themeObj.szFlag.match(/SEQUENCE/) && !themeObj.szFlag.match(/SYMBOL/)) && themeObj.szLabelA && themeObj.szLabelA.length ) ){
			return ixmaps.legend.makeColorLegendHTMLCompact(szId,szLegendId);
		}

		var colorA  = themeObj.colorScheme;
		var labelA  = themeObj.szLabelA;

		if ( !labelA ){
			labelA = new Array();
			var szUnit = themeObj.szUnit || "";
			szUnit = szUnit.replace(/ /g,'&nbsp;');
			var len = Math.min(colorA.length,themeObj.partsA.length);
			for ( var i=0; i<len; i++){
				var szPart = parseFloat(themeObj.partsA[i].min).toFixed(2)+szUnit+" ... "+parseFloat(themeObj.partsA[i].max).toFixed(2)+szUnit;
				labelA.push(szPart);
			}
		}

		var szHtml = "";

		// theme filter
		if (themeObj.szFilter){
			szHtml += "<p class='legend-description' style='margin-top:0em;background:#ddd'>Filter: "+themeObj.szFilter+"</p>";
		}

		// color legend = table
		szHtml += "<table id='legend-classes"+szLegendId+"' class='theme-legend' >";

		var max = Math.min(200,Math.min(colorA.length,labelA.length));

		// get exact count from themeObj
		var count = "";

		sortA = [];
		for ( var i=0; i<max; i++){
			if(  themeObj.szFlag.match(/SUM/) || 
				(themeObj.szFlag.match(/EXACT/) && !themeObj.szFlag.match(/SIZE/)) ){
				if ( typeof(themeObj.partsA[i].nSum) != "undefined" ){
					sortA.push({index:i,color:(themeObj.szFlag.match(/INVERT/)?(max-i-1):i),count:(themeObj.partsA[i].nSum)});
				}else{
					sortA.push({index:i,color:(themeObj.szFlag.match(/INVERT/)?(max-i-1):i),count:(themeObj.exactSizeA[i]||themeObj.exactCountA[i]||themeObj.nMeanA[i]||((themeObj.szFieldsA.length > 1)?themeObj.nOrigSumA[i]:null))});
				}
			}else{
				sortA.push({index:i,color:(i),count:(themeObj.exactSizeA[i]/themeObj.exactCountA[i])});
			}
		}
		if( themeObj.szFlag.match(/EXACT/) && !themeObj.szFlag.match(/NOSORT/) ){
			sortA.sort(this.sortList);
		}

		// colorscheme
		//
		var fColorScheme = false; 
		var fCountBars = false;
		var nMaxCount = 0;

		for ( var i=0; i<max; i++){
			if ( colorA[0] !=  colorA[i] ){
				fColorScheme = true; 
			}
			if ( sortA[i].count ){
				nMaxCount = Math.max(nMaxCount,sortA[i].count);
				fCountBars = true;
			}
		}
		if ( fColorScheme &&
			( ( themeObj.partsA.length > 2)		||
				themeObj.szLabelA				||
				themeObj.szFlag.match(/EXACT/)	||
				themeObj.szRangesA.length ) ){

			// get exact count from themeObj
			var count = "";
			for ( var i=0; i<max; i++){

				if ( (fCountBars || themeObj.szFlag.match(/FILTER/) )&& !sortA[i].count ){
					continue;
				}
				if ( themeObj.szShowParts ){
					var fShow = false;
					for ( p in themeObj.szShowPartsA ){
						if ( themeObj.szShowPartsA[p] == i ){
							fShow = true;
						}
					}
					if ( !fShow ){
						continue;
					}
				}

				count = ixmaps.__formatValue(sortA[i].count,2,"BLANK"); //sortA[i].count?""+sortA[i].count+"":"";
				if ( (typeof(themeObj.markedClass) != "undefined") && (themeObj.markedClass == sortA[i].index) ){
					szHtml += "<tr valign='top' class='theme-legend-item-selected'>";
				}else{
					szHtml += "<tr valign='top' >";
				}

				szHtml += "<td><a class='theme-button' href='#' title='click to see'><span onclick='javascript:ixmaps.markThemeClass(\""+szId+"\","+sortA[i].color+");event.stopPropagation();return false;' style='background:"+colorA[sortA[i].color]+"'>";

				if ( fCountBars ){
					//for ( var w=0; w<Math.ceil(Math.pow(sortA[i].count,0.5)/10); w++ ){
					for ( var w=0; w<Math.ceil(Math.pow(sortA[i].count,0.5)*(20/Math.pow(nMaxCount,0.5))); w++ ){
						szHtml += "&nbsp;";
					}
				}else{
					if ( themeObj.szFlag.match(/DOPACITY/) ){
						szHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
						szHtml += "</span><span onclick='javascript:ixmaps.markThemeClass(\""+szId+"\","+sortA[i].color+");event.stopPropagation();return false;' style='background:"+colorA[sortA[i].color]+";opacity:0.75;'>"; 
						szHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
						szHtml += "</span><span onclick='javascript:ixmaps.markThemeClass(\""+szId+"\","+sortA[i].color+");event.stopPropagation();return false;' style='background:"+colorA[sortA[i].color]+";opacity:0.5;'>"; 
						szHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					}else{
						szHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					}

				}

				var szLabel = labelA[sortA[i].index];
				var szCount = sortA[i].count?("<td class='theme-legend-count' style='text-align:right;padding-left:1em;color:#444'>"+count+themeObj.szUnit.replace(/ /g,'&nbsp;')+"</td>"):"";

				szHtml += "</span></td><td class='theme-legend' style='max-width:"+(szCount.length?"200px":"300px")+"'><a class='theme-button' href='#' title='click to see'><span title='"+szLabel+"' style='color:#888888'><span onclick='javascript:ixmaps.markThemeClass(\""+szId+"\","+sortA[i].index+");event.stopPropagation();return false;' >"+szLabel+"</span></span></a></td>"+szCount+"</tr>";
			}

		}else if (0){
			szHtml += "<tr valign='top'><td><span onclick='javascript:ixmaps.hideThemeClass(\""+szId+"\","+0+")'  style='background:"+colorA[0]+";font-size:0.7em;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td><span style='padding-left:5px'>"+labelA[0]+"</span></td><td> &nbsp;&nbsp;|</td><td><span style='padding-left:5px'>"+labelA[labelA.length-1]+"</span></td></tr>";
		}else{
			if ( ((themeObj.nMinValue||themeObj.nMin) != 1) || ((themeObj.nMaxValue||themeObj.nMax) != 1) ){
				szHtml += "<tr valign='top'><td><span onclick='javascript:ixmaps.hideThemeClass(\""+szId+"\","+0+")'  style='background:"+colorA[0]+";font-size:0.7em;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td><span style='padding-left:5px'>"+ ixmaps.__formatValue((themeObj.nMinValue||themeObj.nMin),2,"BLANK")+"</span></td><td> &nbsp;...</td><td><span style='padding-left:5px'>"+ ixmaps.__formatValue((themeObj.nMaxValue||themeObj.nMax),2,"BLANK")+"</span></td></tr>";
			}else{
				szHtml += "<tr valign='top'><td><span onclick='javascript:ixmaps.hideThemeClass(\""+szId+"\","+0+")'  style='background:"+colorA[0]+";font-size:0.7em;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td><span style='padding-left:5px'>"+ (themeObj.szLabelA || themeObj.szFields) +"</td></tr>";
			}
		}

		szHtml += "</table>";

		return szHtml;
	};

	ixmaps.legend.makeColorLegendHTMLCompact = function(szId,szLegendId){

		szLegendId = szLegendId || "generic";

		var themeObj = ixmaps.getThemeObj(szId);

		var colorA  = themeObj.colorScheme;
		var labelA  = themeObj.szLabelA;

		var szHtml = "";

		// theme filter
		if (themeObj.szFilter){
			szHtml += "<p class='legend-description' style='margin-top:0em;background:#ddd'>Filter: "+themeObj.szFilter+"</p>";
		}
		// color legend 
		szHtml += "<table id='legend-classes"+szLegendId+"' class='theme-legend' cellspacing='0' cellpadding='1' style='line-height:0.9em;color:#888888;margin-top:0.5em'>";

		var nRows = themeObj.szFlag.match(/DOPACITY/)?3:1;
		for ( var row=0; row<nRows; row++){
			szHtml += "<tr valign='top' >";
			for ( var i=0; i<colorA.length; i++){
				var szMinMax = "";
				var ix = themeObj.szFlag.match(/XXX/)?(colorA.length-i-1):i;
				if ( themeObj.partsA[ix] && themeObj.partsA[ix].min && themeObj.partsA[ix].max ){
					var szUnit = themeObj.szUnit || "";
					szUnit = szUnit.replace(/ /g,'&nbsp;');
					szMinMax = parseFloat(themeObj.partsA[ix].min).toFixed(0)+szUnit+" ... "+parseFloat(themeObj.partsA[ix].max).toFixed(0)+szUnit;
				}
				szHtml += "<td><a class='theme-button' href='#' title='"+szMinMax+" click to see'><span onclick='javascript:ixmaps.markThemeClass(\""+szId+"\","+ix+");event.stopPropagation();return false;' style='background:"+colorA[ix]+";opacity:"+(1/(row+1))+"'>";
				var nCount = Math.min(70/colorA.length,8);
				if ( (typeof(themeObj.markedClass) != "undefined") && (themeObj.markedClass == ix) ){
					nCount -= 2;
				}
				for ( ii=0; ii<nCount; ii++){
					szHtml += "&nbsp;";
				}
				if ( (typeof(themeObj.markedClass) != "undefined") && (themeObj.markedClass == ix) ){
					szHtml += "<span style='font-size:2em;line-height:0;vertical-align:-0.35em'>*</span>";
				}
				szHtml += "</td></a>";
			}
			szHtml += "</tr>";
		}

		szHtml += "<tr valign='bottom' style='font-size:0.9em'>";
		szHtml += "<td colspan='"+(colorA.length-1)+"' >"+ixmaps.__formatValue(themeObj.nMin,2,"BLANK")+" "+themeObj.szUnits+"</td>";
		szHtml += "<td>"+ixmaps.__formatValue(themeObj.nMax,2,"BLANK")+" "+themeObj.szUnits+"</td>";
		szHtml += "</tr>";

		szHtml += "</table>";

		return szHtml;
	};

	// ---------------------------------------------------
	// format number display 
	// ---------------------------------------------------

	/**
	 * convert a number into a formatted string; if the number > 1000 it will be formatted like 1.023.234 
	 * @param nValue the number to format
	 * @param nPrecision the wanted decimal points 
	 * @param szFlag "CEIL" or "FLOOR" (round either up or down)
	 */
	ixmaps.__formatValue = function(nValue,nPrecision,szFlag){

		nValue = Number(nValue);

		if ( !isFinite(nValue) || !isFinite(nPrecision) ){
			return String(nValue);
		}
		if ( nValue == 0 ){
			return String(nValue);
		}

		if ( !nPrecision ){
			nPrecision = 0;
		}
		nPrecision = Math.max(0,nPrecision);

		// GR 02.12.2011 make that low values do not collapse to 0
		if ( (nValue > 0.0000001) && (nPrecision > 0) ){
			while ( nValue.toFixed(nPrecision-1) == 0 ){
				nPrecision++;
			}
		}
		
		// GR 11.03.2009 fix precision before CEIL or FLOOR to avoid JS errors eg. 0.0000000000003
		nValue = nValue.toFixed(nPrecision+1);

		nClipDecimal = Math.pow(10,nPrecision);
		if (szFlag && szFlag.match(/CEIL/)){
			nValue = Math.ceil(nValue*nClipDecimal)/nClipDecimal;
		}else
		if (szFlag && szFlag.match(/FLOOR/)){
			nValue = Math.floor(nValue*nClipDecimal)/nClipDecimal;
		}
		else{
			nValue = Math.round(nValue*nClipDecimal)/nClipDecimal;
		}
		// format numbers > 1000
		if ( 0 && (nValue < 1000) ){
			return String(nValue);
		}
		else {
			var szDecimals = String(nValue);
			if (szDecimals.match(/\./) ){
				szDecimals = szDecimals.split(".")[1];
				while ( szDecimals.length < nPrecision ){
					szDecimals += '0';
				} 
			}
			else {
				szDecimals = "";
			}
			var szReturn = nValue<0?"-":"";
			var szLeading = "";

			nValue = Math.floor(Math.abs(nValue));

			// GR new flag
			if ( !szFlag || !szFlag.match(/NOBREAKS/) ){
				var nClip = 1000;
				while (nValue > nClip){
					nClip *= 1000;
				}
				nClip /= 1000;

				var nPart = 0;
				var szBreak   = " ";
				while (nClip >= 1000){
					nPart = Math.floor(nValue/nClip);
					szReturn += __maptheme_formatpart(nPart,szLeading);
					nValue = nValue%nClip;
					nClip /= 1000;
					if ( nPart ){
						szLeading = "0";
						if (szFlag && szFlag.match(/BLANK/)){
							szBreak   = "&nbsp;";
						}else{
							szBreak   = ".";
						}
					}
					szReturn += szBreak;
				}
			}

			szReturn += __maptheme_formatpart(nValue,szLeading);

			if ( !szReturn.length || (szReturn == "-") ){
				szReturn += "0";
			}

			if ( szDecimals.length && szDecimals != "00" ){
				szReturn += ((szFlag && szFlag.match(/BLANK/))?".":",") + szDecimals;
			}
		}
		return	szReturn;
	}
	/**
	 * helper to format a number from 0 to 999 into a string with leading character (sample 32 -> "032" )
	 * @param nPart the number to format
	 * @param szLeading the leading character to insert if necessary 
	 */
	function __maptheme_formatpart(nPart,szLeading){
		if (!szLeading){
			szLeading = "";
		}
		var szPart = "";
		if (nPart<100){
			szPart += szLeading;
		}
		if (nPart<10){
			szPart += szLeading;
		}
		if (nPart==0){
			szPart += szLeading;
		}
		else{
			szPart += String(nPart);
		}
		return szPart;
	}

	// must clear some chars to get it through the .dialog precedures 
	var __getLegendId = function(szId){
		return szId.replace(".","_");
	};

	// ---------------------------------------------------
	// global legend functions   
	// ---------------------------------------------------

	// redraw or hide legend  
	__switchLegendMode = function(){
		ixmaps.fLegendVisible = true;
		__showLegendDialog();		
	};


	// ----------------------
	// make chart type menu 
	// ----------------------

	var szChartMenuId = null;
	var fChartMenuDialog = false;
	var fChartMenuVisible = true;

	ixmaps.makeChartMenueHTML = function(szId){

		// make <div> + <svg> to receive the chart menu (in svg)
		var szHtml = "";
		szHtml += "<div style='font-size:0.6em;margin-bottom:0.5em'>select chart type:</div>";
		szHtml += "<div id='menuDiv' style='height:300px;width:260px;overflow:auto'><div><svg width='240' height='2000' viewBox='0 0 4800 40000'><g id='getchartmenutarget'></g></svg></div></div>";

		// create dialog
		__showChartDialog(szHtml,ixmaps.themeObj.szTitle);

		// call theme method to draw the charts
		var szTypelistA = ixmaps.themeObj.getChartTypeMenu($("#getchartmenutarget")[0],null,240);

		// create click map to select the chart for the theme
		szHtml = "<div style='position:relative;top:-2010px;'>";
		for ( i in szTypelistA ){
			if ( i%4 == 0 ){
				szHtml += "<div style='clear:both'>";
			}
			szHtml += "<a href=\"javascript:ixmaps.changeThemeStyle(null,'type:"+szTypelistA[i]+"','set');\"><div style='float:left;height:60px;width:60px;'></div></a>";
		}
		szHtml += "</div>";

		$("#menuDiv").append(szHtml);
	};

	__showChartDialog = function(szHtml,szTitle){

		ixmaps.szChartHtml  = szHtml  || ixmaps.szChartHtml  || "";
		ixmaps.szChartTitle = szTitle || ixmaps.szChartTitle || "";

		if ( !fChartMenuVisible ){
			return;
		}
	
		// create dialog (oversized) to host the ChartMenu
		//
		if ( !fChartMenuDialog ){
			ixmaps.openDialog(null,'chartmenue','',ixmaps.szChartTitle,'auto',800,500);
			fChartMenuDialog = true;
		}

		// set content and resize
		//
		$("#chartmenue").html(ixmaps.szChartHtml);

		$("#chartmenue").parent().css("width","300px");
		$("#chartmenue").parent().css("height","300px");

		$("#chartmenue").dialog({
		  close: function( event, ui ) {
				fChartMenuDialog = false;
				$("#chartmenue").remove();
			}
		});
	};


	/**
	 * intercept theme creation, to make the theme legend
	 */

	ixmaps.htmlgui_onDrawTheme = function(szId){ 

		var themeObj = ixmaps.getThemeObj(szId);
		if ( !themeObj ) {
			return;
		}
		// in case szId is not giveb, set it from themeObj
		szId = szId || themeObj.szId;	

		var	szHtml = "";
		szHtml += "<h3 id='map-legend-title'>"+themeObj.szTitle||"Color Legend"+"</h3>";
		szHtml += "<h4 id='map-legend-snippet'>"+(themeObj.szSnippet||"")+"</h4>";

		szHtml += "<div id='map-legend-body'>";
		szHtml += "<div style='max-height:300px;overflow:auto'>";
		szHtml += ixmaps.legend.makeColorLegendHTML(szId,"generic","compact");
		szHtml += "</div>";
		szHtml += "<br>";

		//szHtml += ixmaps.legend.makeLegendButtons(szId,"generic");
		//szHtml += "<br>";

		if( themeObj.szDescription ){
			szHtml += "<p>"+(themeObj.szDescription||"")+"</p>";
			}
	
		szHtml += "</div>";
		szHtml += "<div id='map-legend-footer'>";

		szHtml += ixmaps.htmlgui_onLegendFooter ? ixmaps.htmlgui_onLegendFooter(szId,themeObj,ixmaps.embeddedApi.embeddedApi.getThemeDefinitionObj(szId)) : "";
			
		szLegendPane = "<div id='map-legend-pane' class='map-legend-pane'>"+
						 "<a href='javascript:__toggleLegendPane()'>"+
						 "<div style='position:absolute;top:0em;right:0px;width:2em;float:right;z-index:1;font-size:1em;padding:0.3em 0.5em;border:solid #ddd 1px'>"+
						   "<i id='map-legend-pane-switch' class='fa fa-chevron-up' style='color:black' title='close' tabindex='-1'></i>"+
						 "</div>"+
						 "</a>"+ 
						 "<div class='container'>"+
						   "<div class='row'>"+
						     "<div class='col-lg-12 col-md-12 col-xs-0'>"+
							   "<div id='map-legend-content'>"+szHtml+"</div>"+
							 "</div>"+
						  "</div>"+
						"</div>";
		
		$("#map-legend").html(szLegendPane);

		$("#map-legend").slideDown();

		__actualThemeId = szId;

		__switchLegendPanes();
	};

	// intercept theme deletion, to remove active themes mark
	ixmaps.htmlgui_onRemoveTheme = function(szId){

		if ( !__actualThemeId || (__actualThemeId == szId) ){
			$("#map-legend-content").html("");
			$("#map-legend").hide();
		}
	};

	/**
	 * display/hide the legend parts
	 * @type void
	 */
	var __themeLegendState = 2;

	__switchLegendPanes = function(){
		if ( __themeLegendState == 2 ){
			$("#map-legend-body").show();
			$("#map-legend-snippet").show();
			$("#map-legend-footer").show();
			$("#map-legend-pane-switch").removeClass("fa-chevron-down");
			$("#map-legend-pane-switch").addClass("fa-chevron-up");
		}else
		if ( __themeLegendState == 1 ){
			$("#map-legend-body").show();
			$("#map-legend-snippet").show();
			$("#map-legend-footer").hide();
			$("#map-legend-pane-switch").removeClass("fa-chevron-up");
			$("#map-legend-pane-switch").addClass("fa-chevron-down");
		}else{
			$("#map-legend-body").hide();
			$("#map-legend-snippet").hide();
			$("#map-legend-footer").hide();
			$("#map-legend-pane-switch").removeClass("fa-chevron-up");
			$("#map-legend-pane-switch").addClass("fa-chevron-down");
		}
	}

	/**
	 * open/close the legend parts
	 * @type void
	 */
	__toggleLegendPane = function(){
		__themeLegendState = ++__themeLegendState%3;
		__switchLegendPanes();
	};

	/**
	 * set legend background on map type change
	 * @type void
	 */
	function changeCss(className, classValue) {
		var cssMainContainer = $('#css-modifier-container');

		if (cssMainContainer.length == 0) {
			var cssMainContainer = $('<style id="css-modifier-container"></style>');
			cssMainContainer.appendTo($('head'));
		}
		cssMainContainer.append(className + " {" + classValue + "}\n");
	}
	ixmaps.htmlgui_setMapTypeBG = function(szId){

		$("#css-modifier-container").remove();

		if ( szId.match(/dark/i) || szId.match(/black/i) ){
			changeCss(".map-legend-pane:before", "background:#333" );
		}
	};

/**
 * end of namespace
 */

})();

// -----------------------------
// EOF
// -----------------------------

