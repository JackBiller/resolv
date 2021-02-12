
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
