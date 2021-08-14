
/*
	Dependências
	<script src="jquery/dist/jquery.min.js"></script>
	<script src="jquery-ui/jquery-ui.min.js"></script>
*/

/* GER */
function resolvSortable(option, data=[]) {
	/*
		objParamGrade: {
			tamanhoFont: 		11
			fontFamily: 		"NomeDaFont"
			classTable: 		"table table-bordered stripe table-hover table-condensed table-responsive backTeste"
			titleTableBgColor: 	"#D5DEE3"
			titleTableColor: 	"black"
			titleTableWeight: 	"bold"
			headTableBgColor: 	"#D5DEE3"
			headTableColor: 	"black"
			headTableWeight: 	"bold"
			hoverTrTableColor: 	"lightblue"
		}

		option = {
			inputs: [
				{
					head: ''												// Descrição no titulo da tabela
					class: ''												// Class para delimitar o range de cada coluna Ex: (col-xs-11)

					param: '' 												// Parâmetro a ser mostrado na célula OR
					param: function(data, option, index) 					// Parâmetro a ser mostrado por function usará como callback,
					... 													// 		o option é referente as opções do input e o índice é dos dados OR
					param: { 												// Parâmetro mais personalizado para mostrar valores
						op: (CONCAT|SUM), 									// operação a ser realizada pelos valores
						val: [ { attr,literal } ] 							// valores a serem trabalhos para mostrar
					}

					dateFormat: { 											// Indica que o campo é data
						format: 'DD/MM/Y' 									// Define com vai ser impresso o formato da data
						format: function(data, option, index) 				// Pode usar como callback, similar ao atributo param
						useDataTable: 										// (0|1) default: 1
					}
					format: { 												// Indica que o campo é um número
						casas: 	  0 										// numero de casas decimais
						dec: 	',' 										// separador decimal
						mili: 	'.' 										// separador de milhar
					}
				}
			],
			descForm: '' 													// referencia para a função de editar e apagar registros
			objParamGrade: '' 												// objeto de estilização do qualidade
			ck_remove: (0|1) 												// informe se vai ter opção para remover o item
			icon_ball: (0|1) 												// se vai ser ícone de bolinha ou seta
		}
	*/

	var html = ''
		+ 	`<ul id="sortable${option.descForm}" class="todo-list">`
		+ 		`<li class="unsortable disable-sort-item row" style="margin:0;">`
		+ 			`<div class="row" style="width:100%">`
		+ 				`<div class="col-xs-1">`
		+ 					`<span class="" style="opacity: 0;white-space: nowrap;">`
		+ ((option.icon_ball || '') == ''
			? 					`<i class="fa fa-long-arrow-up" style="margin-left:1px"></i>`
			+ 					`<i class="fa fa-long-arrow-down" style="margin-right:1px"></i>`
			: 					`<i class="fa fa-ellipsis-v" style="margin-right:1px"></i>`
			+ 					`<i class="fa fa-ellipsis-v" style="margin-left:1px"></i>`
		)
		+ 					`</span>`
		+ 				`</div>`
		+ (option.inputs || []).map(function(input) { return ''
			+ 			`<div class="${(input.class || '')} text-${input.alignHead || input.align || 'left'}">`
			+ 				`<span class="text">${(input.head || '')}</span>`
			+ 			`</div>`
		}).join('')
		+ ((option.ck_remove || '') == '' ? '' : ''
			+ 			`<div class="col-xs-1">`
			+ 				`<span class="" style="opacity: 0;white-space: nowrap;">`
			+ 					`<i class="fa fa-ellipsis-v" style="margin-right:1px"></i>`
			+ 					`<i class="fa fa-ellipsis-v" style="margin-left:1px"></i>`
			+ 				`</span>`
			+ 			`</div>`
		)
		+ 			`</div>`
		+ 		`</li>`
		+ 		data.map(function(dt) { return returnItemSortable(dt, option)}).join('')
		+ 	`</ul>`
		+ 	`<style>`
		+ 		`.todo-list li {`
		+ 			`padding: 5px !important;`
		+ 		`}`
		+ 	`</style>`
		+ 	`<script>`
		+ 		`var optionsSortable${option.descForm} = ${jsonToString(option)};`
		+ 		`var dataSortable${option.descForm} = ${JSON.stringify(data)};`
		+ 		`dataSortable${option.descForm}.forEach(function(dt,i) {`
		+ 			`dataSortable${option.descForm}[i].li = $("#sortable${option.descForm}").find("li")[i+1]`
		+ 		`});`
		+ 		`$('#sortable${option.descForm}').sortable({`
		+ 			`placeholder: 'sort-highlight',`
		+ 			`handle: '.handle',`
		+ 			`forcePlaceholderSize: true,`
		+ 			`zIndex: 999999,`
		// + 			`cancel: ".disable-sort-item",`
		+ 			`items: "li:not(.unsortable)",`
		+ 			`update: function(event, ui) {`
		+ 				`reorderSortable("${option.descForm}");`
		+ 			`}`
		+ 		`});`
		+ 	`</`+`script>`

	return html;
}

function returnItemSortable(data, option) {
	return ''
		+ 	`<li data-id="${data[(option.id || '')]}" style="margin:0;background-color:white;border:1px solid black;margin-bottom:2px;">`
		+ 		`<div class="row" style="width:100%">`
		+ 			`<div class="col-xs-1">`
		+ 				`<span class="handle" style="white-space: nowrap;">`
		+ ((option.icon_ball || '') == ''
			? 				`<i class="fa fa-long-arrow-up" style="margin-left:1px"></i>`
			+ 				`<i class="fa fa-long-arrow-down" style="margin-right:1px"></i>`
			: 				`<i class="fa fa-ellipsis-v" style="margin-right:1px"></i>`
			+ 				`<i class="fa fa-ellipsis-v" style="margin-left:1px"></i>`
		)
		+ 				`</span>`
		+ 			`</div>`
		+ (option.inputs || []).map(function(input, index) { return ''
			+ 		`<div class="${(input.class || '')} text-${input.align || 'left'}">`
			+ 			`<span class="text">${resolveValPrintSortable($.extend(option, input), data, index)}</span>`
			+ 		`</div>`
		}).join('')
		+ ((option.ck_remove || '') == '' ? '' : ''
			+ 		`<div class="col-xs-1 text-center">`
			+ 			`<button class="btn btn-danger"`
			+ 				` onclick="removeItemSortable('${option.descForm}','${data[(option.id || '')]}');"`
			+ 			`>`
			+ 				`<i class="fa fa-times"></i>`
			+ 			`</button>`
			+ 		`</div>`
		)
		+ 		`</div>`
		+ 	`</li>`
}

function reorderSortable(id) {
	var option = window['optionsSortable'+id]
	, 	li = $('#sortable'+id).find('li')
	, 	newArrayId = [];

	for (var i = 1; i < li.length; i++)
		newArrayId.push(window['dataSortable'+id]
			.filter(function(dt) { return String(dt[option.id]) == String($(li[i]).data('id')) })[0]);

	window['dataSortable'+id] = newArrayId;
}

var getSortable = function(id) { return window['dataSortable'+id]; };

function addSortable(id, value) {
	var newValue = {};
	eval(`newValue = ${ jsonToString(value) }`);
	// eval(`newValue = { ${ Object.keys(value).map(key => `${key}: value.${key}`) } }`);

	$('#sortable'+id).append(returnItemSortable(newValue, window['optionsSortable'+id]));
	var index = window['dataSortable'+id].length;
	window['dataSortable'+id].push(newValue);
	window['dataSortable'+id][index].li = $('#sortable'+id).find("li")[index+1];
}

function removeItemSortable(id, item) {
	var data = getSortable(id)
	, 	option = window['optionsSortable'+id]
	, 	index = data.map(function(dt) { return String(dt[option.id])} ).indexOf(String(item));

	if (index >= 0) {
		$(data[index].li).remove();
		data.splice(index, 1);
	}
}

function resolveValPrintSortable(option, data, index) {
	var mask = (data[option.param] == undefined) ? '%0%' : (option.mask || '%0%');

	var valData = '';
	if (typeof(option.param) == 'function') {
		valData = option.param(data, option, index)
	}
	else if (typeof(option.param) == 'object') {
		if (['sum'].indexOf(option.param.op) < 0) valData = 0;

		if ((option.param.op || 'CONCAT').toUpperCase() == 'CONCAT') {
			valData = option.param.val.map(function(val) { return val.literal || data[val.attr]; }).join('');
		}
		if (option.param.op.toUpperCase() == 'SUM') {
			valData = option.param.val
				.map(function(val) { return parseFloat(val.literal || data[val.attr] || 0) })
				.reduce(function(t,v) { return t + v; }, 0);
		}
	}
	else {
		valData = (data[option.param] || '');
	}


	var val = '';
	if ((option.format || '') != '') {
		var { casas, dec, mili } = option.format;
		if ((typeof(option.param) == 'function' && valData == '') ||
			(typeof(option.param) != 'function' && data[option.param] == undefined)
		) {
			valData = option.default || '';
		} else {
			valData = (valData || 0);
			if (valData == 0 && (option.setDefaultValZero || false)) {
				val = option.default || '';
			} else {
				val = number_format(valData, (casas || 0), (dec || ','), (mili || '.'));
			}
		}
	}
	else if ((option.dateFormat || '') != '') {
		option.dateFormat.format = ((option.dateFormat || {}).format || 'DD/MM/Y')
		var valHide = "<spam style='display:none;'>%0%</spam>";
		try { valHide = valHide.replace('%0%', moment(valData).format('Y-MM-DD')); } catch(e) { }

		if (valData == '') {
			valData = option.default || '';
		} else {
			valData = moment(valData).format(
				eval(`option.dateFormat.format${ typeof(option.dateFormat.format) == 'string' ? '' : '(data, option, index)' }`)
			)
		}
		val = valHide + valData;
	}
	else {
		val = valData || option.default || '';
	}

	return mask.replace(/%0%/g, val);
}
