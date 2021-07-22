
function resolvDiv(options, tab=0) { 
	/*
		options: {
			class: '' 		-- Class da div
			id: '' 			-- Id da div
			ctx: '' 		-- Conteudo div
			style: obj 		-- Objeto CSS
			text: '' 		-- Texto de conteudo dentro da div
		}
	*/
	var classDiv = resolvClassDiv(options.class || '');

	var html = ''
		+t(tab)		+ 	"<div"
					+ 		(classDiv == '' ? '' : " class='" + classDiv + "'")
					+ 		((options.id || '') == '' ? '' : " id='" + options.id + "'")
					+ 		((options.style || '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					+ 	">"
					+ 		((options.text || "") == '' ? '' : t(tab+1)+options.text)
					+ 		resolvConfig((options.ctx || {}),tab+1)
		+t(tab)		+ 	"</div>"

	return html;
}

function resolvClassDiv(classDiv) {
	var bootstrap = $.fn.tooltip.Constructor.VERSION.slice(0,1);
	if (bootstrap == '4') {
		// Valida o col-xs
		if (classDiv.indexOf('col-xs-') > -1) {
			classDiv = classDiv.replace(/col-xs-/gi, 'col-');
		}
		// Valida o offset
		if (classDiv.indexOf('col-offset') > -1) {
			classDiv = classDiv.replace(/col-offset-/gi, 'offset-');
		}
	}

	if (bootstrap == '3') {
		// Valida o col-xs
		if (classDiv.search(/col-([1-9][1-9]|[1-9])/) > -1) {
			var classDivRef = classDiv.search(/col-([1-9][1-9]|[1-9])/);
			classDivRef = classDiv.slice(classDivRef, classDivRef + 6);
			classDiv = classDiv.replace(/col-([1-9][1-9]|[1-9])/gi, 
				classDivRef.replace(' ', '').replace('col-', 'col-xs-')
			);
		}

		// Valida o offset
		classDiv = classDiv.split('offset');
		classDiv.forEach(function(c, i) {
			if (classDiv.length > 1 && i != classDiv.length-1
				&& c.lastIndexOf('col-') != (c.length-4)
			) {
				classDiv[i] += 'col-';
			}
		});
		classDiv = classDiv.join('offset');
	}
	return classDiv;
}
