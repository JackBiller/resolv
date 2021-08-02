
function resolvLegenda(options, tab=0) {
	/*
		height: '20px' 				-- Altura do bloco da legenda
		width: 	'40px' 				-- Largura do bloco da legenda
		inline: (0|1) 				-- Caso verdadeiro os dados ficam numa única linha
		OR num > 2 					-- Caso seja um número e for maior que 1, vai de acordo com o numero por linhas
		info: [ 					-- Informações contidas na legenda
			{
				desc: '' 			-- Descrição da legenda
				color: '' 			-- Cor demostrativa (padrão para css podendo nome, hex(#000), rgb(0,0,0))
			}
		]
		classDiv: '' 				-- Div de referencia
		click: function( obj ){} 	-- Evento de click, tem como callback envia o objeto que clicou
		descForm: '' 				-- Parâmetro informativo
	*/
	var tr = t(tab+1) + "<tr>";
	var trF = t(tab+1) + "</tr>";

	var random;
	do {
		random = parseInt(Math.random() * 100000);
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	var click = options.click || '';
	var onClick = click == '' ? '' : " class='cursorClick' onclick='legendaClick" + random + "(%0%);'";

	var inline = (options.inline || '') != '' && (isNaN(options.inline) || options.inline < 2);
	var cols = (options.inline || '') != '' && !isNaN(options.inline) && options.inline > 1 ? options.inline : false;

	var html = ''
		+ (function(info) {
			var cels = ''
				+t(tab)		+ 	`<table width=''>`
			for (var i = 0; i < info.length; i++) {
				info[i].status = (info[i].status || 'show');

				cels += 	''
				// +t(tab+1)	+ 		`<tr>`
							+ (inline ? (i == 0 ? tr : '') : (cols ? (i == 0 || (i != 0 && i % cols == 0) ? tr : '') : tr))
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
							+ 				` style="text-decoration:${info[i].status == 'show' ? 'none' : 'line-through'};"`
							+ 				` align='left'`
							+ 			`>`
				+t(tab+3)	+ 				`&nbsp;${info[i].desc}&nbsp;&nbsp;&nbsp;&nbsp;`
				+t(tab+2)	+ 			`</td>`
							+ (inline ? (i == info.length-1 ? trF : '') : (cols ? (i == info.length-1 || ((i+1) > 0 && (i+1) % cols == 0) ? trF : '') : trF ))
				// +t(tab+1)	+ 		`</tr>`
			}
			cels += ''
				+t(tab)		+ 	`</table>`
				+ (click == '' ? '' : ''
					+t(tab)		+ 	`<script>`
					+t(tab+1) 	+ 		`function legendaClick${random}(i) {`
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
