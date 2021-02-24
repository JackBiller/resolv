

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
					+ 		((options.icon || '') == '' ? '' : t(tab+1) + '<i class="' + resolvIcon(options.icon) + '"></i>&nbsp;')
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
