
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
	var orderClass = ['xs','sm','md','lg','xl'];

	if (bootstrap == '4') {
		// Valida o col-xs
		if (classDiv.indexOf('col-xs-') > -1) {
			classDiv = classDiv.replace(/col-xs-/gi, 'col-');
		}
		// Valida o offset
		if (classDiv.indexOf('col-offset') > -1) {
			classDiv = classDiv.replace(/col-offset-/gi, 'offset-');
		}
		// Valida o hidden para d- (display)
		if (classDiv.search(/hidden-(xs|sm|md|lg)/) > -1) {
			var indexOrderClass = -1;
			orderClass.forEach(function(order, i) {
				if (classDiv.indexOf('hidden-' + order) >= 0) indexOrderClass = i;
			});
			classDiv = classDiv.replace(/hidden-(xs|sm|md|lg)/gi, ''
				+ 'd-' + orderClass[indexOrderClass].replace('xs','')
				+ (indexOrderClass == 0 ? '' : '-') + 'none '
				+ 'd-' + orderClass[indexOrderClass+1] + '-block'
			);
		}
		// Valida o visible para d- (display)
		if (classDiv.search(/visible-(xs|sm|md|lg)/) > -1) {
			var indexOrderClass = -1;
			orderClass.forEach(function(order, i) {
				if (classDiv.indexOf('visible-' + order) >= 0) indexOrderClass = i;
			});
			classDiv = classDiv.replace(/visible-(xs|sm|md|lg)/gi, ''
				+ (indexOrderClass == 0 ? '' : 'd-none ')
				+ 'd-' + orderClass[indexOrderClass+1] + '-none'
				+ ' d' + (indexOrderClass == 0 ? '' : '-')
				+ orderClass[indexOrderClass].replace('xs','')
			);
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


		/*
			bootstrap 3 	|	bootstrap 4
			----------------------------------------------
			.visible-xs-*	|	.d-* .d-sm-none
			.visible-sm-*	|	.d-none .d-sm-* .d-md-none
			.visible-md-*	|	.d-none .d-md-* .d-lg-none
			.visible-lg-*	|	.d-none .d-lg-* .d-xl-none
			.visible-xl-*	|	.d-none .d-xl-*
			.hidden-xs		|	.d-none .d-sm-*
			.hidden-sm		|	.d-sm-none .d-md-*
			.hidden-md		|	.d-md-none .d-lg-*
			.hidden-lg		|	.d-lg-none .d-xl-*
			.hidden-xl		|	.d-xl-none

			bootstrap 3: * = [block,inline,inline-block]
			bootstrap 4: * = [inline,inline-block,block,table,table-row,table-cell,flex,inline-flex]
		*/
		// Valida o offset
		// classDiv = classDiv.split('offset');
		// classDiv.forEach(function(c, i) {
		// 	if (classDiv.length > 1 && i != classDiv.length-1
		// 		&& c.lastIndexOf('col-') != (c.length-4)
		// 	) {
		// 		classDiv[i] += 'col-';
		// 	}
		// });
		// classDiv = classDiv.join('offset');

		// Valida o hidden para d- (display)
		// if (classDiv.search(/(d-none|d-(sm|md|lg)-none)/) > -1) {
		// 	classDiv = classDiv.replace(/(d-none|d-(sm|md|lg)-none)/gi, '');
		// }
		// if (classDiv.search(/d-(sm|md|lg)-block/) > -1) {
		// 	var indexOrderClass = -1;
		// 	orderClass.forEach(function(order, i) {
		// 		if (classDiv.indexOf('d-' + order) >= 0) indexOrderClass = i;
		// 	});
		// 	classDiv = classDiv.replace(/d-(sm|md|lg)-(block|inline|inline-block)/gi,
		// 		'hidden-' + orderClass[indexOrderClass-1]
		// 	);
		// }

		classDiv = classDiv.replace(/-xl/gi, '-lg');
	}
	return classDiv;
}
