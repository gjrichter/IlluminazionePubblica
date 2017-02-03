
	// ----------------------------------------------------------------
	// temi per denominazione
	// ----------------------------------------------------------------

	var theme_luce_tipo = 
	{
		"layer": "generic",
		"field": "LAMPADA",
		"field100": "",
		"style": {
			"type": "CHART|BUBBLE|CENTER|EXACT|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
			"colorscheme": [
				"42",
				"office"],
			"shadow": "false",
			"dbtable": "themeDataObj_Luce",
			"dbtableUrl": "../../data/Pali_18_02.csv",
			"dbtableType": "csv",
			"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
			"datacache": "true",
			"itemfield": "Y|X",
			"lookupfield": "Y|X",
			"units": "",
			"scale": "0.2",
			"aggregation": "mean",
			"evidence": "isolate",
			"title": "Tipo di lampada - unità"
		}
	};

	var theme_luce_consumo = 
	{
	"layer": "generic",
	"field": "TIPO",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|CENTER|EXACT|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": [
			"17",
			"office"],
		"fillopacity": "0.28749600000000003",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " watt",
		"normalsizevalue": "1000",
		"scale": "0.22500000000000003",
		"sizefield": "CONSUMO",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Tipo di illuminazione - consumo"
		}
	};
		
	var theme_luce_consumo_colorexxx = 
	{
	"layer": "generic",
	"field": "TIPO",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|CENTER|EXACT|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": "user",
		"fillopacity": "0.28462104000000005",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " watt",
		"normalsizevalue": "1000",
		"scale": "0.15000000000000002",
		"sizefield": "CONSUMO",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Tipo di illuminazione - consumo"
		}
	};

	var theme_luce_consumo_colore = 
	{
	"layer": "generic",
	"field": "TIPO",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": "user",
		"fillopacity": "0.41843562195600015",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " unità",
		"normalsizevalue": "1000",
		"scale": "0.2",
		"aggregation": "mean",
		"evidence": "isolate",
        "showdata":"true",
		"title": "Tipo di illuminazione - consumo"
		}
	};

	var theme_luce_consumo_colore_glow = 
	{
	"layer": "generic",
	"field": "TIPO",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|GLOW|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": "user",
		"fillopacity": "0.8",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " watt",
		"normalsizevalue": "1000",
		"scale": "0.0970299",
		"sizefield": "CONSUMO",
		"titlefield": "indirizzo",
		"aggregation": "mean",
		"evidence": "isolate",
        "showdata":"true",
		"title": "Illuminazione pubblica - tipo di lampada e consumo"
		}
	};

	var theme_luce_consumo_colore_glow_lampada = 
	{
	"layer": "generic",
	"field": "LKAMPADA",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|GLOW|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": "user",
		"fillopacity": "0.8",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " watt",
		"normalsizevalue": "1000",
		"scale": "0.0970299",
		"sizefield": "CONSUMO",
		"titlefield": "indirizzo",
		"aggregation": "mean",
		"evidence": "isolate",
        "showdata":"true",
		"title": "Illuminazione pubblica - tipo di lampada e consumo"
		}
	};

	var theme_luce_consumo_colore_glow_lampada = 
	{
	"layer": "generic",
	"field": "LAMPADA",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|GLOW|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": "user",
		"fillopacity": "0.8",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " watt",
		"normalsizevalue": "1000",
		"scale": "0.0970299",
		"sizefield": "CONSUMO",
		"titlefield": "indirizzo",
		"aggregation": "mean",
		"evidence": "isolate",
        "showdata":"true",
		"title": "Illuminazione pubblica - tipo di lampada e consumo"
		}
	};

	var theme_luce_unita_colore_glow_lampada = 
	{
	"layer": "generic",
	"field": "LAMPADA",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|GLOW|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": "user",
		"fillopacity": "0.8",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " unitàt",
		"normalsizevalue": "1000",
		"scale": "0.0970299",
		"titlefield": "indirizzo",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione pubblica - tipo di lampada e consumo"
		}
	};

	var theme_luce_consumo_colore_glow_armatura = 
	{
	"layer": "generic",
	"field": "ARMATURA",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|GLOW|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": ["43","fruit"],
		"fillopacity": "0.8",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " watt",
		"normalsizevalue": "1000",
		"scale": "0.0970299",
		"sizefield": "CONSUMO",
		"titlefield": "indirizzo",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione pubblica - armature e consumo"
		}
	};

	var theme_luce_unita_colore_glow_armatura = 
	{
	"layer": "generic",
	"field": "ARMATURA",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|GLOW|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": ["43","fruit"],
		"fillopacity": "0.8",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " unità",
		"normalsizevalue": "1000",
		"scale": "0.0970299",
		"titlefield": "indirizzo",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione pubblica - armature e unità"
		}
	};

	var theme_luce_pali = 
	{
	"layer": "generic",
	"field": "PALO",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE",
		"colorscheme": ["43","office"],
		"fillopacity": "0.8",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " unità",
		"normalsizevalue": "1000",
		"scale": "0.2",
		"titlefield": "indirizzo",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione pubblica - tipo di palo"
		}
	};

	var theme_luce_consumo_colore_densita = 
	{
	"layer": "generic",
	"field": "TIPO",
	"field100": "",
	"style": {
		"type": "RECT|GRIDSIZE|CHART|SIZE|SYMBOL|CENTER|EXACT|SUM|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE|AGGREGATE|CLEAR",
		"colorscheme": "user",
		"fillopacity": "0.9",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"symbols": [
			"circle"],
		"units": " watt",
		"normalsizevalue": "1000",
		"scale": "0.09605960100000001",
		"sizefield": "CONSUMO",
		"centerpart": "max",
		"gridwidthpx": "10",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Densità del cosumo energetico"
		}
	};

	var theme_luce_consumo_colore_aggregate_I = 
	{
	"layer": "generic",
	"field": "TIPO",
	"field100": "",
	"style": {
		"type": "CHART|PIE|SIZE|EXACT|AGGREGATE|RECT|SUM|NOINLINETEXT|VALUEBACKGROUND|CLEAR",
		"colorscheme": "user",
		"fillopacity": "0.9",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " watt",
		"normalsizevalue": "100000",
		"scale": "1",
		"sizefield": "CONSUMO",
		"textcolor": "#000000",
		"gridwidth": "727.6978863112779",
		"gridwidthpx": "25",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Consumo energetico per tipo di illuminazione"
		}
	};

	var theme_luce_consumo_colore_aggregate_text = 
	{
	"layer": "generic",
	"field": "TIPO",
	"field100": "",
	"style": {
		"type": "TEXTONLY|CHART|BUBBLE|EXACT|VALUES|AGGREGATE|SUM|CLEAR|RELOCATE",
		"colorscheme": "user",
		"fillopacity": "0.41843562195600015",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": "w",
		"normalsizevalue": "100000",
		"scale": "2",
		"valuefield": "CONSUMO",
		"sizefield": "CONSUMO",
		"titlefield": "indirizzo",
		"gridwidth": "363.89274277376114",
		"gridwidthpx": "50",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione Pubblica - Consumo"
		}
	};

	var theme_luce_consumo_colore_aggregate_text_tipo = 
	{
	"layer": "generic",
	"field": "TIPO",
	"field100": "",
	"style": {
		"type": "TEXTONLY|CHART|BUBBLE|EXACT|VALUES|AGGREGATE|SUM|CLEAR|RELOCATE",
		"colorscheme": "user",
		"fillopacity": "0.41843562195600015",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": "w",
		"normalsizevalue": "100000",
		"scale": "2.25",
		"valuefield": "TIPO",
		"sizefield": "CONSUMO",
		"titlefield": "indirizzo",
		"gridwidth": "363.89274277376114",
		"gridwidthpx": "50",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione Pubblica - Consumo"
		}
	};

	var theme_luce_consumo_quadri_aggregate = 
	{
	"layer": "generic",
	"field": "QUADRO",
	"field100": "",
	"style": {
		"type": "CHART|SQUARE|EXACT|VALUES|AGGREGATE|SUM|CLEAR|RELOCATE",
		"colorscheme": [
			"549",
			"fruit"],
		"fillopacity": "0.41843562195600015",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": " watt",
		"normalsizevalue": "100000",
		"scale": "2.25",
		"valuefield": "CONSUMO",
		"sizefield": "CONSUMO",
		"textcolor":"#000000",
		"gridwidth": "91.00718005983981",
		"gridwidthpx": "50",
		"aggregationfield": "QUADRO",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione pubblica - quadri"
		}
	};

	var theme_luce_consumo_quadri_aggregate_text = 
	{
	"layer": "generic",
	"field": "QUADRO",
	"field100": "",
	"style": {
		"type": "CHART|SQUARE|EXACT|VALUES|TEXTONLY|AGGREGATE|SUM|CLEAR|RELOCATE",
		"colorscheme": [
			"549",
			"fruit"],
		"fillopacity": "0.41843562195600015",
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"units": "w",
		"normalsizevalue": "100000",
		"scale": "2.25",
		"valuefield": "CONSUMO",
		"sizefield": "CONSUMO",
		"gridwidth": "91.00718005983981",
		"gridwidthpx": "50",
		"aggregationfield": "QUADRO",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione pubblica - quadri"
		}
	};

	var theme_luce_consumo_quadri = 
	{
	"layer": "generic",
	"field": "QUADRO",
	"field100": "",
	"style": {
		"type": "CHART|BUBBLE|CENTER|EXACT|EQUIDISTANT|ZEROISVALUE|NEGATIVEISVALUE|NOLEGEND",
		"colorscheme": [
			"549",
			"fruit"],
		"shadow": "false",
		"dbtable": "themeDataObj_Luce",
		"dbtableUrl": "../../data/Pali_18_02.csv",
		"dbtableType": "csv",
		"dbtableExt": "../../app/Luce/stories/Master/databroker.js",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"sizefield": "CONSUMO",
		"units": "",
		"scale": "0.1",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Illuminazione pubblica - quadri"
		}
	};

	var theme_quadri_portata = 
	{
	"layer": "generic",
	"field": "PORTATA",
	"field100": "",
	"style": {
		"type": "CHART|LABEL|ZEROISVALUE|NEGATIVEISVALUE|VALUES",
		"colorscheme": [
			"10",
			"#FFEDA0",
			"#800026",
			"3colors",
			"#FC5E2A"],
		"shadow": "false",
		"dbtable": "themeDataObj_Quadri",
		"dbtableUrl": "../../data/quadri.csv",
		"dbtableType": "csv",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"showdata": "true",
		"units": "Amp",
		"scale": "2",
		"valuefield": "PORTATA",
		"titlefield": "ID",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Quadri - portata"
		}
	};
	var theme_quadri_portata_aggregated = 
	{
	"layer": "generic",
	"field": "PORTATA",
	"field100": "",
	"style": {
		"type": "CHART|LABEL|ZEROISVALUE|NEGATIVEISVALUE|VALUES|AGGREGATE|SUM",
		"colorscheme": [
			"10",
			"#FFEDA0",
			"#800026",
			"3colors",
			"#FC5E2A"],
		"shadow": "false",
		"dbtable": "themeDataObj_Quadri",
		"dbtableUrl": "../../data/quadri.csv",
		"dbtableType": "csv",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"showdata": "true",
		"units": "Amp",
		"scale": "2",
		"valuefield": "PORTATA",
		"sizefield": "PORTATA",
		"titlefield": "ID",
		"gridwidth": "363.962323270471",
		"gridwidthpx": "50",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Quadri - portata"
		}
	};

	var theme_quadri_accensione = 
	{
	"layer": "generic",
	"field": "TIPO_ACCEN",
	"field100": "",
	"style": {
		"type": "CHART|LABEL|EXACT|ZEROISVALUE|NEGATIVEISVALUE|VALUES",
		"colorscheme": [
			"1",
			"fruit"],
		"shadow": "false",
		"dbtable": "themeDataObj_Quadri",
		"dbtableUrl": "../../data/quadri.csv",
		"dbtableType": "csv",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"showdata": "true",
		"units": "",
		"scale": "2",
		"valuefield": "ID",
		"titlefield": "ID",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Quadri - portata"
		}
	};

	var theme_quadri_regolatore = 
	{
	"layer": "generic",
	"field": "REGOLATORE",
	"field100": "",
	"style": {
		"type": "CHART|LABEL|EXACT|ZEROISVALUE|NEGATIVEISVALUE|UNDEFINEDISVALUEVALUES",
		"colorscheme": [
			"14",
			"pastel"],
		"shadow": "false",
		"dbtable": "themeDataObj_Quadri",
		"dbtableUrl": "../../data/quadri.csv",
		"dbtableType": "csv",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"showdata": "true",
		"units": "",
		"scale": "2",
		"valuefield": "REGOLATORE",
		"titlefield": "ID",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Quadri - portata"
		}
	};

	var theme_quadri_tutta_la_notte = 
	{
	"layer": "generic",
	"field": "TUTTA_NOTT",
	"field100": "",
	"style": {
		"type": "CHART|LABEL|EXACT|ZEROISVALUE|NEGATIVEISVALUE|UNDEFINEDISVALUE|VALUES",
		"colorscheme": [
			"RGB(207,255,51)",
			"RGB(221,0,0)",
			"#dddddd"],
		"values":[
		    "SI",
		    "NO",
		    "undefined"
		    ],	
		"shadow": "false",
		"dbtable": "themeDataObj_Quadri",
		"dbtableUrl": "../../data/quadri.csv",
		"dbtableType": "csv",
		"datacache": "true",
		"itemfield": "Y|X",
		"lookupfield": "Y|X",
		"showdata": "true",
		"units": "",
		"scale": "2",
		"valuefield": "TUTTA_NOTT",
		"titlefield": "ID",
		"aggregation": "mean",
		"evidence": "isolate",
		"title": "Quadri - portata"
		}
	};