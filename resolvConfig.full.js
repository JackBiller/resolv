
/*
	Dependencias:
		jQuery 
		bootstrap 3 
		moment
		jquery.mask
		jquery.browser.detection
		datatables

		scriptCofing.js
		scriptQualidade.js
		scriptGrade.js
*/

/*
	Tipos de Operação: 
		- blur 		: Disparado quando der blur no campo
		- check 	: Disparado quando for checar campo, nome padrão para quando não tem especificação do parametro
		- valid 	: Disparado quando tiver validado o campo no serialize
*/

// var importFile = [
// 	{ f: './resolv/resolvH.js' 					},
// 	{ f: './resolv/resolvMenu.js' 				},
// 	{ f: './resolv/resolvCodigoConsulta.js' 	},
// 	{ f: './resolv/resolvInput.js' 				},
// 	{ f: './resolv/resolvBr.js' 				},
// 	{ f: './resolv/resolvDiv.js' 				},
// 	{ f: './resolv/resolvLabel.js' 				},
// 	{ f: './resolv/resolvRow.js' 				},
// 	{ f: './resolv/resolvStyle.js' 				},
// ]

// var imported;
// for (var i = 0; i < importFile.length; i++) {
// 	imported = document.createElement('script');
// 	imported.src = importFile[i].f;
// 	document.head.appendChild(imported);
// }

var objRefConfig_Global 	= [];
var registerRandom_Global 	= [];
var registerInputFocus 		= [];
var registerEventKeyboard 	= [];
var registerEventAll 		= [];

var returnObjIdentado_Global = true;

function capitalize(s) { 
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
}

// funções de resolução

function resolvHr(options) { 
	return resolvBr( $.extend({}, options, { hr: true }) ,(arguments[1] || 0));
}

function resolvBr(options, tab=0) { 
	/*
		options: {
			num: 1 			-- Numero de br que vai montar
			hr: (0|1) 		-- Se for hr ou não
			style: {} 		-- Objeto CSS
		}
	*/

	var style = (options.style || '') == '' ? '' : ' style="' + resolvStyle(options.style) + '"',
		num = (options.num || 1);

	var html = t(tab) + ''

	if (num < 0 || isNaN(num)) num = 1;

	for (var i = 0; i < parseInt(num); i++) 
		html += "<" + ((options.hr || false) ? 'h' : 'b') + "r " + style + ">";
	return html;
}

function resolvButton(options, tab=0) { 
	/*
		options: {
			class: ''					-- Classe do botao
			desc: ''					-- descrição do botão
			icon: ''					-- icone
			onclick: function(el){}		-- enveto de click
			onchange: function(el){}	-- enveto de mudar
			onfocus: function(el){}		-- enveto de focar
			onblur: function(el){}		-- enveto de desfocar
			compensador: (0|1) 			-- Cria um compensador para alinha o botão
			title: '' 					-- Texto que aparece quando passa o mouse emcima
			style: objStyle 			-- Resolve o estilo do botão
			name: '' 					-- Atributo Name do Button
		}
	*/

	var random;
	do { 
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	if ((options.click || '') != '' && (options.onclick || '') == '') options.onclick = options.click;

	var html = ''
		+ ((options.preText || '') == '' ? '' : t(tab) + options.preText)
		+ ((options.compensador || '') == '' ? '' : ''
			+ 	"<label><spam style='color: white;'>.</spam></label>"
		)
		+t(tab)		+ 	"<button"
					+ 		((options.name  || '') == '' ? '' : " name='"  + options.name  + "'")
					+ 		((options.class || '') == '' ? '' : " class='" + options.class + "'")
					+ 		((options.title || '') == '' ? '' : " title='" + options.title + "'")
					+ 		((options.id 	|| '') == '' ? '' : " id='"    + options.id    + "'")
					+ 		((options.style || '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					// + 		((options.click || '') == '' ? '' : " onclick='" + options.class + "'")


					// ** Enveto do botão ****************************** //
					+	(function(opt){
						var html = '';
						for (var i = 0; i < opt.length; i++) {
							html += ((options[opt[i]] || '') == '' ? '' : ' ' + opt[i] + '="' + opt[i] + random + '(this);"')
						}
						return html;
					}(['onchange','onclick','onfocus','onblur']))
					// ************************************************* //


					+ 	">"
					+ 		((options.icon || '') == '' ? '' : t(tab+1) + '<i class="fa fa-' + options.icon + '"></i>&nbsp;')
		+t(tab+1)	+ 		(options.desc || '')
		+t(tab)		+ 	"</button>"
		+t(tab)		+ 	"<script>"
					+	(function(opt){
						var html = '';
						for (var i = 0; i < opt.length; i++) {
							html += ((options[opt[i]] 	|| '') == '' ? '' : ''
							+t(tab+1)	+ 	"function " + opt[i] + random + "(el){"
							+t(tab+2)	+ (
											(typeof(options[opt[i]]) == 'string')
											? options[opt[i]]
											// : "(" + String(options[opt[i]]) + "(el));"
											: "var func = " + String(options[opt[i]]) + ';'
											+ "func(el);"
										)
							+t(tab+1)	+ 	"}"
							)
						}
						return html;
					}(['onchange','onclick','onfocus','onblur']))
		+t(tab)		+ 	"</"+"script>"
	
	return html;
}

function resolvCodigoConsulta(options, tab=0) { 
	/*
	options: {
		codigo: {					-- Campos de pesquisa por codigo
			text: ''				-- texto que acompanha o cmapo do codigo
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
		param: [					-- parametro passado para consulta dos dados
			{
				key: ''				-- nome do parametro
				val: (''|function)	-- valor ou função de callback para o parametro 
			}
		]
		OR param: { key: value } 	-- key é o nome do parametro e value é a funcção de callback ou o parametro (''|function)
		styleLabel: {} 				-- objeto css para personalizar label tanto do codigo quanto da descrição
		trigger: function			-- função disparada quando selecionar um registro
		grade: objResolvGrade 		-- é a grade que vai ser montada no modal para selecionar por descrição,
									-- já vem com valores predefidos tendo que informar somente o attr 'inputs'
									-- porém é possivel definir os demais, logo eles serão acrecentados ou sobrepostos
		onPesquisa: function 		-- função de validação de consulta, deve retornar um boleano
		required: '' 				-- se o componete é obrigatório ou não
		accesskey: '' 				-- tecla de atalho para focar no componete. Order de para foca ['campo codigo','botão']
		onFalseDebug: function(dt) 	-- Caso tenha que personalizar quando o retorno for vazio ou o debug for diferente de OK

		dist: 'C-B-D' 				-- refericia para a desposição do componetes na tela 
		... 						-- 	Ref: (
		... 						-- 		C = Codigo
		... 						-- 		B = Botão de pesquisa
		... 						-- 		D = Descrição
		... 						-- 		X = Botão para limpar
		... 						-- 		S = Select2 para montar combo
		... 						-- 		R = Recarregar
		... 						-- 	)
		xs / sm / md / lg: '3-1-8' 	-- Class do bootstrap para referenciar a disposição dos componetes
	}
	*/

	options = $.extend({},{ 
		dist: 'C-B-D',
		xs: '3-1-8',
		// md: '4-1-7',
		ajax: 'ajax',
	}, options);

	var isOffline = options.dist.indexOf('R') >= 0;
	var param = resolvParamAjax(options);
	var descRef = '';
	if ((options.accesskey || '') != '') { descRef = options.dist.indexOf('C') != -1 ? 'C' : 'D'; }

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
											+ 	`<spam title='${prefixedComand() + options.accesskey}'>`
								+t(tab+4) 	+ 		returnDescAccesskey(options[param].text, options)
								+t(tab+3) 	+ 	`</spam>`
							)
				+t(tab+2)	+ 	`</label>`
		}
	}


	var elemtents = [
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
				+t(tab+3)	+ 		(descRef == 'C' ? ` accesskey='${options.accesskey}'` : '')
				+t(tab+3)	+ 		` onfocus="`
				+t(tab+3)	+ 			`if(!onPesquisa${capitalize(options.descForm)}()) return (this.blur(), false);`
				+t(tab+3)	+ 			capitalize(options.descForm) + "Selected_Global = this.value;"
				// + 			"this.value = '';"
				+t(tab+3)	+ 		`"`
				+t(tab+3)	+ 		` onblur="buscar${capitalize(options.descForm)}Codigo();"`
				// + 		` onblur="this.value = ${capitalize(options.descForm)}Selected_Global;"`
				+t(tab+2)	+ 	`>`
				+t(tab+2)	+ 	`<script>`
				+t(tab+3)	+ 		`resolvEl('${options.descForm}','codigo').el[0].onclick = function(){`
				// + 		`$('#${options.descForm}').find('.codigo').find('input')[0].onclick = function(){`
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
				+t(tab+2)	+ 	`<button class="btn btn-default btn-block"`
				+t(tab+3)	+ 		` onclick=\"pesquisa${capitalize(options.descForm)}();"`
							+ 		(descRef == 'D' ? ` accesskey="${options.accesskey}"` : '')
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
				+t(tab+2)	+ 	`<button class="btn btn-default btn-block"`
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
			var html = '', riquered = false;

			for (var i = 0; i < dist.length; i++) { 
				for (var j = 0; j < el.length; j++) { 
					if (dist[i] == el[j].codigo) { 
						html += ``
						+t(tab+1)	+ 	`<div`
									+ 		` class="${(el[j].class || '')}`
									+ 			((options.xs || '') == '' ? '' : ' col-xs-' + options.xs.split('-')[i] )
									+ 			((options.sm || '') == '' ? '' : ' col-sm-' + options.sm.split('-')[i] )
									+ 			((options.md || '') == '' ? '' : ' col-md-' + options.md.split('-')[i] )
									+ 			((options.lg || '') == '' ? '' : ' col-lg-' + options.lg.split('-')[i] )
									+ 		`"`
									+ 		` style='padding:0 !important;padding-right:${(i < dist.length-1 ? '5px' : '0')} !important;'`
									+ 	`>`
									+ 		(el[j].text || '')
									+ 	(riquered || ['C','D','S'].indexOf(el[j].codigo) == -1 ? '' : (riquered = true, '')
										+ 	((options.required || '') == '' ? '' : t(tab+2) + `&nbsp;<i style='color:red;' class='fa fa-asterisk'></i>`)
									)
									+ 		el[j].resolv
						+t(tab+1)	+ 	`</div>`
					}
				}
			}
			return html;
		}(elemtents, options.dist.split('-')))
		+t(tab)		+ 	`</div>`

		+t(tab)		+ 	`<script>`
		+t(tab)		+ 		`${capitalize(options.descForm)}Select_Global = [];`
		+t(tab)		+ 		`function buscar${capitalize(options.descForm)}Select() { `
		+(!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) { `
			+t(tab+2)	+ 			`${capitalize(options.descForm)}Select_Global = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`montar${capitalize(options.descForm)}Select();`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string' 
						? options.ajax 
						: `window[(function(){ var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param: { ` 
		+t(tab+3)	+ 					param
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) { `
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`data = JSON.parse(data);`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`${capitalize(options.descForm)}Select_Global = [];`
		+t(tab+3)	+ 					`if (data.length != 0 && data[0].debug == "OK") { `
		+t(tab+4)	+ 						`${capitalize(options.descForm)}Select_Global = data;`
		+t(tab+4)	+ 						`var grade = ''`
		+t(tab+5)	+ 							`+ 	\`<select class="form-control codigoConsulta"\``
		+t(tab+5)	+ 							`+ 		\` data-ref='${capitalize(options.descForm)}'\``
		+t(tab+5)	+ 							`+ 		\` style='width:100%'\``
		+t(tab+5)	+ 							`+ 		\` onchange='onchange${capitalize(options.descForm)}Select(this);'\``
		+t(tab+5)	+ 							`+ 	\`>\``
		+t(tab+5)	+ 							`+ 		\`<option value=""></option>\`` 
		+t(tab+5)	+ 							`+ data.map(function(dt) { return \``
					+ 								`<option value="\${dt.${(options.select || {}).value}}">`
					+ 									`\${dt.${(options.select || {}).desc}}`
					+ 								`</option>`
					+ 							`\`; });`
		+t(tab+5)	+ 							`+ 	\`</select>\``
		+t(tab+4)	+ 						`$("#loadSelect${capitalize(options.descForm)}").html(grade).find('select').select2();`
		+t(tab+4)	+ 						`console.log("onload");`
		+t(tab+4)	+ 						`var func = ${String((options.select || {}).onload || function(){})};`
		+t(tab+4)	+ 						`func();`
		+t(tab+3)	+ 					`} else { `
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
		+t(tab)		+ 		`function montar${capitalize(options.descForm)}Select() { `
		+t(tab+1)	+ 			`var data = ${capitalize(options.descForm)}Select_Global;`
		+t(tab+1)	+ 			`if (data.length != 0 && data[0].debug == "OK") { `
		+t(tab+2)	+ 				`var grade = ''`
		+t(tab+3)	+ 					`+ 	\`<select class="form-control codigoConsulta"\``
		+t(tab+3)	+ 					`+ 		\` data-ref='${capitalize(options.descForm)}'\``
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
		+t(tab)		+ 		`function onchange${capitalize(options.descForm)}Select(el) { `
		+t(tab+1)	+ 			`resolvVal("${options.descForm}","id",resolvVal("${options.descForm}","select"));`
		+t(tab+1)	+ 			`var func = ${String((options.select || {}).onchange || function(){})};`
		+t(tab+1)	+ 			`func(el);`
		+t(tab+1)	+ 			`resolvEvento("trigger","${options.descForm}");`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`${capitalize(options.descForm)}Selected_Global = '';`
		+t(tab)		+ 		`function buscar${capitalize(options.descForm)}Codigo() { `
		+t(tab+1)	+ 			`if (resolvVal("${options.descForm}",'codigo') == '') { `
		+t(tab+2)	+ 				`$("#${options.descForm}").find('input').val('');`
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`if(resolvVal("${options.descForm}",'codigo') == ${capitalize(options.descForm)}Selected_Global) { `
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+ (!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) { `
			+t(tab+2)	+ 			`var data = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`var indice = data.map(function(dt) { return dt["${((options.codigo || {}).input || '')}"]; })`
						+ 				`.indexOf(resolvVal('${options.descForm}','codigo'));`
			+t(tab+2)	+ 			`resolvValCodigo${capitalize(options.descForm)}(indice >= 0 ? [data[indice]] : []);`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string' 
						? options.ajax 
						: `window[(function(){ var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param: { ` 
		+t(tab+3)	+ 					param
		+t(tab+3)	+ 					`'${(options.codigo || {}).input}':resolvVal('${options.descForm}','codigo')`
		// +t(tab+3)	+ 					` $("#${options.descForm}").find('.codigo').find('input').val()`
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) { `
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`data = JSON.parse(data);`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`resolvValCodigo${capitalize(options.descForm)}(data);`
		+t(tab+2)	+ 				`}`
		+t(tab+1)	+ 			`});`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function resolvValCodigo${capitalize(options.descForm)}(data) { ` // função usada para setar valores sem chamar trigger
		+t(tab+1)	+ 			`if (data.length != 0 && data[0].debug == "OK") { `
		+t(tab+2)	+ 				`set${capitalize(options.descForm)}Val(data[0],'codigo');`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`else { `
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
		+t(tab)		+ 		`function set${capitalize(options.descForm)}(data) { ` // função usada para setar valores sem chamar trigger
		+t(tab+1)	+ 			`if (!resolvEl("${options.descForm}",'codigo').el.is(":focus"))`
		+t(tab+2)	+ 				`resolvVal("${options.descForm}",'codigo',data.${(options.codigo || {}).input} || '');`
		+t(tab+1)	+ 			`${capitalize(options.descForm)}Selected_Global = data.${(options.codigo || {}).input} || '';`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.desc').find('input').val(data.${(options.desc || {}).input} || '');`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.id').find('input').val(data.${(options.id || (options.codigo || {}).input)} || '');`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function set${capitalize(options.descForm)}Val(data) { `
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
		+t(tab+1)	+ 			`){`
		+t(tab+2)	+ 				`$("#modalConsulta").modal('hide');`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`resolvEvento("trigger","${options.descForm}");`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function onPesquisa${capitalize(options.descForm)}() { `
		+t(tab+1)	+ ((options.onPesquisa || '') == '' 
						? `return true;`
						: `var func = ${String(options.onPesquisa)};`
						+t(tab+1)+ `return func();`
					)
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`var ${capitalize(options.descForm)}List_Global = [];`
		+t(tab)		+ 		`function pesquisa${capitalize(options.descForm)}() { `
		+t(tab+1)	+ 			`if(!onPesquisa${capitalize(options.descForm)}()) return false;`
		+t(tab+1)	+ 			`$("#modalConsulta").find('.conteudo').html('Carregando...');`
		+t(tab+1)	+ 			`if(!$('#modalConsulta').is(':visible')) { `
		+t(tab+2)	+ 				`abrirModalConsulta( { `
		+t(tab+3)	+ 					`search:'${((options.codigo || {}).text || '')}',`
		+t(tab+3)	+ 					`click:function() { pesquisa${capitalize(options.descForm)}(); }`
		+t(tab+2)	+ 				`});`
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+(!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) { `
			+t(tab+2)	+ 			`${capitalize(options.descForm)}List_Global = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`montaGradePesquisa${capitalize(options.descForm)}();`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string' 
						? options.ajax 
						: `window[(function(){ var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param:{` 
		+t(tab+3)	+ 					param
		+t(tab+3)	+ 					`'busca':$("#modalConsulta").find('input').val().toUpperCase()`
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) { `
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
		+t(tab)		+ 		`function montaGradePesquisa${capitalize(options.descForm)}() { `
		+t(tab+1)	+ 			`var data = ${capitalize(options.descForm)}List_Global;`
		+t(tab+1)	+ 			`var grade = data[0].debug;`
		+t(tab+1)	+ 			`if (grade == 'OK') { `
		+t(tab+2)	+ 				`${capitalize(options.descForm)}List_Global = data;`
		+t(tab+2)	+ 				`grade = resolvGrade(data, `
					+ jsonToString($.extend({},{ 
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
					},(options.grade || {}) ), tab+2, true)
		+t(tab+2)	+ 				`);`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`$("#modalConsulta").find('.conteudo').html(grade);`
		// +t(tab+1)	+ 			`setTimeout( function() { $("#modalConsulta").find('input')[1].focus(); }, 500);`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function clear${capitalize(options.descForm)}(setTrigger=false) { `
		+t(tab+1)	+ 			`if (setTrigger) { `
		+t(tab+2)	+ 				`set${capitalize(options.descForm)}Val({});`
		+t(tab+1)	+ 			`} else { `
		+t(tab+2)	+ 				`$("#${options.descForm}").find('input').val('');`
		+t(tab+1)	+ 			`}`
		+t(tab)		+ 		`}`
		+ (!isOffline ? '' : ''
			+t(tab)		+ 	`function recarregar${capitalize(options.descForm)}() { `
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

function resolvDiv(options, tab=0) { 
	/*
		options: {
			class: '' 		-- Class da div
			id: '' 			-- Id da div
			ctx: '' 		-- Conteudo div
			style: obj 		-- Objeto CSS
			text: '' 		-- Conteudo Padrão
		}
	*/
	var html = ''
		+t(tab)		+ 	"<div"
					+ 		" class='" + (options.class || '') + "'"
					+ 		((options.id || '') == '' ? '' : " id='" + options.id + "'")
					+ 		((options.style || '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					+ 	">"
					+ 		((options.text || "") == '' ? '' : t(tab+1)+options.text)
					+ 		resolvConfig((options.ctx || {}),tab+1)
		+t(tab)		+ 	"</div>"

	return html;
}

function resolvFotos(options, tab=0) { 
	/*
		options: { 
			descForm: ''					-- Parametro de identificação
			desc: ''						-- Descrição padrão da DIV
			ajax: '' / function(){ }		-- Nome da função ajax
			but_delete: (0|1)				-- Se contém ou não botão para apagar imagem
			but_download: (0|1)				-- Se contém ou não botão para baixar imagem
			param: {}						-- Parametro da função ajax
			ck_upload: {					-- Informa se o componete vai fazer ou não upload de fotos
				param: {}					-- Parametros do ajax de upload
				input: {					-- Personalização do input type file
					type: 'file'
				}
			}
			ck_galeria: (0|1)
		}
	*/

	// var style = (options.style || '') == '' ? '' : ' style="' + resolvStyle(options.style) + '"',
	// 	num = (options.num || 1);

	/*
		- OK - Objetivo Principal: Listar Fotos de um registro especifico
		- Opção para upload de arquivo
		- Opção para tirar fotos da webcam
		- Opção para desenhar imagem
		- Opção de recortar imagem
		- Opção de girar iamgem
		- Opção de aplicar filtros
		- Opção para apagar imagem
	*/

	var param = resolvParamAjax(options);

	var input = {};
	if ((options.ck_upload || '') != '') { 
		input = { input: { 
			type: 'file', 
			id: 'inputFotos' + options.descForm, 
			fileType: 'img',
			upload: { 
				ajax: (options.ajax || 'ajax'),
				param: (options.ck_upload.param || {})
			}
		} }
		input.input = $.extend({}, input.input, (options.ck_upload.input || {}));
	}

	var html = t(tab) + ''
		+ ((options.ck_upload || '') == '' ? '' : ''
			+t(tab+0) + resolvConfig(input)
		)
		+t(tab+0) + `<div id="divFotos${options.descForm}">${options.desc || ''}</div>`
		+t(tab+0) + `<script>`
		+t(tab+0) + 	`var imagensObject${options.descForm} = [];`
		+t(tab+0) + 	`function buscarFotos${options.descForm}(id) { `
		+t(tab+1) + 		`$("#divFotos${options.descForm}").html("Carregando...");`
		+t(tab+1) + (typeof(options.ajax) == 'string' 
						? options.ajax 
						: `window[(function(){ var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2) + 			`param: { `
		+t(tab+3) + 				param + `id`
		+t(tab+2) + 			`},`
		+t(tab+2) + 			`done: function(data) { `
		+t(tab+3) + 				`console.log(data);`
		+t(tab+3) + 				`data = JSON.parse(data);`
		+t(tab+3) + 				`console.log(data);`
		+t(tab+3) + 				`if (data.branchs.length != 0 && data.debug == "OK") { `
		+t(tab+4) + 					`imagensObject${options.descForm} = data.branchs;`
		+t(tab+3) + 				`} else { `
		+t(tab+4) + 					`imagensObject${options.descForm} = [];`
		+t(tab+3) + 				`}`
		+t(tab+3) + 				`listarFotos${options.descForm}();`
		+t(tab+2) + 			`}`
		+t(tab+1) + 		`})`
		+t(tab+0) + 	`}`
		+t(tab+0) + 	`function listarFotos${options.descForm}() { `
		+t(tab+1) + 		`var src, exts = 'PNG,JPG,TIFF,JPEG,BMP,PSD,EXIF,RAW,PDF,WEBP,GIF,EPS,SVG'.split(',');`
		+t(tab+1) + 		`var html = ""`
		+t(tab+2) + 			`+ "<div class=\\"col-xs-12\\" id=\\"jornal\\"><!--  style=\\"margin: 0; padding: 0;width: 922px;height: 545px;\\" -->"`
		+t(tab+2) + 			`+ 		"<div class=\\"flipbook-viewport\\" id=\\"viewport\\">"`
		+t(tab+2) + 			`+ 			"<div id=\\"container\\">"` //  class=\\"container\\"
		+t(tab+2) + 			`+ 				"<div class=\\"flipbook\\" id='flipbookDiv' style=\\"/*width: 922px;height: 545px;*/\\"></div>";`
		+t(tab+1) + 		`for (var i = 0; i < imagensObject${options.descForm}.length; i++) { `
		+t(tab+2) + 			`if (`
					+			 	`(imagensObject${options.descForm}[i].isFile || '') != '' && `
					+ 				`exts.indexOf(imagensObject${options.descForm}[i].ext.toUpperCase()) >= 0`
					+ 			`) { `
		+t(tab+3) + 				`src = imagensObject${options.descForm}[i].path;`
		+t(tab+3) + 				`imagensObject${options.descForm}[i].src = src;`
		+t(tab+3) + 				`imagensObject${options.descForm}[i].w = imagensObject${options.descForm}[i].width;`
		+t(tab+3) + 				`imagensObject${options.descForm}[i].h = imagensObject${options.descForm}[i].height;`
		+t(tab+3) + 				`html += ""`
		+t(tab+4) + 					`+ 				"<div name='flipbookPag'"`
		+t(tab+4) + 					`+ 					" class='flipbookPag col-xs-6 col-sm-3 col-md-2' style='padding: 4px; text-align:center;'"`
		+t(tab+4) + 					`+ 				">"`
		+t(tab+4) + 					`+ 					"<img src='" + src + "' width='100%' name='elevatezoom'"`
		+t(tab+4) + 					`+ 						" onclick='openPhotoSwipe${options.descForm}(" + i + ");'>"`
		+ ((options.but_download || '') == '' ? '' : ''
			+t(tab+4) + 				`+ 					"<button class='btn btn-primary' name='btnApagaFoto'`
					  + 										` onclick='$(\\"#downloadFotos${options.descForm}" + i + "\\")[0].click();'"`
			+t(tab+4) + 				`+ 						" style='position: absolute; bottom:4px; right:4px;`
					+ 												`padding:2px;padding-left:8px;padding-right:8px;'"`
			+t(tab+4) + 				`+ 					">"`
			+t(tab+4) + 				`+ 						"<i class='fa fa-download'></i>"`
			+t(tab+4) + 				`+ 					"</button>"`
			+t(tab+4) + 				`+ 					"<a id='downloadFotos${options.descForm}" + i + "' style='display:none' href='" + src + "' download></a>"`
		)
		+ ((options.but_delete || '') == '' ? '' : ''
			+t(tab+4) + 				`+ 					"<button class='btn btn-danger' name='btnApagaFoto' onclick='apagarFoto${options.descForm}(\\"" + i + "\\");'"`
			+t(tab+4) + 				`+ 						" style='position:absolute;top:4px;right:4px;`
					+ 												`padding:2px;padding-left:8px;padding-right:8px;'"`
			+t(tab+4) + 				`+ 					">"`
			+t(tab+4) + 				`+ 						"<i class='fa fa-times'></i>"`
			+t(tab+4) + 				`+ 					"</button>"`
		)
		+t(tab+4) + 					`+ 				"</div>";`
		+t(tab+2) + 			`}`
		+t(tab+1) + 		`}`
		+t(tab+1) + 		`html += ""`
		+t(tab+2) + 			`+				"</div>"`
		+t(tab+2) + 			`+			"</div>"`
		+t(tab+2) + 			`+		"</div>"`
		+t(tab+2) + 			`+		"<br>"`
		+t(tab+2) + 			`+	"</div>"`
		+t(tab+1) + 		`$("#divFotos${options.descForm}").html(html);`
		+t(tab+0) + 	`}`
		+t(tab+0) + 	`function openPhotoSwipe${options.descForm}(indice=0) { `
		+t(tab+1) + 		`var pswpElement = document.querySelectorAll('.pswp')[0], items = [];`
		+t(tab+1) + 		`for (var i = indice; i < imagensObject${options.descForm}.length; i++) { `
		+t(tab+2) + 			`if (imagensObject${options.descForm}[i].w == 0) imagensObject${options.descForm}[i].w = tamanahoImagemReal;`
		+t(tab+2) + 			`if (imagensObject${options.descForm}[i].h == 0) imagensObject${options.descForm}[i].h = alturaImagemReal;`
		+t(tab+2) + 			`items.push(imagensObject${options.descForm}[i]);`
		+t(tab+1) + 		`}`
		+t(tab+1) + 		`if (indice != 0) { `
		+t(tab+2) + 			`for (var i = 0; i < indice; i++) { `
		+t(tab+3) + 				`if (imagensObject${options.descForm}[i].w == 0) imagensObject${options.descForm}[i].w = tamanahoImagemReal;`
		+t(tab+3) + 				`if (imagensObject${options.descForm}[i].h == 0) imagensObject${options.descForm}[i].h = alturaImagemReal;`
		+t(tab+3) + 				`items.push(imagensObject${options.descForm}[i]);`
		+t(tab+2) + 			`}`
		+t(tab+1) + 		`}`
		+t(tab+1) + 		`var options = { `
		+t(tab+2) + 			`history: false,`
		+t(tab+2) + 			`focus: false,`
		+t(tab+2) + 			`showAnimationDuration: 0,`
		+t(tab+2) + 			`hideAnimationDuration: 0`
		+t(tab+1) + 		`};`
		+t(tab+1) + 		`var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);`
		+t(tab+1) + 		`gallery.init();`
		+t(tab+0) + 	`};`
		+t(tab+0) + `</`+`script>`

	return html;
}

function buscarFotos(descForm, id, error=0) { listarFotos(descForm, id, error); }
function listarFotos(descForm, id, error=0) { 
	try { window[`buscarFotos${descForm}(${id});`]; }
	catch(e) { 
		if (typeof(error) == 'function') error(e);
		else alert(error || 'Ocorreu um erro para listar as fotos!');
		console.error(e);
	}
}

function resolvH1(options){ return resolvH($.extend({}, options, { num: 1 }),(arguments[1] || 0)); }
function resolvH2(options){ return resolvH($.extend({}, options, { num: 2 }),(arguments[1] || 0)); }
function resolvH3(options){ return resolvH($.extend({}, options, { num: 3 }),(arguments[1] || 0)); }
function resolvH4(options){ return resolvH($.extend({}, options, { num: 4 }),(arguments[1] || 0)); }
function resolvH5(options){ return resolvH($.extend({}, options, { num: 5 }),(arguments[1] || 0)); }
function resolvH6(options){ return resolvH($.extend({}, options, { num: 6 }),(arguments[1] || 0)); }
function resolvH(options, tab=0) { 
	/*
		options: {
			text: '' 		-- Descricao da Tag HN
			num: 1 			-- Num da tag (default = 1)
			style: obj 		-- Objeto CSS
		}
	*/
	var html = ''
		+t(tab)		+ 	"<h" + (options.num || 1) 
					+ 		((options.style || '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					+ 	">"
		+t(tab+1)	+ 		(options.text || '')
		+t(tab)		+ 	"</h" + (options.num || 1) + ">";

	return html;
}

function resolvTextarea(options,tab=0) { 
	options.isTextarea = true;
	options.style = $.extend({}, { 'resize': 'vertical' },  options.style);
	return resolvInput(options,tab);
}

function resolvInput(options,tab=0) { 
	/*
		options: {
			text: '' 							-- Texto de acompanhamento
			id: '' 								-- Id do campo
			name: '' 							-- Name do campo
			class: '' 							-- Classe do campo
			value: '' 							-- Value do campo
			val: '' 							-- Value do campo
			type: '' 							-- Type do campo
			list: '' 							-- List do campo para datalist, se não tiver definido datalista param
			.. 									-- Caso type 'number' ou 'tel' alinha o texto a direta
			autocomplete: '' 					-- Autocomplete do campo
			accesskey: '' 						-- Accesskey do campo, atalho para focar no campo ou clicar no botão
			data: { 							-- Acresenta o atributos data no campo (data-key='value')
				key: value
			}

			isTextarea: (0|1)					-- Se o campo é textarea
			cols: num 							-- Col para quando o campo for textarea
			rows: num 							-- Row para quando o campo for textarea

			disabled: (0|1) 					-- Se o campo começa disabled
			checked: (0|1) 						-- Se o campo começa checked
			style: {} 							-- Objeto com atributos cujo os nomes são os atributos do CSS
			styleLabel: {} 						-- Objeto com atributos cujo os nomes são os atributos do CSS para Label
			required: '' 						-- Se o campo é obrigatório
			maxlength: '' 						-- Limite maximo de caracteres

			onchange: function 					-- Metodo chamado ao mudar valor

			numKeyVerifAlt: text.length 		-- Verificar até tantos caracteres percorrer para achar um math com accesskey
			classDiv: '' 						-- Deixa o input por volta de um div
			onEnter: function(el) 				-- Função disparada quando o campo está focado e aperta o ENTER
			no_changeLayout: (0|1) 				-- Se vai mudar o layout para tabela contendo o campo e a descricao na frente
			radio: [ {} ] 						-- Array de objetos input, com caracteristicas herdadas do obj pai
			inline: (0|1) 						-- Para radio, campos alinhados lado a lado, se false fica embaixo do outro
			no_desc: (0|1) 						-- Sem Label
			datalist: { 						-- Colocar um autocomplete no campo
				ajax: '' 						-- Se a listar vai vir dinamicamente do servidor
				param: { key: value } 			-- Parametros da requisição
				input: '' 						-- Campo usado para identificar value dos options
			}
			fileType: ('img') 					-- Caso o input for do tipo file, pode delimitar o tipo de arquivo
			... 								-- No caso 'img' só vai permitir tipo imagem e ter um preview
			upload: { 							-- Caso tipo campo seja file, são as configurações de upload
				ajax: '' 						-- Função ajax que vai enviar o arquivo
				path: (function|'') 			-- Caminho para salvar o arquivo
				... 		 					-- Função caso precisa pegar algum valor dinamico
				fileName: '' 					-- Nome do arquivo a ser salvo (padrao é vir o nome original)
				onsend: function 				-- Validar se pode ou não enviar aquivo
			}
			defaultImg: 'path' 					-- Caso input type file/img colocar uma foto padrão de preview
			enum: { 							-- Indica que o campo será um select com opções pré-definidas
				value: desc 					-- Ex: <option value="value">desc</option>
			}
			mask: '' 							-- Usar Mascara no campo
			maskOption: {} 						-- Opções para usar com a mescara
		}
	*/

	var html = '';

	if (options.type == 'radio' && (options.radio || '') != '') { 
		var isCheck = options.radio.map(function(e) { return e.checked; }).indexOf(true);
		if(isCheck < 0) isCheck = 0;

		for (var i = 0; i < options.radio.length; i++) { 
			if (options.radio[i].checked) {
				options.value = options.radio[i].value || '';
			}
		}

		for (var i = 0; i < options.radio.length; i++) 
			html += resolvInputIn( $.extend({}, options, { checked: (isCheck == i ? true : '') }, options.radio[i]) , tab);
	} else {
		html = resolvInputIn(options, tab);
	}

	return html
}

function resolvInputIn(options,tab=0) { 
	if ((options.value || ``) == `` && (options.val || ``) != ``) options.value = options.val;
	if ((options.onclick || ``) == `` && (options.click || ``) != ``) options.onclick = options.click;
	if ((options.numKeyVerifAlt || ``) == ``) options.numKeyVerifAlt = (options.text || ``).length;

	options.ck_blur = (options.ck_blur || ``) == `` ? true : options.ck_blur;

	// se tem que validar o requerimento completo, com mensagem embaixo do campo
	// options.requiredFull = ((options.id || ``) != `` && typeof(options.required) == `function`);
	// options.requiredFull = ((options.id || ``) != `` && (options.required || ``) != ``);
	options.requiredFull = ( testP(options.id) && testP(options.required) && (testP(options.text) || typeof(options.required) == `function`) );

	if (options.isTextarea || false) options.value = (options.value || '').replace(/\r/g,'').replace(/\n/g, '<br>');

	var random;
	do {
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	var onblurRequired = ``
		+ 	`var check${random}Test = check${random}('blur');`
		// + 	`if (typeof(check${random}Test) == "string" && check${random}Test != "")`
		// + 		`$("#${options.id}_obs").html(check${random}Test);`
		// + 	`else $("#${options.id}_obs").html("");`
		+ 	`$('#${options.id}_obs').html(`
		+ 		`typeof(check${random}Test) == 'string' && check${random}Test != '' ? check${random}Test : ''`
		+ 	");"

	var label = ''
		// **** configurar elemtno label que complementa o campo de entrada ****
		+ ((options.text || ``) == `` ? `` : ``
			+t(tab)		+ 	`<label`
						+		((options.id 			|| ``) == `` ? `` : ` for="${options.id}" id="label_${options.id}"`)
						+ 		((options.accesskey 	|| ``) == `` ? `` : ` title="${prefixedComand() + options.accesskey}"`)
						+ 		((options.styleLabel 	|| ``) == `` ? `` : ` style="${resolvStyle(options.styleLabel)}"`)
						+	`>`
			+t(tab+1)	+ 		returnDescAccesskey(options.text, options)
			// + 		returnDesc(options.text, options)
						+ 		((options.required || ``) == `` ? `` : ` <i style="color:red;" class="fa fa-asterisk"></i>`)
			+t(tab)		+ 	`</label>`
		)
		// ***************************************************************************

	var input = ''
		// **** verifica se é mês ****
		+ (options.type != 'month' ? '' : (options.isMonth = true, options.type = 'hidden', '')
			+t(tab+0)	+ 	`<input id="${(options.id || '')}Datepicker" name="dataPiker" autocomplete="off" class='Default form-control' type="text"`
						// + 		` onchange="console.log(this.value);" `
						+ 	`/>`
			+t(tab+0)	+ 	`<script>`
			+t(tab+1)	+ 		`$('#${(options.id || '')}Datepicker').datepicker({`
			+t(tab+2)	+ 			`format: "MM de yyyy"`
			+t(tab+2)	+ 			`, formatData: "yyyy-mm"`
			+t(tab+2)	+ 			`, viewMode: "months"`
			+t(tab+2)	+ 			`, minViewMode: "months"`
			+t(tab+2)	+ 			`, onchange: function(data) {`
			+t(tab+3)	+ 				`if ($("#${(options.id || '')}").val() != data) {`
			+t(tab+4)	+ 					`$("#${(options.id || '')}").val(data);`
			+t(tab+4)	+ 					`try { $("#${(options.id || '')}")[0].onchange(this); } catch(e){}` // chama a função de change
			+t(tab+4)	+ 					`try { $("#${(options.id || '')}")[0].onblur(this); } catch(e){}` 	// chama a função de blur
			+t(tab+4)	+ 					`$(".dropdown-menu").css('display','none');` 						// some com o menu de opção do mes
			+t(tab+3)	+ 				`}`
			+t(tab+2)	+ 			`},`
			+t(tab+1)	+ 		`});`
			+t(tab+1)	+ 		`setTimeout(function(){ resolvVal('${(options.id || '')}','${(options.value || '')}'); }, 500);`
			+t(tab+0)	+ 	`</script>`
		)

		// **** inicia a tag ****
		+t(tab)	+ 	"<" + ((options.isTextarea || false) ? 'textarea' : ((options.enum || '') != '' ? 'select' : 'input') )

		// **** configurar atributos simples ****
		+ ['id','name','value','type','cols','rows','accesskey','autocomplete','maxlength']
			.filter(function(el) { return (options[el] || ``) != ``; })
			.map(function(opt) { return ` ${opt}="${options[opt]}"`; })
			.join('')
		// ***************************************************************************

		+ ((options.data || '') == '' || typeof(options.data) != 'object' ? `` : ``
			+ Object.keys(options.data).map(function(key) {
				return ` data-${key}="${options.data[key]}"`
			}).join('')
		)
		+ 	` class="`
		+ 		`form-control`
		+ 		(options.class 	|| ``)
		+ 	`"`
		+ ((options.style || ``) == `` && ['number','tel'].indexOf(options.type) < 0
			? `` 
			: ` style="${
					resolvStyle($.extend({}, 
						(['number','tel'].indexOf(options.type) < 0 ? {} : { 'text-align': 'right' } ),
						(options.style || {})
					))
				}"`
		)
		+ ((options.datalist || '') == '' 
			? ((options.list || '') == '' ? '' : ' list="' + options.list + '"')
			: ' list="' + (options.id || '') + 'datalist"'
		)


		// **** configurar as chamadas dos metodos ****
		+ [`onchange`,`onclick`,`onfocus`,`onblur`]
			.filter(function(el) { return (options[el] || ``) != ``; })
			.map(function(opt) {
				return ` ${opt}="${opt + random}(this);`
					+ 	`resolvEvento('${opt}','${(options.id || options.name || '')}');`
					+ (opt != `onblur` || !options.ck_blur || !options.requiredFull ? `` : (options.ck_blur = false, ``)
						+ onblurRequired
					)
					+ 	`"`
			}).join('')
		+ [`onchange`,`onclick`,`onfocus`]
			.filter(function(el) { return (options[el] || ``) == ``; })
			.map(function(opt) {
				return ` ${opt}="resolvEvento('${opt}','${(options.id || options.name || '')}');"`
			}).join('')
		// ******************************************************

		+ (!options.ck_blur || !options.requiredFull ? `` : (options.ck_blur = false, ``)
			+ 	` onblur="${onblurRequired}`
			+ 		`resolvEvento('onblur','${(options.id || options.name || '')}');`
			+ 	`"`
		)

		+ 		((options.disabled 	|| ``) == `` ? `` : ` disabled`)
		+ 		((options.checked 	|| ``) == `` ? `` : ` checked`)
		+ 	">"
		+ 	((options.isTextarea || false) ? `${(options.value || '')}</textarea>` : `` )
		+ 	((options.enum || '') == '' ? `` : ``
			+ t(tab+1) 	+ 		Object.keys(options.enum).map(function(value) { 
									return `<option value="${value}">${options.enum[value]}</option>`;
								}).join(t(tab+1))
			+ t(tab) 	+ 	`</select>`
		)

		// **** Descrição de requerimento ****
		+ 	(!options.requiredFull ? `` : ``
			+ t(tab) 	+ `<div style="color:red;" id="${options.id}_obs"></div>`
		)






	var html = ''
		+ ((options.no_desc || '') != '' 
			? input
			: ''
			+ ( ['radio','checkbox'].indexOf(options.type) >= 0 && (options.no_changeLayout || '') == ''
				? ''
					+ t(tab)	+ ((options.inline || '' ) == '' 
						? `<table width="100%">`
						: `<table style="display:inline-block;padding-right: 20px;">`
					)
					+ t(tab+1)	+ 		`<tr>`
					+ t(tab+2)	+ 			`<td width='15px'>`
					+ t(tab*0)	+ 				tAjuste(input,3)
					+ t(tab+2)	+ 			`</td>`
					+ t(tab+2)	+ 			`<td align="left" style="vertical-align:bottom;padding-left:5px;">`
					+ t(tab*0)	+ 				tAjuste(label,3)
					+ t(tab+2)	+ 			`</td>`
					+ t(tab+1)	+ 		`</tr>`
					+ t(tab)	+ 	`</table>`
				: (options.type == 'file' && (options.upload || '') != ''
					? ''
						+ t(tab)	+ 	`<table width="100%">`
						+ t(tab+1)	+ 		`<tr>`
						+ t(tab+2)	+ 			`<td>`
						+ t(tab*0)	+ 				tAjuste(label + input,3)
						+ t(tab+2)	+ 			`</td>`
						+ t(tab+2)	+ 			`<td width='10%' align="left" style="vertical-align:bottom;padding-left:15px;">`
						+ t(tab+3) 	+ 				`<button id="${options.id}_btnUpload" title="Enviar"`
									+ 					` class="btn btn-warning btn-block"`
									+ 					` style="margin-top: 5px;"`
									+ 					` onclick="enviarArquivo${options.id}();"`
									+ 				`>`
						+ t(tab+4) 	+ 					`<i class="fa fa-upload"></i>`
						+ t(tab+3) 	+ 				`</button>`
						+ t(tab+2)	+ 			`</td>`
						+ t(tab+1)	+ 		`</tr>`
						+ t(tab)	+ 	`</table>`
						+ t(tab)	+ 	`<div id="${options.id}_desc_file"></div>`
						+ t(tab) 	+ 	`<div id="${options.id}_progressFile"></div>`
					: label + input
				)
			)
		)
		+ ((options.datalist || '') == '' ? '' : ''
			+ t(tab) 		+ '<div id="' + (options.id || '') + 'datalistDiv"></div>'
		)

		// **** preview de imagem caso input for type file em formato de imagem ****
		+ (options.fileType != 'img' ? '' : ''
			+t(tab+0)	+ 	`<div style="width:100%" class="text-center">`
			+t(tab+1)	+ 		`<img src="${(options.defaultImg || '')}" id="${options.id}preview" `
						+ 			` onerror="if(this.src != 'error.jpg') this.src='${(options.defaultImg || '')}';"`
						+ 			` style="max-width: 80%;max-height: 150px;"`
						+ 		`>`
			+t(tab+0)	+ 	`</div>`
		)

		+ t(tab)	+ 	`<script>`

		+ (!options.requiredFull ? `` : ``
			+ t(tab+1) 	+ 	`function check${random}(){`
			+ t(tab+2) 	+ 		`var op = arguments.length > 0 ? arguments[0] : 'check';`
			// + (typeof(options.required) == 'function' 
			// 	? t(tab+2) + "return (" + String(options.required) + "());"
			// 	: t(tab+2) + "return (resolvVal(\"" + options.id + "\") == '' ? 'Informe " + options.text + "' : true);"
			// )
			+ t(tab+2) 	+ 		`return (`
			+ t(tab+3) 	+ 			`resolvVal("${options.id}") == '' `
			+ t(tab+4) 	+ 				`? "Informe ${options.text}"`
			+ t(tab+4) 	+ 				`: ${typeof(options.required) == `function` ? `${String(options.required)}(op)` : `true`}`
			+ t(tab+2) 	+ 		`);`
			+ t(tab+1) 	+ 	`}`
		)
		// ******************************************************



		// ****  configurar as funções chamada pelos metodos ****
		+ [`onchange`,`onclick`,`onfocus`,`onblur`]
			.filter(function(el) { return (options[el] || ``) != ``; })
			.map(function(opt) { return ''
				+ t(tab+1)	+ 	`function ${opt + random}(el) { `
				+ t(tab+2)	+ (
								(typeof(options[opt]) == `string`)
								? options[opt]
								: `var func = ${String(options[opt])};`
								+ t(tab+2)	+ `func(el);`
							)
				+ t(tab+1)	+ 	`}`
			}).join('')
		// ******************************************************



		// ****  correção do bug de quebra de linha como valor padrão no textarea ****
		+ ((options.isTextarea || false) 
			? ''
			+ t(tab+1)	+ 	`setTimeout(function() { `
			+ t(tab+2)	+ 		`$("#${options.id}").val($("#${options.id}").val().replace(/<br>/gi, "\\n"));`
			+ t(tab+1)	+ 	`},1000);`
			: ''
		)
		// ***************************************************************************



		// ****  registrar eventos do teclado ****
		// + ( [`month`,`date`].indexOf(options.type) != -1 && (options.id || ``) != `` ? `` : `` )
		+ ( [`month`,`date`].indexOf(options.type) == -1 || (options.id || ``) == `` ? `` : ``
			+ t(tab+1)	+ 	`function momentMonth${capitalize(options.id)}(e,whichkey){`
			+ t(tab+2)	+ 		`if (whichkey == 114 && $("#${options.id}").is(":focus")) {`
			+ t(tab+3)	+ 			`e.preventDefault();`
			+ t(tab+3)	+ 			`$("#${options.id}").val(moment().format("${(options.type == `month` ? `Y-MM` : `Y-MM-DD`)}"));`
			+ t(tab+2)	+ 		`}`
			+ t(tab+1)	+ 	`}`
			+ t(tab+1)	+ 	`try { registerEventKeyboard.push("momentMonth${capitalize(options.id)}"); } catch(e) {}`
			// + ( registerEventKeyboard.push(`momentMonth${capitalize(options.id)}`), '' )
		)
		// ***************************************************************************



		// ****  verificar se tem que registrar para focar através do ENTER ****
		+ (
			(options.id || ``) == `` || options.type == `hidden`
			? ``
			: ((options.onEnter || '') == '' ? '' : ''
				+ t(tab+1)	+ 	`function onEnter${capitalize(options.id)}(e,whichkey){`
				+ t(tab+2)	+ 		`if (whichkey == 13 && $("#${options.id}").is(":focus")) {`
				// + t(tab+3)	+ 			`e.preventDefault();`
				+ t(tab+3)	+ 			`(${String(options.onEnter)}());`
				+ t(tab+2)	+ 		`}`
				+ t(tab+1)	+ 	`}`
				+ t(tab+1)	+ 	`try { registerEventKeyboard.push("onEnter${capitalize(options.id)}"); } catch(e) {}`
			)
			+ ((options.isTextarea || ``) != `` ? `` : ''
				+ t(tab+1)	+ `try { registerInputFocus.push(resolvEl("${options.id}")); } catch(e) {}`
			)
			// : t(tab+1) + `registerInputFocus.push(resolvEl("${options.id}").el[0]);`
		)
		// ***************************************************************************



		// ****  verificar se tem que construir um datalist ****
		+ ((options.datalist || '') == '' ? '' : ''
			+ t(tab+1)	+ 	`function onDataList${capitalize(options.id)}() { `
			// + t(tab+2)	+ 		`${(options.datalist.ajax || 'ajax')}(`
			+ t(tab+2)	+ (typeof(options.datalist.ajax || 'ajax') == 'string' 
							? (options.datalist.ajax || 'ajax') 
							: `window[(function(){ var func = ${String(options.datalist.ajax)}; return func(); })()]`
						) + `({`
			+ t(tab+3)	+ 			`param: ` + JSON.stringify(options.datalist.param || {}) + `,`
			+ t(tab+3)	+ 			`done: function(data) { `
			+ t(tab+4)	+ 				`data = JSON.parse(data);`
			+ t(tab+4)	+ 				`var grade = "<datalist id=\\"${(options.id || '')}datalist\\">";`
			+ t(tab+4)	+ 				`if (data[0].debug == "OK") { `
			+ t(tab+5)	+ 					`grade += data.map(function(dt) { `
			+ t(tab+6)	+ 						`return "<option value=\\"" + dt.${(options.datalist.input || 'id')} + "\\">"`
			+ t(tab+5)	+ 					`}).join("");`
			+ t(tab+4)	+ 				`}`
			+ t(tab+4)	+ 				`grade += "</datalist>";`
			+ t(tab+4)	+ 				`$("#${(options.id || '')}datalistDiv").html(grade);`
			+ t(tab+3)	+ 			`}`
			+ t(tab+2)	+ 		`});`
			+ t(tab+1)	+ 	`}`
			+ t(tab+1)	+ 	`onDataList${capitalize(options.id)}();`
		)



		// ****  verificar se tem que fazer upload de aquivo ****
		+ ((options.type || 'text') != 'file' || (options.upload || '') == '' ? '' : ''
			+ t(tab+1)	+ 	`function enviarArquivo${options.id}() { `
			+ t(tab+2)	+ 		`if (getBase64("${options.id}") == false) {`
			+ t(tab+3)	+ 			`return alert("Informe o arquivo!");`
			+ t(tab+2)	+ 		`} `
			+ t(tab+2)	+ 		`var validOnSend = ` + String(options.upload.onsend || function() { return true; }) + `;`
			+ t(tab+2)	+ 		`validOnSend = validOnSend();`
			+ t(tab+2)	+ 		`if (validOnSend != true) { `
			+ t(tab+3)	+ 			`if (typeof(validOnSend) == "string") alert(validOnSend);`
			+ t(tab+3)	+ 			`return;`
			+ t(tab+2)	+ 		`} `
			+ (typeof options.upload.path == 'string' 
				? ''
				+ t(tab+2)	+ 	`var path = '${options.upload.path}';`
				: ''
				+ t(tab+2)	+ 	`var path = ${String(options.upload.path)};`
				+ t(tab+2)	+ 	`path = path();`
			)
			+ t(tab+2)	+ 		`sendBase64({`
			+ t(tab+3)	+ 			`id: '${options.id}',`
			+ t(tab+3)	+ 			`div: '#${options.id}_progressFile',`
			+ ((options.upload.fileName || '') == '' ? '' : ''
				+ t(tab+3)	+ 		`fileName: '${options.upload.fileName}',`
			)
			+ t(tab+3)	+ 			`path,`
			+ t(tab+3)	+ 			`onstart: function(data='') { `
			+ t(tab+4)	+ 				`$("#${options.id}_btnUpload").attr('disabled', true);`
			+ t(tab+4)	+ 				`$("#${options.id}").attr('disabled', true);`
			+ t(tab+3)	+ 			`},`
			+ t(tab+3)	+ 			`ondone: function(data) { `
			+ t(tab+4)	+ 				`$("#${options.id}_btnUpload").attr('disabled', false);`
			+ ((options.fileType || '') == '' ? '' : ''
				+ t(tab+4)	+ 			`$("#${options.id}preview").attr('src', data);`
			)
			+ t(tab+4)	+ 				`$("#${options.id}").attr('disabled', false);`
			+ t(tab+4)	+ 				`alert('Arquivo enviado com sucesso!');`
			+ t(tab+3)	+ 			`},`
			+ t(tab+2)	+ 		`});`
			+ t(tab+1)	+ 	`}`
			+ t(tab+1)	+ 	`setTimeout(() => { `
			+ t(tab+2)	+ 		`$("#${options.id}").change(function() { `
			+ t(tab+3)	+ 			`setBase64(this, '${options.id}'`
						+ 				`${options.fileType == 'img' ? `, '${options.id}preview'` : ''}`
						+ 			`);`
						+ 			`$("#${options.id}_desc_file").html('');`
			+ t(tab+2)	+ 		`});`
			+ t(tab+1)	+ 	`}, 500);`
		)



		// ****  verificar se o campo tem mascara ****
		+ ((options.mask || '') == '' || (options.id || '') == '' ? '' : ''
			+ t(tab+1)	+ 	`$("#${options.id}")`
						+ 		`.mask("${options.mask}",${jsonToString(options.maskOption || {})});`
		)
		+t(tab)	+ 	`</`+`script>`
		// ***************************************************************************

	return html;
}

function resolvLabel(options, tab=0) { 
	/*
		options: {
			text: '' 		-- Conteudo da label
		}
	*/
	var html = ''
		+t(tab) 	+ 	"<label>"
		+t(tab+1) 	+ 		(options.text || '')
		+t(tab) 	+ 	"</label>"
	return html;
}

function resolvLegenda(options, tab=0) { 
	/*
		height: '20px' 				-- Altura do bloco da legenda
		width: 	'40px' 				-- Largura do bloco da legenda
		inline: (0|1) 				-- Caso verdadieiro os dados ficam numa unica linha
		info: [ 					-- Informações contidas na legenda
			{
				desc: '' 			-- Descrição da legenda
				color: '' 			-- Cor demostrativa (padrão para css podendo nome, hex(#000), rgb(0,0,0))
			}
		]
		classDiv: '' 				-- Div de referencia
		click: function( obj ){} 	-- Evento de click, tem como callback envia o objeto que clicou
		descForm: '' 				-- Parametro informativo
	*/
	var tr = t(tab+1) + "<tr>";
	var trF = t(tab+1) + "</tr>";

	var random;
	do { 
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	var click = options.click || '';
	var onClick = click == '' ? '' : " class='cursorClick' onclick='legedaClick" + random + "(%0%);'";

	var html = ''
		+ (function(info) { 
			var cels = ''
				+t(tab)		+ 	`<table width=''>`
			for (var i = 0; i < info.length; i++) { 
				info[i].status = (info[i].status || 'show');

				cels += 	''
				// +t(tab+1)	+ 		`<tr>`
							+ (!(options.inline || false) ? tr : (i == 0 ? tr : ''))
				+t(tab+2)	+ 			`<td width='${(info[i].width || '40px')}'${onClick.replace('%0%',i)}>`
				+t(tab+3)	+ 				`<div`
							+ 					` style='`
							+ 						((info[i].color || '') == '' ? '' : "color:" 			+ info[i].color + ";")
							+ 						((info[i].color || '') == '' ? '' : "background-color:" + info[i].color + ";")
							+ 						`height:${	(options.height || '20px')};`
							+ 						`width:${	(options.width 	|| '40px')};`
							// + 						"border: solid black 1px;"
							+ 					`'`
							+ 				`>`
							+ 				`</div>`
				+t(tab+2)	+ 			`</td>`
				+t(tab+2)	+ 			`<td${onClick.replace('%0%',i)} id='legenda${random}${i}'`
							+ 				`style="text-decoration:${info[i].status == 'show' ? 'none' : 'line-through'};"`
							+ 			`>`
				+t(tab+3)	+ 				`&nbsp;${info[i].desc}&nbsp;&nbsp;&nbsp;&nbsp;`
				+t(tab+2)	+ 			`</td>`
							+ (!(options.inline || false) ? trF : (i == info.length ? trF : ''))
				// +t(tab+1)	+ 		`</tr>`
			}
			cels += ''
				+t(tab)		+ 	`</table>`
				+ (click == '' ? '' : ''
					+t(tab)		+ 	`<script>`
					+t(tab+1) 	+ 		`function legedaClick${random}(i){`
					+t(tab+2) 	+ 			`var status = ((resolvEl('${options.descForm}').obj.info[i].status || 'show') == 'show' ? 'hide' : 'show');`
					+t(tab+2) 	+ 			`resolvEl('${options.descForm}').obj.info[i].status = status;`
					+t(tab+2) 	+ 			`$('#legenda${random}' + i)`
					+t(tab+3) 	+ 				`.css('text-decoration', status == 'show' ? 'none' : 'line-through');`
					+t(tab+2) 	+ 			`var func = ${String(click)};`
					+t(tab+2) 	+ 			`func(resolvEl('${options.descForm}').obj.info[i] );`
					+t(tab+1) 	+ 		`}`
					+t(tab)		+ 	"</"+"script>"
				)

			return  cels;
		}((options.info || [])));

	return html;
}

function resolvMenu(options={}, tab=0) { 
	/*
		options: {
			descForm: '' 		-- Identificador
			no_link: (0|1) 		-- Não linqua no menu para redirecionar o conteudo
			abas: [
				{
					text: '' 	-- Descricao Menu
					icon: '' 	-- icone para acompanha a descricao
					click: '' 	-- Função para chamar quando clicar na aba do menu
					ctx: {} 	-- Conteudo Referente
				}
			]
		}
	*/
	if ((options.descForm || '') == '') return '';

	var html = ''
		+t(tab)		+ 	'<ul class="nav nav-tabs"'
					+ 		' style="display:' + ((options.abas || []).length < 2 ? 'none' : 'block' ) + '"'
					+ 	'>'
	for (var i = 0; i < (options.abas || []).length; i++) { 
		html += ''
		+t(tab+1)	+ 	"<li name='" + options.descForm + "' id='" + options.descForm + i + "'"
					+ 		" onclick='"
					+ 			"mudarPagina("
					+ 				"this,"
					+ 				"\"" + options.descForm + "Ctx" + i + "\","
					+ 				"\"" + options.descForm + "\","
					+ 				"\"" + options.descForm + "Ctx\""
					+ 			");"
					+ 			(options.abas[i].click || '')
					+ 		"'"
					+ 		" class='" + (i == 0 ? 'active' : '') + "'"
					+ 	">"
		+t(tab+2)	
		+ ((options.no_link || '') == '' 
			? 				"<a href=\"#" + options.descForm + "Ctx" + i + "\""
			: 				"<a href=\"javascript:void(0)\""
		)
		// +t(tab+2)	+ 		"<a href=\"javascript:void(0)\""
					+ ((options.abas[i].accesskey || '') == ''  ? '' : ''
						+ 		" accesskey='" + options.abas[i].accesskey + "'"
						+ 		" title='Alt + " + options.abas[i].accesskey + "'"
					)
					+ 		">"
		+t(tab+3)	+ 			((options.abas[i].icon || '') != '' ? "<i class=\"fa fa-"+options.abas[i].icon+"\"></i> " : '')
					+ 			(options.abas[i].text || '')
		+t(tab+2)	+ 		"</a>"
		+t(tab+1)	+ 	"</li>"
	}
	html += ''
		+t(tab)		+ '</ul>'

	for (var i = 0; i < (options.abas || []).length; i++) { 
		html += ""
		+t(tab)		+ 	"<div"
					+ 		" id='" + options.descForm + "Ctx" + i + "'"
					+ 		" name='" + options.descForm + "Ctx'"
					+ 		" style='"
					+ 			(i == 0 ? '' : "display:none;")
					+ 		"'"
					+ 	">"
					+ 		resolvConfig(options.abas[i].ctx || {},tab+1)
		+t(tab)		+ 	"</div>"
	}
	return html;
}


function resolvRow(options, tab=0) { 
	return ""
		+t(tab)	+ 	"<div class='row'>"
				+ (function(array){
					var html = '';
					for (var i = 0; i < array.length; i++) html += resolvConfig(array[i],tab+1);
					return html;
				}(options))
		+t(tab)	+ 	"</div>";
}

function resolvStyle(obj) { 
	// var html = '';
	var keys = Object.keys(obj);

	// return keys.map(k => k + ':' + obj[k] + ';').join('');
	return keys.map(function(k) { return k + ':' + obj[k] + ';'; }).join('');

	// for (var i = 0; i < keys.length; i++)
	// 	html += keys[i] + ':' + obj[keys[i]] + ';';
	// return html;
}

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


var modalconsulta = `<!-- ********************************************************************************************** -->
<!-- * Modal Consulta Global -->
<!-- ********************************************************************************************** -->
<div class="modal fade" id="modalConsulta" role="dialog">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" id="closeModaBuscaAtendimento" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Consultar <spam></spam>:</h4>
			</div>
			<div class="modal-body">
				<table width="100%" style="display:none;">
					<tr>
						<td>
							Pesquisar: 
							<input class="form-control" style="resize:vertical;">
						</td>
						<td>
							<spam style='color:white'>.</spam>
							<button class="btn btn-block btn-search">
								<i class="fa fa-search"></i>
							</button>
						</td>
					</tr>
				</table>
				<br>
				<div class="conteudo"></div>
			</div>
			<div class="modal-footer" style="margin: 0;">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Fechar
				</button>
			</div>
		</div>
	</div>
</div>
<script>
$('#modalConsulta').on('shown.bs.modal', function () {
	// $('#modalConsulta').find('input').trigger('focus');
	$(".btn-search")[0].click();
});
$('#modalConsulta').on('hidden.bs.modal', function () {
	$('#modalConsulta').find('input').val('');
	$('#modalConsulta').find('.conteudo').html('');
});

function abrirModalConsulta(options) { 
	$("#modalConsulta").modal('show').find('spam').html((options.search || '')).parent('.modal-body')
	$("#modalConsulta").find('.btn-search')[0].onclick = options.click
}
</script>`;
var modalimagens = `<!-- ********************************************************************************************** -->
<!-- * Modal Para Visualizar Fotos -->
<!-- ********************************************************************************************** -->
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" id='modalViewFoto' tabindex="-1" role="dialog" aria-hidden="true">
	<div class="pswp__bg"></div>
	<div class="pswp__scroll-wrap">
		<div class="pswp__container">
			<div class="pswp__item"></div>
			<div class="pswp__item"></div>
			<div class="pswp__item"></div>
		</div>
		<div class="pswp__ui pswp__ui--hidden">
			<div class="pswp__top-bar">
				<div class="pswp__counter"></div>
				<button class="pswp__button pswp__button--close" id="fecharModalViewFoto" title="Close (Esc)"></button>
				<button class="pswp__button pswp__button--share" title="Share"></button>
				<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
				<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
				<div class="pswp__preloader">
					<div class="pswp__preloader__icn">
						<div class="pswp__preloader__cut">
							<div class="pswp__preloader__donut"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
				<div class="pswp__share-tooltip"></div> 
			</div>
			<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
			</button>
			<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
			</button>
			<div class="pswp__caption">
				<div class="pswp__caption__center"></div>
			</div>
		</div>
	</div>
</div>`;
var modalmenu = `<script>
function mudarPagina(el, divId, name, nameDiv) {
	var elementoMenu = document.getElementsByName(name);
	var elementoContMenu = document.getElementsByName(nameDiv);
	for (var i = 0; i < elementoMenu.length; i++) {
		$(elementoMenu[i]).attr('class','');
		$(elementoContMenu[i]).css('display','none');
	}
	$(el).attr('class','active');
	$("#" + divId).css('display','block');
}
</script>`;

function resolvConfigModal(obj) { 
	var html = '';
	
	var checkModalconsulta = (function (obj) {
// function resolv(obj) {
	return resolvFindParam(obj,'codigoConsulta') && (obj.dist || '').indexOf('B') >= 0;
// }
	}(obj));
	if (checkModalconsulta) { html += modalconsulta; }
	var checkModalimagens = (function (obj) {
// function resolv(obj) {
	return resolvFindParam(obj,'fotos');
// }
	}(obj));
	if (checkModalimagens) { html += modalimagens; }
	var checkModalmenu = (function (obj) {
// function resolv(obj) {
	return resolvFindParam(obj,'menu');
// }
	}(obj));
	if (checkModalmenu) { html += modalmenu; }

	if (t().indexOf('\n') == -1) html.replace(/\n|\t/g, '');
	return html;
}

	// fim função de resolução

function resolvEl(id,cla='') { 
	var ids 		= returnIdObj(objRefConfig_Global);
	var map 		= ids.map(function(e){ return e.id; });
	var objReturn 	= ids[map.indexOf(id)];

	if (ids[map.indexOf(id)].parent == 'codigoConsulta') { 
		cla = cla.indexOf('select') == 0 ? 'select' : cla;
		objReturn.el = $("#" + id).find("." + cla).find(cla == 'select' ? 'select' : "input");
	} else if (objReturn.parent == 'input' && objReturn.obj.type == "radio") { 
		var els = document.getElementsByName(objReturn.obj.name);
		for (var i = 0; i < els.length; i++) { 
			if (els[i].checked) objReturn.el = $(els[i]);
		}
	} else { 
		objReturn.el = $("#" + id);
	}
	return objReturn;
}

function resolvVal(id) { 
	var el = resolvEl(id, (arguments[1] || ''));
	var func = "val";

	if (el.parent == 'codigoConsulta') { 
		var getDesc = arguments[1] == 'selectDesc';
		var isSelect = arguments[1].indexOf('select') == 0;
		if (arguments.length > 2 && isSelect) 	return el.el.val(arguments[2]).trigger('change');
		if (arguments.length > 2) 				return el.el.val(arguments[2]);
		if (getDesc) 							return el.el[0].options[el.el[0].selectedIndex].innerHTML;
												return el.el.val();
	} else { 
		var value = (arguments[1] != undefined ? arguments[1] : el.obj.value);

		switch( (((el.obj || {}).style || {})["text-transform"] || '').toLowerCase() ) { 
			case 'uppercase': 	value = (value || '').toUpperCase(); break;
			case 'lowercase': 	value = (value || '').toLowerCase(); break;
			case 'capitalize': 	value = capitalize((value || '')); break;
		}

		if (['div','spam'].indexOf(el.parent) != -1) func = 'html';

		if ((el.obj.isMonth || false) && arguments[1] != undefined) {
			if ((value || '') == '') { 
				$("#"+id+'Datepicker').val('');
			} else { 
				$("#"+id+'Datepicker').datepicker('setDate', new Date(value+'-02'));
			}
		}

		if (el.obj.type == 'file') { 
			if (arguments[1] != undefined) { 
				$('#' + id + '_desc_file').html(arguments[1]);
				if (el.obj.fileType == 'img') { 
					var nameFile = arguments[1];
					setTimeout(function() { 
						var path = typeof el.obj.upload.path == 'string' ? el.obj.upload.path : el.obj.upload.path();
						$('#'+ id + 'preview').attr('src', path + '/' + nameFile.replace(/ /g, '_'));
					},350);
					// if (path[path.length-1] != '/') path += '/';
					// console.log(path + '/' + arguments[1]);
				}
				return;
			} else {
				var val = el.el[func]().replace(/\\/g, '/');
				val = val.substring(val.lastIndexOf('/')+1, val.length);
				if (val == '') val = $('#' + id + '_desc_file').html();
				return val;
			}
		}

		if (el.obj.type == 'checkbox' && ([0,1]).indexOf(arguments[1]) >= 0) {
			value = arguments[1] == 1;
		} else if (el.obj.type == 'checkbox') { 
			return el.el[0].checked;
		}

		if (
			el.obj.type == 'radio' && arguments[1] != undefined && el.el.attr('id') != id
		) { 
			var setValue = -1;
			var els = document.getElementsByName(id);
			for (var i = 0; i < els.length; i++) {
				if (els[i].value == arguments[1]) {
					els[i].checked = true;
					setValue = i;
				}
			}
			if (setValue >= 0) return els[setValue];
		}

		if (arguments.length > 1) 	return el.el[func]( value );
									return el.el[func]();
	}
}

function resolvDisabled(id, cla='') { 
	var el = resolvEl(id, cla);

	if (el.parent == 'codigoConsulta') {
		if (arguments.length > 2) {
			$("#"+id).find('button').attr('disabled',(arguments[2] || false))
			return el.el			.attr('disabled',(arguments[2] || false));
		} else {
			$("#"+id).find('button').attr('disabled',true);
			return el.el			.attr('disabled',true);
		}
	} else {
		if (['div','spam'].indexOf(el.parent) < 0) { // se NÃO for div
			if ((el.obj.isMonth || false)) $("#"+id+'Datepicker').attr('disabled', (arguments[1] || false));

			if (arguments.length > 1) 	return el.el.attr('disabled', (arguments[1] || false) );
										return el.el.attr('disabled', true);
		}
	}
}

function resolvVisibled(id, cla='') { 
	var el = resolvEl(id, cla);

	if (el.parent == 'codigoConsulta') {
		return el.el.parent().parent().css('display', (arguments[2] || 'none'));
	} else {
		if (['div','spam'].indexOf(el.parent) < 0) { // se NÃO for div
			var keys = Object.keys(el.obj);
			var tiposDiv = ['idDiv','classDiv','styleDiv','clickDiv','isRow'];

			for (var i = 0; i < keys.length; i++) { 
				if (tiposDiv.indexOf(keys[i]) >= 0) { 
					return el.el.parent().css('display',(arguments[1] || 'none'));
				}
			}

			$("#label_"+id).css('display', (arguments[1] || 'none'));
			return el.el.css('display', (arguments[1] || 'none') );
		} else {
			return el.el.css('display', (arguments[1] || 'none') );
		}
	}
}

function resolvEvento(ev, id) { 
	/*
		registerEventAll: {
			evento: '' 			evento esperado
			id: ''				campo esperado
			func: function 		a rotina em si
		}
		Eventos: 
			input:
				onchange
				onclick
				onfocus
				onblur
			codigoConsutla:
				trigger
	*/
	registerEventAll.forEach(function(evento) { 
		if (evento.evento == ev && evento.id == id) { 
			evento.func();
		}
	});
}

function jsonToString(obj,tab=0,indent=false) { 
	if (typeof(obj) != 'object') return false;

	var keys = Object.keys(obj);
	var text = (isNaN(keys[0]) ? '{' : '['); // (indent ? t(tab) : '') +

	for (var i = 0; i < keys.length; i++) { 
		if (
			['undefined','null','xml'].indexOf(typeof(obj[keys[i]])) != -1 ||
			obj[keys[i]] == null
		) continue;

		text += ''
			+ (['{','['].indexOf(text) < 0 ? ',' : '')
			+ (indent ? t(tab+1) : '')
			+ (isNaN(keys[i]) ? "\"" + keys[i] + "\":" : '')

		switch( typeof(obj[keys[i]]) ) { 
			case 'number': 
			case 'boolean': text += obj[keys[i]]; 								break;
			case 'string': 	text += "\"" + obj[keys[i]] + "\""; 				break;
			case 'object': 	text += jsonToString(obj[keys[i]],tab+1,indent); 	break;
				// text += (indent ? t(tab+1) : '') + jsonToString(obj[keys[i]],tab+1,indent); break;
			case 'function': 
				text += indent ? ajusteTabFunc(obj[keys[i]],tab+1) : String(obj[keys[i]]); break;
		}
	}
	text += (indent ? t(tab) : '') + (isNaN(keys[0]) ? '}' : ']');
	return text;
}

function ajusteTabFunc(func,tab=0,initTab=false) { 
	if (typeof func == 'function') func = String(func);

	func = func.replace(/&nbsp;/g, '[&nb;]');
	func = func.replace(/ /g, '&nbsp;');
	func = func.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

	while (func.indexOf('&nbsp;') == 0) { 
		func = func.replace('&nbsp;','');
	}
	func = func.split('\n');

	var defaultTab = 0, contTabIni, linha;
	for (var i = 1; i < func.length; i++) {
		contTabIni = 0
		linha = func[i].split('&nbsp;');
		for (var j = 0; j < linha.length; j++) {
			if (linha[j] == '') contTabIni++;
			else 				j = linha.length;
		}
		if (defaultTab == 0 || contTabIni < defaultTab) defaultTab = contTabIni;
	}
	for (var i = 1; i < func.length; i++) {
		linha = func[i].split('&nbsp;');
		linha.splice(0, defaultTab);
		func[i] = linha.join('&nbsp;');
	}

	func = func.join('\n');
	func = func.replace(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g, '\t');
	func = func.replace(/&nbsp;/g, ' ');
	func = func.replace(/\[&nb;\]/g, '&nbsp;');
	func = (initTab ? t(tab).replace('\n','') : '') + tAjuste(func, tab);
	return func;
}

function t() { 
	var num = (arguments[0] || 0);
	var tab = '\n';
	for (var i = 0; i < num; i++) tab += '\t'
	return returnObjIdentado_Global ? tab : '';
}

function tirarAcentuacao(texto) { 
	var chars = [
		'áàãäâÃÂÁÀÄéèëêÉÈËÊíìïîÍÌÏÎóòôõöÕÔÓÒÖúùüûÚÙÜÛýÿÝñÑçÇ°º¹²³ÅÂž¡ËØŽƒ‰ŠÐ×—ß÷',
		'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuuuuuyyYnNcCoo123AAziEOZF%SDX-B/'
	]
	var char3 = '§´ª£¢¬¤¬©¨«°†¹®¶¢¼©€®’½µ¶¢™“¼„¢“¿±˜þ¾¯•‡„«';

	for (var i = 0; i < chars[0].length; i++) 
		texto = texto.replace( new RegExp(chars[0][i], 'g'), chars[1][i] );

	for (var i = 0; i < char3.length; i++) 
		texto = texto.replace( new RegExp(char3[i], 'g'), '' );

	texto = texto.replace(/œ/g, "AE");
	texto = texto.replace(/æ/g, "AE");
	texto = texto.replace(/Æ/g, "AE");
	texto = texto.replace(/™/g, "TM");
	texto = texto.replace(/…/g, "...");

	return texto;
}

function prefixedComand() { 
	// navigator.appCodeName
	// navigator.platform
	// navigator.userAgent

	// "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
	// "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0"
	// "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3; rv:11.0) like Gecko"

	if ($.browserDetection(true) == 'Chrome'	){ return 'Alt + '; 			}
	if ($.browserDetection(true) == 'IE11'		){ return 'Alt + '; 			}
	if ($.browserDetection(true) == 'Firefox'	){ return 'Alt + Shift + '; 	}

	return '';
}

function returnDescAccesskey(text, options) { 
	/*
		options: {
			accesskey: ''			-- Tecla do atalho
			numKeyVerifAlt: 0 		-- Numero de caracteres que vai verificar dentro do text default = text.length
		}
	*/
	if ((options.accesskey || '') != '') {
		if (!testP(options.numKeyVerifAlt)) options.numKeyVerifAlt = text.length;
		// if ((options.numKeyVerifAlt || '') == '') options.numKeyVerifAlt = text.length;
		var textT = text.toLowerCase();

		for (var i = 0; i < options.numKeyVerifAlt && i < text.length; i++) {
			if (textT[i] == options.accesskey.toLowerCase()) {
				text = ""
					+ (i == 0 ? '' : text.substring(0, i))
					+ "<spam style='text-decoration: underline;'>" + text[i] + "</spam>"
					+ text.substring(i+1,text.length);
				i = text.length;
			}
		}
	}
	return text;
}

// Teste parametro retorna se diferente de ( undefined | null | 0 | '' )
function testP(param) { 
	return (param || '') != '';
}

function resolvConfig(options, tab=0, isRegister=false) { 
	var keys = Object.keys(options);
	var html = '';
	// var htmlModal = '';

	if (isRegister) { 
		var objRegisted = returnIdObj(options);
		if (objRegisted.length) { 
			desregistrarConfig(objRegisted[0][objRegisted[0].tipoCampo]);
		}
		objRefConfig_Global.push(options);
		// htmlModal += resolvConfigModal(objRefConfig_Global);
	}

	for (var i = 0; i < keys.length; i++) { 
		try { 
			// html += document['resolv' + capitalize(keys[i])](options[keys[i]]);
			html += !isNaN(keys[i]) 
				? resolvConfig(options[keys[i]], tab) 
				: resolvGlobalParam(options[keys[i]], tab, window['resolv' + capitalize(keys[i])](options[keys[i]], tab));
		} catch(e) { 
			console.error(e);
			// console.error('Falha ao tentar rodar função "resolv' + capitalize(keys[i]) + "(" + options[keys[i]] + "," + tab + ")'");
		}
	}
	return html;
}

function resolvPath(id, obj=objRefConfig_Global) { 
	var path 	= [],
		refId 	= returnRefId(),
		key 	= Object.keys(obj),
		idParam = key.filter(function(e) { return refId.indexOf(e) != -1; }),
		pathTemp, x;

	if (idParam.length > 0) { 
		for (var i = 0; i < idParam.length; i++) { 
			if (obj[idParam[i]] == id) { 
				path.push(idParam[0]);
				return path;
			}
		}
	}

	for (var i = 0; i < key.length; i++) { 
		x = key[i];
		if (typeof(obj[x]) == 'object') { 
			pathTemp = resolvPath(id, obj[x]);

			if (pathTemp != false && pathTemp.length != 0) { 
				path.push(x + ( x == 'menu' ? '-' + (obj[x].descForm || 'error') : '') )
				pathTemp.forEach(function(e) { path.push(e) });
				return path;
			}
		}
	}
	return path;
}

function desregistrarConfig(id) { 
	var path = resolvPath(id);
	if (path.length) { 
		path.splice(1, path.length-1);
		path.forEach(function(p,i) { 
			if (p.indexOf('menu') == 0) path[i] = 'menu';
		});
		eval(`objRefConfig_Global[${path.join('],[')}] = undefined;`);
	}
}

function resolvGlobalParam(options, tab, html) { 
	/*
		options: {
			classDiv: '' -- Colocar o parametro em volta de uma div e com a class especifica
			styleDiv: '' -- Colocar o parametro em volta de uma div e com o style especifico
			isRow: (0|1) -- Colocar o parametro em volta de uma div com a class row
		}
	*/
	var valid = [
		{ param: 'idDiv' 	, attr: 'id' 		, },
		{ param: 'classDiv' , attr: 'class' 	, },
		{ param: 'styleDiv' , attr: 'style' 	, valid: 'resolvStyle' },
		{ param: 'clickDiv' , attr: 'onclick' 	},
	], param = '', result;
	var random;

	if ( valid.filter(function(e) { return (options[e.param] || '') != '' }).length > 0 ) {
		valid.forEach(function(x) {
			if ((options[x.param] || '') != '') {

				do { 
					random = parseInt( Math.random() * 100000 );
				} while (registerRandom_Global.indexOf(random) != -1);
				registerRandom_Global.push(random);

				if (typeof(options[x.param]) == 'function') { 
					window['click'+random] = options[x.param];
					param += ` ${x.attr}="click${random}();"`;
				} else {
					result = typeof(options[x.param]) == 'string' ? `"${options[x.param]}"` : JSON.stringify(options[x.param]);
					result = `${(x.valid || '')}(${ result })`;
					param += ` ${x.attr}="${eval( result )}"`;
				}
			}
		});

		html = ""
			// + 	" class='" + options.classDiv + "'"
			+ 	t(tab) 		+ 	"<div" + param + ">"
			+ 	tAjuste(html,1)
			+ 	t(tab) 		+ 	"</div>"
	}

	if ((options.isRow || '') != '') { 
		html = ""
			+ 	t(tab) 		+ 	"<div class='row'>"
			+ 	tAjuste(html,1)
			+ 	t(tab) 		+ 	"</div>"
	}

	return html;
}

function tAjuste(text,ajuste) { 
	return t().indexOf('\n') < 0 ? text : text.split('\n').join( t(ajuste) );
}

function resolvFindParam(obj, search) { 
	var keys = Object.keys(obj), isFind = false;

	if (keys.indexOf(search) >= 0) return true;

	for (var i = 0; i < keys.length; i++) {
		if (typeof(obj[keys[i]]) == 'object') isFind = resolvFindParam(obj[keys[i]], search);
		if (isFind) i = keys.length;
	}

	return isFind;
}

function resolvParamAjax(options) { 
	var param = "";
	if (Object.keys((options.param || ['']))[0] == '0') { 
		for (var i = 0; i < (options.param || []).length; i++) { 
			param += ''
				+ (i == 0 ? '' : ',')
				+ `'${options.param[i].key}':${String(options.param[i].val)}`;
		}
		param += ',';
	} else { 
		param = Object.keys(options.param).map(function(key) { 
					return `'${key}':${String(options.param[key])}`;
				}).join(',') + ',';
	}
	return param;
}


/* Envetos de teclado */
$(document).ready(function() {
	if (navigator.appName != "Microsoft Internet Explorer")
		document.captureEvents(Event.KEYDOWN);
	document.body.onkeydown = NetscapeResolvKeyDown;
	function NetscapeResolvKeyDown(key,e) { 
		ResolvKeyDown(key, key.which);
	}
	if (window.event) ResolvKeyDown(window.event, window.event.keyCode);
	function ResolvKeyDown(e, whichkey) { 
		// console.log(whichkey);
		var setComand = false;


		if (whichkey == 115 && $(".codigoConsulta").is(':focus')) {
			var itens = $(".codigoConsulta");

			$.each(itens, function(i,x){
				if ($(x).is(':focus')) {
					window['pesquisa' + $(x).data('ref')]();
				}
			})
		}

		var proximoIndice, setInput = false;
		if (whichkey == 13 && registerInputFocus.filter(function(e){ return $(e.el[0]).is(':focus') }).length == 1 ) {
			$.each(registerInputFocus, function(i,x) {
				if ($(x.el[0]).is(":focus") && !setInput) {
					setInput = true;

					x.el[0].blur();
					if (x.parent == 'codigoConsulta') return false;

					var teste = {};
					teste[x.parent] = x.obj;
					teste = serealizeForm(teste);
					if (!teste.valid) {
						setComand = true;
						return false;
					}

					if ((x.obj.onEnter || '') == '') {
						proximoIndice = -1;
						for (var j = (i+1); j < registerInputFocus.length; j++) {
							if (!$(registerInputFocus[j].el[0]).attr('disabled')) {
								proximoIndice = j;
								j = registerInputFocus.length;
							}
						}
		
						console.log(registerInputFocus[proximoIndice]);
						registerInputFocus[proximoIndice].el[0].focus();
						setComand = true;
					} else {
						x.el[0].focus();
					}

				}
			})
		}

		if (!setComand) {
			registerEventKeyboard.forEach(function(x){
				window[x](e,whichkey);
			});
		}
	}
});
