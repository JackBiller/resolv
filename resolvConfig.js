
/*
	Dependencias:
		jQuery 
		bootstrap 3 
		moment
		jquery.mask
		jquery.browser.detection
		datatables

		scriptCofing.js
		scriptQualidade.js
		scriptGrade.js
*/

/*
	Tipos de Operação: 
		- blur 		: Disparado quando der blur no campo
		- check 	: Disparado quando for checar campo, nome padrão para quando não tem especificação do parametro
		- valid 	: Disparado quando tiver validado o campo no serialize
*/

// var importFile = [
// 	{ f: './resolv/resolvH.js' 					},
// 	{ f: './resolv/resolvMenu.js' 				},
// 	{ f: './resolv/resolvCodigoConsulta.js' 	},
// 	{ f: './resolv/resolvInput.js' 				},
// 	{ f: './resolv/resolvBr.js' 				},
// 	{ f: './resolv/resolvDiv.js' 				},
// 	{ f: './resolv/resolvLabel.js' 				},
// 	{ f: './resolv/resolvRow.js' 				},
// 	{ f: './resolv/resolvStyle.js' 				},
// ]

// var imported;
// for (var i = 0; i < importFile.length; i++) {
// 	imported = document.createElement('script');
// 	imported.src = importFile[i].f;
// 	document.head.appendChild(imported);
// }

var objRefConfig_Global 	= [];
var registerRandom_Global 	= [];
var registerInputFocus 		= [];
var registerEventKeyboard 	= [];
var registerEventAll 		= [];

var returnObjIdentado_Global = true;

var fa_icon_Global = [
	"address-book","address-book-o","address-card","address-card-o","adjust","american-sign-language-interpreting",
	"anchor","archive","area-chart","arrows","arrows-h","arrows-v","asl-interpreting","assistive-listening-systems",
	"asterisk","at","automobile","audio-description","balance-scale","ban","bank","bar-chart","bar-chart-o","barcode",
	"bars","bath","bathtub","battery-0","battery-1","battery-2","battery-3","battery-4","battery-empty","battery-full",
	"battery-half","battery-quarter","battery-three-quarters","bed","beer","bell","bell-o","bell-slash","bell-slash-o",
	"bicycle","binoculars","birthday-cake","blind","bolt","bomb","book","bookmark","bookmark-o","braille","briefcase",
	"bug","building","building-o","bullhorn","bullseye","bus","cab","calculator","calendar","calendar-o","calendar-check-o",
	"calendar-minus-o","calendar-plus-o","calendar-times-o","camera","camera-retro","car","caret-square-o-down",
	"caret-square-o-left","caret-square-o-right","caret-square-o-up","cart-arrow-down","cart-plus","cc","certificate",
	"check","check-circle","check-circle-o","check-square","check-square-o","child","circle","circle-o","circle-o-notch",
	"circle-thin","clock-o","clone","close","cloud","cloud-download","cloud-upload","code","code-fork","coffee",
	"cog","cogs","comment","comment-o","comments","comments-o","commenting","commenting-o","compass","copyright",
	"credit-card","credit-card-alt","creative-commons","crop","crosshairs","cube","cubes","cutlery","dashboard",
	"database","deaf","deafness","desktop","diamond","dot-circle-o","download","drivers-license","drivers-license-o",
	"edit","ellipsis-h","ellipsis-v","envelope","envelope-o","envelope-open","envelope-open-o","envelope-square",
	"eraser","exchange","exclamation","exclamation-circle","exclamation-triangle","external-link","external-link-square",
	"eye","eye-slash","eyedropper","fax","female","fighter-jet","file-archive-o","file-audio-o","file-code-o",
	"file-excel-o","file-image-o","file-movie-o","file-pdf-o","file-photo-o","file-picture-o","file-powerpoint-o",
	"file-sound-o","file-video-o","file-word-o","file-zip-o","film","filter","fire","fire-extinguisher","flag",
	"flag-checkered","flag-o","flash","flask","folder","folder-o","folder-open","folder-open-o","frown-o","futbol-o",
	"gamepad","gavel","gear","gears","genderless","gift","glass","globe","graduation-cap","group","hard-of-hearing",
	"hdd-o","handshake-o","hashtag","headphones","heart","heart-o","heartbeat","history","home","hotel","hourglass",
	"hourglass-1","hourglass-2","hourglass-3","hourglass-end","hourglass-half","hourglass-o","hourglass-start","i-cursor",
	"id-badge","id-card","id-card-o","image","inbox","industry","info","info-circle","institution","key","keyboard-o",
	"language","laptop","leaf","legal","lemon-o","level-down","level-up","life-bouy","life-buoy","life-ring",
	"life-saver","lightbulb-o","line-chart","location-arrow","lock","low-vision","magic","magnet","mail-forward",
	"mail-reply","mail-reply-all","male","map","map-o","map-pin","map-signs","map-marker","meh-o","microchip",
	"microphone","microphone-slash","minus","minus-circle","minus-square","minus-square-o","mobile","mobile-phone",
	"money","moon-o","mortar-board","motorcycle","mouse-pointer","music","navicon","newspaper-o","object-group",
	"object-ungroup","paint-brush","paper-plane","paper-plane-o","paw","pencil","pencil-square","pencil-square-o",
	"percent","phone","phone-square","photo","picture-o","pie-chart","plane","plug","plus","plus-circle","plus-square",
	"plus-square-o","podcast","power-off","print","puzzle-piece","qrcode","question","question-circle","question-circle-o",
	"quote-left","quote-right","random","recycle","refresh","registered","remove","reorder","reply","reply-all","retweet",
	"road","rocket","rss","rss-square","s15","search","search-minus","search-plus","send","send-o","server","share",
	"share-alt","share-alt-square","share-square","share-square-o","shield","ship","shopping-bag","shopping-basket",
	"shopping-cart","shower","sign-in","sign-out","sign-language","signal","signing","sitemap","sliders","smile-o",
	"snowflake-o","soccer-ball-o","sort","sort-alpha-asc","sort-alpha-desc","sort-amount-asc","sort-amount-desc",
	"sort-asc","sort-desc","sort-down","sort-numeric-asc","sort-numeric-desc","sort-up","space-shuttle","spinner",
	"spoon","square","square-o","star","star-half","star-half-empty","star-half-full","star-half-o","star-o",
	"sticky-note","sticky-note-o","street-view","suitcase","sun-o","support","tablet","tachometer","tag","tags",
	"tasks","taxi","television","terminal","thermometer","thermometer-0","thermometer-1","thermometer-2",
	"thermometer-3","thermometer-4","thermometer-empty","thermometer-full","thermometer-half",
	"thermometer-quarter","thermometer-three-quarters","thumb-tack","thumbs-down","thumbs-o-up","thumbs-up",
	"ticket","times","times-circle","times-circle-o","times-rectangle","times-rectangle-o","tint","toggle-down",
	"toggle-left","toggle-right","toggle-up","toggle-off","toggle-on","trademark","trash","trash-o","tree","trophy",
	"truck","tty","tv","umbrella","universal-access","university","unlock","unlock-alt","unsorted","upload","user",
	"user-circle","user-circle-o","user-o","user-plus","user-secret","user-times","users","vcard","vcard-o","video-camera",
	"volume-control-phone","volume-down","volume-off","volume-up","warning","wheelchair","wheelchair-alt",
	"window-close","window-close-o","window-maximize","window-minimize","window-restore","wifi","wrench",
	"500px","amazon","adn","android","angellist","apple","bandcamp","behance","behance-square","bitbucket",
	"bitbucket-square","bitcoin","black-tie","bluetooth","bluetooth-b","btc","buysellads","cc-amex",
	"cc-diners-club","cc-mastercard","cc-paypal","cc-stripe","cc-visa","chrome","codepen","codiepie",
	"connectdevelop","contao","css3","dashcube","delicious","deviantart","digg","dribbble","dropbox","drupal",
	"edge","eercast","empire","envira","etsy","expeditedssl","fa","facebook","facebook-f","facebook-official",
	"facebook-square","firefox","first-order","flickr","fonticons","font-awesome","fort-awesome","forumbee",
	"foursquare","free-code-camp","ge","get-pocket","gg","gg-circle","git","git-square","github","github-alt",
	"github-square","gitlab","gittip","glide","glide-g","google","google-plus","google-plus-circle",
	"google-plus-official","google-plus-square","google-wallet","gratipay","grav","hacker-news","houzz",
	"html5","imdb","instagram","internet-explorer","ioxhost","joomla","jsfiddle","lastfm","lastfm-square",
	"leanpub","linkedin","linkedin-square","linode","linux","maxcdn","meanpath","medium","meetup","mixcloud",
	"modx","odnoklassniki","odnoklassniki-square","opencart","openid","opera","optin-monster","pagelines","paypal",
	"pied-piper","pied-piper-alt","pinterest","pinterest-p","pinterest-square","product-hunt","qq","quora","ra","ravelry",
	"rebel","reddit","reddit-alien","reddit-square","renren","safari","scribd","sellsy","shirtsinbulk","snapchat",
	"snapchat-square","simplybuilt","skyatlas","skype","slack","slideshare","soundcloud","spotify","stack-exchange",
	"stack-overflow","steam","steam-square","stumbleupon","stumbleupon-circle","superpowers","telegram","tencent-weibo",
	"themeisle","trello","tripadvisor","tumblr","tumblr-square","twitch","twitter","twitter-square","usb","viacoin",
	"viadeo","viadeo-square","vimeo","vimeo-square","vine","vk","wechat","weibo","weixin","whatsapp","wikipedia-w",
	"windows","wordpress","wpbeginner","wpexplorer","wpforms","xing","xing-square","y-combinator","yahoo","yelp",
	"yc","yoast","youtube","youtube-play","youtube-square","cny","dollar","eur","euro","gbp","ils","inr","jpy",
	"krw","rmb","rouble","rub","ruble","rupee","shekel","sheqel","try","turkish-lira","usd","won","yen",
	"angle-double-down","angle-double-left","angle-double-right","angle-double-up","angle-down","angle-left",
	"angle-right","angle-up","arrow-circle-down","arrow-circle-left","arrow-circle-right","arrow-circle-up",
	"arrow-circle-o-down","arrow-circle-o-left","arrow-circle-o-right","arrow-circle-o-up","arrow-down",
	"arrow-left","arrow-right","arrow-up","arrows-alt","caret-down","caret-left","caret-right","caret-up",
	"chevron-circle-down","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-down",
	"chevron-left","chevron-right","chevron-up","hand-o-down","hand-o-left","hand-o-right","hand-o-up",
	"long-arrow-down","long-arrow-left","long-arrow-right","long-arrow-up","file","file-o","file-text","file-text-o",
	"intersex","mars","mars-double","mars-stroke","mars-stroke-h","mars-stroke-v","mercury","neuter","transgender",
	"transgender-alt","venus","venus-double","venus-mars","hand-grab-o","hand-lizard-o","hand-paper-o","hand-peace-o",
	"hand-pointer-o","hand-scissors-o","hand-spock-o","hand-stop-o","thumbs-o-down","ambulance","h-square","hospital-o",
	"medkit","stethoscope","user-md","cc-discover","cc-jcb","align-center","align-justify","align-left","align-right",
	"bold","chain","chain-broken","clipboard","columns","copy","cut","dedent","files-o","floppy-o","font","header",
	"indent","italic","link","list","list-alt","list-ol","list-ul","outdent","paperclip","paragraph","paste","repeat",
	"rotate-left","rotate-right","save","scissors","strikethrough","subscript","superscript","table","text-height",
	"text-width","th","th-large","th-list","underline","undo","unlink","subway","train","backward","compress","eject",
	"expand","fast-backward","fast-forward","forward","pause","pause-circle","pause-circle-o","play","play-circle",
	"play-circle-o","step-backward","step-forward","stop","stop-circle","stop-circle-o"
];

function capitalize(s) { 
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
}

// funções de resolução
// fim função de resolução

function resolvEl(id,cla='') { 
	var ids 		= returnIdObj(objRefConfig_Global);
	var map 		= ids.map(function(e){ return e.id; });
	var objReturn 	= ids[map.indexOf(id)];

	if (ids[map.indexOf(id)].parent == 'codigoConsulta') { 
		cla = cla.indexOf('select') == 0 ? 'select' : cla;
		objReturn.el = $("#" + id).find("." + cla).find(cla == 'select' ? 'select' : "input");
	} else if (objReturn.parent == 'input' && objReturn.obj.type == "radio") { 
		var els = document.getElementsByName(objReturn.obj.name);
		for (var i = 0; i < els.length; i++) { 
			if (els[i].checked) objReturn.el = $(els[i]);
		}
	} else if (objReturn.parent == 'preview') { 
		objReturn.el = $("#textareaJson" + id);
	} else { 
		objReturn.el = $("#" + id);
	}
	return objReturn;
}

function resolvVal(id) { 
	var el = resolvEl(id, (arguments[1] || ''));
	var func = "val";

	if (el.parent == 'menu') { 
		var itensMenu = document.getElementsByName(id), indiceMenu = -1;
		for (var i = 0; i < itensMenu.length; i++) {
			if (itensMenu[i].className.indexOf('active') >= 0) indiceMenu = i;
		}
		return indiceMenu;
	}

	if (el.parent == 'codigoConsulta') { 
		var getDesc = arguments[1] == 'selectDesc';
		var isSelect = arguments[1].indexOf('select') == 0;
		if (arguments.length > 2 && isSelect) 	return el.el.val(arguments[2]).trigger('change');
		if (arguments.length > 2) 				return el.el.val(arguments[2]);
		if (getDesc) 							return el.el[0].options[el.el[0].selectedIndex].innerHTML;
												return el.el.val();
	} else { 
		var value = (arguments[1] != undefined ? arguments[1] : el.obj.value);

		switch( (((el.obj || {}).style || {})["text-transform"] || '').toLowerCase() ) { 
			case 'uppercase': 	value = (value || '').toUpperCase(); break;
			case 'lowercase': 	value = (value || '').toLowerCase(); break;
			case 'capitalize': 	value = capitalize((value || '')); break;
		}

		if (['div','span'].indexOf(el.parent) != -1) func = 'html';

		if ((el.obj.isMonth || false) && arguments[1] != undefined) {
			if ((value || '') == '') { 
				$("#"+id+'Datepicker').val('');
			} else { 
				$("#"+id+'Datepicker').datepicker('setDate', new Date(value+'-02'));
			}
		}

		if (el.obj.type == 'file') { 
			if (arguments[1] != undefined) { 
				$('#' + id + '_desc_file').html(arguments[1]);
				if (el.obj.fileType == 'img') { 
					var nameFile = arguments[1];
					setTimeout(function() { 
						var path = typeof el.obj.upload.path == 'string' ? el.obj.upload.path : el.obj.upload.path();
						$('#'+ id + 'preview').attr('src', path + '/' + nameFile.replace(/ /g, '_'));
					},350);
					// if (path[path.length-1] != '/') path += '/';
					// console.log(path + '/' + arguments[1]);
				}
				return;
			} else {
				var val = el.el[func]().replace(/\\/g, '/');
				val = val.substring(val.lastIndexOf('/')+1, val.length);
				if (val == '') val = $('#' + id + '_desc_file').html();
				return val;
			}
		}

		if (el.obj.type == 'checkbox' && ([0,1]).indexOf(arguments[1]) >= 0) {
			value = arguments[1] == 1;
		} else if (el.obj.type == 'checkbox') { 
			return el.el[0].checked;
		}

		if (
			el.obj.type == 'radio' && arguments[1] != undefined && el.el.attr('id') != id
		) { 
			var setValue = -1;
			var els = document.getElementsByName(id);
			for (var i = 0; i < els.length; i++) {
				if (els[i].value == arguments[1]) {
					els[i].checked = true;
					setValue = i;
				}
			}
			if (setValue >= 0) return els[setValue];
		}

		if (arguments.length > 1) 	return el.el[func]( value );
									return el.el[func]();
	}
}

function resolvDisabled(id, cla='') { 
	var el = resolvEl(id, cla);

	if (el.parent == 'codigoConsulta') {
		if (arguments.length > 2) {
			$("#"+id).find('button').attr('disabled',(arguments[2] || false))
			return el.el			.attr('disabled',(arguments[2] || false));
		} else {
			$("#"+id).find('button').attr('disabled',true);
			return el.el			.attr('disabled',true);
		}
	} else {
		if (['div','spam'].indexOf(el.parent) < 0) { // se NÃO for div
			if ((el.obj.isMonth || false)) $("#"+id+'Datepicker').attr('disabled', (arguments[1] || false));

			if (arguments.length > 1) 	return el.el.attr('disabled', (arguments[1] || false) );
										return el.el.attr('disabled', true);
		}
	}
}

function resolvFocus(id, cla='') { 
	var el = resolvEl(id, cla);

	function resolvFocusAction(el) { 
		try { el[0].focus(); } catch(e) { }
	}

	if (el.parent == 'codigoConsulta') { 
		var isBtn = (el.obj.dist || 'B').indexOf('B') >= 0 && (el.obj.dist || 'C').indexOf('C') < 0;
		return resolvFocusAction(isBtn ? $("#"+id).find('button') : el.el);
	} 

	if (['input','button'].indexOf(el.parent) >= 0) { 
		if ((el.obj.isMonth || false)) 
			return resolvFocusAction($("#"+id+'Datepicker'));

		resolvFocusAction(el.el);
	}
}


function resolvVisibled(id, cla='') { 
	var el = resolvEl(id, cla);

	if (el.parent == 'codigoConsulta') {
		return el.el.parent().parent().css('display', (arguments[2] || 'none'));
	} else {
		if (['div','spam'].indexOf(el.parent) < 0) { // se NÃO for div
			var keys = Object.keys(el.obj);
			var tiposDiv = ['idDiv','classDiv','styleDiv','clickDiv','isRow'];

			for (var i = 0; i < keys.length; i++) { 
				if (tiposDiv.indexOf(keys[i]) >= 0) { 
					return el.el.parent().css('display',(arguments[1] || 'none'));
				}
			}

			$("#label_"+id).css('display', (arguments[1] || 'none'));
			return el.el.css('display', (arguments[1] || 'none') );
		} else {
			return el.el.css('display', (arguments[1] || 'none') );
		}
	}
}

function resolvEvento(ev, id) { 
	/*
		registerEventAll: {
			evento: '' 			evento esperado
			id: ''				campo esperado
			func: function 		a rotina em si
		}
		Eventos: 
			menu: 
				click
			input:
				onchange
				onclick
				onfocus
				onblur
			codigoConsutla:
				trigger
	*/
	registerEventAll.forEach(function(evento) { 
		if (evento.evento == ev && evento.id == id) { 
			evento.func();
		}
	});
}

function resolvIcon(icon) { 
	var classFa = fa_icon_Global.find(function(i) { 
		return i != 'fa' && (icon == i || icon.indexOf(i+' ') == 0);
	}) || '';

	return (
		classFa != '' ? 'fa fa-' + icon 
		: icon
	);
}

function jsonToString(obj,tab=0,indent=false) { 
	if (typeof(obj) != 'object') return false;

	var keys = Object.keys(obj);
	var text = (isNaN(keys[0]) ? '{' : '['); // (indent ? t(tab) : '') +

	for (var i = 0; i < keys.length; i++) { 
		if (
			['undefined','null','xml'].indexOf(typeof(obj[keys[i]])) != -1 ||
			obj[keys[i]] == null
		) continue;

		text += ''
			+ (['{','['].indexOf(text) < 0 ? ',' : '')
			+ (indent ? t(tab+1) : '')
			+ (isNaN(keys[i]) ? "\"" + keys[i] + "\":" : '')

		switch( typeof(obj[keys[i]]) ) { 
			case 'number': 
			case 'boolean': text += obj[keys[i]]; 								break;
			case 'string': 	text += "\"" + obj[keys[i]] + "\""; 				break;
			case 'object': 	text += jsonToString(obj[keys[i]],tab+1,indent); 	break;
				// text += (indent ? t(tab+1) : '') + jsonToString(obj[keys[i]],tab+1,indent); break;
			case 'function': 
				text += indent ? ajusteTabFunc(obj[keys[i]],tab+1) : String(obj[keys[i]]); break;
		}
	}
	text += (indent ? t(tab) : '') + (isNaN(keys[0]) ? '}' : ']');
	return text;
}

function ajusteTabFunc(func,tab=0,initTab=false) { 
	if (typeof func == 'function') func = String(func);

	func = func.replace(/&nbsp;/g, '[&nb;]');
	func = func.replace(/ /g, '&nbsp;');
	func = func.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

	while (func.indexOf('&nbsp;') == 0) { 
		func = func.replace('&nbsp;','');
	}
	func = func.split('\n');

	var defaultTab = 0, contTabIni, linha;
	for (var i = 1; i < func.length; i++) {
		contTabIni = 0
		linha = func[i].split('&nbsp;');
		for (var j = 0; j < linha.length; j++) {
			if (linha[j] == '') contTabIni++;
			else 				j = linha.length;
		}
		if (defaultTab == 0 || contTabIni < defaultTab) defaultTab = contTabIni;
	}
	for (var i = 1; i < func.length; i++) {
		linha = func[i].split('&nbsp;');
		linha.splice(0, defaultTab);
		func[i] = linha.join('&nbsp;');
	}

	func = func.join('\n');
	func = func.replace(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g, '\t');
	func = func.replace(/&nbsp;/g, ' ');
	func = func.replace(/\[&nb;\]/g, '&nbsp;');
	func = (initTab ? t(tab).replace('\n','') : '') + tAjuste(func, tab);
	return func;
}

function t() { 
	var num = (arguments[0] || 0);
	var tab = '\n';
	for (var i = 0; i < num; i++) tab += '\t'
	return returnObjIdentado_Global ? tab : '';
}

function tirarAcentuacao(texto) { 
	var chars = [
		'áàãäâÃÂÁÀÄéèëêÉÈËÊíìïîÍÌÏÎóòôõöÕÔÓÒÖúùüûÚÙÜÛýÿÝñÑçÇ°º¹²³ÅÂž¡ËØŽƒ‰ŠÐ×—ß÷',
		'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuuuuuyyYnNcCoo123AAziEOZF%SDX-B/'
	]
	var char3 = '§´ª£¢¬¤¬©¨«°†¹®¶¢¼©€®’½µ¶¢™“¼„¢“¿±˜þ¾¯•‡„«';

	for (var i = 0; i < chars[0].length; i++) 
		texto = texto.replace( new RegExp(chars[0][i], 'g'), chars[1][i] );

	for (var i = 0; i < char3.length; i++) 
		texto = texto.replace( new RegExp(char3[i], 'g'), '' );

	texto = texto.replace(/œ/g, "AE");
	texto = texto.replace(/æ/g, "AE");
	texto = texto.replace(/Æ/g, "AE");
	texto = texto.replace(/™/g, "TM");
	texto = texto.replace(/…/g, "...");

	return texto;
}

function prefixedComand() { 
	// navigator.appCodeName
	// navigator.platform
	// navigator.userAgent

	// "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
	// "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0"
	// "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3; rv:11.0) like Gecko"

	if ($.browserDetection(true) == 'Chrome'	){ return 'Alt + '; 			}
	if ($.browserDetection(true) == 'IE11'		){ return 'Alt + '; 			}
	if ($.browserDetection(true) == 'Firefox'	){ return 'Alt + Shift + '; 	}

	return '';
}

function returnDescAccesskey(text, options) { 
	/*
		options: {
			accesskey: ''			-- Tecla do atalho
			numKeyVerifAlt: 0 		-- Numero de caracteres que vai verificar dentro do text default = text.length
		}
	*/
	if ((options.accesskey || '') != '') { 
		if (!testP(options.numKeyVerifAlt)) options.numKeyVerifAlt = text.length;
		// if ((options.numKeyVerifAlt || '') == '') options.numKeyVerifAlt = text.length;
		var textT = text.toLowerCase();

		for (var i = 0; i < options.numKeyVerifAlt && i < text.length; i++) { 
			if (textT[i] == options.accesskey.toLowerCase()) { 
				text = ""
					+ (i == 0 ? '' : text.substring(0, i))
					+ "<spam style='text-decoration: underline;'>" + text[i] + "</spam>"
					+ text.substring(i+1,text.length);
				i = text.length;
			}
		}
	}
	return text;
}

// Teste parametro retorna se diferente de ( undefined | null | 0 | '' )
function testP(param) { 
	return (param || '') != '';
}

function resolvConfig(options, tab=0, isRegister=false) { 
	var keys = Object.keys(options);
	var html = '';
	// var htmlModal = '';

	if (isRegister) { 
		$("body").append(resolvConfigModal(options));

		var objRegisted = returnIdObj(options);
		if (objRegisted.length) { 
			desregistrarConfig(objRegisted[0][objRegisted[0].tipoCampo]);
		}
		objRefConfig_Global.push(options);
		// htmlModal += resolvConfigModal(objRefConfig_Global);
	}

	for (var i = 0; i < keys.length; i++) { 
		try { 
			// html += document['resolv' + capitalize(keys[i])](options[keys[i]]);
			html += !isNaN(keys[i]) 
				? resolvConfig(options[keys[i]], tab) 
				: resolvGlobalParam(options[keys[i]], tab, window['resolv' + capitalize(keys[i])](options[keys[i]], tab));
		} catch(e) { 
			console.error(e);
			// console.error('Falha ao tentar rodar função "resolv' + capitalize(keys[i]) + "(" + options[keys[i]] + "," + tab + ")'");
		}
	}
	return html;
}

function resolvPath(id, obj=objRefConfig_Global) { 
	var path 	= [],
		refId 	= returnRefId(),
		key 	= Object.keys(obj),
		idParam = key.filter(function(e) { return refId.indexOf(e) != -1; }),
		pathTemp, x;

	if (idParam.length > 0) { 
		for (var i = 0; i < idParam.length; i++) { 
			if (obj[idParam[i]] == id) { 
				path.push(idParam[0]);
				return path;
			}
		}
	}

	for (var i = 0; i < key.length; i++) { 
		x = key[i];
		if (typeof(obj[x]) == 'object') { 
			pathTemp = resolvPath(id, obj[x]);

			if (pathTemp != false && pathTemp.length != 0) { 
				path.push(x + ( x == 'menu' ? '-' + (obj[x].descForm || 'error') : '') )
				pathTemp.forEach(function(e) { path.push(e) });
				return path;
			}
		}
	}
	return path;
}

function desregistrarConfig(id) { 
	var path = resolvPath(id);
	if (path.length) { 
		path.splice(path.length-1,1);
		path.forEach(function(p,i) { 
			if (p.indexOf('menu') == 0) path[i] = 'menu';
		});
		eval(`objRefConfig_Global["${path.join('"]["')}"] = undefined;`);
	}
}

function resolvGlobalParam(options, tab, html) { 
	/*
		options: {
			classDiv: '' -- Colocar o parametro em volta de uma div e com a class especifica
			styleDiv: '' -- Colocar o parametro em volta de uma div e com o style especifico
			isRow: (0|1) -- Colocar o parametro em volta de uma div com a class row
		}
	*/
	var valid = [
		{ param: 'idDiv' 	, attr: 'id' 		, },
		{ param: 'classDiv' , attr: 'class' 	, },
		{ param: 'styleDiv' , attr: 'style' 	, valid: 'resolvStyle' },
		{ param: 'clickDiv' , attr: 'onclick' 	},
	], param = '', result;
	var random;

	if ( valid.filter(function(e) { return (options[e.param] || '') != '' }).length > 0 ) {
		valid.forEach(function(x) {
			if ((options[x.param] || '') != '') {

				do { 
					random = parseInt( Math.random() * 100000 );
				} while (registerRandom_Global.indexOf(random) != -1);
				registerRandom_Global.push(random);

				if (typeof(options[x.param]) == 'function') { 
					window['click'+random] = options[x.param];
					param += ` ${x.attr}="click${random}();"`;
				} else {
					result = typeof(options[x.param]) == 'string' ? `"${options[x.param]}"` : JSON.stringify(options[x.param]);
					result = `${(x.valid || '')}(${ result })`;
					param += ` ${x.attr}="${eval( result )}"`;
				}
			}
		});

		html = ""
			// + 	" class='" + options.classDiv + "'"
			+ 	t(tab) 		+ 	"<div" + param + ">"
			+ 	tAjuste(html,1)
			+ 	t(tab) 		+ 	"</div>"
	}

	if ((options.isRow || '') != '') { 
		html = ""
			+ 	t(tab) 		+ 	"<div class='row'>"
			+ 	tAjuste(html,1)
			+ 	t(tab) 		+ 	"</div>"
	}

	return html;
}

function tAjuste(text,ajuste) { 
	return t().indexOf('\n') < 0 ? text : text.split('\n').join( t(ajuste) );
}

function resolvFindParam(obj, search) { 
	var keys = Object.keys(obj), isFind = false;

	if (keys.indexOf(search) >= 0) return true;

	for (var i = 0; i < keys.length; i++) {
		if (typeof(obj[keys[i]]) == 'object') isFind = resolvFindParam(obj[keys[i]], search);
		if (isFind) i = keys.length;
	}

	return isFind;
}

function resolvParamAjax(options) { 
	var param = "";
	if (Object.keys((options.param || ['']))[0] == '0') { 
		for (var i = 0; i < (options.param || []).length; i++) { 
			var aspas = typeof options.param[i].val == 'string' ? '"' : '';
			param += ''
				+ (i == 0 ? '' : ',')
				+ `'${options.param[i].key}':${aspas}${String(options.param[i].val)}${aspas}`;
		}
		param += ',';
	} else { 
		param = Object.keys(options.param).map(function(key) { 
					var aspas = typeof options.param[key] == 'string' ? '"' : '';
					return `'${key}':${aspas}${String(options.param[key])}${aspas}`;
				}).join(',') + ',';
	}
	return param;
}

function number_format(num, numDec, decimal=',', milhar='.') { 
	var limitDec = decimal.length, opcionalDesc = false, cont = 0;
	if (num != 0 && ((num || '') == '' || isNaN(num))) 	return num;
	try { num = parseFloat(num); } catch(erro){ 		return num; }
	if (typeof numDec == 'string' && numDec[0] == '?') { 
		opcionalDesc = true;
		numDec = numDec.substring(1, numDec.length);
	}
	num = num.toFixed(numDec);
	var formNum = num.split('.');
	num = String(formNum[0]);
	var negativo = num[0] == '-' ? (num = num.substring(1, num.length), true) : false;
	decimal = ((formNum[1] || '') != '' ? decimal + String(formNum[1]) : '');
	formNum = '';
	for (var i = num.length-1; i >= 0; i--) {
		formNum = num[i] + formNum;
		if ((cont++, cont) % 3 == 0 && i > 0) formNum = milhar + formNum;
	}
	if (opcionalDesc) { 
		for (var i = decimal.length-1; i >= limitDec; i--) {
			if (decimal[i] != '0') { i = -1; continue; }
			decimal = decimal.substring(0,i);
		}
		if (decimal.length == limitDec) decimal = '';
	}
	return (negativo ? '-' : '') + formNum + decimal;
}


/* Envetos de teclado */
$(document).ready(function() { 
	if (navigator.appName != "Microsoft Internet Explorer")
		document.captureEvents(Event.KEYDOWN);
	document.body.onkeydown = NetscapeResolvKeyDown;
	function NetscapeResolvKeyDown(key,e) { 
		ResolvKeyDown(key, key.which);
	}
	if (window.event) ResolvKeyDown(window.event, window.event.keyCode);
	function ResolvKeyDown(e, whichkey) { 
		// console.log(whichkey);
		var setComand = false;


		if (whichkey == 115 && $(".codigoConsulta").is(':focus')) {
			var itens = $(".codigoConsulta");

			$.each(itens, function(i,x){
				if ($(x).is(':focus')) {
					window['pesquisa' + $(x).data('ref')]();
				}
			})
		}

		var proximoIndice, setInput = false;
		if (whichkey == 13 && registerInputFocus.filter(function(e){ return $(e.el[0]).is(':focus') }).length == 1 ) {
			$.each(registerInputFocus, function(i,x) {
				if ($(x.el[0]).is(":focus") && !setInput) {
					setInput = true;

					x.el[0].blur();
					if (x.parent == 'codigoConsulta') return false;

					var teste = {};
					teste[x.parent] = x.obj;
					teste = serealizeForm(teste);
					if (!teste.valid) {
						setComand = true;
						return false;
					}

					if ((x.obj.onEnter || '') == '') {
						proximoIndice = -1;
						for (var j = (i+1); j < registerInputFocus.length; j++) {
							if (!$(registerInputFocus[j].el[0]).attr('disabled')) {
								proximoIndice = j;
								j = registerInputFocus.length;
							}
						}
		
						console.log(registerInputFocus[proximoIndice]);
						registerInputFocus[proximoIndice].el[0].focus();
						setComand = true;
					} else {
						x.el[0].focus();
					}

				}
			})
		}

		if (!setComand) {
			registerEventKeyboard.forEach(function(x){
				window[x](e,whichkey);
			});
		}
	}
});
