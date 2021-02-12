
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
