
var registerChart_Global = [];

// scriptChart.js

function resolvChart2(data, options) { 
	/*
		options: {
			category: { 		-- Parametro que indica a categoria do grafico
				text: ''		-- Texto do parametro
				param: ''		-- Parametro do objeto data correspondente
			}
			value: { 			-- Parametro que indica o valor do grafico
				text: ''		-- Texto do parametro
			}
			serie: {
				param: ''		-- Parametro do objeto data correspondente
			}
			descForm: '' 		-- Parametro de identificação
			padination: num 	-- Trazer tantos valores pré definidos na tela
		}
	*/

	// var random;
	// do {
	// 	random = parseInt( Math.random() * 100000 );
	// } while (registerChart_Global.indexOf(random) != -1);
	if (registerChart_Global.indexOf(options.descForm) != -1) {
		window["chart"+options.descForm].data = data;

		if ((options.padination || '') != '' && !isNaN(options.padination)) {
			window["categoryAxis"+options.descForm].start 	= 0;
			window["categoryAxis"+options.descForm].end 	= data.length < options.padination ? 1 : options.padination / data.length;
		}

		return true;
	}

	registerChart_Global.push(options.descForm);

	var html = ''
		+ 	"<div id=\"chartdiv"+options.descForm+"\"></div>"
		+ 	"<script>"
		+ 		"var chart"+options.descForm+" = am4core.create(\"chartdiv"+options.descForm+"\", am4charts.XYChart);"
		+ 		"document.querySelectorAll('[aria-labelledby]')[document.querySelectorAll('[aria-labelledby]').length-1].style.display = 'none';"
		// + 		"var renderGrafic"+options.descForm+" = false;"
		+ 		"var valueAxis"+options.descForm+", categoryAxis"+options.descForm+", series"+options.descForm+";"
		+ 		"chart"+options.descForm+".numberFormatter.language.adapter.object._locale._decimalSeparator = ',';"
		+ 		"chart"+options.descForm+".numberFormatter.language.adapter.object._locale._thousandSeparator = '.';"
		+ 		"chart"+options.descForm+".data = " + JSON.stringify(data) + ";"
		+ 		"chart"+options.descForm+".numberFormatter.numberFormat = \"#\";"

		+ 		"categoryAxis"+options.descForm+" 									= chart.xAxes.push(new am4charts.CategoryAxis());"
		+ 		"categoryAxis"+options.descForm+".dataFields.category 				= '"+options.category.param+"';"
		+ 		"categoryAxis"+options.descForm+".title.text 						= \""+(options.category.text || '')+"\";"
		+ 		"categoryAxis"+options.descForm+".renderer.grid.template.location 	= 0;"
		+ 		"categoryAxis"+options.descForm+".renderer.minGridDistance 			= 20;"
		// + 		"categoryAxis"+options.descForm+".renderer.inversed 				= true;"
		+ 		"categoryAxis"+options.descForm+".start = 0;"
		+ 		"setTimeout(function(){categoryAxis"+options.descForm+".end = " + (data.length < options.padination ? 1 : options.padination / data.length) + ";}, 100);"


		+ 		"valueAxis"+options.descForm+" 										= chart.xAxes.push(new am4charts.ValueAxis());"
		+ 		"valueAxis"+options.descForm+".title.text 							= \""+(options.value.text || '')+"\";"

		+ 		"series"+options.descForm+" 										= chart.series.push(new am4charts.ColumnSeries());"
		+ 		"series"+options.descForm+".dataFields.valueY 						= \""+options.serie.param+"\";"
		+ 		"series"+options.descForm+".dataFields.categoryX 					= \""+options.category.param+"\";"
		+ 		"series"+options.descForm+".columns.template.fill 					= am4core.color(\"lightblue\");"
		+ 		"series"+options.descForm+".tooltip.dy 								= -8;"
		+ 		"series"+options.descForm+".tooltip.label.interactionsEnabled 		= true;"
		+ 		"series"+options.descForm+".tooltip.keepTargetHover 				= false;"
		+ 		"series"+options.descForm+".sequencedInterpolation 					= true;"
		+ 		"series"+options.descForm+".defaultState.interpolationDuration 		= 1500;"
		+ 		"series"+options.descForm+".columns.template.strokeOpacity 			= 0;"
		// + 		"series"+options.descForm+".dataFields.valueY 						= "TOTAL_INCIDENTES";"
		// + 		"series"+options.descForm+".dataFields.categoryX 					= 'DS_TIPO_INCIDENTE';"
		// + 		"series"+options.descForm+".dataFields.TOTAL_INCIDENTES_FORM 		= \"TOTAL_INCIDENTES_FORM\";"
		// + 		"series"+options.descForm+".dataFields.TOTAL_INCIDENTES_FORM 		= \"TOTAL_INCIDENTES\";"
		// + 		"series"+options.descForm+".name 									= "Número de Incidentes";"
		// + 		"series"+options.descForm+".tooltip.pointerOrientation 				= "vertical";"


		+ 		"chart"+options.descForm+".cursor 									= new am4charts.XYCursor();" // indica onde o curso está com cordenadas XY
		// + 		"chart"+options.descForm+".legend 									= new am4charts.Legend(); // acrecenta legenda no grafico"
		+ 		"chart"+options.descForm+".scrollbarY 								= new am4core.Scrollbar();"
		+ 		"var scrollbarX"+options.descForm+" 								= new am4core.Scrollbar();"
		+ 		"chart.scrollbarX"+options.descForm+" 								= scrollbarX;"
		+ 		"chart.scrollbarX"+options.descForm+".parent 						= chart.bottomAxesContainer;" // setar scroll do eixo x embaixo
		+ 		"chart.scrollbarX"+options.descForm+".thumb.minWidth 				= 100;"
		+ 		"chart"+options.descForm+".cursor.behavior 							= \"zoomX\";"

		+ 		"var labelBullet"+options.descForm+" 								= new am4charts.LabelBullet();"
		+ 		"labelBullet"+options.descForm+".label.text 						= \"{valueY}\";" // .value.formatNumber('#.')
		+ 		"labelBullet"+options.descForm+".strokeOpacity 						= 0;"
		+ 		"labelBullet"+options.descForm+".stroke 							= am4core.color(\"#dadada\");"
		+ 		"labelBullet"+options.descForm+".dy 								= -15;"
		+ 		"labelBullet"+options.descForm+".label.truncate 					= false;"
		+ 		"series"+options.descForm+".bullets.push(labelBullet"+options.descForm+");"

		+ 	"</"+"script>"

	return html;
}
