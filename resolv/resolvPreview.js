
function resolvPreview(options={}, tab=0) { 
	/*
		options: { 
			descForm: '' 					-- Parametro Identificador
			ctx: '' 						-- Conteudo do Preview
		}
	*/

	// var random;
	// do { 
	// 	random = parseInt( Math.random() * 100000 );
	// } while (registerRandom_Global.indexOf(random) != -1);
	// registerRandom_Global.push(random);

	if ((options.descForm || '') == '') return '';

	var onEnter;
	eval(`onEnter = function(e) { 
		if (e.ctrlKey) buildPreview("${options.descForm}");
		var func = ${String(options.onBuild || function() { })}; func();
	}`);

	var html = ''
		+t(tab+0) 	+ 	'<div class="row">'
		+t(tab+1) 	+ 		'<div class="col-sm-5">'
		+t(tab+2) 	+ resolvConfig({
						textarea: { rows: 25, id: 'textareaJson' + options.descForm, onEnter }
					})
		+t(tab+1) 	+ 		'</div>'
		+t(tab+1) 	+ 		'<div class="col-sm-7">'
					+ resolvConfig({
						menu: { descForm: 'menu' + options.descForm, no_link: true, abas: [
							{ text: 'Preview', icon: 'eye', ctx: {
								div: { id: 'divPreview' + options.descForm, text: resolvConfig(options.ctx) }
							} },
							{ text: 'Code', icon: 'code', ctx: {
								textarea: { styleDiv: { 'margin-top': '15px' }
									, id: 'textarea' + options.descForm, rows: 22
								},
							} },
						] }
					})
		+t(tab+1) 	+ 		'</div>'
		+t(tab+0) 	+ 	'</div>'
		+t(tab+0) 	+ 	'<script>'
		+t(tab+1) 	+ 		'$("#textareaJson' + options.descForm + '").val(`'
					+			jsonToString((options.ctx || {}), 0, true).replace(/<br>/gi, "\n")
					+		'`);'
		+t(tab+1) 	+ 		'$("#textarea' + options.descForm + '").val(`'
					+			resolvConfig(options.ctx).replace(/<br>/gi, "\n")
									.replace(/\`/g, '\\\`')
									.replace(/\$/g, '\\\$')
									.replace(new RegExp('</'+'script>', 'gi'), '</`+`script>')
					+		'`);'
		+t(tab+0) 	+ 	'</'+'script>'

	return html;
}

function buildPreview(id) {
	var json = $("#textareaJson"+id).val();
	try { 
		eval(`json = ${json}`);
		$("#divPreview"+id).html(resolvConfig(json, 0, true));
		$("#textarea"+id).val(
			resolvConfig(json).replace(/<br>/gi, '\n')
		);
	} catch(e) { 
		console.error(e);
		alert('Falha ao gerar preview!');
	}
}
