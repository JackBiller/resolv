
function resolvFotos(options, tab=0) {
	/*
		options: {
			descForm: ''					-- Parâmetro de identificação
			desc: ''						-- Descrição padrão da DIV
			ajax: '' / function(){ }		-- Nome da função ajax
			but_delete: (0|1)				-- Se contém ou não botão para apagar imagem
			but_download: (0|1)				-- Se contém ou não botão para baixar imagem
			param: {}						-- Parâmetro da função ajax
			ck_upload: {					-- Informa se o componente vai fazer ou não upload de fotos
				param: {}					-- Parâmetros do ajax de upload
				input: {					-- Personalização do input type file
					type: 'file'
				}
			}
			ck_galeria: (0|1)
		}
	*/

	// var style = (options.style || '') == '' ? '' : ' style="' + resolvStyle(options.style) + '"',
	// 	num = (options.num || 1);

	/*
		- OK - Objetivo Principal: Listar Fotos de um registro especifico
		- Opção para upload de arquivo
		- Opção para tirar fotos da webcam
		- Opção para desenhar imagem
		- Opção de recortar imagem
		- Opção de girar imagem
		- Opção de aplicar filtros
		- Opção para apagar imagem
	*/

	var param = resolvParamAjax(options);

	var input = {};
	if ((options.ck_upload || '') != '') {
		input = { input: {
			type: 'file',
			id: 'inputFotos' + options.descForm,
			fileType: 'img',
			upload: {
				ajax: (options.ajax || 'ajax'),
				param: (options.ck_upload.param || {})
			}
		} }
		input.input = $.extend({}, input.input, (options.ck_upload.input || {}));
	}

	var html = t(tab) + ''
		+ ((options.ck_upload || '') == '' ? '' : ''
			+t(tab+0) + resolvConfig(input)
		)
		+t(tab+0) + `<div id="divFotos${options.descForm}">${options.desc || ''}</div>`
		+t(tab+0) + `<script>`
		+t(tab+0) + 	`var imagensObject${options.descForm} = [];`
		+t(tab+0) + 	`function buscarFotos${options.descForm}(id) {`
		+t(tab+1) + 		`$("#divFotos${options.descForm}").html("Carregando...");`
		+t(tab+1) + (typeof(options.ajax) == 'string'
						? options.ajax
						: `window[(function() { var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2) + 			`param: {`
		+t(tab+3) + 				param + `id`
		+t(tab+2) + 			`},`
		+t(tab+2) + 			`done: function(data) {`
		+t(tab+3) + 				`console.log(data);`
		+t(tab+3) + 				`data = JSON.parse(data);`
		+t(tab+3) + 				`console.log(data);`
		+t(tab+3) + 				`if (data.branchs.length != 0 && data.debug == "OK") {`
		+t(tab+4) + 					`imagensObject${options.descForm} = data.branchs;`
		+t(tab+3) + 				`} else {`
		+t(tab+4) + 					`imagensObject${options.descForm} = [];`
		+t(tab+3) + 				`}`
		+t(tab+3) + 				`listarFotos${options.descForm}();`
		+t(tab+2) + 			`}`
		+t(tab+1) + 		`})`
		+t(tab+0) + 	`}`
		+t(tab+0) + 	`function listarFotos${options.descForm}() {`
		+t(tab+1) + 		`var src, exts = 'PNG,JPG,TIFF,JPEG,BMP,PSD,EXIF,RAW,PDF,WEBP,GIF,EPS,SVG'.split(',');`
		+t(tab+1) + 		`var html = ""`
		+t(tab+2) + 			`+ "<div class=\\"col-xs-12\\" id=\\"jornal\\"><!-- style=\\"margin: 0; padding: 0;width: 922px;height: 545px;\\" -->"`
		+t(tab+2) + 			`+ 		"<div class=\\"flipbook-viewport\\" id=\\"viewport\\">"`
		+t(tab+2) + 			`+ 			"<div id=\\"container\\">"` // class=\\"container\\"
		+t(tab+2) + 			`+ 				"<div class=\\"flipbook\\" id='flipbookDiv' style=\\"/*width: 922px;height: 545px;*/\\"></div>";`
		+t(tab+1) + 		`for (var i = 0; i < imagensObject${options.descForm}.length; i++) { `
		+t(tab+2) + 			`if (`
					+			 	`(imagensObject${options.descForm}[i].isFile || '') != '' && `
					+ 				`exts.indexOf(imagensObject${options.descForm}[i].ext.toUpperCase()) >= 0`
					+ 			`) {`
		+t(tab+3) + 				`src = imagensObject${options.descForm}[i].path;`
		+t(tab+3) + 				`imagensObject${options.descForm}[i].src = src;`
		+t(tab+3) + 				`imagensObject${options.descForm}[i].w = imagensObject${options.descForm}[i].width;`
		+t(tab+3) + 				`imagensObject${options.descForm}[i].h = imagensObject${options.descForm}[i].height;`
		+t(tab+3) + 				`html += ""`
		+t(tab+4) + 					`+ 				"<div name='flipbookPag'"`
		+t(tab+4) + 					`+ 					" class='flipbookPag col-xs-6 col-sm-3 col-md-2' style='padding: 4px; text-align:center;'"`
		+t(tab+4) + 					`+ 				">"`
		+t(tab+4) + 					`+ 					"<img src='" + src + "' width='100%' name='elevatezoom'"`
		+t(tab+4) + 					`+ 						" onclick='openPhotoSwipe${options.descForm}(" + i + ");'>"`
		+ ((options.but_download || '') == '' ? '' : ''
			+t(tab+4) + 				`+ 					"<button class='btn btn-primary' name='btnApagaFoto'`
					  + 										` onclick='$(\\"#downloadFotos${options.descForm}" + i + "\\")[0].click();'"`
			+t(tab+4) + 				`+ 						" style='position: absolute; bottom:4px; right:4px;`
					+ 												`padding:2px;padding-left:8px;padding-right:8px;'"`
			+t(tab+4) + 				`+ 					">"`
			+t(tab+4) + 				`+ 						"<i class='fa fa-download'></i>"`
			+t(tab+4) + 				`+ 					"</button>"`
			+t(tab+4) + 				`+ 					"<a id='downloadFotos${options.descForm}" + i + "' style='display:none' href='" + src + "' download></a>"`
		)
		+ ((options.but_delete || '') == '' ? '' : ''
			+t(tab+4) + 				`+ 					"<button class='btn btn-danger' name='btnApagaFoto' onclick='apagarFoto${options.descForm}(\\"" + i + "\\");'"`
			+t(tab+4) + 				`+ 						" style='position:absolute;top:4px;right:4px;`
					+ 												`padding:2px;padding-left:8px;padding-right:8px;'"`
			+t(tab+4) + 				`+ 					">"`
			+t(tab+4) + 				`+ 						"<i class='fa fa-times'></i>"`
			+t(tab+4) + 				`+ 					"</button>"`
		)
		+t(tab+4) + 					`+ 				"</div>";`
		+t(tab+2) + 			`}`
		+t(tab+1) + 		`}`
		+t(tab+1) + 		`html += ""`
		+t(tab+2) + 			`+				"</div>"`
		+t(tab+2) + 			`+			"</div>"`
		+t(tab+2) + 			`+		"</div>"`
		+t(tab+2) + 			`+		"<br>"`
		+t(tab+2) + 			`+	"</div>"`
		+t(tab+1) + 		`$("#divFotos${options.descForm}").html(html);`
		+t(tab+0) + 	`}`
		+t(tab+0) + 	`function openPhotoSwipe${options.descForm}(index=0) {`
		+t(tab+1) + 		`var pswpElement = document.querySelectorAll('.pswp')[0], items = [];`
		+t(tab+1) + 		`for (var i = index; i < imagensObject${options.descForm}.length; i++) {`
		+t(tab+2) + 			`if (imagensObject${options.descForm}[i].w == 0) imagensObject${options.descForm}[i].w = tamanahoImagemReal;`
		+t(tab+2) + 			`if (imagensObject${options.descForm}[i].h == 0) imagensObject${options.descForm}[i].h = alturaImagemReal;`
		+t(tab+2) + 			`items.push(imagensObject${options.descForm}[i]);`
		+t(tab+1) + 		`}`
		+t(tab+1) + 		`if (index != 0) {`
		+t(tab+2) + 			`for (var i = 0; i < index; i++) {`
		+t(tab+3) + 				`if (imagensObject${options.descForm}[i].w == 0) imagensObject${options.descForm}[i].w = tamanahoImagemReal;`
		+t(tab+3) + 				`if (imagensObject${options.descForm}[i].h == 0) imagensObject${options.descForm}[i].h = alturaImagemReal;`
		+t(tab+3) + 				`items.push(imagensObject${options.descForm}[i]);`
		+t(tab+2) + 			`}`
		+t(tab+1) + 		`}`
		+t(tab+1) + 		`var options = {`
		+t(tab+2) + 			`history: false,`
		+t(tab+2) + 			`focus: false,`
		+t(tab+2) + 			`showAnimationDuration: 0,`
		+t(tab+2) + 			`hideAnimationDuration: 0`
		+t(tab+1) + 		`};`
		+t(tab+1) + 		`var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);`
		+t(tab+1) + 		`gallery.init();`
		+t(tab+0) + 	`};`
		+t(tab+0) + `</`+`script>`

	return html;
}

function buscarFotos(descForm, id, error=0) { listarFotos(descForm, id, error); }
function listarFotos(descForm, id, error=0) {
	try { window[`buscarFotos${descForm}(${id});`]; }
	catch(e) {
		if (typeof(error) == 'function') error(e);
		else alert(error || 'Ocorreu um erro para listar as fotos!');
		console.error(e);
	}
}
