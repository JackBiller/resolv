
function resolvPreview(options={}, tab=0) { 
	/*
		options: { 
			descForm: '' 					-- Parametro Identificador
			ctx: '' 						-- Conteudo do Preview
			pathAce: './lib/ace' 			-- Caminho para lib do editor ace
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
						textarea: {
							id: 'textareaJson' + options.descForm, onEnter, style: { 'height': '500px' }
						}
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
									, id: 'textarea' + options.descForm, style: { 'height': '443px' }
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

		/** Editor ACE */
		+t(tab+1) 	+		`function inject${options.descForm}(options, callback) { `
		+t(tab+2) 	+			`var load = function(path, callback) { `
		+t(tab+3) 	+				`var head = document.getElementsByTagName('head')[0];`
		+t(tab+3) 	+				`var s = document.createElement('script');`
		+t(tab+3) 	+				`s.src = options.baseUrl + "/" + path;`
		+t(tab+3) 	+				`head.appendChild(s);`
		+t(tab+3) 	+				`s.onload = s.onreadystatechange = function(_, isAbort) { `
		+t(tab+4) 	+					`if (isAbort || !s.readyState || s.readyState == "loaded" || s.readyState == "complete") {`
		+t(tab+5) 	+						`s = s.onload = s.onreadystatechange = null;`
		+t(tab+5) 	+						`if (!isAbort) callback();`
		+t(tab+4) 	+					`}`
		+t(tab+3) 	+				`};`
		+t(tab+2) 	+			`};`
		+t(tab+2) 	+			`var pending = [];`
		+t(tab+2) 	+			`var transform = function(el) { pending.push(el) };`
		+t(tab+2) 	+			`load("ace.js", function() {`
		+t(tab+3) 	+				`ace.config.loadModule("ace/ext/textarea", function(m) {`
		+t(tab+4) 	+					`transform = function(el) { `
		+t(tab+5) 	+						`if (!el.ace) el.ace = m.transformTextarea(el, options.ace);`
		+t(tab+4) 	+					`};`
		+t(tab+4) 	+					`pending = pending.forEach(transform);`
		+t(tab+4) 	+					`callback && setTimeout(callback);`
		+t(tab+3) 	+				`});`
		+t(tab+2) 	+			`});`
		+t(tab+2) 	+			`if (options.target)`
		+t(tab+3) 	+				`return transform(options.target);`
		+t(tab+2) 	+			`window.addEventListener("click", function(e) {`
		+t(tab+3) 	+				`if (e.detail == 3 && e.target.localName == "textareaJson${options.descForm}") transform(e.target);`
		+t(tab+2) 	+			`});`
		+t(tab+1) 	+		`}`
		+t(tab+1) 	+		`var textAce${options.descForm};`
		+t(tab+1) 	+		`inject${options.descForm}({`
		+t(tab+2) 	+			`baseUrl: "./lib/ace",`
		+t(tab+2) 	+			`target: $("#textareaJson${options.descForm}")[0]`
		+t(tab+1) 	+		`}, function () { `
		+t(tab+2) 	+			`textAce${options.descForm} = $("#textareaJson${options.descForm}")[0].ace;`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('theme',"monokai");`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('mode',"json");`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('fontSize','11px');`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('showGutter',true);`
		+t(tab+1) 	+		`});`


		+t(tab+1) 	+		`function injectHtml${options.descForm}(options, callback) { `
		+t(tab+2) 	+			`var load = function(path, callback) { `
		+t(tab+3) 	+				`var head = document.getElementsByTagName('head')[0];`
		+t(tab+3) 	+				`var s = document.createElement('script');`
		+t(tab+3) 	+				`s.src = options.baseUrl + "/" + path;`
		+t(tab+3) 	+				`head.appendChild(s);`
		+t(tab+3) 	+				`s.onload = s.onreadystatechange = function(_, isAbort) { `
		+t(tab+4) 	+					`if (isAbort || !s.readyState || s.readyState == "loaded" || s.readyState == "complete") {`
		+t(tab+5) 	+						`s = s.onload = s.onreadystatechange = null;`
		+t(tab+5) 	+						`if (!isAbort) callback();`
		+t(tab+4) 	+					`}`
		+t(tab+3) 	+				`};`
		+t(tab+2) 	+			`};`
		+t(tab+2) 	+			`var pending = [];`
		+t(tab+2) 	+			`var transform = function(el) { pending.push(el) };`
		+t(tab+2) 	+			`load("ace.js", function() {`
		+t(tab+3) 	+				`ace.config.loadModule("ace/ext/textarea", function(m) {`
		// +t(tab+3) 	+				`ace.config.loadModule("ace/ext/static_highlight", function(m) {`
		+t(tab+4) 	+					`transform = function(el) { `
		+t(tab+5) 	+						`if (!el.ace) el.ace = m.transformTextarea(el, options.ace);`
		+t(tab+4) 	+					`};`
		+t(tab+4) 	+					`pending = pending.forEach(transform);`
		+t(tab+4) 	+					`callback && setTimeout(callback);`
		+t(tab+3) 	+				`});`
		+t(tab+2) 	+			`});`
		+t(tab+2) 	+			`if (options.target)`
		+t(tab+3) 	+				`return transform(options.target);`
		+t(tab+2) 	+			`window.addEventListener("click", function(e) {`
		+t(tab+3) 	+				`if (e.detail == 3 && e.target.localName == "textarea${options.descForm}") transform(e.target);`
		+t(tab+2) 	+			`});`
		+t(tab+1) 	+		`}`
		+t(tab+1) 	+		`var textAceHTML${options.descForm};`
		+t(tab+1) 	+		`injectHtml${options.descForm}({`
		+t(tab+2) 	+			`baseUrl: "${options.pathAce || './lib/ace'}",`
		+t(tab+2) 	+			`target: $("#textarea${options.descForm}")[0]`
		+t(tab+1) 	+		`}, function () { `
		+t(tab+2) 	+			`textAceHTML${options.descForm} = $("#textarea${options.descForm}")[0].ace;`
		+t(tab+2) 	+			`textAceHTML${options.descForm}.setOption('theme',"monokai");`
		+t(tab+2) 	+			`textAceHTML${options.descForm}.setOption('mode',"html");`
		+t(tab+2) 	+			`textAceHTML${options.descForm}.setOption('fontSize','11px');`
		+t(tab+2) 	+			`textAceHTML${options.descForm}.setOption('showGutter',true);`
		+t(tab+1) 	+		`});`
		/** End: Editor ACE */

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
