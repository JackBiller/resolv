
function resolvPreview(options={}, tab=0) {
	/*
		options: {
			descForm: '' 					-- Parâmetro Identificador
			ctx: '' 						-- Conteúdo do Preview
			pathAce: './lib/ace' 			-- Caminho para lib do editor ace
			onBuild: function() { } 		-- Função disparada toda vez que reconstrói o obj do preview
		}
	*/

	// var random;
	// do {
	// 	random = parseInt(Math.random() * 100000);
	// } while (registerRandom_Global.indexOf(random) != -1);
	// registerRandom_Global.push(random);

	if ((options.descForm || '') == '') return '';

	var objOriginal = {};
	Object.keys((options.ctx || {})).forEach(function(key) {
		objOriginal[key] = options.ctx[key];
	});

	var html = ''
		+t(tab+0) 	+ 	'<div class="row" id="preview' + options.descForm + '">'
		+t(tab+1) 	+ 		'<div class="col-sm-5">'
		+t(tab+2) 	+ resolvConfig({
						textarea: {
							id: 'textareaJson' + options.descForm, style: { 'height': '500px' }
						}
					})
		+t(tab+1) 	+ 		'</div>'
		+t(tab+1) 	+ 		'<div class="col-sm-7">'
					+ resolvConfig({
						menu: { descForm: 'menu' + options.descForm, no_link: true, abas: [
							{ text: 'Preview', icon: 'eye', ctx: {
								div: { id: 'divPreview' + options.descForm }
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
					+			jsonToString(objOriginal, 0, true).replace(/<br>/gi, "\n")
					+		'`);'
		+t(tab+1) 	+ 		'$("#textarea' + options.descForm + '").val(`'
					+			resolvConfig(options.ctx || {}).replace(/<br>/gi, "\n")
									.replace(/\`/g, '\\\`')
									.replace(/\$/g, '\\\$')
									.replace(new RegExp('</'+'script>', 'gi'), '</`+`script>')
					+		'`);'
		+t(tab+1) 	+ 		'$("#divPreview' + options.descForm + '").html(`'
					+			resolvConfig(options.ctx || {}).replace(/<br>/gi, "\n")
									.replace(/\`/g, '\\\`')
									.replace(/\$/g, '\\\$')
									.replace(new RegExp('</'+'script>', 'gi'), '</`+`script>')
					+		'`);'

		/** Editor ACE */
		+t(tab+1) 	+		`function inject${options.descForm}(options, callback) {`
		+t(tab+2) 	+			`var load = function(path, callback) {`
		+t(tab+3) 	+				`var head = document.getElementsByTagName('head')[0];`
		+t(tab+3) 	+				`var s = document.createElement('script');`
		+t(tab+3) 	+				`s.src = options.baseUrl + "/" + path;`
		+t(tab+3) 	+				`head.appendChild(s);`
		+t(tab+3) 	+				`s.onload = s.onreadystatechange = function(_, isAbort) {`
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
		+t(tab+1) 	+		`}, function () {`
		+t(tab+2) 	+			`textAce${options.descForm} = $("#textareaJson${options.descForm}")[0].ace;`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('theme',"monokai");`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('mode',"json");`
		// +t(tab+2) 	+			`textAce${options.descForm}.setOption('mode',"javascript");`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('fontSize','11px');`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('showGutter',true);`
		+t(tab+1) 	+		`});`

		+t(tab+1) 	+ 		`function previewKeyDown${options.descForm}(e, whichkey) {`
		+t(tab+2) 	+ 			`var curso = $("#preview${options.descForm}").find('.ace_editor')[0];`
		+t(tab+2) 	+ 			`if (e.ctrlKey && whichkey == 13 && curso.className.indexOf('ace_focus') >= 0) {`
		+t(tab+3) 	+ 				`var statusGutter = textAce${options.descForm}.getOption('showGutter');`
		+t(tab+3) 	+ 				`var statusInvisible = textAce${options.descForm}.getOption('showInvisibles');`
		+t(tab+3) 	+ 				`textAce${options.descForm}.setOption('showGutter',false);`
		+t(tab+3) 	+ 				`textAce${options.descForm}.setOption('showInvisibles',false);`
		+t(tab+3) 	+ 				`setTimeout(function() {`
		+t(tab+4) 	+ 					`buildPreview(`
					+ 						`textAce${options.descForm}.container.innerText`
					+ 						`, ${jsonToString(options)});`
		+t(tab+4) 	+ 					`textAce${options.descForm}.setOption('showGutter',statusGutter);`
		+t(tab+4) 	+ 					`textAce${options.descForm}.setOption('showInvisibles',statusInvisible);`
		+t(tab+3) 	+ 				`}, 100);`
		+t(tab+2) 	+ 			`}`
		+t(tab+1) 	+ 		`}`
		+t(tab+1) 	+ 		`registerEventKeyboard.push("previewKeyDown${options.descForm}");`


		+t(tab+1) 	+		`function injectHtml${options.descForm}(options, callback) {`
		+t(tab+2) 	+			`var load = function(path, callback) {`
		+t(tab+3) 	+				`var head = document.getElementsByTagName('head')[0];`
		+t(tab+3) 	+				`var s = document.createElement('script');`
		+t(tab+3) 	+				`s.src = options.baseUrl + "/" + path;`
		+t(tab+3) 	+				`head.appendChild(s);`
		+t(tab+3) 	+				`s.onload = s.onreadystatechange = function(_, isAbort) {`
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
		+t(tab+4) 	+					`transform = function(el) {`
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
		+t(tab+1) 	+		`}, function () {`
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

function buildPreview(text, options) {
	var json = text;
	var id = options.descForm;

	try {
		eval(`json = ${json}`);
		$("#textareaJson"+id).val(text);
		$("#divPreview"+id).html(resolvConfig(json, 0, true));
		$("#menu" + id + "Ctx1").html(resolvConfig({
			textarea: { styleDiv: { 'margin-top': '15px' }
				, id: 'textarea' + options.descForm, style: { 'height': '443px' }
			}
		}));
		$("#textarea"+id).val(
			resolvConfig(json).replace(/<br>/gi, '\n')
		);

		var attrs = ['theme','mode','fontSize','showGutter','showPrintMargin','useSoftTabs','showInvisibles']
			.map(function(a) { return `textAceHTML${id}.setOption('${a}', "${window['textAceHTML'+id].getOption(a)}");` })
			.join('\n\t\t\t\t');

		eval(`
			injectHtml${id}({
				baseUrl: "${options.pathAce || './lib/ace'}",
				target: $("#textarea${id}")[0]
			}, function() {
				textAceHTML${id} = $("#textarea${id}")[0].ace;
				${attrs}
			});
		`);
		(options.onBuild || function() { })();
	} catch(e) {
		console.error(e);
		alert('Falha ao gerar preview!');
	}
}
