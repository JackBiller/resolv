
function resolvCodigoConsulta(options, tab=0) {
	/*
	options: {
		codigo: {					-- Campos de pesquisa por código
			text: ''				-- texto que acompanha o campo do código
			input: ''				-- valor de apresentação
			mask: ''				-- defini marcara no campo
			styleLabel: {} 			-- objeto css para personalizar label
		}
		desc: {						-- campo de descrição do item selecionado
			text: ''				-- texto que acompanha o item selecionado
			input: ''				-- valor de apresentação
			mask: ''				-- defini marcara no campo
			styleLabel: {} 			-- objeto css para personalizar label
		}
		select: {					-- campo combo para selecionar registro
			text: ''				-- texto que acompanha o item selecionado
			styleLabel: {} 			-- objeto css para personalizar label
			value: '' 				-- campo com o valor desejado
			desc: '' 				-- campo para mostrar a descrição por onde vai pesquisar
			onchange: function(el) 	-- função disparando quando muda o valor do select
			onload: function() 		-- função disparando quando carrega os dados do select
		}
		descForm: 					-- identificador
		id: '' 						-- campo de id para acessar externo, caso seja omitido será usado o this.codigo.input
		ajax: 'ajax'				-- nome da função do ajax
		param: [					-- parâmetro passado para consulta dos dados
			{
				key: ''				-- nome do parâmetro
				val: (''|function)	-- valor ou função de callback para o parâmetro
			}
		]
		OR param: { key: value } 	-- key é o nome do parâmetro e value é a função de callback ou o parâmetro (''|function)
		styleLabel: {} 				-- objeto css para personalizar label tanto do código quanto da descrição
		trigger: function			-- função disparada quando selecionar um registro
		grade: objResolvGrade 		-- é a grade que vai ser montada no modal para selecionar por descrição,
									-- já vem com valores pré-definidos tendo que informar somente o attr 'inputs'
									-- porém é possível definir os demais, logo eles serão acrescentados ou sobrepostos
		onPesquisa: function 		-- função de validação de consulta, deve retornar um booleano
		required: '' 				-- se o componente é obrigatório ou não
		accesskey: '' 				-- tecla de atalho para focar no componente. Order de para foca ['campo código','botão']
		onFalseDebug: function(dt) 	-- Caso tenha que personalizar quando o retorno for vazio ou o debug for diferente de OK
		title: '' 					-- Título do modal de consulta

		dist: 'C-B-D' 				-- referencia para a disposição do componentes na tela
		... 						-- 	Ref: (
		... 						-- 		C = Código
		... 						-- 		B = Botão de pesquisa
		... 						-- 		D = Descrição
		... 						-- 		X = Botão para limpar
		... 						-- 		S = Select2 para montar combo
		... 						-- 		R = Recarregar
		... 						-- 	)
		xs / sm / md / lg: '3-1-8' 	-- Class do bootstrap para referenciar a disposição dos componentes
	}
	*/

	options = $.extend({}, {
		dist: 'C-B-D',
		xs: '3-1-8',
		// md: '4-1-7',
		ajax: 'ajax',
	}, options);

	var random;
	do {
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	var isOffline = options.dist.indexOf('R') >= 0;
	var param = resolvParamAjax(options);
	var descRef = '';
	var accesskey = (options.accesskey || '') == '' || options.accesskey.length > 1 ? '' : options.accesskey;
	try {
		var bootstrap = $.fn.tooltip.Constructor.VERSION.slice(0,1);
	} catch(e) {
		var bootstrap = '0';
	}
	var classBtn = bootstrap == '4' ? 'light' : 'default';

	var title = accesskey == '' ? '' : " title='Alt + " + accesskey + "'";

	if (accesskey != '') {
		descRef = (
			options.dist.indexOf('C') >= 0 ? 'C' 
			: (options.dist.indexOf('S') >= 0 ? 'S' 
			: 'D'
		));
	}

	var styleLabel = (options.styleLabel || '') == '' ? {} : options.styleLabel

	var funcAxu = {
		resolvLabel: function(param) {
			if (((options[param] || {}).text || '') == '')
				return ''
					+ 	`<label>`
					+ 		`<spam style="color:white;">.</spam>`
					+ 	`</label>`;

			var style = ``;

			if ((options[param].styleLabel || '') != '' || (options.styleLabel || '') != '')
				style = ` style="${resolvStyle( $.extend({}, styleLabel, (options[param].styleLabel || {})) )}"`;

			return ''
				+t(tab+2)	+ 	`<label${style}>`
				+t(tab+3)	+ (descRef != param.substring(0,1).toUpperCase()
								? (options[param].text || '')
								: ''
											+ 	`<spam ${title}>`
								+t(tab+4) 	+ 		returnDescAccesskey(options[param].text, options)
								+t(tab+3) 	+ 	`</spam>`
							)
				+t(tab+2)	+ 	`</label>`
		}
	}


	var elements = [
		{ codigo: 'C',
			class: 'codigo',
			complemento: ` style="padding:0;padding-left:15px;"`,
			// text: descRef == 'C' ? returnDescAccesskey(options.codigo.text, options) : (options.codigo.text || ''),
			text: funcAxu.resolvLabel('codigo'),
			resolv: ''
				// + 	(options.codigo.text || '')
				// + 	((options.required || '') == '' ? '' : ` <i style='color:red;' class='fa fa-asterisk'></i>`)
				+t(tab+2)	+ 	`<input type="text" class="form-control codigoConsulta" style="text-align:right;"`
				// + 		` onkeyup="buscar${capitalize(options.descForm)}Codigo();"`
				+t(tab+3)	+ 		` data-ref='${capitalize(options.descForm)}'`
				+t(tab+3)	+ 		` data-customerid='codigo${random}'`
				+t(tab+3)	+ 		(descRef == 'C' ? title : '')
				+t(tab+3)	+ 		` onfocus="`
				+t(tab+3)	+ 			`if(!onPesquisa${capitalize(options.descForm)}()) return (this.blur(), false);`
				+t(tab+3)	+ 			capitalize(options.descForm) + "Selected_Global = this.value;"
				// + 			"this.value = '';"
				+t(tab+3)	+ 		`"`
				+t(tab+3)	+ 		` onblur="buscar${capitalize(options.descForm)}Codigo();"`
				// + 		` onblur="this.value = ${capitalize(options.descForm)}Selected_Global;"`
				+t(tab+2)	+ 	`>`
				+t(tab+2)	+ 	`<script>`
				+t(tab+3)	+ 		`resolvEl('${options.descForm}','codigo').el[0].onclick = function() {`
				// + 		`$('#${options.descForm}').find('.codigo').find('input')[0].onclick = function() {`
				// + 			`$('#${options.descForm}').find('.codigo').find('input')[0].select();`
				+t(tab+4)	+ 			`resolvEl('${options.descForm}','codigo').el[0].select();`
				+t(tab+3)	+ 		`}`
				// +t(tab+3)	+ 		`;registerInputFocus.push(resolvEl('${options.descForm}','codigo').el[0]);`
				+t(tab+3)	+ 		`;registerInputFocus.push(resolvEl('${options.descForm}','codigo'));`
				+t(tab+2)	+ 	`</`+`script>`
		},
		{ codigo: 'B',
			class: 'text-center',
			complemento: ` style="padding:0;padding-right:15px;"`,
			resolv: ''
				+t(tab+2)	+ 	`<label`
							+ 		` style=${resolvStyle(styleLabel)}`
							+ 	`>`
				+t(tab+3)	+ 		`<spam style="color:white">.</spam>`
				+t(tab+2)	+ 	`</label>`
				+t(tab+2)	+ 	`<br>`
				+t(tab+2)	+ 	`<button class="btn btn-${classBtn} btn-block"`
				+t(tab+3)	+ 		` onclick=\"pesquisa${capitalize(options.descForm)}();"`
				+t(tab+3)	+ 		` data-customerid='btn${random}'`
							+ 		(descRef == 'D' ? title : '')
				+t(tab+2)	+ 	`>`
				+t(tab+3)	+ 		`<i class="fa fa-search"></i>`
				+t(tab+2)	+ 	`</button>`
		},
		{ codigo: 'D',
			class: 'desc',
			// text: ((options.desc.text || '') == '' ? '<spam style="color:white;">.</spam>' : options.desc.text),
			// text: ((options.desc.text || '') == '' ? '<spam style="color:white;">.</spam>' : (
			// 	descRef == 'D' ? returnDescAccesskey(options.desc.text, options) : (options.desc.text || '')
			// )),
			text: funcAxu.resolvLabel('desc'),
			resolv: ''
				// + 	((options.desc.text || '') == '' ? '<spam style="color:white;">.</spam>' : options.desc.text)
				+t(tab+2)	+ 	`<input type="text" class="form-control" disabled>`
		},
		{ codigo: 'X',
			class: 'text-center clear',
			complemento: ` style="padding:0;padding-right:15px;"`,
			resolv: ''
				+t(tab+2)	+ 	`<label`
							+ 		` style=${resolvStyle(styleLabel)}`
							+ 	`>`
				+t(tab+3)	+ 		`<spam style="color:white;">.</spam>`
				+t(tab+2)	+ 	`</label>`
				+t(tab+2)	+ 	`<br>`
				+t(tab+2)	+ 	`<button class="btn btn-${classBtn} btn-block"`
				+t(tab+3)	+ 		` onclick="clear${capitalize(options.descForm)}(true);"`
				+t(tab+2)	+ 	`>`
				+t(tab+3)	+ 		`<i class="fa fa-times"></i>`
				+t(tab+2)	+ 	`</button>`
		},
		{ codigo: 'S',
			class: 'select',
			complemento: ` style="padding:0;padding-left:15px;"`,
			text: funcAxu.resolvLabel('select'),
			resolv: ''
				+t(tab+2)	+ 	`<div id="loadSelect${capitalize(options.descForm)}">`
				+t(tab+3)	+ 		`Carregando...`
				+t(tab+2)	+ 	`</div>`
				+t(tab+2)	+ 	`<script>`
				+t(tab+3)	+ 		`setTimeout(function() { `
				+t(tab+4)	+ 			`buscar${capitalize(options.descForm)}Select();`
				+t(tab+3)	+ 		`}, 100);`
				+t(tab+2)	+ 	`</`+`script>`
		},
		{ codigo: 'R',
			class: 'text-center',
			complemento: ` style="padding:0;padding-right:15px;"`,
			resolv: ''
				+t(tab+2)	+ 	`<label`
							+ 		` style=${resolvStyle(styleLabel)}`
							+ 	`>`
				+t(tab+3)	+ 		`<spam style="color:white">.</spam>`
				+t(tab+2)	+ 	`</label>`
				+t(tab+2)	+ 	`<br>`
				+t(tab+2)	+ 	`<button class="btn btn-info btn-block"`
				+t(tab+3)	+ 		` onclick=\"recarregar${capitalize(options.descForm)}();"`
				+t(tab+2)	+ 	`>`
				+t(tab+3)	+ 		`<i class="fa fa-refresh"></i>`
				+t(tab+2)	+ 	`</button>`
		},
	];

	var html = ''
		+t(tab)		+ 	`<div class="row" id="${options.descForm}" style="margin:0 !important;">`
		+t(tab+2)	+		`<div class="id">`
		+t(tab+3)	+ 			`<input type="hidden">`
		+t(tab+2)	+		`</div>`
		+ (function (el, dist) {
			var html = '', required = false, classDiv;

			for (var i = 0; i < dist.length; i++) {
				for (var j = 0; j < el.length; j++) {
					if (dist[i] == el[j].codigo) {
						classDiv = `${(el[j].class || '')}`
							+ 	((options.xs || '') == '' ? '' : ' col-xs-' + options.xs.split('-')[i] )
							+ 	((options.sm || '') == '' ? '' : ' col-sm-' + options.sm.split('-')[i] )
							+ 	((options.md || '') == '' ? '' : ' col-md-' + options.md.split('-')[i] )
							+ 	((options.lg || '') == '' ? '' : ' col-lg-' + options.lg.split('-')[i] )
							+ 	((options.xl || '') == '' ? '' : ' col-xl-' + options.xl.split('-')[i] )
							+ 	((options.xxl|| '') == '' ? '' : ' col-xxl-'+ options.xxl.split('-')[i] );
						classDiv =	resolvClassDiv(classDiv);

						html += ``
						+t(tab+1)	+ 	`<div class="${classDiv}"`
									+ 		` style='padding:0 !important;padding-right:${(i < dist.length-1 ? '5px' : '0')} !important;'`
									+ 	`>`
									+ 		(el[j].text || '')
									+ 	(required || ['C','D','S'].indexOf(el[j].codigo) == -1 ? '' : (required = true, '')
										// + 	((options.required || '') == '' ? '' : t(tab+2) + `&nbsp;<i style='color:red;' class='fa fa-asterisk'></i>`)
										+ 	((options.required || '') == '' ? '' : t(tab+2) + `&nbsp;<span style="color:red;">*</span>`)
									)
									+ 		el[j].resolv
						+t(tab+1)	+ 	`</div>`
					}
				}
			}
			return html;
		}(elements, options.dist.split('-')))
		+t(tab)		+ 	`</div>`

		+t(tab)		+ 	`<script>`
		+t(tab)		+ 		`${capitalize(options.descForm)}Select_Global = [];`
		+t(tab)		+ 		`function buscar${capitalize(options.descForm)}Select() {`
		+(!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) {`
			+t(tab+2)	+ 			`${capitalize(options.descForm)}Select_Global = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`montar${capitalize(options.descForm)}Select();`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string'
						? options.ajax 
						: `window[(function() { var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param: {`
		+t(tab+3)	+ 					param
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) {`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`data = JSON.parse(data);`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`${capitalize(options.descForm)}Select_Global = [];`
		+t(tab+3)	+ 					`if (data.length != 0 && data[0].debug == "OK") {`
		+t(tab+4)	+ 						`${capitalize(options.descForm)}Select_Global = data;`
		+t(tab+4)	+ 						`var grade = ''`
		+t(tab+5)	+ 							`+ 	\`<select class="form-control codigoConsulta"\``
		+t(tab+5)	+ 							`+ 		\` data-ref='${capitalize(options.descForm)}'\``
		+t(tab+5)	+ 							`+ 		\` data-customerid='select${random}'\``
					+ (descRef != 'S' ? '' : t(tab+5) + `+ 		\`${title}\``)
		+t(tab+5)	+ 							`+ 		\` style='width:100%'\``
		+t(tab+5)	+ 							`+ 		\` onchange='onchange${capitalize(options.descForm)}Select(this);'\``
		+t(tab+5)	+ 							`+ 	\`>\``
		+t(tab+5)	+ 							`+ 		\`<option value=""></option>\``
		+t(tab+5)	+ 							`+ data.map(function(dt) { return \``
					+ 								`<option value="\${dt.${(options.select || {}).value}}">`
					+ 									`\${dt.${(options.select || {}).desc}}`
					+ 								`</option>`
					+ 							`\`; })`
		+t(tab+5)	+ 							`+ 	\`</select>\`;`
		+t(tab+4)	+ 						`$("#loadSelect${capitalize(options.descForm)}").html(grade).find('select').select2();`
		+t(tab+4)	+ 						`var func = ${String((options.select || {}).onload || function(){})};`
		+t(tab+4)	+ 						`setTimeout(function() { func(); }, (data.length / 10));`
		+t(tab+3)	+ 					`} else {`
		+t(tab+4)	+ 						`${capitalize(options.descForm)}Select_Global = [];`
		+t(tab+3)	+ 					`}`
		+(!isOffline ? '' : ''
			+t(tab+3)	+ 				`localStorage.setItem(`
						+ 					`"offline${capitalize(options.descForm)}",`
						+ 					`JSON.stringify(${capitalize(options.descForm)}Select_Global)`
						+ 				`);`
		)
		+t(tab+3)	+ 					`montar${capitalize(options.descForm)}Select();`
		+t(tab+2)	+ 				`}`
		+t(tab+1)	+ 			`});`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function montar${capitalize(options.descForm)}Select() {`
		+t(tab+1)	+ 			`var data = ${capitalize(options.descForm)}Select_Global;`
		+t(tab+1)	+ 			`if (data.length != 0 && data[0].debug == "OK") {`
		+t(tab+2)	+ 				`var grade = ''`
		+t(tab+3)	+ 					`+ 	\`<select class="form-control codigoConsulta"\``
		+t(tab+3)	+ 					`+ 		\` data-ref='${capitalize(options.descForm)}'\``
		+t(tab+3)	+ 					`+ 		\` data-customerid='select${random}'\``
					+ (descRef != 'S' ? '' : t(tab+3) + `+ 		\`${title}\``)
		+t(tab+3)	+ 					`+ 		\` style='width:100%'\``
		+t(tab+3)	+ 					`+ 		\` onchange='onchange${capitalize(options.descForm)}Select(this);'\``
		+t(tab+3)	+ 					`+ 	\`>\``
		+t(tab+3)	+ 					`+ 		\`<option value=""></option>\``
		+t(tab+3)	+ 					`+ data.map(function(dt) { return \``
					+ 						`<option value="\${dt.${(options.select || {}).value}}">`
					+ 							`\${dt.${(options.select || {}).desc}}`
					+ 						`</option>`
					+ 					`\`; });`
		+t(tab+3)	+ 					`+ 	\`</select>\``
		+t(tab+2)	+ 				`$("#loadSelect${capitalize(options.descForm)}").html(grade).find('select').select2();`
		+t(tab+1)	+ 			`}`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function onchange${capitalize(options.descForm)}Select(el) {`
		+t(tab+1)	+ 			`resolvVal("${options.descForm}","id",resolvVal("${options.descForm}","select"));`
		+t(tab+1)	+ 			`var func = ${String((options.select || {}).onchange || function(){})};`
		+t(tab+1)	+ 			`func(el);`
		+t(tab+1)	+ 			`resolvEvento("trigger","${options.descForm}");`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`${capitalize(options.descForm)}Selected_Global = '';`
		+t(tab)		+ 		`function buscar${capitalize(options.descForm)}Codigo() {`
		+t(tab+1)	+ 			`if (resolvVal("${options.descForm}",'codigo') == '') {`
		+t(tab+2)	+ 				`$("#${options.descForm}").find('input').val('');`
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`if(resolvVal("${options.descForm}",'codigo') == ${capitalize(options.descForm)}Selected_Global) {`
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+ (!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) {`
			+t(tab+2)	+ 			`var data = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`var index = data.map(function(dt) { return dt["${((options.codigo || {}).input || '')}"]; })`
						+ 				`.indexOf(resolvVal('${options.descForm}','codigo'));`
			+t(tab+2)	+ 			`resolvValCodigo${capitalize(options.descForm)}(index >= 0 ? [data[index]] : []);`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string'
						? options.ajax
						: `window[(function() { var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param: {`
		+t(tab+3)	+ 					param
		+t(tab+3)	+ 					`'${(options.codigo || {}).input}':resolvVal('${options.descForm}','codigo')`
		// +t(tab+3)	+ 					` $("#${options.descForm}").find('.codigo').find('input').val()`
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) {`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`data = JSON.parse(data);`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`resolvValCodigo${capitalize(options.descForm)}(data);`
		+t(tab+2)	+ 				`}`
		+t(tab+1)	+ 			`});`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function resolvValCodigo${capitalize(options.descForm)}(data) {` // função usada para setar valores sem chamar trigger
		+t(tab+1)	+ 			`if (data.length != 0 && data[0].debug == "OK") {`
		+t(tab+2)	+ 				`set${capitalize(options.descForm)}Val(data[0],'codigo');`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`else {`
		+t(tab+2)	+ 				`clear${capitalize(options.descForm)}();`
		// +t(tab+2)	+ 				`var teste = { codigoConsulta: resolvEl("${options.descForm}",'codigo').obj };`
		// +t(tab+2)	+ 				`var teste.codigoConsulta = resolvEl("${options.descForm}",'codigo').obj;`
		// +t(tab+2)	+ 				`serealizeForm(teste);`
		+t(tab+2)	+ 				`if (data.length > 0 && (data[0].debug || '') != '') alert(data[0].debug);`
		+t(tab+2)	+ 				`resolvEl("${options.descForm}",'codigo').el[0].focus();`
		+ ((options.onFalseDebug || '') == '' ? '' : ''
			+t(tab+2)	+ 			 `var func = ${String(options.onFalseDebug)};`
			+t(tab+2)	+ 			 `func(data);`
		)
		+t(tab+1)	+ 			`}`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function set${capitalize(options.descForm)}(data) {` // função usada para setar valores sem chamar trigger
		+t(tab+1)	+ 			`if (!resolvEl("${options.descForm}",'codigo').el.is(":focus"))`
		+t(tab+2)	+ 				`resolvVal("${options.descForm}",'codigo',data.${(options.codigo || {}).input} || '');`
		+t(tab+1)	+ 			`${capitalize(options.descForm)}Selected_Global = data.${(options.codigo || {}).input} || '';`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.desc').find('input').val(data.${(options.desc || {}).input} || '');`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.id').find('input').val(data.${(options.id || (options.codigo || {}).input)} || '');`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function set${capitalize(options.descForm)}Val(data) {`
		// +t(tab+1)	+ 			`if (!$("#${options.descForm}").find('.codigo').find('input').is(":focus"))`
		// +t(tab+2)	+ 				`$("#${options.descForm}").find('.codigo').find('input').val(data.${(options.codigo || {}).input});`
		+t(tab+1)	+ 			`if (!resolvEl("${options.descForm}",'codigo').el.is(":focus"))`
		+t(tab+2)	+ 				`resolvVal("${options.descForm}",'codigo',data.${(options.codigo || {}).input} || '');`
		+t(tab+1)	+ 			`${capitalize(options.descForm)}Selected_Global = data.${(options.codigo || {}).input} || '';`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.desc').find('input').val(data.${(options.desc || {}).input} || '');`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.id').find('input').val(data.${(options.id || (options.codigo || {}).input)} || '');`
		+ ((options.trigger || '') == '' ? '' : ''
			+t(tab+1)	+ 		`var func = ${String(options.trigger)};`
			+t(tab+1)	+ 		`func(data);`
		)
		+t(tab+1)	+ 			`console.log('resolvVal: ' + (resolvVal('${options.descForm}','id') != ''));`
		+t(tab+1)	+ 			`if (`
		+t(tab+2)	+ 				`(arguments[1] || '') != 'codigo' && `
		+t(tab+2)	+ 				`resolvVal('${options.descForm}','id') != '' && `
		+t(tab+2)	+ 				`$('#modalConsulta').is(':visible')`
		+t(tab+1)	+ 			`) {`
		+t(tab+2)	+ 				`$("#modalConsulta").modal('hide');`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`resolvEvento("trigger","${options.descForm}");`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function onPesquisa${capitalize(options.descForm)}() {`
		+t(tab+1)	+ ((options.onPesquisa || '') == ''
						? `return true;`
						: `var func = ${String(options.onPesquisa)};`
						+t(tab+1)+ `return func();`
					)
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`var ${capitalize(options.descForm)}List_Global = [];`
		+t(tab)		+ 		`function pesquisa${capitalize(options.descForm)}() {`
		+t(tab+1)	+ 			`if (!onPesquisa${capitalize(options.descForm)}()) return false;`
		+t(tab+1)	+ 			`$("#modalConsulta").find('.conteudo').html('Carregando...');`
		+t(tab+1)	+ 			`if (!$('#modalConsulta').is(':visible')) {`
		+t(tab+2)	+ 				`abrirModalConsulta({`
		+t(tab+3)	+ 					`search:'${((options.title || '') != ''
											? options.title
											: ((options.codigo || {}).text || '' != ''
												? (options.codigo || {}).text
												: ((options.desc || {}).text || '')
											)
										)}',`
		+t(tab+3)	+ 					`click:function() { pesquisa${capitalize(options.descForm)}(); }`
		+t(tab+2)	+ 				`});`
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+(!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) {`
			+t(tab+2)	+ 			`${capitalize(options.descForm)}List_Global = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`montaGradePesquisa${capitalize(options.descForm)}();`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string'
						? options.ajax
						: `window[(function() { var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param: {`
		+t(tab+3)	+ 					param
		+t(tab+3)	+ 					`'busca':$("#modalConsulta").find('input').val().toUpperCase()`
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) {`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`data = JSON.parse(data);`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`${capitalize(options.descForm)}List_Global = data[0].debug == 'OK' ? data : [];`
		+(!isOffline ? '' : ''
			+t(tab+3)	+ 				`localStorage.setItem(`
						+ 					`"offline${capitalize(options.descForm)}",`
						+ 					`JSON.stringify(${capitalize(options.descForm)}List_Global)`
						+ 				`);`
		)
		+t(tab+3)	+ 					`montaGradePesquisa${capitalize(options.descForm)}();`
		+t(tab+2)	+ 				`}`
		+t(tab+1)	+ 			`});`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function montaGradePesquisa${capitalize(options.descForm)}() {`
		+t(tab+1)	+ 			`var data = ${capitalize(options.descForm)}List_Global;`
		+t(tab+1)	+ 			`var grade = data[0].debug;`
		+t(tab+1)	+ 			`if (grade == 'OK') {`
		+t(tab+2)	+ 				`${capitalize(options.descForm)}List_Global = data;`
		+t(tab+2)	+ 				`grade = resolvGrade(data,`
					+ jsonToString($.extend({}, {
						languageJson: '../qualidade/lb/DataTables-1.10.18/Portuguese.json'
						, class: { tbody: { td: 'celB' } }
						, defaultAlignHead: 'center'
						, descForm: `tabela${options.descForm}`
						, trClick: {
							desc: `set${capitalize(options.descForm)}Val(${capitalize(options.descForm)}List_Global[%0%]);`,
							val: [{index:1}]
						}
						, initComplete: function() {
							$("#modalConsulta").find('input')[1].focus();
						}
						// , no_dataTable: true
					},(options.grade || {}) ), tab+2, returnObjIndentado_Global)
		+t(tab+2)	+ 				`);`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`$("#modalConsulta").find('.conteudo').html(grade);`
		// +t(tab+1)	+ 			`setTimeout( function() { $("#modalConsulta").find('input')[1].focus(); }, 500);`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function clear${capitalize(options.descForm)}(setTrigger=false) {`
		+t(tab+1)	+ 			`if (setTrigger) {`
		+t(tab+2)	+ 				`set${capitalize(options.descForm)}Val({});`
		+t(tab+1)	+ 			`} else {`
		+t(tab+2)	+ 				`$("#${options.descForm}").find('input').val('');`
		+t(tab+1)	+ 			`}`
		+t(tab)		+ 		`}`
		+ (accesskey == '' ? '' : ''
			+t(tab)		+ 	`function condigoConsultaClickAccesskey${random}(e) {`
			+t(tab+1)	+ 		`if (e.altKey && e.key == "${accesskey}".toLowerCase()) {`
			+t(tab+2)	+ 			`e.preventDefault();`
			+t(tab+2)	+ 			`try {`
						+ 				(descRef != 'D' ? '' : `$("button[data-customerid='btn${random}']").click();`)
						+ 				(descRef != 'S' ? '' : `$("select[data-customerid='select${random}']")[0].focus();`)
						+ 				(descRef != 'C' ? '' : `$("input[data-customerid='codigo${random}']")[0].select();`)
						+ 			` } catch(e) {}`
			+t(tab+1)	+ 		`}`
			+t(tab)		+ 	`}`
			+t(tab)		+ 	`registerEventKeyboard.push("condigoConsultaClickAccesskey${random}");`
		)
		+ (!isOffline ? '' : ''
			+t(tab)		+ 	`function recarregar${capitalize(options.descForm)}() {`
			+t(tab+1)	+ 		`localStorage.removeItem("offline${capitalize(options.descForm)}");`
			+t(tab+1)	+ 		``
			+t(tab)		+ 	`}`
		)
		+ (((options.codigo || {}).mask || '') == '' ? '' : ''
			+t(tab)	+ `$("#${options.descForm}").find('.codigo').find('input').mask('${options.codigo.mask}');`
		)
		+ (((options.desc || {}).mask || '') == '' ? '' : ''
			+t(tab)	+ `$("#${options.descForm}").find('.desc').find('input').mask('${options.desc.mask}');`
		)
		+ (((options.select || {}).mask || '') == '' ? '' : ''
			+t(tab)	+ `$("#${options.descForm}").find('.select').find('input').mask('${options.select.mask}');`
		)
		+t(tab)		+ 	"</"+"script>"
	return html;
}
