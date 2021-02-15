
var registerChart_Global = [];

var styleGenerico_Global = { 
	alternarColor: '',
	numberFormat: '#',
	tamanhoFixo: true,
	legendaChart: false,
	separadorDecimal: ',',
	separadorMilhar: '.',
	linhaPontilhada: '5.5',
}


function resolvChart(data, options) { 
	/*
		styleGenerico = {
			alternarColor: (0|1) 					-- Colore o fundo do grafico cor sim e cor não
			numberFormat: '#' 						-- Formatação do numero
			tamanhoFixo: (0|1) 						-- Se vai ter ou não
			legendaChart: (0|1) 					-- Se vai ter ou não
			separadorDecimal: ',' 					-- Texto para separador decimal
			separadorMilhar: '.' 					-- Texto para separador de milhar
			linhaPontilhada: '5.5' 					-- Parametro de pontilhado da linha
		}

		options: {
			category: { 							-- Parametro que indica a categoria do grafico
				text: ''							-- Texto do parametro
				param: ''							-- Parametro do objeto data correspondente
				click: function(index){}			-- Click considerando a categoria inteira, passar como parametro o indice da categoria / dado
				rotation: num/graus					-- Graus de rotação da descrição da categoria
				textUpDown: (0|1) 					-- Descrição, no eixo da catergorias, colocando um para cima e outro para baixo
			}
			value: [] / { 							-- Parametro que indica o valor do grafico / Pode ser um objeto ou array de objetos
				text: ''							-- Texto do parametro
				min: num 							-- O valor minimo que começa o gráfico, geramente fica para a lib definir automatico
				max: num 							-- O valor máximo que pode chegar o gráfico, geramente fica para a lib definir automatico
				opposite: (0|1) 					-- Se vai desenhar a escala do lado oposto, padrão false
				syncWithAxis: index 				-- Se possui mais de uma escala e precisa sincronizar o valor com outra escala
				... 								-- valor é o indice da outra escala
			}
			serie: [] / { 							-- Pode ser apenas um objeto ou um array de objetos
				type: (column|line)  				-- Tipo de serie se vai montar grafico de linha ou coluna, padrão é column
				param: ''							-- Parametro do objeto data correspondente
				click: function(){} 				-- Quando clicar no gráfico
				name: '' 							-- Nome do gráfico
				color: 'lightblue' 					-- Cor que vai ter no grafico
				onlyColumn: (0|1) 					-- Deixar uma coluna emcima da outra, padrão vardadeiro
				label: (0|1) / { 					-- Caso for definido como false não irá mostrar no gráfico
					color: 'black' 					-- Cor da font da label que é motrar o valor no grafico
					align: (center|in|out)			-- Alinhamento da label se é centrelizado dentro ou fora o padrão é 'out'
					mask: '%0%' 					-- Mascara da label
				}
				ball: (0|1) / { 					-- Caso gráfico de linha sem click na serie irá desenhar somente as bolas em cada categoria
					color: '' 						-- Preenchimento da cor da bolinha
				}
				pontilhado: (0|1) 					-- Caso gráfico de linha denhar a linha pontilhada ou reta
				tooltip: '' 						-- Texto em HTML
				value: index 						-- Se possui mais de uma escala precisa informar qual escala é referente a essa serie
				... 								-- valor é o indice da escala
				hide: (0|1) 						-- Indicar se vai ocultar no gráfico, padrão false, atualizado pre e pos-render
			}
			descForm: '' 							-- Parametro de identificação
			padination: num 						-- Trazer tantos valores pré definidos na tela
			orientation: 'horizontal' 				-- Orientação do grafico, (horizontal | vertical)
			percentual: (0|1) 						-- Se o grafico vai mostrar valor percentual de 0 a 100
			width: '100%' 							-- Largura do grafico
			height: '400px' 						-- Altura do gráfico
			styleGenerico: {} 						-- Configurações genericas para todos os grafico gerados apartir
			setLegend: (0|1) 						-- Se vai mostrar legenda do grafico
			legend: { 								-- Configurações de legenda
				position: 'bottom|top|right|left' 	-- Posição onde vai ficar a legenda (padrão bottom)
				align: 'top|middle|bottom' 			-- Caso posição for right ou left pode escolher onde vai ficar  (padrão top)
			}
			title: '' 								-- Titulo do gráfico
			colors: [] 								-- Array com as cores que o grafico vai seguir para ser montado
			...										-- ex: ['blue','green','orange']
			forceSet: (0|1) 						-- Forçar montar o gráfico
		}
	*/

	var styleGenerico = $.extend({}, styleGenerico_Global, (options.styleGenerico || {}));

	if (
		(options.forceSet || '') != '' && registerChart_Global.indexOf(options.descForm) >= 0
	) { 
		registerChart_Global.splice(registerChart_Global.indexOf(options.descForm),1);
	}

	// var random;
	// do {
	// 	random = parseInt( Math.random() * 100000 );
	// } while (registerChart_Global.indexOf(random) != -1);

	data.forEach(function(dt,i) { 
		data[i].lineDash = styleGenerico.linhaPontilhada;
	});

	// Verificar se o parametro é um objeto unitario e passar para array
	['serie','value'].forEach(function(e) { 
		// options.serie, options.value
		var keys = Object.keys((options[e] || {}));
		if (keys.length > 0 && isNaN(keys[0])) 	options[e] = [options[e]];
		else if (keys.length == 0) 				options[e] = [{}];
	});

	window['indexCursorChart' + options.descForm + '_Global'] = 0;

	if (registerChart_Global.indexOf(options.descForm) != -1) { // grafico já exite

		$("#chartdiv"+options.descForm)
			.css('height', ((options.height || '') != '' ? options.height : "400px"));

		window["chart"+options.descForm].data = data;

		if ((options.padination || '') != '' && !isNaN(options.padination)) { 
			window["categoryAxis"+options.descForm].start 	= 0;
			window["categoryAxis"+options.descForm].end 	= data.length < parseInt(options.padination) ? 1 : parseInt(options.padination) / data.length;
		}

		options.serie.forEach(function(s,i) { 
			window["series"+i+options.descForm][((s.hide || '') == '' ? 'show' : 'hide')]();
		});

		if ((options.title || '') != '') { 
			window["titleChart"+options.descForm].text = options.title;
		}

		return true;
	}


	var setLegend = false; // variavel para mostrar legenda


	if ((options.orientation || '') == '') options.orientation = 'horizontal';

	registerChart_Global.push(options.descForm);

	var html = ''
		+t(0) 	+ 	`<center>`
		+t(1)	+ 		`<div id="chartdiv${options.descForm}"`
		+t(2)	+ 			` style='`
				+ 				`height:${((options.height 	|| '') != '' ? options.height 	: "400px"	)};`
				+ 				`width:	${((options.width 	|| '') != '' ? options.width 	: "100%"	)};`
				+ 			`'`
		+t(1)	+ 		`></div>`



		// ***************************************************************************************************** //
		// ** Tamanho Fixo * //
		+ ((styleGenerico.tamanhoFixo || '') == '' || (options.percentual || '') != '' ? '' : ''
			+t(1) 	+ 	`&nbsp;&nbsp;&nbsp;<label class='cursorClick'>`
			+t(2) 	+ 		`<input type="checkbox"`
					+ (options.value || []).map(function(v,i) { return ''
						+ 		` onclick='valueAxis${options.descForm+String(i)}.strictMinMax = !valueAxis${options.descForm+String(i)}.strictMinMax;'`
					})
					+ 		`>`
					+ 		`&nbsp;`
					+ 		`Tamanho fixo`
			+t(1) 	+ 	`</label>`
		)
		// ***************************************************************************************************** //




		// ***************************************************************************************************** //
		// ** Legenda Gráfico * //
		+ ((styleGenerico.legendaChart || '') == '' && options.serie.filter(function(e) { return (e.tooltip || '') != '' }).length == 0 ? '' : ''
			+t(1) 	+ 	`&nbsp;&nbsp;&nbsp;<label class='cursorClick'>`
			+t(2) 	+ 		`<input type="checkbox" checked`

					+ ` onclick='`
					+ 	options.serie.map(function(e,i) { 
							return `series${i+options.descForm}._tooltip.disabled = !series${i+options.descForm}._tooltip.disabled;`;
						}).join('')
					+ `'`

					+ 		`>`
					+ 		`&nbsp;`
					+ 		`Legenda Gráfico`
			+t(1) 	+ 	`</label>`
		)
		// ***************************************************************************************************** //
		+t(0) 	+ 	`</center>`






		// ***************************************************************************************************** //
		// ** Variavel Chart * //
		+t(0)	+ 	`<script>`
		+t(1)	+ 		`var chart${options.descForm} = null;`
		+t(1)	+ 		`chart${options.descForm} = am4core.create("chartdiv${options.descForm}", am4charts.XYChart);`
		+t(1)	+ 		`$('[aria-labelledby]')[$('[aria-labelledby]').length-1].style.display = 'none';`
		+t(1)	+ 		`var categoryAxis${options.descForm}, series${options.descForm};`
		+t()
		+t(1)	+ 		`chart${options.descForm}.numberFormatter.language.adapter.object._locale._decimalSeparator = '${options.separadorDecimal || ','}';`
		+t(1)	+ 		`chart${options.descForm}.numberFormatter.language.adapter.object._locale._thousandSeparator = '${options.separadorMilhar || '.'}';`
		+t(1)	+ 		`chart${options.descForm}.data = ${JSON.stringify(data)};`
		+t(1)	+ 		`chart${options.descForm}.numberFormatter.numberFormat = "${(styleGenerico.numberFormat || "#")}";`
		+ ((options.colors || '') == '' ? '' : ''
			+t(1) + 	`chart${options.descForm}.colors.list = [`
			+t(2) + 		options.colors.map(function(dt) { return `am4core.color("${dt}")`; }).join(',' + t(2))
			+t(1) + 	`]`
		)
		// ***************************************************************************************************** //






		// ***************************************************************************************************** //
		// ** Title * //
		+ ((options.title || ``) == `` ? `` : ``
			+t()
			+t(1)+ 		`titleChart${options.descForm} 					= chart${options.descForm}.titles.push(new am4core.Label());`
			+t(1)+ 		`titleChart${options.descForm}.text 			= '${options.title}';`
			+t(1)+ 		`titleChart${options.descForm}.fontSize 		= 25;`
			+t(1)+ 		`titleChart${options.descForm}.marginBottom 	= 5;`
			+t(1)+ 		`titleChart${options.descForm}.marginTop 		= 10;`
		)
		// ***************************************************************************************************** //






		// ***************************************************************************************************** //
		// ** Categoria * //
		+ t()
		+ (options.orientation == 'horizontal' 
			? t(1) + 	`categoryAxis${options.descForm} = chart${options.descForm}.xAxes.push(new am4charts.CategoryAxis());`
			: t(1) + 	`categoryAxis${options.descForm} = chart${options.descForm}.yAxes.push(new am4charts.CategoryAxis());`
		)
		+t(1)	+ 		`categoryAxis${options.descForm}.dataFields.category 						= '${options.category.param}';`
		+t(1)	+ 		`categoryAxis${options.descForm}.title.text 								= "${(options.category.text || '')}";`
		+t(1)	+ 		`categoryAxis${options.descForm}.renderer.grid.template.location 			= 0;`
		+t(1)	+ 		`categoryAxis${options.descForm}.renderer.minGridDistance 					= 20;`
		+ (((options.category || {}).rotation || '') == '' ? '' : ''	
			+t(1) +		`categoryAxis${options.descForm}.renderer.labels.template.rotation = ${options.category.rotation};`
			// +t(1) +		`categoryAxis${options.descForm}.renderer.labels.template.horizontalCenter = "left";`
			// +t(1) +		`categoryAxis${options.descForm}.renderer.labels.template.location = 0.5;`
		)

		+ ((styleGenerico.alternarColor || '') == '' ? '' : ''
			+t(1) + 	`categoryAxis${options.descForm}.renderer.axisFills.template.disabled 		= false;`	// Grafico de avaliações
			+t(1) + 	`categoryAxis${options.descForm}.renderer.axisFills.template.fillOpacity 	= 0.05;`	// Grafico de avaliações
		)

		+ (options.orientation == 'horizontal'  ? '' : ''
			+t(1) + 	`categoryAxis${options.descForm}.renderer.inversed 							= true;`
		)
		+ ((options.padination || '') == '' ? '' : ''
			+t(1) + 	`categoryAxis${options.descForm}.start = 0;`
			+t(1) + 	`setTimeout(function(){`
				  + 		`categoryAxis${options.descForm}.end = `
				  + 			(data.length < parseInt(options.padination) ? 1 : parseInt(options.padination) / data.length) + `;`
				  + 	`},1000);`
		)
		+ (((options.category || {}).textUpDown || '') == '' ? '' : ''
			+t(1) + 	`categoryAxis${options.descForm}.renderer.labels.template.adapter.add("dy", function(dy, target) { `
			+t(1) + 		`return dy + (target.dataItem && target.dataItem.index & 2 == 2 ? 15 : 0);`
			+t(1) + 	`});`
		)
		// ***************************************************************************************************** //








		// ***************************************************************************************************** //
		// ** Valor * //
		+ t()
		+ (options.value || []).map(function(value={}, indiceVlr) { return ''
			+ t(1) + 'var '
			+ (options.orientation == 'horizontal' 
				? 			`valueAxis${options.descForm + String(indiceVlr)} = chart${options.descForm}.yAxes.push(new am4charts.ValueAxis());`
				: 			`valueAxis${options.descForm + String(indiceVlr)} = chart${options.descForm}.xAxes.push(new am4charts.ValueAxis());`
			)
			+t(1)	+ 		`valueAxis${options.descForm + String(indiceVlr)}.title.text = "${(value.text || '')}";`
			+ (value.min == undefined ? '' : ''
				+t(1)	+ 	`valueAxis${options.descForm + String(indiceVlr)}.min = ${value.min};`
			)
			+ (value.max == undefined ? '' : ''
				+t(1)	+ 	`valueAxis${options.descForm + String(indiceVlr)}.max = ${value.max};`
			)
			+ ((value.opposite || '') == '' ? '' : ''
				+t(1)	+ 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.opposite = true;`
			)
			+ (value.syncWithAxis == undefined ? '' : ''
				+t(1)	+ 	`valueAxis${options.descForm + String(indiceVlr)}.syncWithAxis = valueAxis${options.descForm + String(value.syncWithAxis)};`
			)
			+ ((options.percentual || '') == '' ? '' : '' // Ex: grafico de avaliação RUIM / BOM / OTIMO (por item da avaliação)
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.min = 0;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.max = 100;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.minGridDistance = 50;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.ticks.template.length = 5;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.ticks.template.disabled = false;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.ticks.template.strokeOpacity = 0.4;`
			)
		}).join('')
		// ***************************************************************************************************** //









	// ***************************************************************************************************** //
	// ** Series * //
	var maskLabel, color;
	for (var i = 0; i < options.serie.length; i++) { 
		if (((options.serie[i] || {}).name || '') != '') setLegend = true; // verifica se precisa de legenda

		maskLabel = ((options.serie[i].label || {}).mask || '%0%').replace('%0%', (options.orientation == 'horizontal' ? '{valueY}' : '{valueX}'));

		color = (options.serie[i].color || '') != '' 
			? `am4core.color(\"${options.serie[i].color}\");`
			: `chart${options.descForm}.colors.getIndex(${i});`;

		html += ""+t()+t();

		if ((options.serie[i].type || 'column') == 'column') { 
			html += ""
			+t(1)	+ 		`series${i+options.descForm} = chart${options.descForm}.series.push(new am4charts.ColumnSeries());`
			+ (options.orientation == 'horizontal' 
				? t(1) + 	`series${i+options.descForm}.dataFields.valueY 						= "${options.serie[i].param}";`
				+ t(1) + 	`series${i+options.descForm}.dataFields.categoryX 					= "${options.category.param}";`
				: t(1) + 	`series${i+options.descForm}.dataFields.valueX 						= "${options.serie[i].param}";`
				+ t(1) + 	`series${i+options.descForm}.dataFields.categoryY 					= "${options.category.param}";`
			)
			+t(1)	+ 		`series${i+options.descForm}.columns.template.fill 					= ${color};`
			+t(1)	+ 		`series${i+options.descForm}.stroke 								= ${color};`
			+t(1)	+ 		`series${i+options.descForm}.fill 									= ${color};`
			+ (options.orientation == 'horizontal' 
				? t(1)	+ 		`series${i+options.descForm}.tooltip.dy 						= -8;`
				: t(1)	+ 		`series${i+options.descForm}.tooltip.dx 						= -8;`
			)
			+t(1)	+ 		`series${i+options.descForm}.tooltip.label.interactionsEnabled 		= true;`
			+t(1)	+ 		`series${i+options.descForm}.tooltip.keepTargetHover 				= false;`
			+t(1)	+ 		`series${i+options.descForm}.sequencedInterpolation 				= true;`
			+t(1)	+ 		`series${i+options.descForm}.defaultState.interpolationDuration 	= 1500;`
			+t(1)	+ 		`series${i+options.descForm}.columns.template.strokeOpacity 		= 0;`
			+t(1)	+ 		`series${i+options.descForm}.stacked 								= ${(options.serie[i].onlyColumn === false ? 'false' : 'true')};`
			+ ((options.serie[i].tooltip || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.tooltipHTML 							= "${options.serie[i].tooltip}";`
			)
			+ ((options.serie[i].name || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.name 									= '${options.serie[i].name}';`
			)
			+ (options.serie[i].value == undefined ? '' : ''
				+t(1) + 	`series${i+options.descForm}.${(options.orientation == 'horizontal' ? 'y' : 'x')}Axis = `
						+ 		`valueAxis${options.descForm + String(options.serie[i].value)};`
			)
			+ ((options.serie[i].click || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.columns.template.events.on("hit", function(ev) {`
				+t(2) + 		`var func = ${String(options.serie[i].click)};`
				+t(2) + 		`func(ev);`
				+t(1) + 	`});`
			)
		}



		if ((options.serie[i].type || 'column') == 'line') { 
			html += ""
			+t(1)	+ 		`series${i+options.descForm} = chart${options.descForm}.series.push(new am4charts.LineSeries());`
			+ (options.orientation == 'horizontal' 
				? t(1) + 	`series${i+options.descForm}.dataFields.valueY 				= "${options.serie[i].param}";`
				+ t(1) + 	`series${i+options.descForm}.dataFields.categoryX 			= "${options.category.param}";`
				: t(1) + 	`series${i+options.descForm}.dataFields.valueX 				= "${options.serie[i].param}";`
				+ t(1) + 	`series${i+options.descForm}.dataFields.categoryY 			= "${options.category.param}";`
			)
			+t(1)	+ 		`series${i+options.descForm}.propertyFields.stroke 			= ${color};` // não sei o que faz
			+t(1)	+ 		`series${i+options.descForm}.propertyFields.fill 			= ${color};`
			+t(1)	+ 		`series${i+options.descForm}.stroke 						= ${color};` // set color line
			+t(1)	+ 		`series${i+options.descForm}.fill 							= ${color};`
			// +t(1)	+ 		"series"+i+options.descForm+".fillOpacity 					= 0.5;" // com fundo colorido ou não
			+t(1)	+ 		`series${i+options.descForm}.strokeWidth 					= 3;` // espeçura da linha
			// chart.colors.getIndex(2);
			+ ((options.serie[i].tooltip || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.tooltipHTML 					= "${options.serie[i].tooltip}";`
				+t(1) + 	`series${i+options.descForm}.tooltip.pointerOrientation 	= "vertical";`
				+t(1) + 	`series${i+options.descForm}.tooltip.background.fill 		= ${color};`
			)
			+ ((options.serie[i].name || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.name 							= '${options.serie[i].name}';`
			)
			+ (options.serie[i].value == undefined ? '' : ''
				+t(1) + 	`series${i+options.descForm}.${(options.orientation == 'horizontal' ? 'y' : 'x')}Axis = `
						+ 		`valueAxis${options.descForm + String(options.serie[i].value)};`
			)
			+ ((options.serie[i].click || '') == '' && (options.serie[i].ball || '') == '' ? '' : ''
				+t()
				+t(1) + 	`var bullets${i+options.descForm} = series${i+options.descForm}.bullets.push(new am4charts.CircleBullet());`
				+t(1) + 	`bullets${i+options.descForm}.circle.fill = `
						+ 		((((options.serie[i] || {}).ball || {}).color || '') == '' ? color : `am4core.color("${options.serie[i].ball.color}")`) + ';'
				+ ((options.serie[i].click || '') == '' ? '' : ''
					+t(1) + `bullets${i+options.descForm}.events.on(\"hit\", function(ev) {`
					+t(2) + 	`var func = ${String(options.serie[i].click)};`
					+t(2) + 	`func(ev);`
					+t(1) + `});`
				)
			)
			+ ((options.serie[i].pontilhado || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.propertyFields.strokeDasharray = "lineDash"`
			)
		}

		html += ""
			+t(1)	+ 		`series${i+options.descForm}.${((options.serie[i].hide || '') == '' ? 'show' : 'hide')}();`


		if (options.serie[i].label != false) { 
			html += ''+t()
			+t(1)	+ 		`var labelBullet${i+options.descForm} 					= new am4charts.LabelBullet();`
			+t(1) 	+ 		`labelBullet${i+options.descForm}.label.text 			= "${maskLabel}";` // .value.formatNumber('#.')
			+t(1)	+ 		`labelBullet${i+options.descForm}.strokeOpacity 		= 0;`
			+t(1)	+ 		`labelBullet${i+options.descForm}.stroke 				= am4core.color("#dadada");`
			+t(1)	+ 		`labelBullet${i+options.descForm}.label.strokeWidth 	= 0;`
			+t(1)	+ 		`labelBullet${i+options.descForm}.label.fill 			= am4core.color("${((options.serie[i].label || {}).color || "black")}");`
			+t(1)	+ 		`labelBullet${i+options.descForm}.label.hideOversized 	= true;` // não imprimi valor zerad
			+ ((options.serie[i].click || '') == '' ? '' : ''
				+t(1) + 	`labelBullet${i+options.descForm}.events.on(\"hit\", function(ev) {`
				+t(2) + 		`(${String(options.serie[i].click)}(ev));`
				+t(1) + 	`});`
			)
			+ (((options.serie[i].label || {}).align || '').toLowerCase() == 'center' 
				? (options.orientation == 'horizontal' 
					? t(1) + 	`labelBullet${i+options.descForm}.locationY 		= 0.5;`
					: t(1) + 	`labelBullet${i+options.descForm}.locationX 		= 0.5;`
				)
				: (((options.serie[i].label || {}).align || '').toLowerCase() == 'in' 
					? (options.orientation == 'horizontal' 
						? t(1) + `labelBullet${i+options.descForm}.dy 				= 15;`
						: t(1) + `labelBullet${i+options.descForm}.dx 				= -15;`
					)
					: (options.orientation == 'horizontal' // se for out
						? t(1) + `labelBullet${i+options.descForm}.dy 				= -15;`
						: t(1) + `labelBullet${i+options.descForm}.dx 				= 15;`
					)
				)
			)
			+t(1)	+ 		`labelBullet${i+options.descForm}.label.truncate 		= false;`
			+t(1)	+ 		`series${i+options.descForm}.bullets.push(labelBullet${i+options.descForm});`
		}
	}
	// ***************************************************************************************************** //









	html += ''+t()+t()
		// ***************************************************************************************************** //
		// ** Reta final * //
		// +t(1)	+ 		"chart"+options.descForm+".legend 									= new am4charts.Legend(); // acrecenta legenda no grafico"
		+t(1)	+ 		`chart${options.descForm}.scrollbarY 								= new am4core.Scrollbar();`
		+t(1)	+ 		`var scrollbarX${options.descForm} 									= new am4core.Scrollbar();`
		+t(1)	+ 		`chart${options.descForm}.scrollbarX 								= scrollbarX${options.descForm};`
		+t(1)	+ 		`chart${options.descForm}.scrollbarX.parent 						= chart${options.descForm}.bottomAxesContainer;` // setar scroll do eixo x embaixo
		// +t(1)	+ 		`chart${options.descForm}.scrollbarX.thumb.minWidth 				= 100;` // Limita o zoom do gráfico (serve pra nada kkkkk)

		+t(1)	+ 		`chart${options.descForm}.cursor 									= new am4charts.XYCursor();` // indica onde o curso está com cordenadas XY
		+ (options.orientation == 'horizontal' 
			? t(1) + 	`chart${options.descForm}.cursor.behavior 							= "zoomX";`
			: t(1) + 	`chart${options.descForm}.cursor.behavior 							= "zoomY";`
		)
		+ ((options.category.click || '') == '' ? '' : ''
			// +t(1) + 	`chartPrincipal.cursor.snapToSeries = series${0+options.descForm};`
			+t(1) + 	`chart${options.descForm}.cursor.${options.orientation == 'horizontal' ? 'x' : 'y'}Axis = categoryAxis${options.descForm};`
			+t(1) + 	`chart${options.descForm}.cursor.events.on("cursorpositionchanged", function(ev) {`
			+t(1) + 		`indexCursorChart${options.descForm}_Global = categoryAxis${options.descForm}.positionToIndex(`
				  + 			`categoryAxis${options.descForm}.toAxisPosition(ev.target.${options.orientation == 'horizontal' ? 'x' : 'y'}Position)`
				  // + 			`categoryAxis${options.descForm}.toAxisPosition(ev.target.xPosition)`
				  + 		`);`
			+t(1) + 	`});`

			+t(1) + 	`chart${options.descForm}.plotContainer.events.on("hit", function(ev) {`
			+t(1) + 		`console.log(indexCursorChart${options.descForm}_Global);`
			+t(1) + 		`var func = ${String(options.category.click)};`
			+t(1) + 		`func(indexCursorChart${options.descForm}_Global);`
			// +t(1) + 		`montarGraficoOS(indexCursorChartPrincipal_Global);`
			// +t(1) + 		`montarGraficoAvalaiacao(indexCursorChartPrincipal_Global);`
			+t(1) + 	`});`
		)
		+ (!setLegend && (options.legend || '') == '' ? '' : ''
			+ t(1) + 	`chart${options.descForm}.legend 			= new am4charts.Legend();`
			+ ((options.legend || '') == '' ? '' 
				: ''
				+ t(1) + `chart${options.descForm}.legend.position 	= "${(options.legend.position 	|| 'bottom'	)}";`
				+ t(1) + `chart${options.descForm}.legend.valign 	= "${(options.legend.align 		|| 'top'	)}";`
			)
		)
		// ***************************************************************************************************** //
		+t(0)	+ 	"</"+"script>"

	return html;
}

function t() { 
	var num = arguments.length > 0 ? arguments[0] : 1, html = "\n";
	for (var i = 0; i < num; i++) html += "\t";
	return html;
}

function toFunction(func, replace) { 
	var isString;
	func = String(func);
	for (var i = 0; i < replace.length; i++) {
		isString = (replace[i][2] || 'literal') == 'literal' && typeof(replace[i][1]) == 'string';
		while (func.indexOf(replace[i][0]) != -1) 
			func = func.replace(replace[i][0] , isString ? "\"" + replace[i][1] + "\"" : replace[i][1]);
	}
	return eval(`(function(){ return ${func}})()`);
}
