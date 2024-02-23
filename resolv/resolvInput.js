
function resolvTextarea(options, tab = 0) {
	options.isTextarea = true;
	options.no_tab = true;
	options.style = $.extend({}, { 'resize': 'vertical' }, options.style);
	return resolvInput(options, tab);
}

function resolvInput(options, tab = 0) {
	/*
		options: {
			text: '' 							-- Texto de acompanhamento
			id: '' 								-- Id do campo
			name: '' 							-- Name do campo
			class: '' 							-- Classe do campo
			value: '' 							-- Value do campo
			val: '' 							-- Value do campo
			title: '' 							-- Title do campo
			type: '' 							-- Type do campo
			.. 									-- Caso type 'number' ou 'tel' alinha o texto a direta
			list: '' 							-- List do campo para datalist, se não tiver definido datalista param
			placeholder: '' 					-- Placeholder do campo
			autocomplete: '' 					-- Autocomplete do campo
			autofocus: (0|1) 					-- Autofocus do campo
			accesskey: '' 						-- Accesskey do campo, atalho para focar no campo ou clicar no botão
			data: { 							-- Acrescenta o atributos data no campo (data-key='value')
				key: value
			}

			isTextarea: (0|1)					-- Se o campo é textarea
			ck_editor: (0|1)					-- Caso seja textarea usa o ck_editor
			cols: num 							-- Col para quando o campo for textarea
			rows: num 							-- Row para quando o campo for textarea

			disabled: (0|1) 					-- Se o campo começa disabled
			checked: (0|1) 						-- Se o campo começa checked
			style: {} 							-- Objeto com atributos cujo os nomes são os atributos do CSS
			styleLabel: {} 						-- Objeto com atributos cujo os nomes são os atributos do CSS para Label
			required: '' 						-- Se o campo é obrigatório
			maxlength: '' 						-- Limite máximo de caracteres

			onchange: function 					-- Método chamado ao mudar valor

			numKeyVerifAlt: text.length 		-- Verificar até tantos caracteres percorrer para achar um math com accesskey
			classDiv: '' 						-- Deixa o input por volta de um div
			onEnter: function(e,whichkey) 		-- Função disparada quando o campo está focado e aperta o ENTER
			... 								-- e = evento do click | whichkey = código da tecla
			no_changeLayout: (0|1) 				-- Se vai mudar o layout para tabela contendo o campo e a descrição na frente
			radio: [ {} ] 						-- Array de objetos input, com características herdadas do obj pai
			inline: (0|1) / num 				-- Para radio, campos alinhados lado a lado, se false fica embaixo do outro
			... 								-- Quando > 1 significa o numero de campos que vai mostrar por linhas
			no_desc: (0|1) 						-- Sem Label
			datalist: { 						-- Colocar um autocomplete no campo
				ajax: '' 						-- Se a listar vai vir dinamicamente do servidor
				param: { key: value } 			-- Parâmetros da requisição
				input: '' 						-- Campo usado para identificar value dos options
			}
			fileType: ('img') 					-- Caso o input for do tipo file, pode delimitar o tipo de arquivo
			... 								-- No caso 'img' só vai permitir tipo imagem e ter um preview
			firstImg: (0|1) 					-- Caso a imagem vem primeiro que o campo
			upload: { 							-- Caso tipo campo seja file, são as configurações de upload
				ajax: '' 						-- Função ajax que vai enviar o arquivo
				path: (function|'') 			-- Caminho para salvar o arquivo
				... 		 					-- Função caso precisa pegar algum valor dinâmico
				aws: { 							-- Parâmetros de referencia caso use arquivos salvas na AWS
					bucket: '' 					-- Nome do bucket S3 que está os arquivo
					region: '' 					-- Região onde está os arquivos
				}
				fileName: '' 					-- Nome do arquivo a ser salvo (padrão é vir o nome original)
				param: { } 						-- Parâmetros adicionais para enviar no ajax
				no_alert: (0|1) 				-- Não mostra um alerta quando termina de enviar o arquivo
				onsend: function() 				-- Validar se pode ou não enviar aquivo
				ondone: function(options, data) -- Dispara quando termina de enviar o arquivo
				... 							-- 	Var data é o retorno do ajax
				... 							-- 	Obj options
				... 							-- 		"id":"id"
				... 							-- 		"div":"#div_id"
				... 							-- 		"fileName":"name"
				... 							-- 		"path":"./path/"
				... 							-- 		"onstart":function(data='') {
				... 							-- 			(o data do parâmetro é esse mesmo objeto data)
				... 							-- 		}
				... 							-- 		"ondone":function(data) {
				... 							-- 			(o data do parâmetro é esse mesmo objeto data)
				... 							-- 		}
				... 							-- 		"totalChart":num
				... 							-- 		"limitChar":7000000 (default)
				... 							-- 		"tempName":"nameTemp"
				... 							-- 		"ext":"ext"
			}
			defaultImg: 'path' 					-- Caso input type file/img colocar uma foto padrão de preview
			OR defaultImg: { 					-- Pode ser definido como objeto
				path: '' 						-- Caminho da imagem padrão
				width: '80%' 					-- largura maxima que pode chegar
				height: '150px' 				-- altura maxima que pode chegar
			}
			enum: { 							-- Indica que o campo será um select com opções pré-definidas
				value: desc 					-- Ex: <option value="value">desc</option>
			}
			enumAjax: { 						-- Indica que o campo será um select com opções dinâmicas
				url: '' 						-- opcional, quando o caminho for diferente do padrão
				param: {} 						-- parâmetros da requisição
				value: '' 						-- value do options do select
				desc: '' 						-- descrição do options do select
				default: { 						-- Valor padrão a ser selecionado
					value: desc
				}
				onload: function(data) {} 		-- Função chamada após renderizar o select
				... 							-- Tem como parâmetro os dados carregados do ajax
			}
			mask: '' 							-- Usar Mascara no campo
			no_mask_money: (0/1) 				-- Desabilitar o prefixo do campo money
			maskOption: {} 						-- Opções para usar com a mescara
			no_tab: (0|1) 						-- Quando digitar TAB, anula evento padrão, coloca valor correspondente
			... 								-- Padrão true quando for textarea
			is_tel: (0|1) 						-- Set mascara como telefone com DDD + numero dinâmico para 9 digito
			is_cpf_cnpj: (0|1) 					-- Set mascara como CPF ou CNPJ
			toggle: (0|1) / { 					-- Define que vai usar a biblioteca toggle do bootstrap
				on:"Ativo" 						-- Texto que vai aparecer quando estiver ativo
				off:"Inativo" 					-- Texto que vai aparecer quando estiver inativo
				onstyle:"success" 				-- Cor que vai aparecer quando estiver ativo
				offstyle:"danger" 				-- Cor que vai aparecer quando estiver inativo
			}
			group: [ 							-- Monta um input group
				"i" 							-- Informa para colocar o input
				OR "text" 						-- Informa o texto que vai acompanhar o input
				OR {
					text: "" 					-- Informa o texto que vai acompanhar o input
					click: "" 					-- Evento de click no text
				}
			]
		}
	*/

	var html = '';

	if ((options.type || 'radio') == 'radio' && (options.radio || '') != '') {
		options.type = 'radio';
		var isCheck = options.radio.map(function (e) { return e.checked; }).indexOf(true);
		if (isCheck < 0) isCheck = 0;

		for (var i = 0; i < options.radio.length; i++) {
			if (options.radio[i].checked) {
				options.value = options.radio[i].value || '';
			}
		}

		var cols = (options.inline || '') != '' && !isNaN(options.inline) && options.inline > 1 ? options.inline : false;

		if (cols) html += t(tab) + '<table>';

		for (var i = 0; i < options.radio.length; i++) {
			if (cols) {
				if (i == 0 || (i != 0 && i % cols == 0)) html += t(tab + 1) + '<tr>';
				html += t(tab + 2) + '<td>';
			}

			html += resolvInputIn(
				$.extend({}, options, { checked: (isCheck == i ? true : '') }, options.radio[i])
				, tab + (cols ? 3 : 0)
			);

			if (cols) {
				html += t(tab + 2) + '</td>';
				if (i == options.radio.length - 1 || ((i + 1) % cols == 0)) html += t(tab + 1) + '</tr>';
			}
		}

		if (cols) html += t(tab) + '</table>';
	} else {
		html = resolvInputIn(options, tab);
	}

	return html
}

function resolvInputIn(options, tab = 0) {
	var defaultImg = (options.defaultImg || '');
	if (defaultImg != '' && typeof defaultImg == 'string') defaultImg = { path: defaultImg };

	if ((options.value || ``) == `` && (options.val || ``) != ``) options.value = options.val;
	if ((options.value || ``) == `` && defaultImg != ``) options.value = defaultImg.path;
	if ((options.onclick || ``) == `` && (options.click || ``) != ``) options.onclick = options.click;
	if ((options.numKeyVerifAlt || ``) == ``) options.numKeyVerifAlt = (options.text || ``).length;

	if ((options.enumAjax || ``) != `` && (options.enum || ``) == ``) options.enum = { '0': 'Carregando...' };

	var isToggle = (options.toggle || '') != '' && (options.id || '') != '';
	var group = options.group || '';

	options.ck_blur = (options.ck_blur || ``) == `` ? true : options.ck_blur;

	// se tem que validar o requerimento completo, com mensagem embaixo do campo
	// options.requiredFull = ((options.id || ``) != `` && typeof(options.required) == `function`);
	// options.requiredFull = ((options.id || ``) != `` && (options.required || ``) != ``);
	options.requiredFull = (testP(options.id) && testP(options.required) && (testP(options.text || options.placeholder) || typeof (options.required) == `function`));

	if (options.isTextarea || false) options.value = (options.value || '').replace(/\r/g, '').replace(/\n/g, '<br>');

	var random;
	do {
		random = parseInt(Math.random() * 100000);
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	var onblurRequired = ``
		+ `var check${random}Test = check${random}('blur');`
		// + 	`if (typeof(check${random}Test) == "string" && check${random}Test != "")`
		// + 		`$("#${options.id}_obs").html(check${random}Test);`
		// + 	`else $("#${options.id}_obs").html("");`
		+ `$('#${options.id}_obs').html(`
		+ `typeof(check${random}Test) == 'string' && check${random}Test != '' `
		+ `? '<i class=\\'fa fa-times\\'></i> ' + check${random}Test : ''`
		+ `);`

	var accesskey = (options.accesskey || '') == '' || options.accesskey.length > 1 ? '' : options.accesskey;

	var isMoney = false;
	if (options.type == 'money') {
		isMoney = true;
		options.type = 'tel';
	}

	if ((options.is_tel || '') != '') {
		options.type = 'tel';
		if ((options.mask || '') == '') {
			options.mask = function (val) {
				return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
			};
			options.maskOption = {
				onKeyPress: function (val, e, field, options) {
					field.mask(function (val) {
						return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
					}.apply({}, arguments), options);
				}
			}
		}
	}

	if ((options.is_cpf_cnpj || '') != '') {
		options.type = 'tel';
		if ((options.mask || '') == '') {
			options.mask = function (val) {
				return val.replace(/\D/g, '').length > 11 ? '00.000.000/0000-00' : '000.000.000-009';
			};
			options.maskOption = {
				onKeyPress: function (val, e, field, options) {
					field.mask(function (val) {
						return val.replace(/\D/g, '').length > 11 ? '00.000.000/0000-00' : '000.000.000-009';
					}.apply({}, arguments), options);
				}
			}
		}
		if (options.required === true && (options.id || '') != '') {
			eval(`
			options.required = function() {
				return validCPF_CNPJ(resolvVal('${options.id}').replace(/\\D/g, ''));
			}
			`)
		}
	}

	var title = ''
		+ ((options.title || '') == '' && accesskey == '' ? '' : ''
			+ " title='"
			+ (options.title || '')
			+ ((options.title || '') == '' || accesskey == '' ? '' : '\n')
			+ (accesskey == '' ? '' : 'Alt + ' + accesskey)
			+ "'"
		);

	var label = ''
		// **** configurar tag label que complementa o campo de entrada ****
		+ ((options.text || ``) == `` ? `` : ``
			+ t(tab) + `<label`
			+ title
			+ ((options.id || ``) == `` ? `` : ` for="${options.id}" id="label_${options.id}"`)
			+ ((options.styleLabel || ``) == `` ? `` : ` style="${resolvStyle(options.styleLabel)}"`)
			+ `>`
			+ t(tab + 1) + returnDescAccesskey(options.text, options)
			// + 		returnDesc(options.text, options)
			// + 		((options.required || ``) == `` ? `` : ` <i style="color:red;" class="fa fa-asterisk"></i>`)
			+ ((options.required || ``) == `` ? `` : `&nbsp;<span style="color:red;">*</span>`)
			+ t(tab) + `</label>`
		)
	// ***************************************************************************

	var input = ''
		// **** verifica se é mês ****
		+ (options.type != 'month' ? '' : (options.isMonth = true, options.type = 'hidden', '')
			+ t(tab + 0) + `<input id="${(options.id || '')}Datepicker" name="dataPiker" autocomplete="off" class='Default form-control' type="text"`
			// + 		` onchange="console.log(this.value);"`
			+ `/>`
			+ t(tab + 0) + `<script>`
			+ t(tab + 1) + `$('#${(options.id || '')}Datepicker').datetimepicker({`
			+ t(tab + 2) + `format: "MM/YYYY"`
			// +t(tab+2)	+ 			`, formatData: "yyyy-mm"`
			+ t(tab + 2) + `, viewMode: "months"`
			// +t(tab+2)	+ 			`, useCurrent: false`
			// +t(tab+2)	+ 			`, minViewMode: "months"`
			// +t(tab+2)	+ 			`, language: "pt-BR"`
			// +t(tab+2)	+ 			`, lang: "pt-BR"`
			+ ((options.value || '') == '' ? '' : ''
				+ t(tab + 2) + `, date: moment("${options.value}-01")`
				// +t(tab+2)	+ 		`, date: moment('2022-12-01')`
			)
			// +t(tab+2)	+ 			`, onchange: function(data) {`
			// +t(tab+3)	+ 				`console.log(data);`
			// +t(tab+3)	+ 				`if ($("#${(options.id || '')}").val() != data) {`
			// +t(tab+4)	+ 					`$("#${(options.id || '')}").val(data);`
			// +t(tab+4)	+ 					`try { $("#${(options.id || '')}")[0].onchange(this); } catch(e){}` // chama a função de change
			// +t(tab+4)	+ 					`try { $("#${(options.id || '')}")[0].onblur(this); } catch(e){}` 	// chama a função de blur
			// +t(tab+4)	+ 					`$(".dropdown-menu").css('display','none');` 						// some com o menu de opção do mes
			// +t(tab+3)	+ 				`}`
			// +t(tab+2)	+ 			`},`
			+ t(tab + 1) + `});`
			+ t(tab + 1) + `$('#${(options.id || '')}Datepicker').on("dp.change", function (e) {`
			// +t(tab+2)	+ 			`$('#dateF').data("DateTimePicker").minDate(e.date);`
			+ t(tab + 2) + `$("#${(options.id || '')}").val($('#${(options.id || '')}Datepicker').data("DateTimePicker").viewDate().format('Y-MM'));`
			+ ((options.onchange || '') == '' && typeof (options.onchange || '') == 'function' ? '' : ''
				+ t(tab + 2) + `var func = ` + String((options.onchange || function () { })) + `;`
				+ t(tab + 2) + `func();`
			)
			+ t(tab + 1) + `});`
			+ t(tab + 1) + `setTimeout(function() { resolvVal('${(options.id || '')}','${(options.value || '')}'); }, 500);`
			+ t(tab + 0) + `</script>`
		)

		// **** inicia a tag ****
		+ t(tab) + "<" + ((options.isTextarea || false) ? 'textarea' : ((options.enum || '') != '' ? 'select' : 'input'))

		// **** configurar atributos simples ****
		+ ['id', 'name', 'value', 'type', 'cols', 'rows', 'autocomplete', 'maxlength', 'autofocus', 'placeholder']
			.filter(function (el) { return (options[el] || ``) != ``; })
			.map(function (opt) { return ` ${opt}="${options[opt]}"`; })
			.join('')
		// ***************************************************************************

		+ ((options.type || '') != '' ? '' : ''
			+ ' type="text"'
		)

		+ ((options.data || '') == '' || typeof (options.data) != 'object' ? `` : ``
			+ Object.keys(options.data).map(function (key) {
				return ` data-${key}="${options.data[key]}"`
			}).join('')
		)
		+ title
		+ ` data-customerid="input${random}"`
		+ ` class="`
		+ `form-control`
		+ (options.class || ``)
		+ `"`
		+ ((options.style || ``) == `` && ['number', 'tel'].indexOf(options.type) < 0
			? ``
			: ` style="${resolvStyle($.extend({},
				(['number', 'tel'].indexOf(options.type) < 0 ? {} : { 'text-align': 'right' }),
				(options.style || {})
			))
			}"`
		)
		+ ((options.datalist || '') == ''
			? ((options.list || '') == '' ? '' : ' list="' + options.list + '"')
			: ' list="' + (options.id || '') + 'datalist"'
		)
		+ ((options.fileType || '') != 'img' ? '' : ''
			+ ` accept="image/*"`
		)


		// **** configurar as chamadas dos métodos ****
		+ [`onchange`, `onclick`, `onfocus`, `onblur`, `onkeyup`]
			.filter(function (el) { return (options[el] || ``) != ``; })
			.map(function (opt) {
				return ` ${opt}="${opt + random}(this);`
					+ `resolvEvento('${opt}','${(options.id || options.name || '')}');`
					+ (opt != `onblur` || !options.ck_blur || !options.requiredFull ? `` : (options.ck_blur = false, ``)
						+ onblurRequired
					)
					+ (opt != `onchange` || (options.id || '') == '' || ((options.enumAjax || {}).default || '') == '' ? `` : ''
						+ `$('#${options.id}')`
						+ `.find('option[value=${Object.keys(options.enumAjax.default)[0] || ''}]')`
						+ `.remove();`
					)
					+ (opt != `onchange` || options.type != 'color' ? `` : ''
						+ `$(\\"#refTextColor${random}\\").val(`
						+ `$(\\"*[data-customerid='input${random}']\\").val()`
						+ `);`
					)
					+ `"`
			}).join('')
		+ [`onclick`, `onfocus`, `onkeyup`]
			.filter(function (el) { return (options[el] || ``) == ``; })
			.map(function (opt) {
				return ` ${opt}="resolvEvento('${opt}','${(options.id || options.name || '')}');"`
			}).join('')
		// ******************************************************

		+ (!options.ck_blur || !options.requiredFull
			? ``
			+ ` onblur="resolvEvento('onblur','${(options.id || options.name || '')}');"`
			: (options.ck_blur = false, ``)
			+ ` onblur="${onblurRequired}`
			+ `resolvEvento('onblur','${(options.id || options.name || '')}');`
			+ `"`
		)
		+ ((options.onchange || '') != '' ? '' : ''
			+ ((options.type == 'color')
				? ``
				+ ` onchange="`
				+ `$('#refTextColor${random}\\').val(`
				+ `$(\`*[data-customerid='input${random}']\`).val()`
				+ `);`
				+ `resolvEvento('onchange','${(options.id || options.name || '')}');`
				+ `"`
				: ((options.id || '') != '' && ((options.enumAjax || {}).default || '') != ''
					? ''
					+ ` onchange="`
					+ `$('#${options.id}')`
					+ `.find('option[value=${Object.keys(options.enumAjax.default)[0] || ''}]')`
					+ `.remove();`
					+ `resolvEvento('onchange','${(options.id || options.name || '')}');`
					+ `"`
					: ''
					+ ` onchange="resolvEvento('onchange','${(options.id || options.name || '')}');"`
				)
			)
		)

		+ ((options.disabled || ``) == `` ? `` : ` disabled`)
		+ ((options.checked || ``) == `` ? `` : ` checked`)
		+ ">"
		+ ((options.isTextarea || false) ? `${(options.value || '')}</textarea>` : ``)
		+ ((options.enum || '') == '' ? `` : ``
			+ t(tab + 1) + Object.keys(options.enum).map(function (value) {
				return `<option value="${value}">${options.enum[value]}</option>`;
			}).join(t(tab + 1))
			+ t(tab) + `</select>`
		)


	// **** preview de imagem caso input for type file em formato de imagem ****
	var fileType = ''
		+ ((options.fileType || '').indexOf('img') < 0 ? '' : ''
			+ t(tab + 0) + `<div class="text-center imagemFile_resolvInput"`
			+ ` onclick="$(\`*[data-customerid='input${random}']\`)[0].click();"`
			+ ` style="`
			// + 			`padding:10px;`
			+ `width:100%;`
			+ `margin-${((options.firstImg || '') == '' ? 'top' : 'bottom')}:10px;`
			+ `"`
			+ `>`
			+ t(tab + 1) + `<img src="${((defaultImg || {}).path || '')}" id="${options.id}preview" `
			+ ` onerror="if (this.src != 'error.jpg') this.src='${((defaultImg || {}).path || '')}';"`
			+ ` style="`
			+ `max-width: ${((defaultImg || {}).width || '80%')};`
			+ `max-height: ${((defaultImg || {}).height || '150px')};`
			+ `"`
			+ `>`
			+ t(tab + 0) + `</div>`
		);


	try {
		var bootstrap = $.fn.tooltip.Constructor.VERSION.slice(0, 1);
	} catch (e) {
		var bootstrap = '0';
	}

	if ((group || '') != '') {
		var indexOpGroup = -1;
		group.forEach(function (op, index) {
			if (op == 'i') { indexOpGroup = index }
		});


		input = ''
			+ (bootstrap == '0'
				? ''
				+ t(tab) + '<table width="100%">'
				+ t(tab) + '<tr>'
				: ''
				+ t(tab) + (bootstrap == '4'
					? '<div class="input-group mb-3">'
					: '<div class="input-group">'
				)
			)
			+ group.map(function (op, index) {
				if (op == 'i') return bootstrap != '0' ? input : '<td>' + input + '</td>';

				var text;
				var classInput = indexOpGroup < index ? 'append' : 'prepend';

				if (typeof op == 'string') {
					text = ''
						+ (bootstrap == '0'
							? ''
							+ t(tab + 1) + '<td>'
							+ t(tab + 2) + `${op}`
							+ t(tab + 1) + '</td>'
							: ''
							+ (bootstrap == '4'
								? ''
								+ t(tab + 1) + `<div class="input-group-${classInput}">`
								+ t(tab + 2) + `<span class="input-group-text" id="basic-addon${random}">`
								+ t(tab + 3) + `${op}`
								+ t(tab + 2) + `</span>`
								+ t(tab + 1) + `</div>`
								: ''
								+ t(tab + 1) + `<span class="input-group-addon" id="basic-addon${random}">${op}</span>`
							)
						)
				} else {
					text = ''
						+ (bootstrap == '0'
							? ''
							+ t(tab + 1) + '<td>'
							+ t(tab + 2) + ((op.click || '') == '' ? `${op.text}` : ``
								+ `<button`
								+ ((op.style || '') == '' ? '' : ''
									+ ` style="${resolvStyle(op.style)}"`
								)
								+ ((op.click || '') == '' ? '' : ''
									+ ` onclick="click${index}Group${random}();"`
								)
								+ `>`
								+ `${op.text}`
								+ `</button>`
							)
							+ t(tab + 1) + '</td>'
							: ''
							+ (bootstrap != '4' ? '' : ''
								+ t(tab + 1) + `<div class="input-group-${classInput}">`
								// + `<div class="input-group-append">`
							)
							+ t(tab + 1) + `<span id="basic-addon${random}"`
							+ ((op.click || '') == '' ? '' : ''
								+ ` onclick="click${index}Group${random}();"`
							)
							+ ` class="input-group-` + (bootstrap == '4' ? 'text' : 'addon')
							+ ((op.class || '') == '' ? '' : ` ${op.class}`)
							+ ((op.click || '') == '' ? '' : ' btn btn-' + (bootstrap == '4' ? 'light' : 'default'))
							+ `"`
							+ `>`
							+ t(tab + 2) + `${op.text}`
							+ t(tab + 1) + `</span>`
							+ (bootstrap != '4' ? '' : ''
								+ t(tab + 1) + `</div>`
							)
							+ ((op.click || '') == '' ? '' : ''
								+ t(tab + 1) + `<script>`
								+ t(tab + 2) + `function click${index}Group${random}() {`
								+ t(tab + 3) + `var func = ${op.click};`
								+ t(tab + 3) + `func();`
								+ t(tab + 2) + `}`
								+ t(tab + 1) + `</script>`
							)
						)
				}
				return text;
			}).join('')
			+ (bootstrap == '0'
				? ''
				+ t(tab) + '</tr>'
				+ t(tab) + '</table>'
				: ''
				+ t(tab) + '</div>'
			)
	}

	input += ''
		// **** Descrição de requerimento ****
		+ (!options.requiredFull ? `` : ``
			+ t(tab) + `<div style="color:red;" id="${options.id}_obs"></div>`
		)


	var html = ''
		+ ((options.firstImg || '') == '' ? '' : fileType)

		+ ((options.no_desc || '') != ''
			? input
			: ''
			+ (['radio', 'checkbox'].indexOf(options.type) >= 0 && (options.no_changeLayout || '') == ''
				? ''
				+ (!isToggle ? '' : t(tab) + label)
				+ t(tab) + ((options.inline || '') == ''
					? `<table width="100%">`
					// : `<table style="display:inline-block;padding-right: 20px;">`
					: `<table style="display:inline-block;padding-right: 20px;border: 1px solid #A7B0B6;border-radius:5px;padding-left:5px;background-color: white;">`
				)
				+ t(tab + 1) + `<tr>`
				+ t(tab + 2) + `<td width='20px'>`
				+ t(tab * 0) + tAjuste(input, 3)
				+ t(tab + 2) + `</td>`
				+ t(tab + 2) + `<td align="left" style="vertical-align:bottom;padding-left:5px;">`
				+ (isToggle ? '' : ''
					+ t(tab * 0) + tAjuste(label, 3)
				)
				+ t(tab + 2) + `</td>`
				+ t(tab + 1) + `</tr>`
				+ t(tab) + `</table>`
				+ (!isToggle ? '' : ''
					+ t(tab) + "<style>"
					+ t(tab + 1) + ".toggle,.toggle-group,.toggle-on,.toggle-off,.toggle-handle {"
					+ t(tab + 2) + "border-radius: 20px !important;"
					+ t(tab + 1) + "}"
					+ t(tab) + "</style>"
					+ t(tab) + "<script>"
					+ t(tab + 1) + "$(function () {"
					+ t(tab + 2) + "$('#" + options.id + "').bootstrapToggle({"
					+ t(tab + 3) + "on: '" + ((options.toggle || {}).on || 'Ativo') + "',"
					+ t(tab + 3) + "off: '" + ((options.toggle || {}).off || 'Inativo') + "',"
					+ t(tab + 3) + "onstyle: '" + ((options.toggle || {}).onstyle || 'success') + "',"
					+ t(tab + 3) + "offstyle: '" + ((options.toggle || {}).offstyle || 'danger') + "',"
					+ t(tab + 2) + "});"
					+ t(tab + 1) + "});"
					+ t(tab) + "</" + "script>"
				)
				: (options.type == 'color'
					? ''
					+ label
					+ '<table width="100%">'
					+ '<tr>'
					+ '<td width="50px">'
					+ input
					+ '</td>'
					+ '<td>'
					+ resolvConfig({
						input: {
							id: 'refTextColor' + random
							, value: $("*[data-customerid='input" + random + "']").val()
							, onfocus: function (el) { $(el).select() }
							, onkeyup: (function () {
								var onkeyup = '';
								eval(''
									+ `onkeyup = function() {`
									+ `if (isColor($("#refTextColor${random}").val())) {`
									+ `$("*[data-customerid='input${random}']").val(`
									+ `forceHex6(toHex($("#refTextColor${random}").val()))`
									+ `);`
									+ `}`
									+ `}`
								);
								return onkeyup;
							})()
							, onblur: (function () {
								var onblur = '';
								eval(``
									+ `onblur = function() {`
									+ `$("#refTextColor${random}").val(`
									+ `$("*[data-customerid='input${random}']").val()`
									+ `);`
									+ `}`
								);
								return onblur;
							})()
						}
					})
					+ '<script>'
					+ `$("#refTextColor${random}").val($("*[data-customerid='input${random}']").val());`
					+ '</' + 'script>'
					+ '</td>'
					+ '</tr>'
					+ '</table>'
					: (options.type == 'file' && (options.upload || '') != ''
						? ''
						+ t(tab) + `<table width="100%">`
						+ t(tab + 1) + `<tr>`
						+ t(tab + 2) + `<td>`
						+ t(tab * 0) + tAjuste(label + input, 3)
						+ t(tab + 2) + `</td>`
						+ t(tab + 2) + `<td width='10%' align="left" style="vertical-align:bottom;padding-left:15px;">`
						+ t(tab + 3) + `<button id="${options.id}_btnUpload" title="Enviar"`
						+ ` class="btn btn-warning btn-block"`
						+ ` style="margin-top: 5px;"`
						+ ` onclick="enviarArquivo${options.id}();"`
						+ `>`
						+ t(tab + 4) + `<i class="fa fa-upload"></i>`
						+ t(tab + 3) + `</button>`
						+ t(tab + 2) + `</td>`
						+ t(tab + 1) + `</tr>`
						+ t(tab) + `</table>`
						+ t(tab) + `<div id="${options.id}_desc_file" style="display:none;"></div>`
						+ t(tab) + `<div id="${options.id}_progressFile"></div>`
						: label + input
					)
				)
			)
		)
		+ ((options.datalist || '') == '' ? '' : ''
			+ t(tab) + '<div id="' + (options.id || '') + 'datalistDiv"></div>'
		)

		// **** preview de imagem caso input for type file em formato de imagem ****
		+ ((options.firstImg || '') != '' ? '' : fileType)

		+ t(tab) + `<script>`

		+ (!options.requiredFull ? `` : ``
			+ t(tab + 1) + `function check${random}() {`
			+ t(tab + 2) + `var op = arguments.length > 0 ? arguments[0] : 'check';`
			// + (typeof(options.required) == 'function'
			// 	? t(tab+2) + "return (" + String(options.required) + "());"
			// 	: t(tab+2) + "return (resolvVal(\"" + options.id + "\") == '' ? 'Informe " + options.text + "' : true);"
			// )
			+ t(tab + 2) + `return (`
			+ t(tab + 3) + `resolvVal("${options.id}") == ''`
			+ t(tab + 4) + `? "Informe ${options.text || options.placeholder}"`
			+ t(tab + 4) + `: ${typeof (options.required) == `function` ? `${String(options.required)}(op)` : `true`}`
			+ t(tab + 2) + `);`
			+ t(tab + 1) + `}`
		)
		// ******************************************************



		// ****  configurar as funções chamada pelos métodos ****
		+ [`onchange`, `onclick`, `onfocus`, `onblur`, `onkeyup`]
			.filter(function (el) { return (options[el] || ``) != ``; })
			.map(function (opt) {
				return ''
					+ t(tab + 1) + `function ${opt + random}(el) {`
					+ t(tab + 2) + (
						(typeof (options[opt]) == `string`)
							? options[opt]
							: `var func = ${String(options[opt])};`
							+ t(tab + 2) + `func(el);`
					)
					+ t(tab + 1) + `}`
			}).join('')
		// ******************************************************



		// ****  correção do bug de quebra de linha como valor padrão no textarea ****
		+ ((options.isTextarea || false) && (options.ck_editor || '') == '' && (options.id || '') == ''
			? ''
			+ t(tab + 1) + `setTimeout(function() {`
			+ t(tab + 2) + `$("#${options.id}").val($("#${options.id}").val().replace(/<br>/gi, "\\n"));`
			+ t(tab + 1) + `},1000);`
			: ''
		)
		// ***************************************************************************



		// ****  registrar eventos do teclado ****
		// + ( [`month`,`date`].indexOf(options.type) != -1 && (options.id || ``) != `` ? `` : `` )
		+ ([`month`, `date`].indexOf(options.type) == -1 || (options.id || ``) == `` ? `` : ``
			+ t(tab + 1) + `function momentMonth${capitalize(options.id)}(e,whichkey) {`
			+ t(tab + 2) + `if (whichkey == 114 && $("#${options.id}").is(":focus")) {`
			+ t(tab + 3) + `e.preventDefault();`
			+ t(tab + 3) + `$("#${options.id}").val(moment().format("${(options.type == `month` ? `Y-MM` : `Y-MM-DD`)}"));`
			+ t(tab + 2) + `}`
			+ t(tab + 1) + `}`
			+ t(tab + 1) + `try { registerEventKeyboard.push("momentMonth${capitalize(options.id)}"); } catch(e) {}`
			// + ( registerEventKeyboard.push(`momentMonth${capitalize(options.id)}`), '' )
		)
		// ***************************************************************************



		// ****  verificar se tem que registrar para focar através do ENTER ****
		+ (
			(options.id || ``) == `` || options.type == `hidden`
				? ``
				: ((options.onEnter || '') == '' ? '' : ''
					+ t(tab + 1) + `function onEnter${capitalize(options.id)}(e,whichkey) {`
					+ t(tab + 2) + `if (whichkey == 13 && $("#${options.id}").is(":focus")) {`
					// + t(tab+3)	+ 			`e.preventDefault();`
					+ t(tab + 3) + `var func = ${String(options.onEnter)}; func(e,whichkey);`
					+ t(tab + 2) + `}`
					+ t(tab + 1) + `}`
					+ t(tab + 1) + `try { registerEventKeyboard.push("onEnter${capitalize(options.id)}"); } catch(e) {}`
				)
				+ ((options.isTextarea || ``) != `` ? `` : ''
					+ t(tab + 1) + `try { registerInputFocus.push(resolvEl("${options.id}")); } catch(e) {}`
				)
			// : t(tab+1) + `registerInputFocus.push(resolvEl("${options.id}").el[0]);`
		)
		// ***************************************************************************



		// ****  verificar se tem que construir um datalist ****
		+ ((options.datalist || '') == '' ? '' : ''
			+ t(tab + 1) + `function onDataList${capitalize(options.id)}() {`
			// + t(tab+2)	+ 		`${(options.datalist.ajax || 'ajax')}(`
			+ t(tab + 2) + (typeof (options.datalist.ajax || 'ajax') == 'string'
				? (options.datalist.ajax || 'ajax')
				: `window[(function() { var func = ${String(options.datalist.ajax)}; return func(); })()]`
			) + `({`
			+ t(tab + 3) + `param: ` + jsonToStringParam(options.datalist.param || {}) + `,`
			+ t(tab + 3) + `done: function(data) {`
			+ t(tab + 4) + `data = JSON.parse(data);`
			+ t(tab + 4) + `var grade = "<datalist id=\\"${(options.id || '')}datalist\\">";`
			+ t(tab + 4) + `if (data[0].debug == "OK") {`
			+ t(tab + 5) + `grade += data.map(function(dt) {`
			+ t(tab + 6) + `return "<option value=\\"" + dt.${(options.datalist.input || 'id')} + "\\">"`
			+ t(tab + 5) + `}).join("");`
			+ t(tab + 4) + `}`
			+ t(tab + 4) + `grade += "</datalist>";`
			+ t(tab + 4) + `$("#${(options.id || '')}datalistDiv").html(grade);`
			+ t(tab + 3) + `}`
			+ t(tab + 2) + `});`
			+ t(tab + 1) + `}`
			+ t(tab + 1) + `onDataList${capitalize(options.id)}();`
		)



		// ****  verificar se tem que fazer upload de aquivo ****
		+ ((options.type || 'text') != 'file' || (options.upload || '') == '' ? '' : ''
			+ t(tab + 1) + `function enviarArquivo${options.id}(options={}) {`
			+ t(tab + 2) + `if (getBase64("${options.id}") == false) {`
			+ t(tab + 3) + `return alert("Informe o arquivo!");`
			+ t(tab + 2) + `} `
			+ t(tab + 2) + `var validOnSend = ` + String(options.upload.onsend || function () { return true; }) + `;`
			+ t(tab + 2) + `validOnSend = validOnSend();`
			+ t(tab + 2) + `if (validOnSend != true) {`
			+ t(tab + 3) + `if (typeof(validOnSend) == "string") alert(validOnSend);`
			+ t(tab + 3) + `return;`
			+ t(tab + 2) + `} `
			+ (typeof options.upload.path == 'string'
				? ''
				+ t(tab + 2) + `var path = '${options.upload.path}';`
				: ''
				+ t(tab + 2) + `var path = ${String(options.upload.path)};`
				+ t(tab + 2) + `path = path();`
			)
			+ t(tab + 2) + `sendBase64($.extend({`
			+ t(tab + 3) + `id: '${options.id}',`
			+ t(tab + 3) + `div: '#${options.id}_progressFile',`
			+ ((options.upload.fileName || '') == '' ? '' : ''
				+ t(tab + 3) + `fileName: '${options.upload.fileName}',`
			)
			+ ((options.upload.param || '') == '' ? '' : ''
				+ t(tab + 3) + `param: ${jsonToString(options.upload.param, tab + 3, returnObjIndentado_Global)},`
			)
			+ ((options.upload.aws || '') == '' ? '' : ''
				+ t(tab + 3) + `aws: ${jsonToStringParam(options.upload.aws, tab + 3, returnObjIndentado_Global)},`
			)
			+ t(tab + 3) + `path,`
			+ t(tab + 3) + `onstart: function(data='') {`
			+ t(tab + 4) + `$("#${options.id}_btnUpload").attr('disabled', true);`
			+ t(tab + 4) + `$("#${options.id}").attr('disabled', true);`
			+ t(tab + 3) + `},`
			+ t(tab + 3) + `ondone: function(opt, data) {`
			+ t(tab + 4) + `$("#${options.id}_btnUpload").attr('disabled', false);`
			// + ((options.fileType || '') != 'img' ? '' : ''
			// 	// + t(tab+4)	+ 			`$("#${options.id}preview").attr('src', opt.path+'/'+opt.fileName+'.'+opt.ext);`
			// 	+ t(tab+4)	+ 			`$("#${options.id}preview").attr('src', opt.fileName+'.'+opt.ext);`
			// )
			+ t(tab + 4) + `$("#${options.id}").attr('disabled', false);`
			+ ((options.no_alert || '') != '' ? '' : ''
				+ t(tab + 4) + `alert('Arquivo enviado com sucesso!', { icon: 'success' });`
			)
			+ t(tab + 4) + `var func = ${String(options.upload.ondone || function () { })}; func(opt, data);`
			+ t(tab + 3) + `},`
			+ t(tab + 2) + `}, options));`
			+ t(tab + 1) + `}`
			+ t(tab + 1) + `setTimeout(function() {`
			+ t(tab + 2) + `$("#${options.id}").change(function() {`
			+ t(tab + 3) + `setBase64(this, '${options.id}'`
			+ `${(options.fileType || '').indexOf('img') >= 0 ? `, '${options.id}preview'` : ''}`
			+ `);`
			+ t(tab + 3) + `$("#${options.id}_desc_file").html('');`
			+ `${(options.defaultImgPdf || options.defaultImgCSV || '') == '' ? `` : ``
				+ t(tab + 3) + `setTimeout(() => {`
				+ t(tab + 4) + `var base64Foto${options.id} = base64Foto_Global.find(function(b) {`
				+ t(tab + 5) + `return b.id = '${options.id}';`
				+ t(tab + 4) + `});`
			}`
			+ `${(options.defaultImgPdf || '') == '' ? `` : ``
				+ t(tab + 4) + `if (base64Foto${options.id} != undefined && base64Foto${options.id}.ext == 'pdf') {`
				+ t(tab + 5) + `$("#${options.id}preview").attr("src","${options.defaultImgPdf}");`
				+ t(tab + 4) + `}`
			}`
			+ `${(options.defaultImgCSV || '') == '' ? `` : ``
				+ t(tab + 4) + `if (base64Foto${options.id} != undefined && base64Foto${options.id}.ext == 'csv') {`
				+ t(tab + 5) + `$("#${options.id}preview").attr("src","${options.defaultImgCSV}");`
				+ t(tab + 4) + `}`
			}`
			+ `${(options.defaultImgPdf || options.defaultImgCSV || '') == '' ? `` : ``
				+ t(tab + 3) + `}, 300);`
			}`
			+ t(tab + 2) + `});`
			+ t(tab + 1) + `}, 500);`
		)



		// ****  verificar se o campo tem accesskey ****
		+ (accesskey == '' ? '' : ''
			+ t(tab + 1) + `function inputClickAccesskey${random}(e) {`
			+ t(tab + 2) + `if (e.altKey && e.key == "${accesskey}") {`
			+ t(tab + 3) + `e.preventDefault();`
			+ t(tab + 3) + `try { $("*[data-customerid='input${random}']")[0].focus(); } catch(e) { }`
			+ t(tab + 2) + `}`
			+ t(tab + 1) + `}`
			+ t(tab + 1) + `registerEventKeyboard.push("inputClickAccesskey${random}");`
		)
		// ***************************************************************************



		// ****  verificar se o campo tem accesskey ****
		+ ((options.no_tab || '') == '' ? '' : ''
			+ t(tab + 1) + `function inputNoTab${random}(e) {`
			+ t(tab + 2) + `try {`
			+ t(tab + 3) + `var input = $("*[data-customerid='input${random}']")[0];`
			+ t(tab + 2) + `} catch(e) { return; }`
			+ t(tab + 2) + `if ($(input).is(':focus') && e.keyCode === 9) {`
			+ t(tab + 3) + `e.preventDefault();`
			+ t(tab + 3) + `var inicioDaSelection = input.selectionStart,`
			+ t(tab + 4) + `fimDaSelection = input.selectionEnd,`
			+ t(tab + 4) + `recuo = '\\t'; // Experimente também com '    '`
			+ t(tab + 3) + `input.value = [`
			+ t(tab + 4) + `input.value.substring(0, inicioDaSelection),`
			+ t(tab + 4) + `recuo,`
			+ t(tab + 4) + `input.value.substring(fimDaSelection)`
			+ t(tab + 3) + `].join('');`
			+ t(tab + 3) + `input.selectionEnd = inicioDaSelection + recuo.length; `
			+ t(tab + 2) + `}`
			+ t(tab + 1) + `}`
			+ t(tab + 1) + `registerEventKeyboard.push("inputNoTab${random}");`
		)
		// ***************************************************************************



		// ****  verificar se o campo tem mascara ****
		+ (!isMoney || (options.mask || '') != '' ? '' : ''
			+ t(tab + 1) + `$("*[data-customerid='input${random}']")`
			+ `.maskMoney({`
			+ ` prefix:'${(options.no_mask_money || '') == '' ? 'R$ ' : ''}',`
			+ ` allowNegative: true, thousands:'.', decimal:',', affixesStay: false`
			+ `});`
		)
		// ***************************************************************************



		// ****  verificar se o campo tem mascara ****
		+ ((options.mask || '') == '' || (options.id || '') == '' ? '' : ''
			+ t(tab + 1) + `$("#${options.id}")`
			+ `.mask(${typeof options.mask == 'string' ? '"' + options.mask + '"' : String(options.mask)
			},${jsonToString(options.maskOption || {})});`
		)
		// ***************************************************************************



		// ****  verificar evento de drop para fazer upload de arquivo ****
		+ ((options.id || '') == '' || defaultImg == '' || (options.upload || '') == '' ? '' : ''
			+ t(tab + 1) + `var target${options.id} = $("#${options.id}preview").parent()[0];`
			+ t(tab + 1) + `var fileInput${options.id} = $("*[data-customerid='input${random}']")[0];`
			+ t(tab + 1) + `target${options.id}.addEventListener('dragover', function(e) {`
			+ t(tab + 2) + `e.preventDefault();`
			+ t(tab + 2) + `target${options.id}.classList.add('dragging_resolvInput');`
			+ t(tab + 1) + `});`
			+ t(tab + 1) + `target${options.id}.addEventListener('dragleave', function() {`
			+ t(tab + 2) + `target${options.id}.classList.remove('dragging_resolvInput');`
			+ t(tab + 1) + `});`
			+ t(tab + 1) + `target${options.id}.addEventListener('drop', function(e) {`
			+ t(tab + 2) + `e.preventDefault();`
			+ t(tab + 2) + `target${options.id}.classList.remove('dragging_resolvInput');`
			+ t(tab + 2) + `if (e.dataTransfer.files.length > 1) return alert('Selecione apenas um arquivo!');`
			+ t(tab + 2) + `var extFile = (e.dataTransfer.files[0].name).split('.').pop();`
			+ t(tab + 2) + `if (['jpg','jpeg','png'].indexOf(extFile) < 0) return alert('Arquivo inválido!');`
			+ t(tab + 2) + `fileInput${options.id}.files = e.dataTransfer.files;`
			+ t(tab + 2) + `$(fileInput${options.id}).change();`
			+ t(tab + 1) + `});`
		)
		// ***************************************************************************



		// ****  verificar se vai carregar options do select (param enumAjax) ****
		+ ((options.id || '') == '' || (options.enumAjax || '') == '' ? '' : ''
			+ t(tab + 1) + `function loadEnumAjax${options.id} () {`
			+ t(tab + 2) + `ajax({`
			+ ((options.enumAjax.url || '') == '' ? '' : ''
				+ t(tab + 3) + `url: "` + options.enumAjax.url + `",`
			)
			+ t(tab + 3) + `param: ` + JSON.stringify(options.enumAjax.param || {}) + `,`
			+ t(tab + 3) + `done: function(data) {`
			+ t(tab + 4) + `console.log(data);`
			+ t(tab + 4) + `data = JSON.parse(data);`
			+ t(tab + 4) + `console.log(data);`
			+ t(tab + 4) + `var values_select = data.map(function(v) { `
			+ `return String(v.${options.enumAjax.value});`
			+ `});`
			+ t(tab + 4) + `var values_default = ${JSON.stringify(options.enumAjax.default || {})};`
			+ t(tab + 4) + `var keys_default = Object.keys(values_default);`
			+ t(tab + 4) + `for (var i = 0; i < keys_default.length; i++) {`
			+ t(tab + 5) + `if (values_select.indexOf(String(keys_default[i])) < 0) {`
			+ t(tab + 6) + `keys_default.splice(i, 1);`
			+ t(tab + 6) + `i--;`
			+ t(tab + 5) + `}`
			+ t(tab + 4) + `}`
			+ t(tab + 4) + `$("#${options.id}").html(`
			// + ((options.enumAjax.default || '') == '' ? '' : ''
			// 	+ t(tab+5)
			// 	+ '`'
			// 	+ Object.keys(options.enumAjax.default).map(function(key) {
			// 		return '<option value="' + key + '">'
			// 			+ 		options.enumAjax.default[key]
			// 			+ 	'</option>'
			// 	}).join('')
			// 	+ 	'` +'
			// )
			+ t(tab + 5) + `+ (keys_default.map(function(key) {`
			+ t(tab + 6) + `return \`\``
			+ t(tab + 7) + `+ \`<option value="\$\{key\}">\$\{values_default[key]\}</option>\``
			+ t(tab + 5) + `}).join(\`\`)) +`
			+ t(tab + 5) + `data.map(function(dt) {`
			+ t(tab + 6) + `return '<option value="' + dt.${options.enumAjax.value} + '">`
			+ `' + dt.${options.enumAjax.desc} + '`
			+ `</option>'`
			+ t(tab + 5) + `}).join(\`\`)`
			+ t(tab + 4) + `);`
			+ t(tab + 4) + `var func = ${String(options.enumAjax.onload || function () { })};`
			+ t(tab + 4) + `func(data);`
			+ t(tab + 3) + `}`
			+ t(tab + 2) + `})`
			+ t(tab + 1) + `}`
			+ t(tab + 1) + `loadEnumAjax${options.id}();`
		)
		// ***************************************************************************



		// ****  verificar se vai usar o ckEditor ****
		+ ((options.id || '') == '' || (options.isTextarea || '') == '' || (options.ck_editor || '') == '' ? '' : ''
			+ t(tab + 1) + `CKEDITOR.replace('${options.id}');`
		)
		+ t(tab) + `</` + `script>`
	// ***************************************************************************

	return html;
}



var base64Foto_Global = [];
function setBase64(input, id, idPreview = '') { readURL(input, id, idPreview); }
function readURL(input, id, idPreview = '') {
	/* if (idCategoria_Global == -1) {
		alert('Selecione o Registro!');
		$("#" + id).val('');
		return;
	} */

	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			var index = base64Foto_Global.map(function (e) { return e.id; }).indexOf(id);
			var nome = $("#" + id).val().split('.');
			var ext = (nome.splice(nome.length - 1, 1)).join('');
			nome = nome.join('.').replace(/\\/g, "/");
			nome = nome.substring(nome.lastIndexOf('/') + 1, nome.length);

			if (index < 0) {
				index = base64Foto_Global.length;
				base64Foto_Global.push({ id, base64: e.target.result, ext, nome: nome });
			} else {
				base64Foto_Global[index].base64 = e.target.result;
				base64Foto_Global[index].ext = ext;
			}
			if (idPreview != '') {
				$("#" + idPreview).attr('src', base64Foto_Global[index].base64);
			}
		}
		reader.readAsDataURL(input.files[0]);
	}
}

function getBase64(id, param = 'base64') {
	var index = base64Foto_Global.map(function (d) { return d.id; }).indexOf(id);
	if (index < 0) return false;
	if (param.toLowerCase() == 'obj')
		return base64Foto_Global[index];
	if (param.toLowerCase() == 'base64')
		return base64Foto_Global[index].base64.split(';base64,')[1];

	return base64Foto_Global[index][param];
}

function clearBase64(id) {
	var index = base64Foto_Global.map(function (d) { return d.id; }).indexOf(id);
	base64Foto_Global.splice(index, 1);
}

function sendBase64(options) {
	/*
		options: {
			id: '' 					// achar o base64
			div: '#' 				// desenhar o progresso do upload
			fileName: ''			// orientar onde está o download
			onstart: function		// dispara na primeira vez que chama a rotina
			ondone: function		// dispara quando termina de enviar o arquivo
			path: '' 				// caminho para salvar o arquivo
			limitChar: 7000000 		// quantos caracteres vai ser enviado por vez
			url: '' 				// para onde vai o arquivo
			no_base64: (0|1) 		// se o conteúdo do arquivo não for base64
			param: { } 				// parâmetros adicionais para enviar por ajax
		}

		base64Foto_Global: {
			base64: ''
			ext: ''
			id: ''
			nome: ''
		}
	*/
	var index = base64Foto_Global.map(function (i) { return i.id; }).indexOf(options.id);
	if (index < 0) return false;

	if (base64Foto_Global[index].base64.length == 0) {
		options.fileName = (options.fileName || base64Foto_Global[index].nome.replace(/ /g, '_'));
		options.ext = base64Foto_Global[index].ext;
		base64Foto_Global.splice(index, 1);
		doneSendBase64(options);
		return true;
	}

	if ((options.tempName || '') == '') {
		if (typeof (options.onstart) == 'function') options.onstart(options);
		if ((options.no_base64 || '') == '')
			base64Foto_Global[index].base64 = base64Foto_Global[index].base64.split(';base64,')[1];
		options.totalChart = base64Foto_Global[index].base64.length;
	}

	var progress = (base64Foto_Global[index].base64.length * 100) / options.totalChart;
	progress = 100 - progress;
	$(options.div).html(''
		+ `<div class="progress">`
		+ `<div class="progress-bar" role="progressbar" aria-valuenow="${progress}"`
		+ `aria-valuemin="0" aria-valuemax="100" style="width:${progress}%"`
		+ `>`
		+ `<span class="sr-only">${String(parseFloat(progress.toFixed(2))).replace('.', ',')}% Completo</span>`
		+ `</div>`
		+ `</div>`
	);

	if ((options.limitChar || '') == '') options.limitChar = 7000000;

	ajax({
		// url: (options.url || '../controller/controller.php'),
		param: {
			'sendBase64': true,
			'tempName': (options.tempName || ''),
			'base64': base64Foto_Global[index].base64.substring(0, options.limitChar),
		},
		error: function () { alert('Falha ao enviar arquivo!'); },
		done: function (data) {
			console.log(data);
			base64Foto_Global[index].base64 = base64Foto_Global[index].base64
				.substring(options.limitChar, base64Foto_Global[index].base64.length);

			options.tempName = data;
			sendBase64(options);
		}
	});
}

function doneSendBase64(options) {
	$(options.div).html('Salvando Arquivo...');

	var keys = Object.keys(options.param);
	for (var i = 0; i < keys.length; i++) {
		if (typeof options.param[keys[i]] == 'function') {
			options.param[keys[i]] = options.param[keys[i]]();
		}
	}

	ajax({
		// url: (options.url || '../controller/controller.php'),
		param: $.extend({
			'doneSendBase64': true,
			'tempName': options.tempName,
			'fileName': options.fileName,
			'path': (options.path || './'),
			'ext': options.ext,
			'no_base64': (options.no_base64 || ''),
		}, (options.param || {})),
		error: function () { alert('Falha ao enviar arquivo!'); },
		done: function (data) {
			console.log(data);
			$(options.div).html('');
			if (typeof options.ondone == 'function') options.ondone(options, data);
		}
	});
}

function isColor(color) {
	function checkColorName(c) {
		return [
			"darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta",
			"darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
			"darkslateblue", "darkslategray", "darkturquoise", "darkviolet",
			"lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgrey", "lightgreen",
			"lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue",
			"lightyellow",
			"mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
			"mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred",

			"aliceblue", "antiquewhite", "aqua", "aquamarine", "azure",
			"beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood",
			"cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan",
			"deeppink", "deepskyblue", "dimgray", "dodgerblue",
			"firebrick", "floralwhite", "forestgreen", "fuchsia",
			"gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow",
			"honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki",
			"lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lime", "limegreen", "linen",
			"magenta", "maroon", "midnightblue", "mintcream", "mistyrose", "moccasin",
			"navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid",
			"palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru",
			"pink", "plum", "powderblue", "purple",
			"rebeccapurple", "red", "rosybrown", "royalblue",
			"saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
			"slateblue", "slategray", "snow", "springgreen", "steelblue",
			"tan", "teal", "thistle", "tomato", "turquoise", "violet",
			"wheat", "white", "whitesmoke", "yellow", "yellowgreen2"
		].indexOf(c.toLowerCase()) >= 0;
	}

	function checkRgb(rgb) {
		var teste = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		if (teste != null) return true;
		teste = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/);
		if (teste != null) return true;
		return false;
	}

	function checkHex(hex) {
		hex = hex.replace('#', '');
		if ([3, 4, 6, 8].indexOf(hex.length) < 0) return false;

		hex = hex.replace(/\d/g, '');

		if (hex.search(/([\\\-\|?&%$#@£¢§!:;.,=+_*"'¬/)(][}{><~´`^¨¹²³ªº°])/) >= 0
			|| hex.search(/([áàâãéèêíìîóòôõúùûçñý])/i) >= 0
			|| hex.search(/[g-z]/gi) >= 0
		) {
			return false;
		}
		return true;
	}

	if (checkColorName(color) || checkRgb(color) || checkHex(color)) return true;

	return false;
}
