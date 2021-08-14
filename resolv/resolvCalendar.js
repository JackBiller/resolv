

function resolvCalendar(options) {
	/*
		options: {
			descForm: '' 						-- Parâmetro de identificação
			events: { 							-- Agendamento que vão ser mostrados no calendário
				title: '' 						-- Título do evento
				start: '' 						-- Onde inicia o evento model: Y-MM-DD HH:mm:ss
				end: '' 						-- Onde termina o evento model: Y-MM-DD HH:mm:ss
				textColor: '' 					-- Cor do texto
				color: '' 						-- Cor do agendamento
				rendering: '' 					-- Modo de renderizar, usado no feriado para renderiza em 'background'
			}
			data: "today" 						-- Data padrão calendário ex: Y-MM-DD
			view: "month" 						-- Type view (month,agendaWeek,agendaDay)
			buttons: { 							-- Botões personalizados
				id: { 							-- Identificador do botão
					text: '' 					-- Descrição do botão
					click: function() { } 		-- Evento de click do botão
				}
			}
			feriados: { 						-- Feriados
				desc: '' 						-- Descrição do feriado
				date: '' 						-- Dia do feriado
			}
			minTime: [time,type] 				-- Minimo de tempo que cada agendamento deve ter, ex. type = 'minute'
			click: function(event) { } 			-- Evento de click
			editable: (0|1) 					-- Se vai poder editar os agendamento do calendário
		}
	*/
	var html = '';

	var events = [];
	for (var i = 0; i < (options.events || []).length; i++) {
		events.push({});
		Object.keys(options.events[i]).forEach(function(e) {
			events[i][e] = options.events[i][e];
		});
	}

	var minTime = function(start, end) { return end }, event, end;
	var time = (options.minTime || [])[0]
	, 	type = (options.minTime || [])[1]

	if ((options.minTime || '') != '') {
		minTime = function(start, end, time, type) {
			if (moment(end).diff(moment(start), type) < time)
				return moment(start).add(time, type).format('Y-MM-DD HH:mm').replace(' ','T');
			return end;
		};
	}

	for (var i = 0; i < events.length; i++) {
		event = events[i];
		end = minTime(event.start.replace('T',' '), event.end.replace('T',' '), time, type);
		event.textColor = CheckLumaColor(event.color) ? '#fff' : '#000';
		events[i].end = end;
	}

	(options.feriados || []).forEach(feriado => {
		events.push({
			no_cont: true,
			start: feriado.date + "T00:00",
			end: feriado.date + "T23:59",
			descricao: feriado.desc,
			rendering: 'background',
			color: 'tomato',
		});
		events.push({
			no_cont: true,
			start: feriado.date,
			end: feriado.date,
			descricao: feriado.desc,
			rendering: 'background',
			color: 'tomato',
		});
	});


	html = ''
		+t(0)+ 	"<div id='" + options.descForm + "Calendar'></div>"
		+t(0)+ 	"<script>"
		+t(1)+ 		"var " + options.descForm + "ConfigCalendar = {"
		+t(2)+ 			" data: '" + (options.data || moment.format('Y-MM-DD')) + "',"
		+t(2)+ 			" view: '" + (options.view || 'month') + "'"
		+t(2)+ 		"};"
		+t(1)+ 		"try { $('#" + options.descForm + "Calendar').fullCalendar('destroy'); } catch(error) {}"
		+t(1)+ 		"$('#" + options.descForm + "Calendar').fullCalendar({"
		+t(2)+ 			"themeSystem: 'bootstrap3'," // 'bootstrap4',
		+t(2)+ 			"header: {"
		+t(3)+ 				"left: '',"
		+t(3)+ 				"center: 'title',"
		+t(3)+ 				"right: ''"
		+t(2)+ 			"},"
		+t(2)+ 			"footer: { "
		+t(3)+ 				"left: 'prev,next today " + Object.keys(options.buttons || {}).join(' ') + "',"
		+t(3)+ 				"right: 'month,agendaWeek,agendaDay'," // ,listWeek
		+t(2)+ 			"},"
		+t(2)+ 			"defaultDate: " + options.descForm + "ConfigCalendar.data," // pegarData(), // 'YYYY-MM-DD',
		+t(2)+ 			"navLinks: true," // can click day/week names to navigate views
		+t(2)+ 			"navLinkDayClick: function(date, jsEvent) { "
		+t(3)+ 				"$('#" + options.descForm + "Calendar').fullCalendar('changeView', 'agendaDay', date.format() );"
		+t(2)+ 			"},"
		+t(2)+ 			"editable: " + String(options.editable || false) + ","
		+t(2)+ 			"eventLimit: true," // allow "more" link when too many events
		+t(2)+ 			"defaultView: " + options.descForm + "ConfigCalendar.view," // 'agendaWeek',
		+t(2)+ 			"allDaySlot: false,"
		+t(2)+ 			"scrollTime: '08:00:00',"
		// +t(2)+ 			"columnHeaderFormat: 'ddd\nD',"
		+t(2)+ 			"columnHeaderHtml: function(mom) { "
		+t(3)+ 				"var view = $('#" + options.descForm + "Calendar').fullCalendar('getView');"
		+t(3)+ 				options.descForm + "ConfigCalendar.data = mom.format('Y') + \"-\" + (mom.format('M') < 10"
		+t(4)+ 					"? \"0\"+mom.format('M') : mom.format('M')) + \"-\" + (mom.format('D') < 10"
		+t(4)+ 					"? \"0\"+mom.format('D') : mom.format('D'));"
		+t(3)+ 				options.descForm + "ConfigCalendar.view = view.name;"
		+t(3)+ 				"if (view.name == 'month')"
		+t(4)+ 					"return ''"
		+t(5)+ 						"+ '<div style=\"color: '+(mom.weekday() == 0 ? 'gray' : 'black')+';font-size: 18px;\">'+mom.format('ddd')+'</div>';"
		+t(3)+ 				"else "
		+t(4)+ 						"return ''"
		+t(5)+ 							"+ '<div style=\"color: '+(mom.weekday() == 0 ? 'gray' : 'black')+';font-size: 11px;\">'"
		+t(5)+ 							"+ mom.format('ddd') + '<br><h3 style=\"margin:0\">' + mom.format('D') + '</h3>'"
		+t(5)+ 							"+ '</div>';"
		+t(2)+ 			'},'
		+t(2)+ 			"timeFormat: ' '," // 'H(:mm)',  // remover o horário que aparece na frente da descrição do agendamento
		+t(2)+ 			"events: " + JSON.stringify(events) + ","
		+t(2)+ 			"eventResizeStart: function() { return false; },"
		+t(2)+ 			"eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) { "
		+t(3)+ 				"if ((event.no_cont || '') != '') return false;"
		+t(3)+ 				"if (view.name == \"agendaWeek\" || view.name == \"agendaDay\") { "
		+t(4)+ 					"if ("
		+t(5)+ 						"agendamento_Global[event.indice].dataInical 		!= '' &&"
		+t(5)+ 						"agendamento_Global[event.indice].horarioInical 	!= '' &&"
		+t(5)+ 						"agendamento_Global[event.indice].horarioFinal 		!= ''"
		+t(4)+ 					") { "
		+t(5)+ 						"var data = agendamento_Global[event.indice].dataInical + \" \" + agendamento_Global[event.indice].horarioFinal;"
		+t(5)+ 						"data = moment(data).add( delta._data.milliseconds, 'milliseconds'	)"
		+t(6)+ 											".add( delta._data.seconds, 		'seconds'		)"
		+t(6)+ 											".add( delta._data.hours, 			'hours'			)"
		+t(6)+ 											".add( delta._data.minutes, 		'minutes'		)"
		+t(6)+ 											".add( delta._data.days, 			'days'			)"
		+t(6)+ 											".add( delta._data.months, 			'months'		)"
		+t(6)+ 											".add( delta._data.years, 			'years'			)"
		+t(6)+ 											".format().split('T');" // [1].split('-')[0];
		+t(5)+ 						"agendamento_Global[event.indice].horarioFinal = data[1].split('-')[0];"
		+t(5)+ 						"agendamento_Global[event.indice].dataFinal = data[0];"
		+t(4)+ 					"}"
		+t(4)+ 					"var horario = event.start.format().split('T');"
		+t(4)+ 					"agendamento_Global[event.indice].horarioInical = horario[1];"
		+t(4)+ 					"agendamento_Global[event.indice].dataInical = horario[0];"
		+t(3)+ 				"} else { "
		+t(4)+ 					"if (agendamento_Global[event.indice].DT_AGENDA != '') { "
		+t(5)+ 						"var diff_days 	= moment(agendamento_Global[event.indice].dataFinal).diff(agendamento_Global[event.indice].dataInical, 'days'	);"
		+t(5)+ 						"var diff_months = moment(agendamento_Global[event.indice].dataFinal).diff(agendamento_Global[event.indice].dataInical, 'months'	);"
		+t(5)+ 						"var diff_years 	= moment(agendamento_Global[event.indice].dataFinal).diff(agendamento_Global[event.indice].dataInical, 'years'	);"
		+t(0)+ 						""
		+t(5)+ 						"agendamento_Global[event.indice].dataInical = event.start.format().indexOf('T') == -1 "
		+t(6)+ 							"? event.start.format() "
		+t(6)+ 							": event.start.format().split('T')[0];"
		+t(5)+ 						"agendamento_Global[event.indice].dataFinal = moment(agendamento_Global[event.indice].dataInical)"
		+t(6)+ 							".add(diff_days, 'days').add(diff_months, 'months').add(diff_years, 'years').format().split('T')[0];"
		+t(4)+ 					"} else { "
		+t(5)+ 						"agendamento_Global[event.indice].dataInical = event.start.format().indexOf('T') == -1 ? event.start.format() : event.start.format().split('T')[0];"
		+t(5)+ 						"agendamento_Global[event.indice].dataFinal = agendamento_Global[event.indice].dataInical;"
		+t(4)+ 					"}"
		+t(3)+ 				"}"
		+t(3)+ 				"$(\".popover\").css('display', 'none');" /* fechar o tooltip dos agendamento guando passa o mouse por cima */
		+t(3)+ 				"definirDataHoraAgenda(event, revertFunc);"
		+t(2)+ 			"},"
		+t(2)+ 			"eventResize: function(event, delta, revertFunc) { "
		+t(3)+ 				"if ((event.no_cont || '') != '') return false;"
		+t(3)+ 				"var horario = event.end.format().split('T');"
		+t(3)+ 				"agendamento_Global[event.indice].horarioFinal = horario[1];"
		+t(3)+ 				"agendamento_Global[event.indice].dataFinal = horario[0];"
		+t(3)+ 				"$(\".popover\").css('display', 'none');" /* fechar o tooltip dos agendamento guando passa o mouse por cima */
		+t(3)+ 				"definirDataHoraAgenda(event, revertFunc);"
		+t(2)+ 			"},"
		+t(2)+ 			"eventDragStart: function() { "
		+t(3)+ 				"$(\".popover\").css('display', 'none');" /* fechar o tooltip dos agendamento guando passa o mouse por cima */
		+t(2)+ 			"},"
		+t(2)+ 			"customButtons: { "
			+ Object.keys(options.buttons || {}).map(function(key) {
				return ''
					+t(3)+ 	key + ":{"
					+t(4)+ 		"text: '" + (options.buttons[key].text || '') + "',"
					+t(4)+ 		"click: " + String(options.buttons[key].click || function() {})
					+t(3)+ 	"}"
			}).join(',')
		+t(2)+ 			"},"
		+t(2)+ 			"eventClick: function(calEvent) { "
		+t(3)+ 				"if ((calEvent.no_cont || '') != '') return false;"
		+t(3)+ 				"$(\".popover\").css('display', 'none');" /* fechar o tooltip dos agendamento guando passa o mouse por cima */
		+t(3)+ 				"var func = " + String((options.click || function() { })) + ";"
		+t(3)+ 				"func(calEvent);"
		+t(3)+ 				"$(\".popover\").css('display', 'none');"
		+t(2)+ 			"},"
		+t(2)+ 			"eventAfterRender: function(eventObj, $el) {"
		+t(3)+ 				"$el[0].id = 'elemento'+eventObj.indice;"
		+t(3)+ 				"if ((eventObj.no_cont || '') != '') { "
		+t(4)+ 					"$el.popover({"
		+t(5)+ 						"title: eventObj.descricao,"
		+t(5)+ 						"trigger: 'hover',"
		+t(5)+ 						"container: 'body',"
		+t(5)+ 						"placement: 'top',"
		+t(4)+ 					"});"
		+t(4)+ 					"return false;"
		+t(3)+ 				"}"
		+t(3)+ 				"var maxChar = 100, desc = agendamento_Global[eventObj.indice].DS_ATENDIMENTO;"
		+t(2)+ 			"},"
		+t(1)+ 		"});"
		+t(0)+ 	"</"+"script>"

	return html;
}


function toHex(color) {
	function rgb2hex(rgb) {
		try {
			var t = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			if (t != null) {
				return "#" + hex(t[1]) + hex(t[2]) + hex(t[3]);
			}
			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/);
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]) + hex(rgb[4]);
		} catch(e) {
			return false;
		}
	}

	function colorName2Hex(colour) {
		return {
			"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
			"beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
			"cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
			"darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
			"darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
			"darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
			"firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
			"gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
			"honeydew":"#f0fff0","hotpink":"#ff69b4",
			"indianred":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
			"lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
			"lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
			"lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
			"magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
			"mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
			"navajowhite":"#ffdead","navy":"#000080",
			"oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
			"palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
			"rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
			"saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
			"tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
			"violet":"#ee82ee",
			"wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
			"yellow":"#ffff00","yellowgreen":"#9acd32"
		}[colour.toLowerCase()] || false;
	}

	function hex(x) {
		var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}

	var c = colorName2Hex(color) || rgb2hex(color);
	if (c) color = c;

	return color;
}

function forceHex6(hex) {
	hex = hex.replace('#','');
	var n = hex.length;
	if (n == 3 || n == 4) {
		return '#' + hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (n == 8) {
		return '#' + hex.substring(0,6);
	}
	return '#' + hex;
}

function CheckLumaColor(c) {
	var color = toHex(c);
	if (color) c = color;

	var c = c.replace('#', '');  // strip #
	var rgb = parseInt(c, 16);   // convert rrggbb to decimal
	var r = (rgb >> 16) & 0xff;  // extract red
	var g = (rgb >>  8) & 0xff;  // extract green
	var b = (rgb >>  0) & 0xff;  // extract blue

	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

	// Fiz alguns testes e identifique que o fator 160 é uma boa referência
	return (luma < 160);
}
