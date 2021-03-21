
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
var isMobile_Global = isMobile();

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

function isMobile() { 
	var userAgent = String(navigator.userAgent).toUpperCase()
	, 	plataformasMobile = ['ANDROID','IOS'];

	for (var i = 0; i < plataformasMobile.length; i++) { 
		if (userAgent.indexOf(plataformasMobile[i]) != -1) return true;
	}
	return false;
}

function capitalize(s) { 
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
}

// funções de resolução

function resolvHr(options) { 
	return resolvBr( $.extend({}, options, { hr: true }) ,(arguments[1] || 0));
}

function resolvBr(options, tab=0) { 
	/*
		options: {
			num: 1 			-- Numero de br que vai montar
			hr: (0|1) 		-- Se for hr ou não
			style: {} 		-- Objeto CSS
		}
	*/

	var style = (options.style || '') == '' ? '' : ' style="' + resolvStyle(options.style) + '"',
		num = (options.num || 1);

	var html = t(tab) + ''

	if (num < 0 || isNaN(num)) num = 1;

	for (var i = 0; i < parseInt(num); i++) 
		html += "<" + ((options.hr || false) ? 'h' : 'b') + "r " + style + ">";
	return html;
}

function resolvButton(options, tab=0) { 
	/*
		options: {
			class: ''					-- Classe do botao
			desc: ''					-- descrição do botão
			id: ''						-- ID do botao
			name: '' 					-- Atributo Name do Button
			disable: (0|1)				-- Desabilita o botão
			icon: ''					-- icone
			onclick: function(el){}		-- enveto de click
			onchange: function(el){}	-- enveto de mudar
			onfocus: function(el){}		-- enveto de focar
			onblur: function(el){}		-- enveto de desfocar
			compensador: (0|1) 			-- Cria um compensador para alinha o botão
			title: '' 					-- Texto que aparece quando passa o mouse emcima
			style: objStyle 			-- Resolve o estilo do botão
			accesskey: ''				-- tecla de atalho
		}
	*/

	var random;
	do { 
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	if ((options.click || '') != '' && (options.onclick || '') == '') options.onclick = options.click;

	var accesskey = (options.accesskey || '') == '' || options.accesskey.length > 1 ? '' : options.accesskey;

	var classBtn = (options.class || '') == '' ? '' : options.class
	, 	classBootstrap = [ 
		'primary','success','danger','warning','info','default',	// v3
		'secondary','light','dark','link', 							// v4
	].find(function(i) { 
		return (classBtn == i || classBtn.indexOf(i+' ') == 0);
	}) || '';

	classBtn = classBootstrap != '' ? 'btn btn-' + classBtn : classBtn;

	var html = ''
		+ ((options.preText || '') == '' ? '' : t(tab) + options.preText)
		+ ((options.compensador || '') == '' ? '' : ''
			+ 	"<label>&nbsp;</label>"
		)
		+t(tab)		+ 	"<button"
					+ 		" data-customerid='btn" + random + "'"
					+ 		((classBtn 			|| '') == '' ? '' : " class='" + classBtn      + "'")
					+ 		((options.id 		|| '') == '' ? '' : " id='"    + options.id    + "'")
					+ 		((options.name  	|| '') == '' ? '' : " name='"  + options.name  + "'")
					+ 		((options.disabled 	|| '') == '' ? '' : " disabled")
					+ 		((options.style 	|| '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					// + 		(accesskey 				   == '' ? '' : " accesskey='" + accesskey + "'")
					+ 		((options.title 	|| '') == '' && accesskey == '' ? '' : ''
								+ 	" title='" 
								+ 		(options.title || '') 
								+ 		((options.title || '') == '' || accesskey == '' ? '' : '\n') 
								+ 		(accesskey == '' ? '' : 'Alt + ' + accesskey)
								+ 	"'"
							)
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
					+ ((options.icon || '') == '' ? '' : ''
						+t(tab+1) + '<i class="' + resolvIcon(options.icon) + '"></i>'
					)
					+ ((options.icon || '') == '' || (options.desc || '') == '' ? '' : '&nbsp;')
					+ ((options.desc || '') == '' ? '' : ''
						+t(tab+1) + (accesskey == '' ? options.desc : returnDescAccesskey(options.desc, options))
					)
		+t(tab)		+ 	"</button>"
		+t(tab)		+ 	"<script>"
					+	(function(opt) { 
						var html = '';
						for (var i = 0; i < opt.length; i++) { 
							html += ((options[opt[i]] 	|| '') == '' ? '' : ''
							+t(tab+1)	+ 	"function " + opt[i] + random + "(el) { "
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
					+ (accesskey == '' ? '' : ''
						+t(tab+1)	+ 	`function btnClickAccesskey${random}(e) { `
						+t(tab+2)	+ 		`if (e.altKey && e.key == "${accesskey}".toLowerCase()) { `
						+t(tab+3)	+ 			`e.preventDefault();`
						+t(tab+3)	+ 			`$("button[data-customerid='btn${random}']").click();`
						+t(tab+2)	+ 		`}`
						+t(tab+1)	+ 	`}`
						+t(tab+1)	+ 	`registerEventKeyboard.push("btnClickAccesskey${random}");`
					)
		+t(tab)		+ 	"</"+"script>"

	return html;
}


function resolvCalendar(options) { 
	/*
		options: {
			descForm: '' 						-- Paramentro de identificação
			events: { 							-- Agendamento que vão ser mostrados no calendario
				title: '' 						-- Título do evento
				start: '' 						-- Onde inicia o evento model: Y-MM-DD HH:mm:ss
				end: '' 						-- Onde terimina o evento model: Y-MM-DD HH:mm:ss
				textColor: '' 					-- Cor do texto
				color: '' 						-- Cor do agendamento
				rendering: '' 					-- Modo de renderizar, usado no feriado para rederiza em 'background'
			}
			data: "today" 						-- Data padrão calendário ex: Y-MM-DD
			view: "month" 						-- Type view (month,agendaWeek,agendaDay)
			buttons: { 							-- Botões personalizados
				id: { 							-- Identificador do botão
					text: '' 					-- Descrição do botão
					click: function() { } 		-- Evento de click do botão
				}
			}
			feriados: { 						-- Feriados
				desc: '' 						-- Descrição do feriado
				date: '' 						-- Dia do feriado
			}
			minTime: [time,type] 				-- Minimo de tempo que cada agendamento deve ter, ex. type = 'minute'
			click: function(event) { } 			-- Envento de click
			editable: (0|1) 					-- Se vai poder editar os agendamento do calendário
		}
	*/
	var html = '';

	var events = [];
	for (var i = 0; i < (options.events || []).length; i++) {
		events.push({});
		Object.keys(options.events[i]).forEach(function(e) { 
			events[i][e] = options.events[i][e];
		});
	}

	var minTime = function(start, end) { return end }, envet, end;
	var time = (options.minTime || [])[0]
	, 	type = (options.minTime || [])[1]

	if ((options.minTime || '') != '') { 
		minTime = function(start, end, time, type) {
			if (moment(end).diff(moment(start), type) < time)
				return moment(start).add(time, type).format('Y-MM-DD HH:mm').replace(' ','T');
			return end;
		};
	}

	for (var i = 0; i < events.length; i++) {
		envet = events[i];
		end = minTime(envet.start.replace('T',' '), envet.end.replace('T',' '), time, type);
		envet.textColor = CheckLumaColor(envet.color) ? '#fff' : '#000';
		events[i].end = end;
	}

	(options.feriados || []).forEach(feriado => {
		events.push({
			no_cont: true,
			start: feriado.date + "T00:00",
			end: feriado.date + "T23:59",
			descricao: feriado.desc,
			rendering: 'background',
			color: 'tomato',
		});
		events.push({
			no_cont: true,
			start: feriado.date,
			end: feriado.date,
			descricao: feriado.desc,
			rendering: 'background',
			color: 'tomato',
		});
	});


	html = ''
		+t(0)+ 	"<div id='" + options.descForm + "Calendar'></div>"
		+t(0)+ 	"<script>"
		+t(1)+ 		"var " + options.descForm + "ConfigCalendar = {"
		+t(2)+ 			" data: '" + (options.data || moment.format('Y-MM-DD')) + "',"
		+t(2)+ 			" view: '" + (options.view || 'month') + "'"
		+t(2)+ 		"};"
		+t(1)+ 		"try { $('#" + options.descForm + "Calendar').fullCalendar('destroy'); } catch(error) {}"
		+t(1)+ 		"$('#" + options.descForm + "Calendar').fullCalendar({"
		+t(2)+ 			"themeSystem: 'bootstrap3'," // 'bootstrap4',
		+t(2)+ 			"header: {" 
		+t(3)+ 				"left: '',"
		+t(3)+ 				"center: 'title',"
		+t(3)+ 				"right: ''"
		+t(2)+ 			"},"
		+t(2)+ 			"footer: { "
		+t(3)+ 				"left: 'prev,next today " + Object.keys(options.buttons || {}).join(' ') + "',"
		+t(3)+ 				"right: 'month,agendaWeek,agendaDay'," // ,listWeek
		+t(2)+ 			"},"
		+t(2)+ 			"defaultDate: " + options.descForm + "ConfigCalendar.data," // pegarData(), // 'YYYY-MM-DD',
		+t(2)+ 			"navLinks: true," // can click day/week names to navigate views
		+t(2)+ 			"navLinkDayClick: function(date, jsEvent) { "
		+t(3)+ 				"$('#" + options.descForm + "Calendar').fullCalendar('changeView', 'agendaDay', date.format() );"
		+t(2)+ 			"},"
		+t(2)+ 			"editable: " + String(options.editable || false) + ","
		+t(2)+ 			"eventLimit: true," // allow "more" link when too many events
		+t(2)+ 			"defaultView: " + options.descForm + "ConfigCalendar.view," // 'agendaWeek',
		+t(2)+ 			"allDaySlot: false,"
		+t(2)+ 			"scrollTime: '08:00:00',"
		// +t(2)+ 			"columnHeaderFormat: 'ddd\nD',"
		+t(2)+ 			"columnHeaderHtml: function(mom) { "
		+t(3)+ 				"var view = $('#" + options.descForm + "Calendar').fullCalendar('getView');"
		+t(3)+ 				options.descForm + "ConfigCalendar.data = mom.format('Y') + \"-\" + (mom.format('M') < 10"
		+t(4)+ 					"? \"0\"+mom.format('M') : mom.format('M')) + \"-\" + (mom.format('D') < 10"
		+t(4)+ 					"? \"0\"+mom.format('D') : mom.format('D'));"
		+t(3)+ 				options.descForm + "ConfigCalendar.view = view.name;"
		+t(3)+ 				"if (view.name == 'month')"
		+t(4)+ 					"return ''"
		+t(5)+ 						"+ '<div style=\"color: '+(mom.weekday() == 0 ? 'gray' : 'black')+';font-size: 18px;\">'+mom.format('ddd')+'</div>';"
		+t(3)+ 				"else "
		+t(4)+ 						"return ''"
		+t(5)+ 							"+ '<div style=\"color: '+(mom.weekday() == 0 ? 'gray' : 'black')+';font-size: 11px;\">'"
		+t(5)+ 							"+ mom.format('ddd') + '<br><h3 style=\"margin:0\">' + mom.format('D') + '</h3>'"
		+t(5)+ 							"+ '</div>';"
		+t(2)+ 			'},'
		+t(2)+ 			"timeFormat: ' '," // 'H(:mm)',  // remover o horario que aparece na frente da drecicao do agendamento
		+t(2)+ 			"events: " + JSON.stringify(events) + ","
		+t(2)+ 			"eventResizeStart: function() { return false; },"
		+t(2)+ 			"eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) { "
		+t(3)+ 				"if ((event.no_cont || '') != '') return false;"
		+t(3)+ 				"if (view.name == \"agendaWeek\" || view.name == \"agendaDay\") { "
		+t(4)+ 					"if ("
		+t(5)+ 						"agendamento_Global[event.indice].dataInical 		!= '' &&"
		+t(5)+ 						"agendamento_Global[event.indice].horarioInical 	!= '' &&"
		+t(5)+ 						"agendamento_Global[event.indice].horarioFinal 		!= ''"
		+t(4)+ 					") { "
		+t(5)+ 						"var data = agendamento_Global[event.indice].dataInical + \" \" + agendamento_Global[event.indice].horarioFinal;"
		+t(5)+ 						"data = moment(data).add( delta._data.milliseconds, 'milliseconds'	)"
		+t(6)+ 											".add( delta._data.seconds, 		'seconds'		)"
		+t(6)+ 											".add( delta._data.hours, 			'hours'			)"
		+t(6)+ 											".add( delta._data.minutes, 		'minutes'		)"
		+t(6)+ 											".add( delta._data.days, 			'days'			)"
		+t(6)+ 											".add( delta._data.months, 			'months'		)"
		+t(6)+ 											".add( delta._data.years, 			'years'			)"
		+t(6)+ 											".format().split('T');" // [1].split('-')[0];
		+t(5)+ 						"agendamento_Global[event.indice].horarioFinal = data[1].split('-')[0];"
		+t(5)+ 						"agendamento_Global[event.indice].dataFinal = data[0];"
		+t(4)+ 					"}"
		+t(4)+ 					"var horario = event.start.format().split('T');"
		+t(4)+ 					"agendamento_Global[event.indice].horarioInical = horario[1];"
		+t(4)+ 					"agendamento_Global[event.indice].dataInical = horario[0];"
		+t(3)+ 				"} else { "
		+t(4)+ 					"if (agendamento_Global[event.indice].DT_AGENDA != '') { "
		+t(5)+ 						"var diff_days 	= moment(agendamento_Global[event.indice].dataFinal).diff(agendamento_Global[event.indice].dataInical, 'days'	);"
		+t(5)+ 						"var diff_months = moment(agendamento_Global[event.indice].dataFinal).diff(agendamento_Global[event.indice].dataInical, 'months'	);"
		+t(5)+ 						"var diff_years 	= moment(agendamento_Global[event.indice].dataFinal).diff(agendamento_Global[event.indice].dataInical, 'years'	);"
		+t(0)+ 						""
		+t(5)+ 						"agendamento_Global[event.indice].dataInical = event.start.format().indexOf('T') == -1 "
		+t(6)+ 							"? event.start.format() "
		+t(6)+ 							": event.start.format().split('T')[0];"
		+t(5)+ 						"agendamento_Global[event.indice].dataFinal = moment(agendamento_Global[event.indice].dataInical)"
		+t(6)+ 							".add(diff_days, 'days').add(diff_months, 'months').add(diff_years, 'years').format().split('T')[0];"
		+t(4)+ 					"} else { "
		+t(5)+ 						"agendamento_Global[event.indice].dataInical = event.start.format().indexOf('T') == -1 ? event.start.format() : event.start.format().split('T')[0];"
		+t(5)+ 						"agendamento_Global[event.indice].dataFinal = agendamento_Global[event.indice].dataInical;"
		+t(4)+ 					"}"
		+t(3)+ 				"}"
		+t(3)+ 				"$(\".popover\").css('display', 'none');" /* fechar o tooltip dos agendamento guando passa o mouse por cima */
		+t(3)+ 				"definirDataHoraAgenda(event, revertFunc);"
		+t(2)+ 			"},"
		+t(2)+ 			"eventResize: function(event, delta, revertFunc) { "
		+t(3)+ 				"if ((event.no_cont || '') != '') return false;"
		+t(3)+ 				"var horario = event.end.format().split('T');"
		+t(3)+ 				"agendamento_Global[event.indice].horarioFinal = horario[1];"
		+t(3)+ 				"agendamento_Global[event.indice].dataFinal = horario[0];"
		+t(3)+ 				"$(\".popover\").css('display', 'none');" /* fechar o tooltip dos agendamento guando passa o mouse por cima */
		+t(3)+ 				"definirDataHoraAgenda(event, revertFunc);"
		+t(2)+ 			"},"
		+t(2)+ 			"eventDragStart: function() { "
		+t(3)+ 				"$(\".popover\").css('display', 'none');" /* fechar o tooltip dos agendamento guando passa o mouse por cima */
		+t(2)+ 			"},"
		+t(2)+ 			"customButtons: { "
			+ Object.keys(options.buttons || {}).map(function(key) {
				return ''
					+t(3)+ 	key + ":{"
					+t(4)+ 		"text: '" + (options.buttons[key].text || '') + "',"
					+t(4)+ 		"click: " + String(options.buttons[key].click || function() {})
					+t(3)+ 	"}"
			}).join(',')
		+t(2)+ 			"},"
		+t(2)+ 			"eventClick: function(calEvent) { "
		+t(3)+ 				"if ((calEvent.no_cont || '') != '') return false;"
		+t(3)+ 				"$(\".popover\").css('display', 'none');" /* fechar o tooltip dos agendamento guando passa o mouse por cima */
		+t(3)+ 				"var func = " + String((options.click || function() { })) + ";"
		+t(3)+ 				"func(calEvent);"
		+t(3)+ 				"$(\".popover\").css('display', 'none');"
		+t(2)+ 			"},"
		+t(2)+ 			"eventAfterRender: function(eventObj, $el) {"
		+t(3)+ 				"$el[0].id = 'elemento'+eventObj.indice;"
		+t(3)+ 				"if ((eventObj.no_cont || '') != '') { "
		+t(4)+ 					"$el.popover({"
		+t(5)+ 						"title: eventObj.descricao,"
		+t(5)+ 						"trigger: 'hover',"
		+t(5)+ 						"container: 'body'," 
		+t(5)+ 						"placement: 'top',"
		+t(4)+ 					"});"
		+t(4)+ 					"return false;"
		+t(3)+ 				"}"
		+t(3)+ 				"var maxChar = 100, desc = agendamento_Global[eventObj.indice].DS_ATENDIMENTO;"
		+t(2)+ 			"},"
		+t(1)+ 		"});"
		+t(0)+ 	"</"+"script>"

	return html;
}

function CheckLumaColor(c) { 
	function rgb2hex(rgb) {
		try {
			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		} catch(e) { 
			return false;
		}
	}

	function colourName2Hex(colour) { 
		return { 
			"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
			"beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
			"cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
			"darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
			"darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
			"darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
			"firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
			"gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
			"honeydew":"#f0fff0","hotpink":"#ff69b4",
			"indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
			"lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
			"lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
			"lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
			"magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
			"mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
			"navajowhite":"#ffdead","navy":"#000080",
			"oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
			"palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
			"rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
			"saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
			"tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
			"violet":"#ee82ee",
			"wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
			"yellow":"#ffff00","yellowgreen":"#9acd32"
		}[colour.toLowerCase()] || false;
	}

	function hex(x) { 
		var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]; 
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}

	var color = colourName2Hex(c) || rgb2hex(c);
	if (color) c = color;

	var c = c.replace('#', '');  // strip # 
	var rgb = parseInt(c, 16);   // convert rrggbb to decimal
	var r = (rgb >> 16) & 0xff;  // extract red
	var g = (rgb >>  8) & 0xff;  // extract green
	var b = (rgb >>  0) & 0xff;  // extract blue

	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

	// Fiz alguns testes e identifique que o fator 160 é uma boa referência
	return (luma < 160);
}

var registerChart_Global = [];

var styleGenerico_Global = { 
	alternarColor: '',
	numberFormat: '#',
	tamanhoFixo: true,
	legendaChart: false,
	separadorDecimal: ',',
	separadorMilhar: '.',
	linhaPontilhada: '5.5',
}


function resolvChart(data, options) { 
	/*
		styleGenerico = {
			alternarColor: (0|1) 					-- Colore o fundo do grafico cor sim e cor não
			numberFormat: '#' 						-- Formatação do numero
			tamanhoFixo: (0|1) 						-- Se vai ter ou não
			legendaChart: (0|1) 					-- Se vai ter ou não
			separadorDecimal: ',' 					-- Texto para separador decimal
			separadorMilhar: '.' 					-- Texto para separador de milhar
			linhaPontilhada: '5.5' 					-- Parametro de pontilhado da linha
		}

		options: {
			category: { 							-- Parametro que indica a categoria do grafico
				text: ''							-- Texto do parametro
				param: ''							-- Parametro do objeto data correspondente
				click: function(index){}			-- Click considerando a categoria inteira, passar como parametro o indice da categoria / dado
				rotation: num/graus					-- Graus de rotação da descrição da categoria
				textUpDown: (0|1) 					-- Descrição, no eixo da catergorias, colocando um para cima e outro para baixo
			}
			value: [] / { 							-- Parametro que indica o valor do grafico / Pode ser um objeto ou array de objetos
				text: ''							-- Texto do parametro
				min: num 							-- O valor minimo que começa o gráfico, geramente fica para a lib definir automatico
				max: num 							-- O valor máximo que pode chegar o gráfico, geramente fica para a lib definir automatico
				opposite: (0|1) 					-- Se vai desenhar a escala do lado oposto, padrão false
				syncWithAxis: index 				-- Se possui mais de uma escala e precisa sincronizar o valor com outra escala
				... 								-- valor é o indice da outra escala
			}
			serie: [] / { 							-- Pode ser apenas um objeto ou um array de objetos
				type: (column|line)  				-- Tipo de serie se vai montar grafico de linha ou coluna, padrão é column
				param: ''							-- Parametro do objeto data correspondente
				click: function(){} 				-- Quando clicar no gráfico
				name: '' 							-- Nome do gráfico
				color: 'lightblue' 					-- Cor que vai ter no grafico
				onlyColumn: (0|1) 					-- Deixar uma coluna emcima da outra, padrão vardadeiro
				label: (0|1) / { 					-- Caso for definido como false não irá mostrar no gráfico
					color: 'black' 					-- Cor da font da label que é motrar o valor no grafico
					align: (center|in|out)			-- Alinhamento da label se é centrelizado dentro ou fora o padrão é 'out'
					mask: '%0%' 					-- Mascara da label
				}
				ball: (0|1) / { 					-- Caso gráfico de linha sem click na serie irá desenhar somente as bolas em cada categoria
					color: '' 						-- Preenchimento da cor da bolinha
				}
				pontilhado: (0|1) 					-- Caso gráfico de linha denhar a linha pontilhada ou reta
				tooltip: '' 						-- Texto em HTML
				value: index 						-- Se possui mais de uma escala precisa informar qual escala é referente a essa serie
				... 								-- valor é o indice da escala
				hide: (0|1) 						-- Indicar se vai ocultar no gráfico, padrão false, atualizado pre e pos-render
			}
			descForm: '' 							-- Parametro de identificação
			padination: num 						-- Trazer tantos valores pré definidos na tela
			orientation: 'horizontal' 				-- Orientação do grafico, (horizontal | vertical)
			percentual: (0|1) 						-- Se o grafico vai mostrar valor percentual de 0 a 100
			width: '100%' 							-- Largura do grafico
			height: '400px' 						-- Altura do gráfico
			styleGenerico: {} 						-- Configurações genericas para todos os grafico gerados apartir
			setLegend: (0|1) 						-- Se vai mostrar legenda do grafico
			legend: { 								-- Configurações de legenda
				position: 'bottom|top|right|left' 	-- Posição onde vai ficar a legenda (padrão bottom)
				align: 'top|middle|bottom' 			-- Caso posição for right ou left pode escolher onde vai ficar  (padrão top)
			}
			title: '' 								-- Titulo do gráfico
			colors: [] 								-- Array com as cores que o grafico vai seguir para ser montado
			...										-- ex: ['blue','green','orange']
			forceSet: (0|1) 						-- Forçar montar o gráfico
		}
	*/

	var styleGenerico = $.extend({}, styleGenerico_Global, (options.styleGenerico || {}));

	if (
		(options.forceSet || '') != '' && registerChart_Global.indexOf(options.descForm) >= 0
	) { 
		registerChart_Global.splice(registerChart_Global.indexOf(options.descForm),1);
	}

	// var random;
	// do {
	// 	random = parseInt( Math.random() * 100000 );
	// } while (registerChart_Global.indexOf(random) != -1);

	data.forEach(function(dt,i) { 
		data[i].lineDash = styleGenerico.linhaPontilhada;
	});

	// Verificar se o parametro é um objeto unitario e passar para array
	['serie','value'].forEach(function(e) { 
		// options.serie, options.value
		var keys = Object.keys((options[e] || {}));
		if (keys.length > 0 && isNaN(keys[0])) 	options[e] = [options[e]];
		else if (keys.length == 0) 				options[e] = [{}];
	});

	window['indexCursorChart' + options.descForm + '_Global'] = 0;

	if (registerChart_Global.indexOf(options.descForm) != -1) { // grafico já exite

		$("#chartdiv"+options.descForm)
			.css('height', ((options.height || '') != '' ? options.height : "400px"));

		window["chart"+options.descForm].data = data;

		if ((options.padination || '') != '' && !isNaN(options.padination)) { 
			window["categoryAxis"+options.descForm].start 	= 0;
			window["categoryAxis"+options.descForm].end 	= data.length < parseInt(options.padination) ? 1 : parseInt(options.padination) / data.length;
		}

		options.serie.forEach(function(s,i) { 
			window["series"+i+options.descForm][((s.hide || '') == '' ? 'show' : 'hide')]();
		});

		if ((options.title || '') != '') { 
			window["titleChart"+options.descForm].text = options.title;
		}

		return true;
	}


	var setLegend = false; // variavel para mostrar legenda


	if ((options.orientation || '') == '') options.orientation = 'horizontal';

	registerChart_Global.push(options.descForm);

	var html = ''
		+t(0) 	+ 	`<center>`
		+t(1)	+ 		`<div id="chartdiv${options.descForm}"`
		+t(2)	+ 			` style='`
				+ 				`height:${((options.height 	|| '') != '' ? options.height 	: "400px"	)};`
				+ 				`width:	${((options.width 	|| '') != '' ? options.width 	: "100%"	)};`
				+ 			`'`
		+t(1)	+ 		`></div>`



		// ***************************************************************************************************** //
		// ** Tamanho Fixo * //
		+ ((styleGenerico.tamanhoFixo || '') == '' || (options.percentual || '') != '' ? '' : ''
			+t(1) 	+ 	`&nbsp;&nbsp;&nbsp;<label class='cursorClick'>`
			+t(2) 	+ 		`<input type="checkbox"`
					+ (options.value || []).map(function(v,i) { return ''
						+ 		` onclick='valueAxis${options.descForm+String(i)}.strictMinMax = !valueAxis${options.descForm+String(i)}.strictMinMax;'`
					})
					+ 		`>`
					+ 		`&nbsp;`
					+ 		`Tamanho fixo`
			+t(1) 	+ 	`</label>`
		)
		// ***************************************************************************************************** //




		// ***************************************************************************************************** //
		// ** Legenda Gráfico * //
		+ ((styleGenerico.legendaChart || '') == '' && options.serie.filter(function(e) { return (e.tooltip || '') != '' }).length == 0 ? '' : ''
			+t(1) 	+ 	`&nbsp;&nbsp;&nbsp;<label class='cursorClick'>`
			+t(2) 	+ 		`<input type="checkbox" checked`

					+ ` onclick='`
					+ 	options.serie.map(function(e,i) { 
							return `series${i+options.descForm}._tooltip.disabled = !series${i+options.descForm}._tooltip.disabled;`;
						}).join('')
					+ `'`

					+ 		`>`
					+ 		`&nbsp;`
					+ 		`Legenda Gráfico`
			+t(1) 	+ 	`</label>`
		)
		// ***************************************************************************************************** //
		+t(0) 	+ 	`</center>`






		// ***************************************************************************************************** //
		// ** Variavel Chart * //
		+t(0)	+ 	`<script>`
		+t(1)	+ 		`var chart${options.descForm} = null;`
		+t(1)	+ 		`chart${options.descForm} = am4core.create("chartdiv${options.descForm}", am4charts.XYChart);`
		+t(1)	+ 		`$('[aria-labelledby]')[$('[aria-labelledby]').length-1].style.display = 'none';`
		+t(1)	+ 		`var categoryAxis${options.descForm}, series${options.descForm};`
		+t()
		+t(1)	+ 		`chart${options.descForm}.numberFormatter.language.adapter.object._locale._decimalSeparator = '${options.separadorDecimal || ','}';`
		+t(1)	+ 		`chart${options.descForm}.numberFormatter.language.adapter.object._locale._thousandSeparator = '${options.separadorMilhar || '.'}';`
		+t(1)	+ 		`chart${options.descForm}.data = ${JSON.stringify(data)};`
		+t(1)	+ 		`chart${options.descForm}.numberFormatter.numberFormat = "${(styleGenerico.numberFormat || "#")}";`
		+ ((options.colors || '') == '' ? '' : ''
			+t(1) + 	`chart${options.descForm}.colors.list = [`
			+t(2) + 		options.colors.map(function(dt) { return `am4core.color("${dt}")`; }).join(',' + t(2))
			+t(1) + 	`]`
		)
		// ***************************************************************************************************** //






		// ***************************************************************************************************** //
		// ** Title * //
		+ ((options.title || ``) == `` ? `` : ``
			+t()
			+t(1)+ 		`titleChart${options.descForm} 					= chart${options.descForm}.titles.push(new am4core.Label());`
			+t(1)+ 		`titleChart${options.descForm}.text 			= '${options.title}';`
			+t(1)+ 		`titleChart${options.descForm}.fontSize 		= 25;`
			+t(1)+ 		`titleChart${options.descForm}.marginBottom 	= 5;`
			+t(1)+ 		`titleChart${options.descForm}.marginTop 		= 10;`
		)
		// ***************************************************************************************************** //






		// ***************************************************************************************************** //
		// ** Categoria * //
		+ t()
		+ (options.orientation == 'horizontal' 
			? t(1) + 	`categoryAxis${options.descForm} = chart${options.descForm}.xAxes.push(new am4charts.CategoryAxis());`
			: t(1) + 	`categoryAxis${options.descForm} = chart${options.descForm}.yAxes.push(new am4charts.CategoryAxis());`
		)
		+t(1)	+ 		`categoryAxis${options.descForm}.dataFields.category 						= '${options.category.param}';`
		+t(1)	+ 		`categoryAxis${options.descForm}.title.text 								= "${(options.category.text || '')}";`
		+t(1)	+ 		`categoryAxis${options.descForm}.renderer.grid.template.location 			= 0;`
		+t(1)	+ 		`categoryAxis${options.descForm}.renderer.minGridDistance 					= 20;`
		+ (((options.category || {}).rotation || '') == '' ? '' : ''	
			+t(1) +		`categoryAxis${options.descForm}.renderer.labels.template.rotation = ${options.category.rotation};`
			// +t(1) +		`categoryAxis${options.descForm}.renderer.labels.template.horizontalCenter = "left";`
			// +t(1) +		`categoryAxis${options.descForm}.renderer.labels.template.location = 0.5;`
		)

		+ ((styleGenerico.alternarColor || '') == '' ? '' : ''
			+t(1) + 	`categoryAxis${options.descForm}.renderer.axisFills.template.disabled 		= false;`	// Grafico de avaliações
			+t(1) + 	`categoryAxis${options.descForm}.renderer.axisFills.template.fillOpacity 	= 0.05;`	// Grafico de avaliações
		)

		+ (options.orientation == 'horizontal'  ? '' : ''
			+t(1) + 	`categoryAxis${options.descForm}.renderer.inversed 							= true;`
		)
		+ ((options.padination || '') == '' ? '' : ''
			+t(1) + 	`categoryAxis${options.descForm}.start = 0;`
			+t(1) + 	`setTimeout(function(){`
				  + 		`categoryAxis${options.descForm}.end = `
				  + 			(data.length < parseInt(options.padination) ? 1 : parseInt(options.padination) / data.length) + `;`
				  + 	`},1000);`
		)
		+ (((options.category || {}).textUpDown || '') == '' ? '' : ''
			+t(1) + 	`categoryAxis${options.descForm}.renderer.labels.template.adapter.add("dy", function(dy, target) { `
			+t(1) + 		`return dy + (target.dataItem && target.dataItem.index & 2 == 2 ? 15 : 0);`
			+t(1) + 	`});`
		)
		// ***************************************************************************************************** //








		// ***************************************************************************************************** //
		// ** Valor * //
		+ t()
		+ (options.value || []).map(function(value={}, indiceVlr) { return ''
			+ t(1) + 'var '
			+ (options.orientation == 'horizontal' 
				? 			`valueAxis${options.descForm + String(indiceVlr)} = chart${options.descForm}.yAxes.push(new am4charts.ValueAxis());`
				: 			`valueAxis${options.descForm + String(indiceVlr)} = chart${options.descForm}.xAxes.push(new am4charts.ValueAxis());`
			)
			+t(1)	+ 		`valueAxis${options.descForm + String(indiceVlr)}.title.text = "${(value.text || '')}";`
			+ (value.min == undefined ? '' : ''
				+t(1)	+ 	`valueAxis${options.descForm + String(indiceVlr)}.min = ${value.min};`
			)
			+ (value.max == undefined ? '' : ''
				+t(1)	+ 	`valueAxis${options.descForm + String(indiceVlr)}.max = ${value.max};`
			)
			+ ((value.opposite || '') == '' ? '' : ''
				+t(1)	+ 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.opposite = true;`
			)
			+ (value.syncWithAxis == undefined ? '' : ''
				+t(1)	+ 	`valueAxis${options.descForm + String(indiceVlr)}.syncWithAxis = valueAxis${options.descForm + String(value.syncWithAxis)};`
			)
			+ ((options.percentual || '') == '' ? '' : '' // Ex: grafico de avaliação RUIM / BOM / OTIMO (por item da avaliação)
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.min = 0;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.max = 100;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.minGridDistance = 50;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.ticks.template.length = 5;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.ticks.template.disabled = false;`
				+t(1) + 	`valueAxis${options.descForm + String(indiceVlr)}.renderer.ticks.template.strokeOpacity = 0.4;`
			)
		}).join('')
		// ***************************************************************************************************** //









	// ***************************************************************************************************** //
	// ** Series * //
	var maskLabel, color;
	for (var i = 0; i < options.serie.length; i++) { 
		if (((options.serie[i] || {}).name || '') != '') setLegend = true; // verifica se precisa de legenda

		maskLabel = ((options.serie[i].label || {}).mask || '%0%').replace('%0%', (options.orientation == 'horizontal' ? '{valueY}' : '{valueX}'));

		color = (options.serie[i].color || '') != '' 
			? `am4core.color(\"${options.serie[i].color}\");`
			: `chart${options.descForm}.colors.getIndex(${i});`;

		html += ""+t()+t();

		if ((options.serie[i].type || 'column') == 'column') { 
			html += ""
			+t(1)	+ 		`series${i+options.descForm} = chart${options.descForm}.series.push(new am4charts.ColumnSeries());`
			+ (options.orientation == 'horizontal' 
				? t(1) + 	`series${i+options.descForm}.dataFields.valueY 						= "${options.serie[i].param}";`
				+ t(1) + 	`series${i+options.descForm}.dataFields.categoryX 					= "${options.category.param}";`
				: t(1) + 	`series${i+options.descForm}.dataFields.valueX 						= "${options.serie[i].param}";`
				+ t(1) + 	`series${i+options.descForm}.dataFields.categoryY 					= "${options.category.param}";`
			)
			+t(1)	+ 		`series${i+options.descForm}.columns.template.fill 					= ${color};`
			+t(1)	+ 		`series${i+options.descForm}.stroke 								= ${color};`
			+t(1)	+ 		`series${i+options.descForm}.fill 									= ${color};`
			+ (options.orientation == 'horizontal' 
				? t(1)	+ 		`series${i+options.descForm}.tooltip.dy 						= -8;`
				: t(1)	+ 		`series${i+options.descForm}.tooltip.dx 						= -8;`
			)
			+t(1)	+ 		`series${i+options.descForm}.tooltip.label.interactionsEnabled 		= true;`
			+t(1)	+ 		`series${i+options.descForm}.tooltip.keepTargetHover 				= false;`
			+t(1)	+ 		`series${i+options.descForm}.sequencedInterpolation 				= true;`
			+t(1)	+ 		`series${i+options.descForm}.defaultState.interpolationDuration 	= 1500;`
			+t(1)	+ 		`series${i+options.descForm}.columns.template.strokeOpacity 		= 0;`
			+t(1)	+ 		`series${i+options.descForm}.stacked 								= ${(options.serie[i].onlyColumn === false ? 'false' : 'true')};`
			+ ((options.serie[i].tooltip || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.tooltipHTML 							= "${options.serie[i].tooltip}";`
			)
			+ ((options.serie[i].name || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.name 									= '${options.serie[i].name}';`
			)
			+ (options.serie[i].value == undefined ? '' : ''
				+t(1) + 	`series${i+options.descForm}.${(options.orientation == 'horizontal' ? 'y' : 'x')}Axis = `
						+ 		`valueAxis${options.descForm + String(options.serie[i].value)};`
			)
			+ ((options.serie[i].click || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.columns.template.events.on("hit", function(ev) {`
				+t(2) + 		`var func = ${String(options.serie[i].click)};`
				+t(2) + 		`func(ev);`
				+t(1) + 	`});`
			)
		}



		if ((options.serie[i].type || 'column') == 'line') { 
			html += ""
			+t(1)	+ 		`series${i+options.descForm} = chart${options.descForm}.series.push(new am4charts.LineSeries());`
			+ (options.orientation == 'horizontal' 
				? t(1) + 	`series${i+options.descForm}.dataFields.valueY 				= "${options.serie[i].param}";`
				+ t(1) + 	`series${i+options.descForm}.dataFields.categoryX 			= "${options.category.param}";`
				: t(1) + 	`series${i+options.descForm}.dataFields.valueX 				= "${options.serie[i].param}";`
				+ t(1) + 	`series${i+options.descForm}.dataFields.categoryY 			= "${options.category.param}";`
			)
			+t(1)	+ 		`series${i+options.descForm}.propertyFields.stroke 			= ${color};` // não sei o que faz
			+t(1)	+ 		`series${i+options.descForm}.propertyFields.fill 			= ${color};`
			+t(1)	+ 		`series${i+options.descForm}.stroke 						= ${color};` // set color line
			+t(1)	+ 		`series${i+options.descForm}.fill 							= ${color};`
			// +t(1)	+ 		"series"+i+options.descForm+".fillOpacity 					= 0.5;" // com fundo colorido ou não
			+t(1)	+ 		`series${i+options.descForm}.strokeWidth 					= 3;` // espeçura da linha
			// chart.colors.getIndex(2);
			+ ((options.serie[i].tooltip || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.tooltipHTML 					= "${options.serie[i].tooltip}";`
				+t(1) + 	`series${i+options.descForm}.tooltip.pointerOrientation 	= "vertical";`
				+t(1) + 	`series${i+options.descForm}.tooltip.background.fill 		= ${color};`
			)
			+ ((options.serie[i].name || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.name 							= '${options.serie[i].name}';`
			)
			+ (options.serie[i].value == undefined ? '' : ''
				+t(1) + 	`series${i+options.descForm}.${(options.orientation == 'horizontal' ? 'y' : 'x')}Axis = `
						+ 		`valueAxis${options.descForm + String(options.serie[i].value)};`
			)
			+ ((options.serie[i].click || '') == '' && (options.serie[i].ball || '') == '' ? '' : ''
				+t()
				+t(1) + 	`var bullets${i+options.descForm} = series${i+options.descForm}.bullets.push(new am4charts.CircleBullet());`
				+t(1) + 	`bullets${i+options.descForm}.circle.fill = `
						+ 		((((options.serie[i] || {}).ball || {}).color || '') == '' ? color : `am4core.color("${options.serie[i].ball.color}")`) + ';'
				+ ((options.serie[i].click || '') == '' ? '' : ''
					+t(1) + `bullets${i+options.descForm}.events.on(\"hit\", function(ev) {`
					+t(2) + 	`var func = ${String(options.serie[i].click)};`
					+t(2) + 	`func(ev);`
					+t(1) + `});`
				)
			)
			+ ((options.serie[i].pontilhado || '') == '' ? '' : ''
				+t(1) + 	`series${i+options.descForm}.propertyFields.strokeDasharray = "lineDash"`
			)
		}

		html += ""
			+t(1)	+ 		`series${i+options.descForm}.${((options.serie[i].hide || '') == '' ? 'show' : 'hide')}();`


		if (options.serie[i].label != false) { 
			html += ''+t()
			+t(1)	+ 		`var labelBullet${i+options.descForm} 					= new am4charts.LabelBullet();`
			+t(1) 	+ 		`labelBullet${i+options.descForm}.label.text 			= "${maskLabel}";` // .value.formatNumber('#.')
			+t(1)	+ 		`labelBullet${i+options.descForm}.strokeOpacity 		= 0;`
			+t(1)	+ 		`labelBullet${i+options.descForm}.stroke 				= am4core.color("#dadada");`
			+t(1)	+ 		`labelBullet${i+options.descForm}.label.strokeWidth 	= 0;`
			+t(1)	+ 		`labelBullet${i+options.descForm}.label.fill 			= am4core.color("${((options.serie[i].label || {}).color || "black")}");`
			+t(1)	+ 		`labelBullet${i+options.descForm}.label.hideOversized 	= true;` // não imprimi valor zerad
			+ ((options.serie[i].click || '') == '' ? '' : ''
				+t(1) + 	`labelBullet${i+options.descForm}.events.on(\"hit\", function(ev) {`
				+t(2) + 		`(${String(options.serie[i].click)}(ev));`
				+t(1) + 	`});`
			)
			+ (((options.serie[i].label || {}).align || '').toLowerCase() == 'center' 
				? (options.orientation == 'horizontal' 
					? t(1) + 	`labelBullet${i+options.descForm}.locationY 		= 0.5;`
					: t(1) + 	`labelBullet${i+options.descForm}.locationX 		= 0.5;`
				)
				: (((options.serie[i].label || {}).align || '').toLowerCase() == 'in' 
					? (options.orientation == 'horizontal' 
						? t(1) + `labelBullet${i+options.descForm}.dy 				= 15;`
						: t(1) + `labelBullet${i+options.descForm}.dx 				= -15;`
					)
					: (options.orientation == 'horizontal' // se for out
						? t(1) + `labelBullet${i+options.descForm}.dy 				= -15;`
						: t(1) + `labelBullet${i+options.descForm}.dx 				= 15;`
					)
				)
			)
			+t(1)	+ 		`labelBullet${i+options.descForm}.label.truncate 		= false;`
			+t(1)	+ 		`series${i+options.descForm}.bullets.push(labelBullet${i+options.descForm});`
		}
	}
	// ***************************************************************************************************** //









	html += ''+t()+t()
		// ***************************************************************************************************** //
		// ** Reta final * //
		// +t(1)	+ 		"chart"+options.descForm+".legend 									= new am4charts.Legend(); // acrecenta legenda no grafico"
		+t(1)	+ 		`chart${options.descForm}.scrollbarY 								= new am4core.Scrollbar();`
		+t(1)	+ 		`var scrollbarX${options.descForm} 									= new am4core.Scrollbar();`
		+t(1)	+ 		`chart${options.descForm}.scrollbarX 								= scrollbarX${options.descForm};`
		+t(1)	+ 		`chart${options.descForm}.scrollbarX.parent 						= chart${options.descForm}.bottomAxesContainer;` // setar scroll do eixo x embaixo
		// +t(1)	+ 		`chart${options.descForm}.scrollbarX.thumb.minWidth 				= 100;` // Limita o zoom do gráfico (serve pra nada kkkkk)

		+t(1)	+ 		`chart${options.descForm}.cursor 									= new am4charts.XYCursor();` // indica onde o curso está com cordenadas XY
		+ (options.orientation == 'horizontal' 
			? t(1) + 	`chart${options.descForm}.cursor.behavior 							= "zoomX";`
			: t(1) + 	`chart${options.descForm}.cursor.behavior 							= "zoomY";`
		)
		+ ((options.category.click || '') == '' ? '' : ''
			// +t(1) + 	`chartPrincipal.cursor.snapToSeries = series${0+options.descForm};`
			+t(1) + 	`chart${options.descForm}.cursor.${options.orientation == 'horizontal' ? 'x' : 'y'}Axis = categoryAxis${options.descForm};`
			+t(1) + 	`chart${options.descForm}.cursor.events.on("cursorpositionchanged", function(ev) {`
			+t(1) + 		`indexCursorChart${options.descForm}_Global = categoryAxis${options.descForm}.positionToIndex(`
				  + 			`categoryAxis${options.descForm}.toAxisPosition(ev.target.${options.orientation == 'horizontal' ? 'x' : 'y'}Position)`
				  // + 			`categoryAxis${options.descForm}.toAxisPosition(ev.target.xPosition)`
				  + 		`);`
			+t(1) + 	`});`

			+t(1) + 	`chart${options.descForm}.plotContainer.events.on("hit", function(ev) {`
			+t(1) + 		`console.log(indexCursorChart${options.descForm}_Global);`
			+t(1) + 		`var func = ${String(options.category.click)};`
			+t(1) + 		`func(indexCursorChart${options.descForm}_Global);`
			// +t(1) + 		`montarGraficoOS(indexCursorChartPrincipal_Global);`
			// +t(1) + 		`montarGraficoAvalaiacao(indexCursorChartPrincipal_Global);`
			+t(1) + 	`});`
		)
		+ (!setLegend && (options.legend || '') == '' ? '' : ''
			+ t(1) + 	`chart${options.descForm}.legend 			= new am4charts.Legend();`
			+ ((options.legend || '') == '' ? '' 
				: ''
				+ t(1) + `chart${options.descForm}.legend.position 	= "${(options.legend.position 	|| 'bottom'	)}";`
				+ t(1) + `chart${options.descForm}.legend.valign 	= "${(options.legend.align 		|| 'top'	)}";`
			)
		)
		// ***************************************************************************************************** //
		+t(0)	+ 	"</"+"script>"

	return html;
}

function toFunction(func, replace) { 
	var isString;
	func = String(func);
	for (var i = 0; i < replace.length; i++) {
		isString = (replace[i][2] || 'literal') == 'literal' && typeof(replace[i][1]) == 'string';
		while (func.indexOf(replace[i][0]) != -1) 
			func = func.replace(replace[i][0] , isString ? "\"" + replace[i][1] + "\"" : replace[i][1]);
	}
	return eval(`(function(){ return ${func}})()`);
}

var registerChart_Global = [];

// scriptChart.js

function resolvChart2(data, options) { 
	/*
		options: {
			category: { 		-- Parametro que indica a categoria do grafico
				text: ''		-- Texto do parametro
				param: ''		-- Parametro do objeto data correspondente
			}
			value: { 			-- Parametro que indica o valor do grafico
				text: ''		-- Texto do parametro
			}
			serie: {
				param: ''		-- Parametro do objeto data correspondente
			}
			descForm: '' 		-- Parametro de identificação
			padination: num 	-- Trazer tantos valores pré definidos na tela
		}
	*/

	// var random;
	// do {
	// 	random = parseInt( Math.random() * 100000 );
	// } while (registerChart_Global.indexOf(random) != -1);
	if (registerChart_Global.indexOf(options.descForm) != -1) {
		window["chart"+options.descForm].data = data;

		if ((options.padination || '') != '' && !isNaN(options.padination)) {
			window["categoryAxis"+options.descForm].start 	= 0;
			window["categoryAxis"+options.descForm].end 	= data.length < options.padination ? 1 : options.padination / data.length;
		}

		return true;
	}

	registerChart_Global.push(options.descForm);

	var html = ''
		+ 	"<div id=\"chartdiv"+options.descForm+"\"></div>"
		+ 	"<script>"
		+ 		"var chart"+options.descForm+" = am4core.create(\"chartdiv"+options.descForm+"\", am4charts.XYChart);"
		+ 		"document.querySelectorAll('[aria-labelledby]')[document.querySelectorAll('[aria-labelledby]').length-1].style.display = 'none';"
		// + 		"var renderGrafic"+options.descForm+" = false;"
		+ 		"var valueAxis"+options.descForm+", categoryAxis"+options.descForm+", series"+options.descForm+";"
		+ 		"chart"+options.descForm+".numberFormatter.language.adapter.object._locale._decimalSeparator = ',';"
		+ 		"chart"+options.descForm+".numberFormatter.language.adapter.object._locale._thousandSeparator = '.';"
		+ 		"chart"+options.descForm+".data = " + JSON.stringify(data) + ";"
		+ 		"chart"+options.descForm+".numberFormatter.numberFormat = \"#\";"

		+ 		"categoryAxis"+options.descForm+" 									= chart.xAxes.push(new am4charts.CategoryAxis());"
		+ 		"categoryAxis"+options.descForm+".dataFields.category 				= '"+options.category.param+"';"
		+ 		"categoryAxis"+options.descForm+".title.text 						= \""+(options.category.text || '')+"\";"
		+ 		"categoryAxis"+options.descForm+".renderer.grid.template.location 	= 0;"
		+ 		"categoryAxis"+options.descForm+".renderer.minGridDistance 			= 20;"
		// + 		"categoryAxis"+options.descForm+".renderer.inversed 				= true;"
		+ 		"categoryAxis"+options.descForm+".start = 0;"
		+ 		"setTimeout(function(){categoryAxis"+options.descForm+".end = " + (data.length < options.padination ? 1 : options.padination / data.length) + ";}, 100);"


		+ 		"valueAxis"+options.descForm+" 										= chart.xAxes.push(new am4charts.ValueAxis());"
		+ 		"valueAxis"+options.descForm+".title.text 							= \""+(options.value.text || '')+"\";"

		+ 		"series"+options.descForm+" 										= chart.series.push(new am4charts.ColumnSeries());"
		+ 		"series"+options.descForm+".dataFields.valueY 						= \""+options.serie.param+"\";"
		+ 		"series"+options.descForm+".dataFields.categoryX 					= \""+options.category.param+"\";"
		+ 		"series"+options.descForm+".columns.template.fill 					= am4core.color(\"lightblue\");"
		+ 		"series"+options.descForm+".tooltip.dy 								= -8;"
		+ 		"series"+options.descForm+".tooltip.label.interactionsEnabled 		= true;"
		+ 		"series"+options.descForm+".tooltip.keepTargetHover 				= false;"
		+ 		"series"+options.descForm+".sequencedInterpolation 					= true;"
		+ 		"series"+options.descForm+".defaultState.interpolationDuration 		= 1500;"
		+ 		"series"+options.descForm+".columns.template.strokeOpacity 			= 0;"
		// + 		"series"+options.descForm+".dataFields.valueY 						= "TOTAL_INCIDENTES";"
		// + 		"series"+options.descForm+".dataFields.categoryX 					= 'DS_TIPO_INCIDENTE';"
		// + 		"series"+options.descForm+".dataFields.TOTAL_INCIDENTES_FORM 		= \"TOTAL_INCIDENTES_FORM\";"
		// + 		"series"+options.descForm+".dataFields.TOTAL_INCIDENTES_FORM 		= \"TOTAL_INCIDENTES\";"
		// + 		"series"+options.descForm+".name 									= "Número de Incidentes";"
		// + 		"series"+options.descForm+".tooltip.pointerOrientation 				= "vertical";"


		+ 		"chart"+options.descForm+".cursor 									= new am4charts.XYCursor();" // indica onde o curso está com cordenadas XY
		// + 		"chart"+options.descForm+".legend 									= new am4charts.Legend(); // acrecenta legenda no grafico"
		+ 		"chart"+options.descForm+".scrollbarY 								= new am4core.Scrollbar();"
		+ 		"var scrollbarX"+options.descForm+" 								= new am4core.Scrollbar();"
		+ 		"chart.scrollbarX"+options.descForm+" 								= scrollbarX;"
		+ 		"chart.scrollbarX"+options.descForm+".parent 						= chart.bottomAxesContainer;" // setar scroll do eixo x embaixo
		+ 		"chart.scrollbarX"+options.descForm+".thumb.minWidth 				= 100;"
		+ 		"chart"+options.descForm+".cursor.behavior 							= \"zoomX\";"

		+ 		"var labelBullet"+options.descForm+" 								= new am4charts.LabelBullet();"
		+ 		"labelBullet"+options.descForm+".label.text 						= \"{valueY}\";" // .value.formatNumber('#.')
		+ 		"labelBullet"+options.descForm+".strokeOpacity 						= 0;"
		+ 		"labelBullet"+options.descForm+".stroke 							= am4core.color(\"#dadada\");"
		+ 		"labelBullet"+options.descForm+".dy 								= -15;"
		+ 		"labelBullet"+options.descForm+".label.truncate 					= false;"
		+ 		"series"+options.descForm+".bullets.push(labelBullet"+options.descForm+");"

		+ 	"</"+"script>"

	return html;
}

function resolvCodigoConsulta(options, tab=0) { 
	/*
	options: {
		codigo: {					-- Campos de pesquisa por codigo
			text: ''				-- texto que acompanha o cmapo do codigo
			input: ''				-- valor de apresentação
			mask: ''				-- defini marcara no campo
			styleLabel: {} 			-- objeto css para personalizar label
		}
		desc: {						-- campo de descrição do item selecionado
			text: ''				-- texto que acompanha o item selecionado
			input: ''				-- valor de apresentação
			mask: ''				-- defini marcara no campo
			styleLabel: {} 			-- objeto css para personalizar label
		}
		select: {					-- campo combo para selecionar registro
			text: ''				-- texto que acompanha o item selecionado
			styleLabel: {} 			-- objeto css para personalizar label
			value: '' 				-- campo com o valor desejado
			desc: '' 				-- campo para mostrar a descrição por onde vai pesquisar
			onchange: function(el) 	-- função disparando quando muda o valor do select
			onload: function() 		-- função disparando quando carrega os dados do select
		}
		descForm: 					-- identificador
		id: '' 						-- campo de id para acessar externo, caso seja omitido será usado o this.codigo.input
		ajax: 'ajax'				-- nome da função do ajax
		param: [					-- parametro passado para consulta dos dados
			{
				key: ''				-- nome do parametro
				val: (''|function)	-- valor ou função de callback para o parametro 
			}
		]
		OR param: { key: value } 	-- key é o nome do parametro e value é a funcção de callback ou o parametro (''|function)
		styleLabel: {} 				-- objeto css para personalizar label tanto do codigo quanto da descrição
		trigger: function			-- função disparada quando selecionar um registro
		grade: objResolvGrade 		-- é a grade que vai ser montada no modal para selecionar por descrição,
									-- já vem com valores predefidos tendo que informar somente o attr 'inputs'
									-- porém é possivel definir os demais, logo eles serão acrecentados ou sobrepostos
		onPesquisa: function 		-- função de validação de consulta, deve retornar um boleano
		required: '' 				-- se o componete é obrigatório ou não
		accesskey: '' 				-- tecla de atalho para focar no componete. Order de para foca ['campo codigo','botão']
		onFalseDebug: function(dt) 	-- Caso tenha que personalizar quando o retorno for vazio ou o debug for diferente de OK

		dist: 'C-B-D' 				-- refericia para a desposição do componetes na tela 
		... 						-- 	Ref: (
		... 						-- 		C = Codigo
		... 						-- 		B = Botão de pesquisa
		... 						-- 		D = Descrição
		... 						-- 		X = Botão para limpar
		... 						-- 		S = Select2 para montar combo
		... 						-- 		R = Recarregar
		... 						-- 	)
		xs / sm / md / lg: '3-1-8' 	-- Class do bootstrap para referenciar a disposição dos componetes
	}
	*/

	options = $.extend({},{ 
		dist: 'C-B-D',
		xs: '3-1-8',
		// md: '4-1-7',
		ajax: 'ajax',
	}, options);

	var random;
	do { 
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	var isOffline = options.dist.indexOf('R') >= 0;
	var param = resolvParamAjax(options);
	var descRef = '';
	var accesskey = (options.accesskey || '') == '' || options.accesskey.length > 1 ? '' : options.accesskey;

	var title = accesskey == '' ? '' : " title='Alt + " + accesskey + "'";

	if (accesskey != '') { 
		descRef = (
			options.dist.indexOf('C') >= 0 ? 'C' 
			: (options.dist.indexOf('S') >= 0 ? 'S' 
			: 'D'
		));
	}

	var styleLabel = (options.styleLabel || '') == '' ? {} : options.styleLabel

	var funcAxu = { 
		resolvLabel: function(param) { 
			if (((options[param] || {}).text || '') == '')
				return ''
					+ 	`<label>`
					+ 		`<spam style="color:white;">.</spam>`
					+ 	`</label>`;

			var style = ``;

			if ((options[param].styleLabel || '') != '' || (options.styleLabel || '') != '') 
				style = ` style="${resolvStyle( $.extend({}, styleLabel, (options[param].styleLabel || {})) )}"`;

			return ''
				+t(tab+2)	+ 	`<label${style}>`
				+t(tab+3)	+ (descRef != param.substring(0,1).toUpperCase() 
								? (options[param].text || '')
								: ''
											+ 	`<spam ${title}>`
								+t(tab+4) 	+ 		returnDescAccesskey(options[param].text, options)
								+t(tab+3) 	+ 	`</spam>`
							)
				+t(tab+2)	+ 	`</label>`
		}
	}


	var elemtents = [
		{ codigo: 'C',
			class: 'codigo',
			complemento: ` style="padding:0;padding-left:15px;"`,
			// text: descRef == 'C' ? returnDescAccesskey(options.codigo.text, options) : (options.codigo.text || ''),
			text: funcAxu.resolvLabel('codigo'),
			resolv: ''
				// + 	(options.codigo.text || '')
				// + 	((options.required || '') == '' ? '' : ` <i style='color:red;' class='fa fa-asterisk'></i>`)
				+t(tab+2)	+ 	`<input type="text" class="form-control codigoConsulta" style="text-align:right;"`
				// + 		` onkeyup="buscar${capitalize(options.descForm)}Codigo();"`
				+t(tab+3)	+ 		` data-ref='${capitalize(options.descForm)}'`
				+t(tab+3)	+ 		` data-customerid='codigo${random}'`
				+t(tab+3)	+ 		(descRef == 'C' ? title : '')
				+t(tab+3)	+ 		` onfocus="`
				+t(tab+3)	+ 			`if(!onPesquisa${capitalize(options.descForm)}()) return (this.blur(), false);`
				+t(tab+3)	+ 			capitalize(options.descForm) + "Selected_Global = this.value;"
				// + 			"this.value = '';"
				+t(tab+3)	+ 		`"`
				+t(tab+3)	+ 		` onblur="buscar${capitalize(options.descForm)}Codigo();"`
				// + 		` onblur="this.value = ${capitalize(options.descForm)}Selected_Global;"`
				+t(tab+2)	+ 	`>`
				+t(tab+2)	+ 	`<script>`
				+t(tab+3)	+ 		`resolvEl('${options.descForm}','codigo').el[0].onclick = function(){`
				// + 		`$('#${options.descForm}').find('.codigo').find('input')[0].onclick = function(){`
				// + 			`$('#${options.descForm}').find('.codigo').find('input')[0].select();`
				+t(tab+4)	+ 			`resolvEl('${options.descForm}','codigo').el[0].select();`
				+t(tab+3)	+ 		`}`
				// +t(tab+3)	+ 		`;registerInputFocus.push(resolvEl('${options.descForm}','codigo').el[0]);`
				+t(tab+3)	+ 		`;registerInputFocus.push(resolvEl('${options.descForm}','codigo'));`
				+t(tab+2)	+ 	`</`+`script>`
		},
		{ codigo: 'B',
			class: 'text-center',
			complemento: ` style="padding:0;padding-right:15px;"`,
			resolv: ''
				+t(tab+2)	+ 	`<label`
							+ 		` style=${resolvStyle(styleLabel)}`
							+ 	`>`
				+t(tab+3)	+ 		`<spam style="color:white">.</spam>`
				+t(tab+2)	+ 	`</label>`
				+t(tab+2)	+ 	`<br>`
				+t(tab+2)	+ 	`<button class="btn btn-default btn-block"`
				+t(tab+3)	+ 		` onclick=\"pesquisa${capitalize(options.descForm)}();"`
				+t(tab+3)	+ 		` data-customerid='btn${random}'`
							+ 		(descRef == 'D' ? title : '')
				+t(tab+2)	+ 	`>`
				+t(tab+3)	+ 		`<i class="fa fa-search"></i>`
				+t(tab+2)	+ 	`</button>`
		},
		{ codigo: 'D',
			class: 'desc',
			// text: ((options.desc.text || '') == '' ? '<spam style="color:white;">.</spam>' : options.desc.text),
			// text: ((options.desc.text || '') == '' ? '<spam style="color:white;">.</spam>' : (
			// 	descRef == 'D' ? returnDescAccesskey(options.desc.text, options) : (options.desc.text || '')
			// )),
			text: funcAxu.resolvLabel('desc'),
			resolv: ''
				// + 	((options.desc.text || '') == '' ? '<spam style="color:white;">.</spam>' : options.desc.text)
				+t(tab+2)	+ 	`<input type="text" class="form-control" disabled>`
		},
		{ codigo: 'X',
			class: 'text-center clear',
			complemento: ` style="padding:0;padding-right:15px;"`,
			resolv: ''
				+t(tab+2)	+ 	`<label`
							+ 		` style=${resolvStyle(styleLabel)}`
							+ 	`>`
				+t(tab+3)	+ 		`<spam style="color:white;">.</spam>`
				+t(tab+2)	+ 	`</label>`
				+t(tab+2)	+ 	`<br>`
				+t(tab+2)	+ 	`<button class="btn btn-default btn-block"`
				+t(tab+3)	+ 		` onclick="clear${capitalize(options.descForm)}(true);"`
				+t(tab+2)	+ 	`>`
				+t(tab+3)	+ 		`<i class="fa fa-times"></i>`
				+t(tab+2)	+ 	`</button>`
		},
		{ codigo: 'S',
			class: 'select',
			complemento: ` style="padding:0;padding-left:15px;"`,
			text: funcAxu.resolvLabel('select'),
			resolv: ''
				+t(tab+2)	+ 	`<div id="loadSelect${capitalize(options.descForm)}">`
				+t(tab+3)	+ 		`Carregando...`
				+t(tab+2)	+ 	`</div>`
				+t(tab+2)	+ 	`<script>`
				+t(tab+3)	+ 		`setTimeout(function() { `
				+t(tab+4)	+ 			`buscar${capitalize(options.descForm)}Select();`
				+t(tab+3)	+ 		`}, 100);`
				+t(tab+2)	+ 	`</`+`script>`
		},
		{ codigo: 'R',
			class: 'text-center',
			complemento: ` style="padding:0;padding-right:15px;"`,
			resolv: ''
				+t(tab+2)	+ 	`<label`
							+ 		` style=${resolvStyle(styleLabel)}`
							+ 	`>`
				+t(tab+3)	+ 		`<spam style="color:white">.</spam>`
				+t(tab+2)	+ 	`</label>`
				+t(tab+2)	+ 	`<br>`
				+t(tab+2)	+ 	`<button class="btn btn-info btn-block"`
				+t(tab+3)	+ 		` onclick=\"recarregar${capitalize(options.descForm)}();"`
				+t(tab+2)	+ 	`>`
				+t(tab+3)	+ 		`<i class="fa fa-refresh"></i>`
				+t(tab+2)	+ 	`</button>`
		},
	];

	var html = ''
		+t(tab)		+ 	`<div class="row" id="${options.descForm}" style="margin:0 !important;">`
		+t(tab+2)	+		`<div class="id">`
		+t(tab+3)	+ 			`<input type="hidden">`
		+t(tab+2)	+		`</div>`
		+ (function (el, dist) {
			var html = '', riquered = false;

			for (var i = 0; i < dist.length; i++) { 
				for (var j = 0; j < el.length; j++) { 
					if (dist[i] == el[j].codigo) { 
						html += ``
						+t(tab+1)	+ 	`<div`
									+ 		` class="${(el[j].class || '')}`
									+ 			((options.xs || '') == '' ? '' : ' col-xs-' + options.xs.split('-')[i] )
									+ 			((options.sm || '') == '' ? '' : ' col-sm-' + options.sm.split('-')[i] )
									+ 			((options.md || '') == '' ? '' : ' col-md-' + options.md.split('-')[i] )
									+ 			((options.lg || '') == '' ? '' : ' col-lg-' + options.lg.split('-')[i] )
									+ 		`"`
									+ 		` style='padding:0 !important;padding-right:${(i < dist.length-1 ? '5px' : '0')} !important;'`
									+ 	`>`
									+ 		(el[j].text || '')
									+ 	(riquered || ['C','D','S'].indexOf(el[j].codigo) == -1 ? '' : (riquered = true, '')
										+ 	((options.required || '') == '' ? '' : t(tab+2) + `&nbsp;<i style='color:red;' class='fa fa-asterisk'></i>`)
									)
									+ 		el[j].resolv
						+t(tab+1)	+ 	`</div>`
					}
				}
			}
			return html;
		}(elemtents, options.dist.split('-')))
		+t(tab)		+ 	`</div>`

		+t(tab)		+ 	`<script>`
		+t(tab)		+ 		`${capitalize(options.descForm)}Select_Global = [];`
		+t(tab)		+ 		`function buscar${capitalize(options.descForm)}Select() { `
		+(!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) { `
			+t(tab+2)	+ 			`${capitalize(options.descForm)}Select_Global = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`montar${capitalize(options.descForm)}Select();`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string' 
						? options.ajax 
						: `window[(function(){ var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param: { ` 
		+t(tab+3)	+ 					param
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) { `
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`data = JSON.parse(data);`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`${capitalize(options.descForm)}Select_Global = [];`
		+t(tab+3)	+ 					`if (data.length != 0 && data[0].debug == "OK") { `
		+t(tab+4)	+ 						`${capitalize(options.descForm)}Select_Global = data;`
		+t(tab+4)	+ 						`var grade = ''`
		+t(tab+5)	+ 							`+ 	\`<select class="form-control codigoConsulta"\``
		+t(tab+5)	+ 							`+ 		\` data-ref='${capitalize(options.descForm)}'\``
		+t(tab+5)	+ 							`+ 		\` data-customerid='select${random}'\``
					+ (descRef != 'S' ? '' : t(tab+5) + `+ 		\`${title}\``)
		+t(tab+5)	+ 							`+ 		\` style='width:100%'\``
		+t(tab+5)	+ 							`+ 		\` onchange='onchange${capitalize(options.descForm)}Select(this);'\``
		+t(tab+5)	+ 							`+ 	\`>\``
		+t(tab+5)	+ 							`+ 		\`<option value=""></option>\`` 
		+t(tab+5)	+ 							`+ data.map(function(dt) { return \``
					+ 								`<option value="\${dt.${(options.select || {}).value}}">`
					+ 									`\${dt.${(options.select || {}).desc}}`
					+ 								`</option>`
					+ 							`\`; });`
		+t(tab+5)	+ 							`+ 	\`</select>\``
		+t(tab+4)	+ 						`$("#loadSelect${capitalize(options.descForm)}").html(grade).find('select').select2();`
		+t(tab+4)	+ 						`console.log("onload");`
		+t(tab+4)	+ 						`var func = ${String((options.select || {}).onload || function(){})};`
		+t(tab+4)	+ 						`func();`
		+t(tab+3)	+ 					`} else { `
		+t(tab+4)	+ 						`${capitalize(options.descForm)}Select_Global = [];`
		+t(tab+3)	+ 					`}`
		+(!isOffline ? '' : ''
			+t(tab+3)	+ 				`localStorage.setItem(`
						+ 					`"offline${capitalize(options.descForm)}",`
						+ 					`JSON.stringify(${capitalize(options.descForm)}Select_Global)`
						+ 				`);`
		)
		+t(tab+3)	+ 					`montar${capitalize(options.descForm)}Select();`
		+t(tab+2)	+ 				`}`
		+t(tab+1)	+ 			`});`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function montar${capitalize(options.descForm)}Select() { `
		+t(tab+1)	+ 			`var data = ${capitalize(options.descForm)}Select_Global;`
		+t(tab+1)	+ 			`if (data.length != 0 && data[0].debug == "OK") { `
		+t(tab+2)	+ 				`var grade = ''`
		+t(tab+3)	+ 					`+ 	\`<select class="form-control codigoConsulta"\``
		+t(tab+3)	+ 					`+ 		\` data-ref='${capitalize(options.descForm)}'\``
		+t(tab+3)	+ 					`+ 		\` data-customerid='select${random}'\``
					+ (descRef != 'S' ? '' : t(tab+3) + `+ 		\`${title}\``)
		+t(tab+3)	+ 					`+ 		\` style='width:100%'\``
		+t(tab+3)	+ 					`+ 		\` onchange='onchange${capitalize(options.descForm)}Select(this);'\``
		+t(tab+3)	+ 					`+ 	\`>\``
		+t(tab+3)	+ 					`+ 		\`<option value=""></option>\`` 
		+t(tab+3)	+ 					`+ data.map(function(dt) { return \``
					+ 						`<option value="\${dt.${(options.select || {}).value}}">`
					+ 							`\${dt.${(options.select || {}).desc}}`
					+ 						`</option>`
					+ 					`\`; });`
		+t(tab+3)	+ 					`+ 	\`</select>\``
		+t(tab+2)	+ 				`$("#loadSelect${capitalize(options.descForm)}").html(grade).find('select').select2();`
		+t(tab+1)	+ 			`}`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function onchange${capitalize(options.descForm)}Select(el) { `
		+t(tab+1)	+ 			`resolvVal("${options.descForm}","id",resolvVal("${options.descForm}","select"));`
		+t(tab+1)	+ 			`var func = ${String((options.select || {}).onchange || function(){})};`
		+t(tab+1)	+ 			`func(el);`
		+t(tab+1)	+ 			`resolvEvento("trigger","${options.descForm}");`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`${capitalize(options.descForm)}Selected_Global = '';`
		+t(tab)		+ 		`function buscar${capitalize(options.descForm)}Codigo() { `
		+t(tab+1)	+ 			`if (resolvVal("${options.descForm}",'codigo') == '') { `
		+t(tab+2)	+ 				`$("#${options.descForm}").find('input').val('');`
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`if(resolvVal("${options.descForm}",'codigo') == ${capitalize(options.descForm)}Selected_Global) { `
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+ (!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) { `
			+t(tab+2)	+ 			`var data = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`var indice = data.map(function(dt) { return dt["${((options.codigo || {}).input || '')}"]; })`
						+ 				`.indexOf(resolvVal('${options.descForm}','codigo'));`
			+t(tab+2)	+ 			`resolvValCodigo${capitalize(options.descForm)}(indice >= 0 ? [data[indice]] : []);`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string' 
						? options.ajax 
						: `window[(function(){ var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param: { ` 
		+t(tab+3)	+ 					param
		+t(tab+3)	+ 					`'${(options.codigo || {}).input}':resolvVal('${options.descForm}','codigo')`
		// +t(tab+3)	+ 					` $("#${options.descForm}").find('.codigo').find('input').val()`
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) { `
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`data = JSON.parse(data);`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`resolvValCodigo${capitalize(options.descForm)}(data);`
		+t(tab+2)	+ 				`}`
		+t(tab+1)	+ 			`});`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function resolvValCodigo${capitalize(options.descForm)}(data) { ` // função usada para setar valores sem chamar trigger
		+t(tab+1)	+ 			`if (data.length != 0 && data[0].debug == "OK") { `
		+t(tab+2)	+ 				`set${capitalize(options.descForm)}Val(data[0],'codigo');`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`else { `
		+t(tab+2)	+ 				`clear${capitalize(options.descForm)}();`
		// +t(tab+2)	+ 				`var teste = { codigoConsulta: resolvEl("${options.descForm}",'codigo').obj };`
		// +t(tab+2)	+ 				`var teste.codigoConsulta = resolvEl("${options.descForm}",'codigo').obj;`
		// +t(tab+2)	+ 				`serealizeForm(teste);`
		+t(tab+2)	+ 				`if (data.length > 0 && (data[0].debug || '') != '') alert(data[0].debug);`
		+t(tab+2)	+ 				`resolvEl("${options.descForm}",'codigo').el[0].focus();`
		+ ((options.onFalseDebug || '') == '' ? '' : ''
			+t(tab+2)	+ 			 `var func = ${String(options.onFalseDebug)};`
			+t(tab+2)	+ 			 `func(data);`
		)
		+t(tab+1)	+ 			`}`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function set${capitalize(options.descForm)}(data) { ` // função usada para setar valores sem chamar trigger
		+t(tab+1)	+ 			`if (!resolvEl("${options.descForm}",'codigo').el.is(":focus"))`
		+t(tab+2)	+ 				`resolvVal("${options.descForm}",'codigo',data.${(options.codigo || {}).input} || '');`
		+t(tab+1)	+ 			`${capitalize(options.descForm)}Selected_Global = data.${(options.codigo || {}).input} || '';`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.desc').find('input').val(data.${(options.desc || {}).input} || '');`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.id').find('input').val(data.${(options.id || (options.codigo || {}).input)} || '');`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function set${capitalize(options.descForm)}Val(data) { `
		// +t(tab+1)	+ 			`if (!$("#${options.descForm}").find('.codigo').find('input').is(":focus"))`
		// +t(tab+2)	+ 				`$("#${options.descForm}").find('.codigo').find('input').val(data.${(options.codigo || {}).input});`
		+t(tab+1)	+ 			`if (!resolvEl("${options.descForm}",'codigo').el.is(":focus"))`
		+t(tab+2)	+ 				`resolvVal("${options.descForm}",'codigo',data.${(options.codigo || {}).input} || '');`
		+t(tab+1)	+ 			`${capitalize(options.descForm)}Selected_Global = data.${(options.codigo || {}).input} || '';`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.desc').find('input').val(data.${(options.desc || {}).input} || '');`
		+t(tab+1)	+ 			`$("#${options.descForm}").find('.id').find('input').val(data.${(options.id || (options.codigo || {}).input)} || '');`
		+ ((options.trigger || '') == '' ? '' : ''
			+t(tab+1)	+ 		`var func = ${String(options.trigger)};`
			+t(tab+1)	+ 		`func(data);`
		)
		+t(tab+1)	+ 			`console.log('resolvVal: ' + (resolvVal('${options.descForm}','id') != ''));`
		+t(tab+1)	+ 			`if (`
		+t(tab+2)	+ 				`(arguments[1] || '') != 'codigo' && `
		+t(tab+2)	+ 				`resolvVal('${options.descForm}','id') != '' && `
		+t(tab+2)	+ 				`$('#modalConsulta').is(':visible')`
		+t(tab+1)	+ 			`){`
		+t(tab+2)	+ 				`$("#modalConsulta").modal('hide');`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`resolvEvento("trigger","${options.descForm}");`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function onPesquisa${capitalize(options.descForm)}() { `
		+t(tab+1)	+ ((options.onPesquisa || '') == '' 
						? `return true;`
						: `var func = ${String(options.onPesquisa)};`
						+t(tab+1)+ `return func();`
					)
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`var ${capitalize(options.descForm)}List_Global = [];`
		+t(tab)		+ 		`function pesquisa${capitalize(options.descForm)}() { `
		+t(tab+1)	+ 			`if(!onPesquisa${capitalize(options.descForm)}()) return false;`
		+t(tab+1)	+ 			`$("#modalConsulta").find('.conteudo').html('Carregando...');`
		+t(tab+1)	+ 			`if(!$('#modalConsulta').is(':visible')) { `
		+t(tab+2)	+ 				`abrirModalConsulta( { `
		+t(tab+3)	+ 					`search:'${((options.codigo || {}).text || '')}',`
		+t(tab+3)	+ 					`click:function() { pesquisa${capitalize(options.descForm)}(); }`
		+t(tab+2)	+ 				`});`
		+t(tab+2)	+ 				`return false;`
		+t(tab+1)	+ 			`}`
		+(!isOffline ? '' : ''
			+t(tab+1)	+ 		`if (localStorage.offline${capitalize(options.descForm)}) { `
			+t(tab+2)	+ 			`${capitalize(options.descForm)}List_Global = JSON.parse(localStorage.getItem("offline${capitalize(options.descForm)}"));`
			+t(tab+2)	+ 			`montaGradePesquisa${capitalize(options.descForm)}();`
			+t(tab+2)	+ 			`return;`
			+t(tab+1)	+ 		`}`
		)
		// +t(tab+1)	+ 			`${options.ajax}({`
		+t(tab+1)	+ (typeof(options.ajax) == 'string' 
						? options.ajax 
						: `window[(function(){ var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2)	+ 				`param:{` 
		+t(tab+3)	+ 					param
		+t(tab+3)	+ 					`'busca':$("#modalConsulta").find('input').val().toUpperCase()`
		+t(tab+2)	+ 				`},`
		+t(tab+2)	+ 				`done:function(data) { `
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`data = JSON.parse(data);`
		+t(tab+3)	+ 					`console.log(data);`
		+t(tab+3)	+ 					`${capitalize(options.descForm)}List_Global = data[0].debug == 'OK' ? data : [];`
		+(!isOffline ? '' : ''
			+t(tab+3)	+ 				`localStorage.setItem(`
						+ 					`"offline${capitalize(options.descForm)}",`
						+ 					`JSON.stringify(${capitalize(options.descForm)}List_Global)`
						+ 				`);`
		)
		+t(tab+3)	+ 					`montaGradePesquisa${capitalize(options.descForm)}();`
		+t(tab+2)	+ 				`}`
		+t(tab+1)	+ 			`});`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function montaGradePesquisa${capitalize(options.descForm)}() { `
		+t(tab+1)	+ 			`var data = ${capitalize(options.descForm)}List_Global;`
		+t(tab+1)	+ 			`var grade = data[0].debug;`
		+t(tab+1)	+ 			`if (grade == 'OK') { `
		+t(tab+2)	+ 				`${capitalize(options.descForm)}List_Global = data;`
		+t(tab+2)	+ 				`grade = resolvGrade(data, `
					+ jsonToString($.extend({},{ 
						languageJson: '../qualidade/lb/DataTables-1.10.18/Portuguese.json'
						, class: { tbody: { td: 'celB' } }
						, defaultAlignHead: 'center'
						, descForm: `tabela${options.descForm}`
						, trClick: {
							desc: `set${capitalize(options.descForm)}Val(${capitalize(options.descForm)}List_Global[%0%]);`,
							val: [{index:1}]
						}
						, initComplete: function() {
							$("#modalConsulta").find('input')[1].focus();
						}
						// , no_dataTable: true
					},(options.grade || {}) ), tab+2, true)
		+t(tab+2)	+ 				`);`
		+t(tab+1)	+ 			`}`
		+t(tab+1)	+ 			`$("#modalConsulta").find('.conteudo').html(grade);`
		// +t(tab+1)	+ 			`setTimeout( function() { $("#modalConsulta").find('input')[1].focus(); }, 500);`
		+t(tab)		+ 		`}`
		+t(tab)		+ 		`function clear${capitalize(options.descForm)}(setTrigger=false) { `
		+t(tab+1)	+ 			`if (setTrigger) { `
		+t(tab+2)	+ 				`set${capitalize(options.descForm)}Val({});`
		+t(tab+1)	+ 			`} else { `
		+t(tab+2)	+ 				`$("#${options.descForm}").find('input').val('');`
		+t(tab+1)	+ 			`}`
		+t(tab)		+ 		`}`
		+ (accesskey == '' ? '' : ''
			+t(tab)		+ 	`function condigoConsultaClickAccesskey${random}(e) { `
			+t(tab+1)	+ 		`if (e.altKey && e.key == "${accesskey}".toLowerCase()) { `
			+t(tab+2)	+ 			`e.preventDefault();`
			+t(tab+2)	+ 			`try { `
						+ 				(descRef != 'D' ? '' : `$("button[data-customerid='btn${random}']").click();`)
						+ 				(descRef != 'S' ? '' : `$("select[data-customerid='select${random}']")[0].focus();`)
						+ 				(descRef != 'C' ? '' : `$("input[data-customerid='codigo${random}']")[0].select();`)
						+ 			` } catch(e) {}`
			+t(tab+1)	+ 		`}`
			+t(tab)		+ 	`}`
			+t(tab)		+ 	`registerEventKeyboard.push("condigoConsultaClickAccesskey${random}");`
		)
		+ (!isOffline ? '' : ''
			+t(tab)		+ 	`function recarregar${capitalize(options.descForm)}() { `
			+t(tab+1)	+ 		`localStorage.removeItem("offline${capitalize(options.descForm)}");`
			+t(tab+1)	+ 		``
			+t(tab)		+ 	`}`
		)
		+ (((options.codigo || {}).mask || '') == '' ? '' : ''
			+t(tab)	+ `$("#${options.descForm}").find('.codigo').find('input').mask('${options.codigo.mask}');`
		)
		+ (((options.desc || {}).mask || '') == '' ? '' : ''
			+t(tab)	+ `$("#${options.descForm}").find('.desc').find('input').mask('${options.desc.mask}');`
		)
		+ (((options.select || {}).mask || '') == '' ? '' : ''
			+t(tab)	+ `$("#${options.descForm}").find('.select').find('input').mask('${options.select.mask}');`
		)
		+t(tab)		+ 	"</"+"script>"
	return html;
}

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
	var html = ''
		+t(tab)		+ 	"<div"
					+ 		" class='" + (options.class || '') + "'"
					+ 		((options.id || '') == '' ? '' : " id='" + options.id + "'")
					+ 		((options.style || '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					+ 	">"
					+ 		((options.text || "") == '' ? '' : t(tab+1)+options.text)
					+ 		resolvConfig((options.ctx || {}),tab+1)
		+t(tab)		+ 	"</div>"

	return html;
}

function resolvFotos(options, tab=0) { 
	/*
		options: { 
			descForm: ''					-- Parametro de identificação
			desc: ''						-- Descrição padrão da DIV
			ajax: '' / function(){ }		-- Nome da função ajax
			but_delete: (0|1)				-- Se contém ou não botão para apagar imagem
			but_download: (0|1)				-- Se contém ou não botão para baixar imagem
			param: {}						-- Parametro da função ajax
			ck_upload: {					-- Informa se o componete vai fazer ou não upload de fotos
				param: {}					-- Parametros do ajax de upload
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
		- Opção de girar iamgem
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
		+t(tab+0) + 	`function buscarFotos${options.descForm}(id) { `
		+t(tab+1) + 		`$("#divFotos${options.descForm}").html("Carregando...");`
		+t(tab+1) + (typeof(options.ajax) == 'string' 
						? options.ajax 
						: `window[(function(){ var func = ${String(options.ajax)}; return func(); })()]`
					) + `({`
		+t(tab+2) + 			`param: { `
		+t(tab+3) + 				param + `id`
		+t(tab+2) + 			`},`
		+t(tab+2) + 			`done: function(data) { `
		+t(tab+3) + 				`console.log(data);`
		+t(tab+3) + 				`data = JSON.parse(data);`
		+t(tab+3) + 				`console.log(data);`
		+t(tab+3) + 				`if (data.branchs.length != 0 && data.debug == "OK") { `
		+t(tab+4) + 					`imagensObject${options.descForm} = data.branchs;`
		+t(tab+3) + 				`} else { `
		+t(tab+4) + 					`imagensObject${options.descForm} = [];`
		+t(tab+3) + 				`}`
		+t(tab+3) + 				`listarFotos${options.descForm}();`
		+t(tab+2) + 			`}`
		+t(tab+1) + 		`})`
		+t(tab+0) + 	`}`
		+t(tab+0) + 	`function listarFotos${options.descForm}() { `
		+t(tab+1) + 		`var src, exts = 'PNG,JPG,TIFF,JPEG,BMP,PSD,EXIF,RAW,PDF,WEBP,GIF,EPS,SVG'.split(',');`
		+t(tab+1) + 		`var html = ""`
		+t(tab+2) + 			`+ "<div class=\\"col-xs-12\\" id=\\"jornal\\"><!--  style=\\"margin: 0; padding: 0;width: 922px;height: 545px;\\" -->"`
		+t(tab+2) + 			`+ 		"<div class=\\"flipbook-viewport\\" id=\\"viewport\\">"`
		+t(tab+2) + 			`+ 			"<div id=\\"container\\">"` //  class=\\"container\\"
		+t(tab+2) + 			`+ 				"<div class=\\"flipbook\\" id='flipbookDiv' style=\\"/*width: 922px;height: 545px;*/\\"></div>";`
		+t(tab+1) + 		`for (var i = 0; i < imagensObject${options.descForm}.length; i++) { `
		+t(tab+2) + 			`if (`
					+			 	`(imagensObject${options.descForm}[i].isFile || '') != '' && `
					+ 				`exts.indexOf(imagensObject${options.descForm}[i].ext.toUpperCase()) >= 0`
					+ 			`) { `
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
		+t(tab+0) + 	`function openPhotoSwipe${options.descForm}(indice=0) { `
		+t(tab+1) + 		`var pswpElement = document.querySelectorAll('.pswp')[0], items = [];`
		+t(tab+1) + 		`for (var i = indice; i < imagensObject${options.descForm}.length; i++) { `
		+t(tab+2) + 			`if (imagensObject${options.descForm}[i].w == 0) imagensObject${options.descForm}[i].w = tamanahoImagemReal;`
		+t(tab+2) + 			`if (imagensObject${options.descForm}[i].h == 0) imagensObject${options.descForm}[i].h = alturaImagemReal;`
		+t(tab+2) + 			`items.push(imagensObject${options.descForm}[i]);`
		+t(tab+1) + 		`}`
		+t(tab+1) + 		`if (indice != 0) { `
		+t(tab+2) + 			`for (var i = 0; i < indice; i++) { `
		+t(tab+3) + 				`if (imagensObject${options.descForm}[i].w == 0) imagensObject${options.descForm}[i].w = tamanahoImagemReal;`
		+t(tab+3) + 				`if (imagensObject${options.descForm}[i].h == 0) imagensObject${options.descForm}[i].h = alturaImagemReal;`
		+t(tab+3) + 				`items.push(imagensObject${options.descForm}[i]);`
		+t(tab+2) + 			`}`
		+t(tab+1) + 		`}`
		+t(tab+1) + 		`var options = { `
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

/*
	Dependencias 
	
	<link rel="stylesheet" type="text/css" href="../lb/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../lb/bootstrap/css/bootstrap.css" media="print">
	<link rel="stylesheet" type="text/css" href="../lb/bootstrap/css/bootstrap.css" media="screen">
	<link rel="stylesheet" type="text/css" href="../lb/datatables.min.css"/>

	<script type="text/javascript" src="../lb/jQuery.js"></script>
	<script type="text/javascript" src="../lb/jQuery_3-3-1.js"></script>
	<script type="text/javascript" src="../lb/moment.js"></script>
	<script type="text/javascript" src="../lb/datatables.min.js"></script>
*/

/* GER */
function resolvGrade(data, option) { 
	/*
		objParamGrade: {
			tamanhoFont: 		11
			fontFamily: 		"NomeDaFont"
			classTable: 		"table table-bordered stripe table-hover table-condensed table-responsive backTeste"
			titleTableBgColor: 	"#D5DEE3"
			titleTableColor: 	"black"
			titleTableWeight: 	"bold"
			headTableBgColor: 	"#D5DEE3"
			headTableColor: 	"black"
			headTableWeight: 	"bold"
			footTableBgColor: 	"#D5DEE3"
			footTableColor: 	"black"
			footTableWeight: 	"bold"
			stripTableColors: 	[{bgcolor: "white"}]
			hoverTrTableColor: 	"lightblue"
			padination: 		[15,25]
			isMobile_Global: 	false
			no_scrollX: 		true
			languageJson: 		''
			dom: 				''
								+ "<'row'<'col-sm-12 col-md-8 text-left'l><'col-sm-12 col-md-4'f>>"
								+ "<'row'<'col-sm-12'tr>>"
								+ "<'row'<'col-sm-12 col-md-5 text-left'i><'col-sm-12 col-md-7'p>>"
		}

		option = {
			inputs: [
				{
					head: ''																// Descrição no titulo da tabela

					param: '' 																// Parametro a ser mostrado na celula OR
					param: function(data, option, indice) 									// Parametro a ser mostrado por function usará como callback, 
					... 																	// 		o option é referente as opções do input e o indice é dos dados OR
					param: { 																// Parametro mais personalizado para mostrar valores
						op: (CONCAT|SUM), 													// operação a ser realizada pelos valores
						val: [ { attr,literal } ] 											// valores a serem trabalhos para mostrar
					}

					align: 'left' 															// Alinhamento da celula (left | right), default: 'center'
					alignHead: '' 															// Alinhamento do cabeçario (left | right), 
					... 																	// OBS: herarquia de configuração:  this > defaultAlignHead > align > 'center'
					dateFormat: { 															// Indica que o campo é data
						format: 'DD/MM/Y' 													// Define com vai ser impresso o formato da data
						format: function(data, option, indice) 								// Pode usar como callback, similar ao atributo param
						useDataTable: 														// (0|1) default: 1
					}
					format: { 																// Indica que o campo é um número
						casas: 	  0 														// numero de casas decimais
						dec: 	',' 														// separedor decimal
						mili: 	'.' 														// separedor de milhar
					}
					OR format: 'c0|d,|m.' 													// Pode usar format como codigo separando por "|"
					default: '' 															// substitui o undefined
					setDefaultValZero: (0|1) 												// quando for campo numerico (format) e o valor for zero
					... 																	// , vai imprimir o valor padrão 
					foot: { 																// se este for enviado como objeto vazio '{}', será usado o valor de param
						op: 'SUM,MEDIA|expression|personalizado|literal' 					// padrão SUM
						val: { 																// caso omitido será usado o param do próprio input
						... 																// , pode ser enviado um array tambem
							attr: '' 														// nome do atributo a ser usado
							op: 'SUM,MEDIA|expression' 										// operação valor 
						}
						OR val: '' 															// String no caso de ser literal vai replicar o valor extamente que está escrito
						... 																// Caso seja expressão e attr val for omitido, 
						... 																// usa o seguinte padrão [{attr: option.param}]
						algin: '' 															// caso omitido será usado o align do próprio input
						format: { 															// caso omitido será usado o format do próprio input
							casas: 	  0 													// numero de casas decimais
							dec: 	',' 													// separedor decimal
							mili: 	'.' 													// separedor de milhar
						}
						OR format: 'c0|d,|m.' 												// Pode usar format como codigo separando por "|"
						mask: '%0%' 														// mascara do campo
						ignoreNull: (0|1) 													// para media vai ignorar os valores undfined na hora de divir, default: false
					}
					style: {} 																// props de css podendo passar int, string e funcs de callback
					...																		// OBS: os nomes dos attrs deve ser iguais ao do css
					... 																	// Quando callback chama-se func(dt,el=inputs[i],indice)
					... { thead: { td: { style } } }										// É possivel confecionar o estilo do head

					mask: '%0%' 															// substiui o %0% pelo valor correspondentes e coloca o restante do texto
					... 																	// , ex: (R$ %0% || %0% %)

					tooltip: function(data,element){} 										// mandar callback direto com padrão de posição como bottom OR
					tooltip: { 																// parametro para colocar balão demostrativo quando passar o mouse emcima
						pos: 'bottom'														// posição que vai aparecer (top | right | bottom | left)
						html: function(data,element){} 										// callback para resowlver o conteudo do balão
					}
					tdClick: { 																// Click na celula
						desc: 'func(%0%)' 													// nome da função a ser executada
						val: [ { (attr | index | obj) } ] 									// valores de referencia, default: [{obj:true}]
						... 																// caso for obj ira retorna um parametro unico com todos os dados
					}
					OR tdClick: 'funcName' 													// quando string value default: [{desc: 'funcName', val: [{obj:true}]}]
					... 																	// funcName recebe '(%0%)' dinamicamente caso não tenha
					tdHeadClick: { 
						desc: 'func()' 														// Função quando clica no cabecario da grade
					}
					no_render: (0|1) 														// Para indicar se tem que renderizar a coluna ou não
				}
			],
			defaultAlignHead: 'center' 														// align default of header
			ck_edit: (0|1) 																	// Button com função editar + descForm e passando indice no paramtro
			ck_delete: (0|1) 																// Button com função apagar + descForm e passando indice no paramtro
			div: '#id' 																		// Nome do elemento que vai ser para renderizar a grade
			... 																			// Caso não informado considera returnHTML como sendo verdadeiro
			descForm: '' 																	// referica para a função de editar e apagar registros
			languageJson: Inutilizado 														// caminho do objeto JSON para traduzir a grade para PoRtugues ou outro idioma
			objParamGrade: '' 																// objeto de estilização do qualidade
			returnHTML: (0|1) 																// se vai retornar ou não um HTML, 
			... 																			// em caso verdadeiro não precisa definir o parametro div
			order: [[0,"asc"]] 																// opção de inicialização de ordenação
			class: { 																		// Setar classes no geral
				thead: { tr | td }
				tbody: { tr | td }
				tfoot: { tr | td }
			}
			style: { 																		// Setar style no geral
				thead: { tr | td }
				tbody: { tr | td } 															// no td aceita callback passando por parametro dt e el = (inputs[i])
				tfoot: { tr | td }
			}
			trClick: { 																		// onclick na tag tr da grade
				desc: 'func(%0%)' 															// nome da função a ser executada
				val: [ { (attr | index | obj) } ] 											// valores de referencia, default: [{obj:true}]
				... 																		// caso for obj ira retorna um parametro unico com todos os dados
			}
			OR trClick: 'funcName' 															// quando string value default: [{desc: 'funcName', val: [{obj:true}]}]
			... 																			// funcName recebe '(%0%)' dinamicamente caso não tenha
			trClickFoot: { 																	// onclick na tag tr do rodape
				desc: 'funct()' 															// nome da função a ser executada
			}
			search: '' 																		// Campo de busca inicializado com valor
			onOrder: function(e, settings, data){  } 										// Evento disparado quando ordenar
			onSearch: function(e, settings, data){  } 										// Evento disparado quando procura
			onPage: function(e, settings, data){  } 										// Envento disparado quando mudar paginação
			no_scrollX: (0|1) 																// Remover parametro da grade scrollX (bug do cabaçalho desalhiado)
			invertPadination: (0|1) 														// Inverter Paginação da Grade

			no_tableSetWidth: (0|1) 														// Não seta width da tabela com 100%
			no_dataTable: (0|1) 															// Não usa lib dataTable
			initComplete: function(){} 														// Função diparada quando termina de carregar a grade
			initCompleteSearch: (0|1) 														// Caso true e initComplete undefined, inicia grade focando na pesquisa
			setDefaultValZero: (0|1) 														// quando for campo numerico (format) e o valor for zero
			... 																			// , vai imprimir o valor padrão 
			title: ''																		// titulo para exportação de dados
			dom: ''																			// definição de layout da table
				+ "<'row'<'col-sm-12 col-md-8 text-left'l><'col-sm-12 col-md-4'f>>"
				+ "<'row'<'col-sm-12'tr>>"
				+ "<'row'<'col-sm-12 col-md-5 text-left'i><'col-sm-12 col-md-7'p>>"
		}
	*/

	var objParamGrade = $.extend({}, 
		{
			  tamanhoFont: 			11
			, fontFamily: 			"NomeDaFont"
			, classTable: 			"table table-bordered stripe table-hover table-condensed table-responsive backTeste"
			, titleTableBgColor: 	"#D5DEE3"
			, titleTableColor: 		"black"
			, titleTableWeight: 	"bold"
			, headTableBgColor: 	"#D5DEE3"
			, headTableColor: 		"black"
			, headTableWeight: 		"bold"
			, footTableBgColor: 	"#D5DEE3"
			, footTableColor: 		"black"
			, footTableWeight: 		"bold"
			, stripTableColors: 	[{bgcolor: "white"}]
			, hoverTrTableColor: 	"lightblue"
			, padination: 			[15,25]
			, isMobile_Global: 		window['isMobile_Global'] || false
			, no_scrollX: 			true
			// , languageJson: 		''
			, dom: 					''
									+ "<'row'<'col-sm-12 col-md-8 text-left'l><'col-sm-12 col-md-4'f>>"
									+ "<'row'<'col-sm-12'tr>>"
									+ "<'row'<'col-sm-12 col-md-5 text-left'i><'col-sm-12 col-md-7'p>>"
		},
		(window['objParamGrade_Global'] || {}), 
		(option.objParamGrade || {})
	)
	, 	title = option.title || 'Exportar Grade'
	, 	ck_tFoot = false
	, 	ck_tooltip = false
	, 	language = { 
		"sProcessing":   "A processar...",
		"sLengthMenu":   "Mostrar _MENU_ registros",
		"sZeroRecords":  "Não foram encontrados resultados",
		"sInfo":         "Mostrando de _START_ até _END_ de _TOTAL_ registros",
		"sInfoEmpty":    "Mostrando de 0 até 0 de 0 registros",
		"sInfoFiltered": "(filtrado de _MAX_ registros no total)",
		"sInfoPostFix":  "",
		"sSearch":       "Procurar:",
		"sUrl":          "",
		"oPaginate": {
			"sFirst":    "Primeiro",
			"sPrevious": "Anterior",
			"sNext":     "Seguinte",
			"sLast":     "Último"
		}
	};

	if ((option.initComplete || '') == '' && (option.initCompleteSearch || false)) { 
		eval(`option.initComplete = function() { 
			$("#divTable${option.descForm}").find('input')[0].focus();
		}`);
	}

	if (typeof(data) == 'string') { 
		try { 
			data = JSON.parse(data);
		} catch(e) { 
			return false;
		}
	}
	var grade = '<br>' + ((data[0] || {}).debug || 'Nenhum resultado encontrado!');
	if ( (data.length > 0 && (data[0].debug || '') == '') || data[0].debug == "OK" ) { 
		grade = ``
			// + 	`<br>`
			// + 	`<table class='table' id='tabela${option.descForm || ''}' border='1'>`
			+ 	`<table`
			+ 		` id='tabela${(option.descForm || '')}'`
			+ 		` class='${(objParamGrade.classTable || '')}'`
			+ 		((option.no_tableSetWidth || '') != '' ? '' : " width='100%'")
			+ 		` border='1'`
			+ 		` style='font-size:${(objParamGrade.tamanhoFont || '12')}px'`
			+ 	`>`
			+ 		`<thead>`

			+ 	`<tr`
			+ 		` class='${(((option.class || {}).thead || {}).tr || '')}'`
			+ 		` style='` // white-space:nowrap;
			+ 			((objParamGrade.headTableWeight 	|| '') == '' ? '' : "font-weight:"		+ objParamGrade.headTableWeight		+ ";")
			+ 			((objParamGrade.headTableBgColor 	|| '') == '' ? '' : "background-color:"	+ objParamGrade.headTableBgColor	+ ";")
			+ 			((objParamGrade.headTableColor 		|| '') == '' ? '' : "color:"			+ objParamGrade.headTableColor		+ ";")
			+ 			resolvStyleGrade( ((option.style || {}).thead || {}).tr || {} )
			+ 		`'`
			+ 	`>`

			+ option.inputs.map(function(input) { 
				return (input.no_render || '') != '' ? '' : ``
					+ 	`<td`
					+ 		` align='${input.alignHead || option.defaultAlignHead || input.align || 'center'}'`
					// + 		" class='padraoLinhaH'"
					+ 		` class='`
					+ 			(((option.class || {}).thead || {}).td || '')
					+ 			((input.tdHeadClick || '') == '' ? '' : 'cursorClick')
					+ 		`'`
					+ 		` style='${resolvStyleGrade( $.extend((((option.style || {}).thead || {}).td || {}), (((input.style || {}).thead || {}).td || {}) ) )}'`
					+ ((input.tdHeadClick || '') == '' ? '' : ''
						+ 	` onclick='${input.tdHeadClick.desc}'`
					)
					+ 	`>`
					+ 		`<b>${input.head}</b>`
					+ 	`</td>`
			}).join('')
			+ (!(option.ck_edit 	|| false) ? `` : `<td align='center' class='padraoLinhaH'><b></b></td>`)
			+ (!(option.ck_delete 	|| false) ? `` : `<td align='center' class='padraoLinhaH'><b></b></td>`)

			+ 	`</tr>`

			+ 		`</thead>`
			+ 		`<tbody>`

		for (var i = 0; i < data.length; i++) { 
			grade += ``
				+ 		`<tr`
				+ ((option.trClick || '') == '' ? '' : ''
					+ 		` onclick='${resolveClick(data[i], option.trClick, i)}'`
				)
				+ 			` class='`
				+ 				((option.trClick || '') == '' ? '' : 'cursorClick ')
				+				(((option.class || {}).tbody || {}).tr || '')
				+ 			`'`
				+ 			` style='`
				+ 				resolvStyleGrade ( 
									$.extend({}, (((option.style || {}).tbody || {}).tr || {}), (((option.inputs[i] || {}).style || {}).tr || {})) , data[i]
								)
				+ 			`'`
				+ 		`>`

				+ option.inputs.map(function(input) { 
					input  = $.extend({}, { setDefaultValZero: (option.setDefaultValZero || false) }, input);

					if (typeof(input.format) == 'string') 
						input.format = resolvCodigoFormatGrade(input.format);

					var style 			= $.extend( {}, (((option.style || {}).tbody || {}).td || {}), ((input.style || {}).td || {}) )
					, 	valPrint 		= resolveValPrint(input, data[i], i)
					, 	defaultAling 	= 	(input.format 		|| '') != '' ? 'right'
										: 	(input.dateFormat 	|| '') != '' ? 'center'
										: 	'left';

					if ((input.foot || '') != '') ck_tFoot = true;

					return (input.no_render || '') != '' ? '' : ``
						+ 	`<td`
						+ 		` align='${(input.align || defaultAling)}'`
						+ 		` class='`
						+ 			((input.tdClick || '') == '' ? '' : 'cursorClick ')
						+			(((option.class || {}).tbody || {}).td || '')
						+		`'`
						+ ((input.tdClick || '') == '' ? '' : ''
							+ 	` onclick='${resolveClick(data[i], input.tdClick, i)}'`
						)
						+ (Object.keys(style).length == 0 ? '' : ''
							+ 	` style='${resolvStyleGrade( style, data[i], input, i )}'`
						)
						+ 	">"

						+ ((input.tooltip || '') == '' 
							? valPrint  					// não é tooltip
							: (ck_tooltip = true, '') 		// caso for tooltip
							+ 	`<div data-toggle='tooltip' data-html='true'`
							+ (typeof(input.tooltip) == 'function' 
								? ''
								+ 	` data-placement='bottom'`
								// + 	` title='${(input.tooltip(data[i], input) || '').replace(/\"/g, '\\\"')}'`
								+ 	` title='${(input.tooltip(data[i], input) || '')}'`
								: ''
								+ 	` data-placement='${(input.tooltip.pos || 'bottom')}'`
								+ 	` title='${(input.tooltip.html(data[i], input) || '')}'`
							)
							+ 	`>`
							+ 		valPrint
							+ 	`</div>`
						)
						+ 	`</td>`
				}).join('')

				+ (!(option.ck_edit || 0) ? `` : ``
					+ 		`<td align='center'`
					+ 			` class='${(((option.class || {}).tbody || {}).td || '')}'`
					+ 			` style='`
					+ 				resolvStyleGrade( ((option.style || {}).tbody || {}).td || {} )
					+ 			`'`
					+ 		`>`
					+ 			`<a href='#' style='color:orange' onclick='editar${(option.descForm || '')}(${i});'>`
					+ 				`<i class='fa fa-pencil'></i>`
					+ 			`</a>`
					+ 		`</td>`
				)
				+ (!(option.ck_delete || 0) ? `` : ``
					+ 		`<td align='center'`
					+ 			` class='${(((option.class || {}).tbody || {}).td || '')}'`
					+ 			` style='`
					+ 				resolvStyleGrade( ((option.style || {}).tbody || {}).td || {} )
					+ 			`'`
					+ 		`>`
					+ 			`<a href='#' style='color:red' onclick='apagar${(option.descForm || '')}(${i});'>`
					+ 				`<i class='fa fa-times'></i>`
					+ 			`</a>`
					+ 		`</td>`
				)
				+ 		`</tr>`
		}
		grade += ``
			+ 		`</tbody>`


		if (ck_tFoot) { 

			grade += ``
				+ 	`<tfoot>`
				// + 		`<tr bgcolor='${objParamGrade.footTableBgColor}' `
				// + 			`style='font-weight:${objParamGrade.footTableWeight};color:${objParamGrade.footTableColor}'>`
				+ 	`<tr`
				+ 		` class='${(((option.class || {}).tfoot || {}).tr || '') + (((option.trClickFoot || {}).desc || '') == '' ? '' : ' cursorClick')}'`
				+ 		` style='`
				+ 			resolvStyleGrade( ((option.style || {}).tfoot || {}).tr || {} )
				+ 			((objParamGrade.footTableWeight 	|| '') == '' ? '' : "font-weight:"		+ objParamGrade.footTableWeight		+ ";")
				+ 			((objParamGrade.footTableBgColor 	|| '') == '' ? '' : "background-color:"	+ objParamGrade.footTableBgColor	+ ";")
				+ 			((objParamGrade.footTableColor 		|| '') == '' ? '' : "color:"			+ objParamGrade.footTableColor		+ ";")
				+ 		`'`
				+ 		(((option.trClickFoot || {}).desc || '') == '' ? '' : ` onclick="${option.trClickFoot.desc}"`)
				+ 	`>`
				+ option.inputs.map(function(input) { 
					const align = ((input.foot || {}).align || input.align || 
						((input.format || '') != '' ? 'right' : ((input.dateFormat || '') != '' ? 'center' : 'left')))

					if (typeof(input.format) == 'string') 
						input.format = resolvCodigoFormatGrade(input.format);

					var valPrint = '';
					if ((input.foot || '') != '') { 
						if (typeof(input.foot.format) == 'string') 
							input.foot.format = resolvCodigoFormatGrade(input.foot.format);

						if ((input.foot.val || '') == '') { 
							input.foot.val = {};
							input.foot.val.attr = input.param;
						}
						valPrint = resolveFoot(data, input.foot, input);
					}

					return (input.no_render || '') != '' ? '' : ``
						+ 	`<td`
						+ 		` align='${align}'`
						+ 		` class='${(((option.class || {}).tfoot || {}).td || '')}'`
						+ 		` style='${resolvStyleGrade( ((option.style || {}).tfoot || {}).td || {} )}'`
						+ 	`>`
						+ 		valPrint
						+ 	`</td>`;
				}).join('')
				+ 		`</tr>`
				+ 	`</tfoot>`
		}
		grade += ``
			+ 	`</table>`

		grade = '<div style="overflow-x:auto;" id="divTable' + option.descForm + '">' + grade + '</div>'
	} else { 
		grade = `<b>Debug != OK</b>`;
	}

	if ((option.no_dataTable || '') != '') { 
		if ((option.div || '') != '') { 
			$((option.div || '')).html(grade);
			return true;
		} else if ([false,0].indexOf(option.returnHTML) < 0) { 
			return grade;
		}
	};

	var cont = 0;
	option.inputs.forEach(function(input, i) { 
		option.inputs[i].indice = cont;
		if ((input.no_render || '') == '') cont++;
	});

	var padination = (objParamGrade.padination || [])
		.filter(function(v) { return v <= data.length; })
		.filter(function(v,i,a) { return a.indexOf(v) === i; });
	if ((option.invertPadination || '') != '') padination = invertPadination((objParamGrade.padination || []), data.length);
	if (padination.indexOf(data.length) < 0) padination.push(data.length);

	var stripeClasses = (objParamGrade.stripTableColors || []).map(function(dt,i) { return 'stripe'+i; });

	var mynumeric = option.inputs
		.filter(function(input) { return (input.no_render || '') == '' && (input.format || '') != '' && (input.tooltip || '') == '' })
		.map(function(el) { return el.indice });

	var mynumericTooltip = option.inputs
		.filter(function(input) { return (input.no_render || '') == '' && (input.tooltip || '') != ''; })
		.map(function(el) { return el.indice; });

	// Setinhas da grade
	if ((option.trClick || '') != '') { 
		window['tableEventKeyboard' + option.descForm] = function(e, whichkey) { 
			if ($("#divTable" + option.descForm).find('input').is(":focus") 
				|| $("#divTable" + option.descForm).find('.pagination').find('a').is(':focus')
			) { 
				if (whichkey == 38 || whichkey == 40 || whichkey == 13) { 
					e.preventDefault();
					var elTable = $("#divTable" + option.descForm);
					var pagination = $(elTable).find('.pagination')[0];
					var indice = -1
					var trs = $(elTable).find('tr.cursorClick');
					for (var i = 0; i < trs.length; i++) { 
						if ($(trs[i]).find('td').attr('class').indexOf('active') >= 0) indice = i;
					}

					if (whichkey == 38) { // UP
						indice = indice-1;
						if (indice < 0) { 
							if ($(pagination).find('.previous').attr('class').indexOf('disabled') < 0) { 
								$(pagination).find(".previous").click();
								indice = $(elTable).find('tr.cursorClick').length-1;
							} else { 
								indice = 0;
							}
						}
					}
					else if (whichkey == 40) { // DOWN
						indice = indice+1;
						if (indice >= $(elTable).find('tr.cursorClick').length) { 
							if ($(pagination).find('.next').attr('class').indexOf('disabled') < 0) { 
								$(pagination).find(".next").click();
								indice = 0;
							} else { 
								indice = $(elTable).find('tr.cursorClick').length-1;
							}
						}
					}

					trs = $(elTable).find('tr.cursorClick');
					for (var i = 0; i < trs.length; i++) { 
						$(trs[i]).find('td').attr('class', $(trs[i]).find('td').attr('class').replace('active',''));
					}

					var tds = $($(elTable).find('tr.cursorClick')[indice]).find('td');
					for (var i = 0; i < tds.length; i++) { 
						$(tds[i]).attr('class', $(tds[i]).attr('class') + ' active');
					}

					if (whichkey == 13) $(elTable).find('tr.cursorClick')[indice].click();
				}
			}
		}
		eval(`window['tableEventKeyboard' + option.descForm] = ${
			String(window['tableEventKeyboard' + option.descForm]).replace(/option\.descForm/g, `"${option.descForm}"`)
		};`);
		registerEventKeyboard.push('tableEventKeyboard' + option.descForm);
	}
	// End: Setinhas da grade

	if ((option.returnHTML || false) || (option.div || '') == '') { 
		return grade
			+ 	`<script>`
			+ 		(ck_tooltip ? `$('[data-toggle="tooltip"]').tooltip();` : '')
			+ 		`$("#tabela${(option.descForm || '')}").DataTable({`
			// + 			`  'language' 		: {'url': '${(option.languageJson || objParamGrade.languageJson || '../lb/DataTables-1.10.18/Portuguese.json')}'}`
			+ 			`  'language' 		: ${JSON.stringify(language)}`
			+ 			`, 'lengthMenu' 	: ${JSON.stringify(padination)}`
			+ 			`, 'autoWidth' 		: false`
			+ 			`, 'order' 			: ${JSON.stringify(option.order || [[0,"asc"]])}`
			+ 			`, 'stripeClasses' 	: ${JSON.stringify(stripeClasses)}`
			+ 			`, 'columnDefs'		: [`
			+ 					`  {"sType":"mynumeric","aTargets":${JSON.stringify(mynumeric)}}`
			+ 					`, {"sType":"mynumericTooltip","aTargets":${JSON.stringify(mynumericTooltip)}}`
			+ 			`]`
			+ (ck_tooltip || (option.no_scrollX || '') != '' || (objParamGrade.no_scrollX || '') != '' ? '' : ''
				+ 		`, 'scrollX': '${((option.scrollX || objParamGrade.isMobile_Global ? "100%" : "false"))}'`
			)
			+ 			`, 'search': {`
			+ 				`'search': '${(option.search || '')}'`
			+ 			`}`
			// + ((objParamGrade.dom 		|| '') == '' ? '' : `, dom:"${objParamGrade.dom}"` 	)
			+ 	`, dom:	\`${(option.dom || objParamGrade.dom || ''
						+ "<'row'<'col-sm-12 col-md-8 text-left'l><'col-sm-12 col-md-4'f>>"
						+ "<'row'<'col-sm-12'tr>>"
						+ "<'row'<'col-sm-12 col-md-5 text-left'i><'col-sm-12 col-md-7'p>>"
				)
			}\``
			// + ((objParamGrade.buttons 	|| '') == '' ? '' : `, buttons:${JSON.stringify(objParamGrade.buttons)}` )
			+ 			`, 'buttons': [`
			// + 				`{ extend: 'copy'	, text: '<i class="fa fa-copy"></i> Copiar'			, title: "${title}" , exportOptions: { stripHtml: false } },`
			// + 				`{ extend: 'csv'	, text: '<i class="fa fa-file-o"></i> CSV'			, title: "${title}" , exportOptions: { stripHtml: false } },`
			// + 				`{ extend: 'excel'	, text: '<i class="fa fa-file-excel-o"></i> Excel'	, title: "${title}" , exportOptions: { stripHtml: false } },`
			// + 				`{ extend: 'pdf'	, text: '<i class="fa fa-file-pdf-o"></i> PDF'		, title: "${title}" , exportOptions: { stripHtml: false } },`
			+ 				`{ extend: 'print'	, text: '<i class="fa fa-print"></i> Print'			, title: "${title}" , exportOptions: { stripHtml: false }, autoPrint: true },`
			+ 			`]`
			+ (typeof(option.initComplete) != 'function' ? '' : ''
				+ 		`, initComplete: ${String(option.initComplete)}`
			)
			+		`});`
			+ 	"</"+"script>"
	} else { 
		$((option.div || '')).html(grade);

		if (ck_tooltip) $('[data-toggle="tooltip"]').tooltip();

		$("#tabela" + (option.descForm || ''))
			.on('order.dt', 	function (e, settings, data) { if ((option.onOrder 	|| '') != '')  option.onOrder	(e, settings, data); })
			.on('search.dt', 	function (e, settings, data) { if ((option.onSearch || '') != '')  option.onSearch	(e, settings, data); })
			.on('page.dt', 		function (e, settings, data) { if ((option.onPage 	|| '') != '')  option.onPage	(e, settings, data); })
			.DataTable({
			//   "language": 		{ "url": (option.languageJson || objParamGrade.languageJson || "../lb/DataTables-1.10.18/Portuguese.json") }
			//   "language": 		{ "url": "../lb/DataTables-1.10.18/Portuguese.json" }
			language
			, "lengthMenu": 	padination
			, "order":			(option.order || [[0,"asc"]]) // order = VLR_DEVOLUCAO_MES : desc
			, 'autoWidth': 		false
			, 'stripeClasses':  stripeClasses
			, 'columnDefs': [ 
				{ "sType":"mynumeric","aTargets":mynumeric }
				, { "sType":"mynumericTooltip","aTargets":mynumericTooltip }
			]
			, 'scrollX': (ck_tooltip  || (option.no_scrollX || '') != '' || (objParamGrade.no_scrollX || '') != '' ? '' : ''
				+ "'" + (option.scrollX || objParamGrade.isMobile_Global ? "100%" : false) + "'"
			)
			, 'search': { 
				'search': (option.search || '')
			}
			, 'initComplete': option.initComplete
			// , "scrollX": true
			// , "scrollX": '100%'
			// , "scrollY": 350
			// , "paging": false
			// , "dom": 'Bfrtip'
			// , "dom": 'Blfrtip'
			// , "dom": '<lf<t>ip>'
			// , "dom": '<"wrapper"flipt>'
			// , "dom": '<"top"i>rt<"bottom"flp><"clear">'
			// , "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>>"
			// , "dom": '<Blf<t>ip>'
			// , "dom": 'Blfrtip'
			, "dom": (option.dom || objParamGrade.dom || '' 
					+ "<'row'<'col-sm-12 col-md-8 text-left'l><'col-sm-12 col-md-4'f>>" 
					+ "<'row'<'col-sm-12'tr>>" 
					+ "<'row'<'col-sm-12 col-md-5 text-left'i><'col-sm-12 col-md-7'p>>"
			)
			, 'buttons': [
				// { extend: 'copy'	, text: '<i class="fa fa-copy"></i> Copiar'			, title , exportOptions: { stripHtml: false }, autoPrint: false  },
				// { extend: 'csv'		, text: '<i class="fa fa-file-o"></i> CSV'			, title , exportOptions: { stripHtml: false }, autoPrint: false  },
				// { extend: 'excel'	, text: '<i class="fa fa-file-excel-o"></i> Excel'	, title , exportOptions: { stripHtml: false }, autoPrint: false  },
				// { extend: 'pdf'		, text: '<i class="fa fa-file-pdf-o"></i> PDF'		, title , exportOptions: { stripHtml: true }, autoPrint: false  },
				{ extend: 'print' 	, text: '<i class="fa fa-print"></i> Print' 		, title , exportOptions: { stripHtml: false }, autoPrint: true },
			]
		});
		return true;
	}
}

function resolvCodigoFormatGrade(format) { 
	var formatTemp = format.split('|'), keys, vlr;
	format = {};

	formatTemp = formatTemp.map(function(cod) { 
		vlr = cod.substring(1, cod.length);
		switch(cod.substring(0,1)) { 
			case 'c': return { casas: 	parseInt(vlr) };
			case 'd': return { dec: 	vlr };
			case 'm': return { mili: 	vlr };
			default:  return { }
		}
	});

	formatTemp.forEach(function(param) { 
		keys = Object.keys(param);
		if (keys.length) 
			keys.forEach(function(key) { format[key] = param[key]; });
	});
	return format;
}

function resolvStyleGrade(obj,dt={},el={},indice=-1) { 
	var html = '', keys = Object.keys(obj), func, htmlTemp;

	for (var i = 0; i < keys.length; i++) { 
		if (typeof(obj[keys[i]]) == 'function') { 
			func = obj[keys[i]];
			htmlTemp = func(dt,el,indice);
		}
		html += keys[i] + ':' + (typeof(obj[keys[i]]) == 'string' ? obj[keys[i]] : htmlTemp) + ';';
	}
	return html;
}

function resolveValPrint(option, data, indice) { 
	var mask = (data[option.param] == undefined) ? '%0%' : (option.mask || '%0%');

	var valData = '';
	if (typeof(option.param) == 'function') { 
		valData = option.param(data, option, indice)
	}
	else if (typeof(option.param) == 'object') { 
		if (['sum'].indexOf(option.param.op) < 0) valData = 0;

		if ((option.param.op || 'CONCAT').toUpperCase() == 'CONCAT') { 
			valData = option.param.val.map(function(val) { return val.literal || data[val.attr]; }).join('');
		}
		if (option.param.op.toUpperCase() == 'SUM') { 
			valData = option.param.val
				.map(function(val) { return parseFloat(val.literal || data[val.attr] || 0) })
				.reduce(function(t,v) { return t + v; }, 0);
		}
	}
	else { 
		valData = (data[option.param] || '');
	}

	var val = '';
	if ((option.format || '') != '') { 
		var { casas, dec, mili } = option.format;

		if (
			(typeof(option.param) == 'function' && valData == '') || 
			(typeof(option.param) != 'function' && data[option.param] == undefined)
		) { 
			valData = option.default || '';
		} else { 
			valData = (valData || 0);
			if (valData == 0 && (option.setDefaultValZero || false)) { 
				val = option.default || '';
			} else { 
				val = number_format(valData, (casas || 0), (dec || ','), (mili || '.'));
			}
		}
	}
	else if ((option.dateFormat || '') != '') { 
		option.dateFormat.format = ((option.dateFormat || {}).format || 'DD/MM/Y')
		var valHide = "<spam style='display:none;'>%0%</spam>";
		try { valHide = valHide.replace('%0%', moment(valData).format('Y-MM-DD')); } catch(e) { }

		if (valData == '') {
			valData = option.default || '';
		} else {
			valData = moment(valData).format(
				eval(`option.dateFormat.format${ typeof(option.dateFormat.format) == 'string' ? '' : '(data, option, indice)' }`)
			)
		}
		val = valHide + valData;
	}
	else { 
		val = valData || option.default || '';
	}

	return mask.replace(/%0%/g, val);
}

function resolveClick(data, objClick, indice) { 
	if (typeof objClick == 'string') {
		if (objClick.indexOf('%0%') < 0) objClick += '(%0%)';
		objClick = { desc: objClick, val: [{ obj: true }] };
	}

	var html = objClick.desc, value;
	if ((objClick.val || '') == '') objClick.val = [{ obj: true }];
	if (Object.keys(objClick.val)[0] != '0') objClick.val = [objClick.val];

	(objClick.val || []).forEach(function(val, i) { 
			 if ((val.obj 	|| '') != '') 	value = JSON.stringify(data).replace(/\'/g,"");
		else if ((val.index || '') != '') 	value = indice;
		else 								value = data[val.attr];

		html = html.replace(new RegExp('%'+i+'%', 'gi'), value);
	});
	return html;
}

function resolveParam(data, format, options) { 
	var param = '', val = '', valIf = '', cont = 0, 
		setIf, setIfFunc, isTrueValid, isTrue, exclamacao, notSet;

	for (var i = 0; i < data.length; i++) { 
		val = format;
		setIf = true;
		setIfFunc = true;

		for (var j = 0; j < (options.if || []).length; j++) { 
			// [ notSet ]
			if ((options.if[j].notSet || '') != '') { 
				notSet = options.if[j].notSet;
				exclamacao = notSet[0] == '!' ? (notSet = notSet.substring(1,notSet.length), true) : false;
				setIf = (data[i][notSet] || false) ? exclamacao : (exclamacao ? false : setIf);
			}

			// [ first ]
			if ((options.if[j].first || '') != '') { 
				valIf = options.if[j].first.split('?');
				valIf = cont == 0 ? valIf[0] : valIf[1];
			}

			// [ isTrue ]
			if ((options.if[j].isTrue || '') != '') { 

				isTrueValid = options.if[j].isTrue[0] == '!';
				if (isTrueValid) options.if[j].isTrue = options.if[j].isTrue.substring(1,options.if[j].isTrue.length);
				isTrue = (data[i][options.if[j].isTrue] || false);
				if (isTrueValid) isTrue = !isTrue;

				if ((options.if[j].setFunc || '') != '') { 
					setIfFunc = false;
					if (isTrue) { 
						val = resolveParamSetFunc(val, options.if[j], j);
						// val.replace(new RegExp('#'+j+'#', 'gi'), valIf);
					} else { 
						val = val.replace(new RegExp('#'+j, 'gi'), '');
						val = val.replace(new RegExp(j+'#', 'gi'), '');
					}
				} else { 
					valIf = options.if[j].set.split('?');
					valIf =  isTrue ? valIf[0] : valIf[1];
				}
				if (isTrueValid) options.if[j].isTrue = '!' + options.if[j].isTrue;
			}

			if (setIfFunc) val = val.replace(new RegExp('#'+j+'#', 'gi'), valIf);
			setIfFunc = true;
			valIf = '';
		}

		for (var j = 0; j < (options.val || []).length; j++) { 
			if ((options.val[j].default || '') != '') { 
				val = val.replace(new RegExp('%'+j+'%', 'gi'), resolveParamDefault(data[i], options.val[j]) );
			} else { 
				val = val.replace(new RegExp('%'+j+'%', 'gi'), data[i][options.val[j].attr] );
			}
		}
		val = setIf ? (cont++, val) : '';
		param += val;
	}
	return param;
}

// resolveParamSetFunc("#0param0#", {setFunc: 'teste'}, 0) 
// resolveParamSetFunc("#0param0#", {setFunc: 'teste(123)'}, 0)
// resolveParamSetFunc("#0param0#", {setFunc: 'teste);'}, 0)
// resolveParamSetFunc("#0param0#", {setFunc: 'teste(123...456) ? "continua" : "ou não";'}, 0)
function resolveParamSetFunc(val, options, indice) { 
	// setFunc =  "func'('pre_param'...'pos_param')'pos_func"

	var pre_param = '', pos_param = '', 
		setFunc = options.setFunc, 
		isParamPre = false, isEtc = false, isParamPos = false;

	if (setFunc.indexOf('...') != -1) { 
		pre_param = setFunc.split('...')[0];
		setFunc = setFunc.split('...');
		setFunc.splice(0,1);
		pos_param = setFunc.join('');
		setFunc = '';
		isEtc = true;
	}
	else if (setFunc.indexOf('(') != -1) { 
		pre_param = setFunc.split('(')[0];
		setFunc = setFunc.split('(');
		setFunc.splice(0,1);
		setFunc = setFunc.join('');
		isParamPre = true;
	}
	
	if (!isEtc && setFunc.indexOf(')') != -1) { 
		if (isParamPre) pre_param += "(" + setFunc.split(')')[0];
		else 			pre_param += setFunc.split(')')[0] + "(";
		pos_param = setFunc.split(')')[1];
		isParamPos = true;
		// setFunc = setFunc.split(')');
		// setFunc.splice(0,1);
	}

	if (!isEtc && !isParamPre && !isParamPos) { 
		pre_param = setFunc + "(";
		pos_param = ")";
	}

	if (pre_param.indexOf('(') == -1) pre_param += '(';
	if (pos_param.indexOf(')') == -1) pos_param = ')' + pos_param;

	if (pre_param[pre_param.length-1] != '(' && pre_param[pre_param.length-1] != ',') pre_param += ",";
	if (pos_param[0] != ')' && pos_param[0] != ',') pos_param = ","+ pos_param;

	val = val.replace(new RegExp('#'+indice, 'gi'), pre_param);
	val = val.replace(new RegExp(indice+'#', 'gi'), pos_param);

	return val;
}

function resolveParamDefault(data, options) { 
	var val = '';

	if ((options.default || '') != '') { 
		switch (typeof(options.default)) { 
			case 'string': 
				val = (data[options.attr] || options.default);
				break;
			case 'object': 
				val = (data[options.attr] || resolveParamDefault(data, options.default));
				break;
		}
	} else { 
		val = data[options.attr]
	}
	return val;
}

function invertPadination(defaultPag, length) { 
	var pag = [length];
	for (var i = defaultPag.length-1; i >= 0; i--) { 
		if (length <= defaultPag[i]) return (pag.push(length), pag);
		else pag.push(defaultPag[i]);
	}
	return pag;
}

/**************************************************************************************************************
 * Function Op
 * ************************************************************************************************************/
var tofloat = function(n) { 
	return parseFloat(n.replace(/\./g, '').replace(',', '.'));
};

function removeHtml(a) { 
	a = a.split('">');
	a = a[a.length-1];
	a = a.split('</')[0];
	return a;
}

$(document).ready(function() { 
	try { 
		$.fn.dataTableExt.oSort['mynumeric-asc']  = function(a, b) { 
			a = tofloat(((a || '') == '' ? String(0) : a));
			b = tofloat(((b || '') == '' ? String(0) : b));
			return ((a < b) ? -1 : ((a > b) ?  1 : 0));
		};
		$.fn.dataTableExt.oSort['mynumeric-desc'] = function(a, b) { 
			a = tofloat(((a || '') == '' ? String(0) : a));
			b = tofloat(((b || '') == '' ? String(0) : b));
			return ((a < b) ? 1 : ((a > b) ?  -1 : 0));
		};
		$.fn.dataTableExt.oSort['mynumericTooltip-asc']  = function(a, b) { 
			a = (a == '' ? String(0) : removeHtml(a));
			b = (b == '' ? String(0) : removeHtml(b));

			if (a != '') a = tofloat(a);
			if (b != '') b = tofloat(b);

			return ((a < b) ? -1 : ((a > b) ?  1 : 0));
		};
		$.fn.dataTableExt.oSort['mynumericTooltip-desc'] = function(a, b) { 
			a = (a == '' ? String(0) : removeHtml(a));
			b = (b == '' ? String(0) : removeHtml(b));

			if (a != '') a = tofloat(a);
			if (b != '') b = tofloat(b);

			return ((a < b) ? 1 : ((a > b) ?  -1 : 0));
		};
	} catch(e) {}
});
/**************************************************************************************************************
 * End: Function Op
 * ************************************************************************************************************/

/**************************************************************************************************************
 * Resolve Foot
 * ************************************************************************************************************/
function resolveFoot(data,option,defaultOption={}) { 
	/*
		option: 
		{
			op: 'SUM|MEDIA|expression|personalizado|literal' 	// expression = (ex: "%0% + n") | default: SUM

			val: { attr: 'PARAM', op: 'SUM|MEDIA' }				// OR
			val: [
				{
					attr: 'PARAM',								// attr a ser usado
					op: 'SUM|MEDIA' 							// em caso de expression pode resolver os valor de forma personalizada, default: SUM
				}
			]

			ignoreNull: (0|1) 									// para media vai ignorar os valores undfined na hora de divir, default: false
			mask: '%0%' 										// substiui o %0% pelo valor correspondentes e coloca o restante do texto, ex: (R$ %0% || %0% %)
		}
	*/
	var valPrint = '';

	if (['pesonalizado','personalizado'].indexOf(option.op || '') >= 0) 
		valPrint = resolveFootPersonalizado(data, option, defaultOption);
	else if ((option.op || '') == 'literal') 
		valPrint = (typeof(option.val) == 'string' ? option.val : '');
	else 
		valPrint = resolveFormatVal( resolveFootAction(data, option), option, defaultOption );

	return valPrint;
}

function resolveFormatVal(val, option, defaultOption={}) { 
	// var 	mask = (option.mask || (defaultOption.mask || '%0%'))
	var 	mask = (option.mask || '%0%')

	return formatMask( 
		number_format( val
			, ((option.format || {}).casas 	|| (defaultOption.format || {}).casas 	||  0 )
			, ((option.format || {}).dec 	|| (defaultOption.format || {}).dec 	|| ',')
			, ((option.format || {}).mili 	|| (defaultOption.format || {}).mili 	|| '.')
		), mask
	)
}

function resolveFootAction(data, option, defaultOption={}) { 
	var val = [], newOption;

	if (['SUM',''].indexOf((option.op || '').toUpperCase()) != -1) 	return resolveSumNull(data, option);
	if (option.op.toUpperCase() == 'MEDIA') 						return resolveFootMedia(data, option);

	if ((option.val || '') == '') option.val = [{ attr: defaultOption.param }];
	if ((option.val.attr || '') != '') option.val = [option.val];

	for (var i = 0; i < option.val.length; i++) { 
		newOption = $.extend({}, option, { val: { attr: option.val[i].attr }, op: (option.val[i].op || '') })
		val.push( resolveFootAction(data, newOption, defaultOption) );
	}
	return resolveExpression(val, option.op);
}

function resolveFootPersonalizado(data, option, defaultOption={}) { 
	/*
		Quando a op do obj foot for igual a personalizado
		option: {
			mask: '%0%',
			val: [
				{ option foot convencional }
			]
		}
	*/
	var val = (option.mask || '%0%');

	for (var i = 0; i < option.val.length; i++) 
		val = val.replace(
			new RegExp('%'+i+'%', 'gi'),
			resolveFoot( data, option.val[i], defaultOption )
		);

	return val;
}

function formatMask(val, mask) { 
	return mask.replace(/%0%/g, val);
}

function resolveExpression(vals, ex) { 
	vals.forEach(function(val, i) { 
		ex = ex.replace( new RegExp('%'+String(i)+'%', 'gi'), String(val) );
	});
	return eval(ex);
}

function resolveSumNull(data, option, type='val') { 
	var val = 0, nulls = 0, attrs = resolvAttrArray(option);
	data.forEach(function(dt) { 
		attrs.forEach(function(attr) { 
			val += parseFloat((dt[attr] || 0));
			if (dt[attr] != 0 && (dt[attr] || '') == '') nulls++;
		});
	});
	return type == 'val' ? val : { val, nulls };
}

function resolveFootMedia(data, option) { 
	var objSum = resolveSumNull(data, option, 'obj')
	, 	numRows = data.length
	, 	val = objSum.val
	, 	nulls = objSum.nulls;

	if ((option.ignoreNull || false)) numRows -= nulls;
	return numRows == 0 ? 0 : val / numRows;
}

function resolvAttrArray(option) { 
	var attr = [];
	if ((option.val.attr || '') != '') 				attr.push(option.val.attr);
	else {
		for (var i = 0; i < option.val.length; i++) attr.push(option.val[i].attr);
	}
	return attr;
}
/* 
Testes: 

// output: 17.5 § 2.875
resolveFoot([{v1:1,v2:6},{v1:2,v2:7},{v1:3,v2:8},{v1:4,v2:9},{v1:5,v2:10}],
	{ op: '100 / %1% + %0%', val: [{attr:'v1'},{attr:'v2'}] }
	// op: '%0% + 100 / %1%',
)

// output: 37.5
resolveFoot([{v1:1,v2:6},{v1:2,v2:7},{v1:3,v2:8},{v1:4,v2:9},{v1:5,v2:10}],
	{ op: '%0% * 100 / %1%', val: [ { attr: 'v1' } , { attr: 'v2' } ] }
)

// output: 15
resolveFoot([{v1:1,v2:6},{v1:2,v2:7},{v1:3,v2:8},{v1:4,v2:9},{v1:5,v2:10}],
	{ val: { attr: 'v1' } }
)

// output: 3
resolveFoot([{v:1},{v:2},{v:3},{v:4},{v:5}],{ op: 'MEDIA', val: { attr: 'v' } })

// output: 15
resolveFoot([{v:1},{v:2},{v:3},{v:4},{v:5}],{ op: 'SUM', val: { attr: 'v' } })
*/
/**************************************************************************************************************
 * Resolve Foot
 * ************************************************************************************************************/

function resolvH1(options){ return resolvH($.extend({}, options, { num: 1 }),(arguments[1] || 0)); }
function resolvH2(options){ return resolvH($.extend({}, options, { num: 2 }),(arguments[1] || 0)); }
function resolvH3(options){ return resolvH($.extend({}, options, { num: 3 }),(arguments[1] || 0)); }
function resolvH4(options){ return resolvH($.extend({}, options, { num: 4 }),(arguments[1] || 0)); }
function resolvH5(options){ return resolvH($.extend({}, options, { num: 5 }),(arguments[1] || 0)); }
function resolvH6(options){ return resolvH($.extend({}, options, { num: 6 }),(arguments[1] || 0)); }
function resolvH(options, tab=0) { 
	/*
		options: {
			text: '' 		-- Descricao da Tag HN
			num: 1 			-- Num da tag (default = 1)
			style: obj 		-- Objeto CSS
		}
	*/
	var html = ''
		+t(tab)		+ 	"<h" + (options.num || 1) 
					+ 		((options.style || '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					+ 	">"
		+t(tab+1)	+ 		(options.text || '')
		+t(tab)		+ 	"</h" + (options.num || 1) + ">";

	return html;
}

function resolvTextarea(options,tab=0) { 
	options.isTextarea = true;
	options.no_tab = true;
	options.style = $.extend({}, { 'resize': 'vertical' },  options.style);
	return resolvInput(options,tab);
}

function resolvInput(options,tab=0) { 
	/*
		options: {
			text: '' 							-- Texto de acompanhamento
			id: '' 								-- Id do campo
			name: '' 							-- Name do campo
			class: '' 							-- Classe do campo
			value: '' 							-- Value do campo
			val: '' 							-- Value do campo
			title: '' 							-- Title do campo
			type: '' 							-- Type do campo
			list: '' 							-- List do campo para datalist, se não tiver definido datalista param
			.. 									-- Caso type 'number' ou 'tel' alinha o texto a direta
			placeholder: '' 					-- Placeholder do campo
			autocomplete: '' 					-- Autocomplete do campo
			autofocus: (0|1) 					-- Autofocus do campo
			accesskey: '' 						-- Accesskey do campo, atalho para focar no campo ou clicar no botão
			data: { 							-- Acresenta o atributos data no campo (data-key='value')
				key: value
			}

			isTextarea: (0|1)					-- Se o campo é textarea
			cols: num 							-- Col para quando o campo for textarea
			rows: num 							-- Row para quando o campo for textarea

			disabled: (0|1) 					-- Se o campo começa disabled
			checked: (0|1) 						-- Se o campo começa checked
			style: {} 							-- Objeto com atributos cujo os nomes são os atributos do CSS
			styleLabel: {} 						-- Objeto com atributos cujo os nomes são os atributos do CSS para Label
			required: '' 						-- Se o campo é obrigatório
			maxlength: '' 						-- Limite maximo de caracteres

			onchange: function 					-- Metodo chamado ao mudar valor

			numKeyVerifAlt: text.length 		-- Verificar até tantos caracteres percorrer para achar um math com accesskey
			classDiv: '' 						-- Deixa o input por volta de um div
			onEnter: function(e,whichkey) 		-- Função disparada quando o campo está focado e aperta o ENTER
			... 								-- e = evento do click | whichkey = codigo da tecla
			no_changeLayout: (0|1) 				-- Se vai mudar o layout para tabela contendo o campo e a descricao na frente
			radio: [ {} ] 						-- Array de objetos input, com caracteristicas herdadas do obj pai
			inline: (0|1) / num 				-- Para radio, campos alinhados lado a lado, se false fica embaixo do outro
			... 								-- Quando > 1 significa o numero de campos que vai mostrar por linhas
			no_desc: (0|1) 						-- Sem Label
			datalist: { 						-- Colocar um autocomplete no campo
				ajax: '' 						-- Se a listar vai vir dinamicamente do servidor
				param: { key: value } 			-- Parametros da requisição
				input: '' 						-- Campo usado para identificar value dos options
			}
			fileType: ('img') 					-- Caso o input for do tipo file, pode delimitar o tipo de arquivo
			... 								-- No caso 'img' só vai permitir tipo imagem e ter um preview
			upload: { 							-- Caso tipo campo seja file, são as configurações de upload
				ajax: '' 						-- Função ajax que vai enviar o arquivo
				path: (function|'') 			-- Caminho para salvar o arquivo
				... 		 					-- Função caso precisa pegar algum valor dinamico
				fileName: '' 					-- Nome do arquivo a ser salvo (padrao é vir o nome original)
				onsend: function 				-- Validar se pode ou não enviar aquivo
			}
			defaultImg: 'path' 					-- Caso input type file/img colocar uma foto padrão de preview
			enum: { 							-- Indica que o campo será um select com opções pré-definidas
				value: desc 					-- Ex: <option value="value">desc</option>
			}
			mask: '' 							-- Usar Mascara no campo
			maskOption: {} 						-- Opções para usar com a mescara
			no_tab: (0|1) 						-- Quando digitar TAB, anula evento padrao, coloca valor correspodente
			... 								-- Padrao true quando for textarea
		}
	*/

	var html = '';

	if ((options.type || 'radio') == 'radio' && (options.radio || '') != '') { 
		options.type = 'radio';
		var isCheck = options.radio.map(function(e) { return e.checked; }).indexOf(true);
		if (isCheck < 0) isCheck = 0;

		for (var i = 0; i < options.radio.length; i++) { 
			if (options.radio[i].checked) { 
				options.value = options.radio[i].value || '';
			}
		}

		var cols = (options.inline || '') != '' && !isNaN(options.inline) && options.inline > 1 ? options.inline : false;

		if (cols) html += t(tab) + '<table>';

		for (var i = 0; i < options.radio.length; i++) { 
			if (cols) { 
				if (i == 0 || (i != 0 && i % cols == 0)) html += t(tab+1) + '<tr>';
				html += t(tab+2) + '<td>';
			}

			html += resolvInputIn(
				$.extend( {}, options, { checked: (isCheck == i ? true : '') }, options.radio[i] )
				, tab + (cols ? 3 : 0)
			);

			if (cols) { 
				html += t(tab+2) + '</td>'; 
				if (i == options.radio.length-1 || ((i+1) % cols == 0)) html += t(tab+1) + '</tr>'; 
			}
		}

		if (cols) html += t(tab) + '</table>';
	} else { 
		html = resolvInputIn(options, tab);
	}

	return html
}

function resolvInputIn(options,tab=0) { 
	if ((options.value || ``) == `` && (options.val || ``) != ``) options.value = options.val;
	if ((options.onclick || ``) == `` && (options.click || ``) != ``) options.onclick = options.click;
	if ((options.numKeyVerifAlt || ``) == ``) options.numKeyVerifAlt = (options.text || ``).length;

	options.ck_blur = (options.ck_blur || ``) == `` ? true : options.ck_blur;

	// se tem que validar o requerimento completo, com mensagem embaixo do campo
	// options.requiredFull = ((options.id || ``) != `` && typeof(options.required) == `function`);
	// options.requiredFull = ((options.id || ``) != `` && (options.required || ``) != ``);
	options.requiredFull = ( testP(options.id) && testP(options.required) && (testP(options.text) || typeof(options.required) == `function`) );

	if (options.isTextarea || false) options.value = (options.value || '').replace(/\r/g,'').replace(/\n/g, '<br>');

	var random;
	do {
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	var onblurRequired = ``
		+ 	`var check${random}Test = check${random}('blur');`
		// + 	`if (typeof(check${random}Test) == "string" && check${random}Test != "")`
		// + 		`$("#${options.id}_obs").html(check${random}Test);`
		// + 	`else $("#${options.id}_obs").html("");`
		+ 	`$('#${options.id}_obs').html(`
		+ 		`typeof(check${random}Test) == 'string' && check${random}Test != '' `
		+			`? '<i class=\\'fa fa-times\\'></i> ' + check${random}Test : ''`
		+ 	`);`

	var accesskey = (options.accesskey || '') == '' || options.accesskey.length > 1 ? '' : options.accesskey;

	var title = ''
		+ ((options.title || '') == '' && accesskey == '' ? '' : ''
			+ 	" title='" 
			+ 		(options.title || '') 
			+ 		((options.title || '') == '' || accesskey == '' ? '' : '\n') 
			+ 		(accesskey == '' ? '' : 'Alt + ' + accesskey)
			+ 	"'"
		);

	var label = ''
		// **** configurar elemtno label que complementa o campo de entrada ****
		+ ((options.text || ``) == `` ? `` : ``
			+t(tab)		+ 	`<label`
						+ 		title
						+		((options.id 			|| ``) == `` ? `` : ` for="${options.id}" id="label_${options.id}"`)
						+ 		((options.styleLabel 	|| ``) == `` ? `` : ` style="${resolvStyle(options.styleLabel)}"`)
						+	`>`
			+t(tab+1)	+ 		returnDescAccesskey(options.text, options)
			// + 		returnDesc(options.text, options)
						+ 		((options.required || ``) == `` ? `` : ` <i style="color:red;" class="fa fa-asterisk"></i>`)
			+t(tab)		+ 	`</label>`
		)
		// ***************************************************************************

	var input = ''
		// **** verifica se é mês ****
		+ (options.type != 'month' ? '' : (options.isMonth = true, options.type = 'hidden', '')
			+t(tab+0)	+ 	`<input id="${(options.id || '')}Datepicker" name="dataPiker" autocomplete="off" class='Default form-control' type="text"`
						// + 		` onchange="console.log(this.value);" `
						+ 	`/>`
			+t(tab+0)	+ 	`<script>`
			+t(tab+1)	+ 		`$('#${(options.id || '')}Datepicker').datepicker({`
			+t(tab+2)	+ 			`format: "MM de yyyy"`
			+t(tab+2)	+ 			`, formatData: "yyyy-mm"`
			+t(tab+2)	+ 			`, viewMode: "months"`
			+t(tab+2)	+ 			`, minViewMode: "months"`
			+t(tab+2)	+ 			`, onchange: function(data) {`
			+t(tab+3)	+ 				`if ($("#${(options.id || '')}").val() != data) {`
			+t(tab+4)	+ 					`$("#${(options.id || '')}").val(data);`
			+t(tab+4)	+ 					`try { $("#${(options.id || '')}")[0].onchange(this); } catch(e){}` // chama a função de change
			+t(tab+4)	+ 					`try { $("#${(options.id || '')}")[0].onblur(this); } catch(e){}` 	// chama a função de blur
			+t(tab+4)	+ 					`$(".dropdown-menu").css('display','none');` 						// some com o menu de opção do mes
			+t(tab+3)	+ 				`}`
			+t(tab+2)	+ 			`},`
			+t(tab+1)	+ 		`});`
			+t(tab+1)	+ 		`setTimeout(function(){ resolvVal('${(options.id || '')}','${(options.value || '')}'); }, 500);`
			+t(tab+0)	+ 	`</script>`
		)

		// **** inicia a tag ****
		+t(tab)	+ 	"<" + ((options.isTextarea || false) ? 'textarea' : ((options.enum || '') != '' ? 'select' : 'input') )

		// **** configurar atributos simples ****
		+ ['id','name','value','type','cols','rows','autocomplete','maxlength','autofocus','placeholder']
			.filter(function(el) { return (options[el] || ``) != ``; })
			.map(function(opt) { return ` ${opt}="${options[opt]}"`; })
			.join('')
		// ***************************************************************************

		+ ((options.data || '') == '' || typeof(options.data) != 'object' ? `` : ``
			+ Object.keys(options.data).map(function(key) {
				return ` data-${key}="${options.data[key]}"`
			}).join('')
		)
		+ title
		+ 	` data-customerid="input${random}"`
		+ 	` class="`
		+ 		`form-control`
		+ 		(options.class 	|| ``)
		+ 	`"`
		+ ((options.style || ``) == `` && ['number','tel'].indexOf(options.type) < 0
			? `` 
			: ` style="${
					resolvStyle($.extend({}, 
						(['number','tel'].indexOf(options.type) < 0 ? {} : { 'text-align': 'right' } ),
						(options.style || {})
					))
				}"`
		)
		+ ((options.datalist || '') == '' 
			? ((options.list || '') == '' ? '' : ' list="' + options.list + '"')
			: ' list="' + (options.id || '') + 'datalist"'
		)


		// **** configurar as chamadas dos metodos ****
		+ [`onchange`,`onclick`,`onfocus`,`onblur`,`onkeyup`]
			.filter(function(el) { return (options[el] || ``) != ``; })
			.map(function(opt) {
				return ` ${opt}="${opt + random}(this);`
					+ 	`resolvEvento('${opt}','${(options.id || options.name || '')}');`
					+ (opt != `onblur` || !options.ck_blur || !options.requiredFull ? `` : (options.ck_blur = false, ``)
						+ onblurRequired
					)
					+ 	`"`
			}).join('')
		+ [`onchange`,`onclick`,`onfocus`,`onkeyup`]
			.filter(function(el) { return (options[el] || ``) == ``; })
			.map(function(opt) {
				return ` ${opt}="resolvEvento('${opt}','${(options.id || options.name || '')}');"`
			}).join('')
		// ******************************************************

		+ (!options.ck_blur || !options.requiredFull ? `` : (options.ck_blur = false, ``)
			+ 	` onblur="${onblurRequired}`
			+ 		`resolvEvento('onblur','${(options.id || options.name || '')}');`
			+ 	`"`
		)

		+ 		((options.disabled 	|| ``) == `` ? `` : ` disabled`)
		+ 		((options.checked 	|| ``) == `` ? `` : ` checked`)
		+ 	">"
		+ 	((options.isTextarea || false) ? `${(options.value || '')}</textarea>` : `` )
		+ 	((options.enum || '') == '' ? `` : ``
			+ t(tab+1) 	+ 		Object.keys(options.enum).map(function(value) { 
									return `<option value="${value}">${options.enum[value]}</option>`;
								}).join(t(tab+1))
			+ t(tab) 	+ 	`</select>`
		)

		// **** Descrição de requerimento ****
		+ 	(!options.requiredFull ? `` : ``
			+ t(tab) 	+ `<div style="color:red;" id="${options.id}_obs"></div>`
		)



	var html = ''
		+ ((options.no_desc || '') != '' 
			? input
			: ''
			+ ( ['radio','checkbox'].indexOf(options.type) >= 0 && (options.no_changeLayout || '') == ''
				? ''
					+ t(tab)	+ ((options.inline || '' ) == '' 
						? `<table width="100%">`
						: `<table style="display:inline-block;padding-right: 20px;">`
					)
					+ t(tab+1)	+ 		`<tr>`
					+ t(tab+2)	+ 			`<td width='15px'>`
					+ t(tab*0)	+ 				tAjuste(input,3)
					+ t(tab+2)	+ 			`</td>`
					+ t(tab+2)	+ 			`<td align="left" style="vertical-align:bottom;padding-left:5px;">`
					+ t(tab*0)	+ 				tAjuste(label,3)
					+ t(tab+2)	+ 			`</td>`
					+ t(tab+1)	+ 		`</tr>`
					+ t(tab)	+ 	`</table>`
				: (options.type == 'file' && (options.upload || '') != ''
					? ''
						+ t(tab)	+ 	`<table width="100%">`
						+ t(tab+1)	+ 		`<tr>`
						+ t(tab+2)	+ 			`<td>`
						+ t(tab*0)	+ 				tAjuste(label + input,3)
						+ t(tab+2)	+ 			`</td>`
						+ t(tab+2)	+ 			`<td width='10%' align="left" style="vertical-align:bottom;padding-left:15px;">`
						+ t(tab+3) 	+ 				`<button id="${options.id}_btnUpload" title="Enviar"`
									+ 					` class="btn btn-warning btn-block"`
									+ 					` style="margin-top: 5px;"`
									+ 					` onclick="enviarArquivo${options.id}();"`
									+ 				`>`
						+ t(tab+4) 	+ 					`<i class="fa fa-upload"></i>`
						+ t(tab+3) 	+ 				`</button>`
						+ t(tab+2)	+ 			`</td>`
						+ t(tab+1)	+ 		`</tr>`
						+ t(tab)	+ 	`</table>`
						+ t(tab)	+ 	`<div id="${options.id}_desc_file"></div>`
						+ t(tab) 	+ 	`<div id="${options.id}_progressFile"></div>`
					: label + input
				)
			)
		)
		+ ((options.datalist || '') == '' ? '' : ''
			+ t(tab) 		+ '<div id="' + (options.id || '') + 'datalistDiv"></div>'
		)

		// **** preview de imagem caso input for type file em formato de imagem ****
		+ (options.fileType != 'img' ? '' : ''
			+t(tab+0)	+ 	`<div style="width:100%" class="text-center">`
			+t(tab+1)	+ 		`<img src="${(options.defaultImg || '')}" id="${options.id}preview" `
						+ 			` onerror="if(this.src != 'error.jpg') this.src='${(options.defaultImg || '')}';"`
						+ 			` style="max-width: 80%;max-height: 150px;"`
						+ 		`>`
			+t(tab+0)	+ 	`</div>`
		)

		+ t(tab)	+ 	`<script>`

		+ (!options.requiredFull ? `` : ``
			+ t(tab+1) 	+ 	`function check${random}(){`
			+ t(tab+2) 	+ 		`var op = arguments.length > 0 ? arguments[0] : 'check';`
			// + (typeof(options.required) == 'function' 
			// 	? t(tab+2) + "return (" + String(options.required) + "());"
			// 	: t(tab+2) + "return (resolvVal(\"" + options.id + "\") == '' ? 'Informe " + options.text + "' : true);"
			// )
			+ t(tab+2) 	+ 		`return (`
			+ t(tab+3) 	+ 			`resolvVal("${options.id}") == '' `
			+ t(tab+4) 	+ 				`? "Informe ${options.text}"`
			+ t(tab+4) 	+ 				`: ${typeof(options.required) == `function` ? `${String(options.required)}(op)` : `true`}`
			+ t(tab+2) 	+ 		`);`
			+ t(tab+1) 	+ 	`}`
		)
		// ******************************************************



		// ****  configurar as funções chamada pelos metodos ****
		+ [`onchange`,`onclick`,`onfocus`,`onblur`,`onkeyup`]
			.filter(function(el) { return (options[el] || ``) != ``; })
			.map(function(opt) { return ''
				+ t(tab+1)	+ 	`function ${opt + random}(el) { `
				+ t(tab+2)	+ (
								(typeof(options[opt]) == `string`)
								? options[opt]
								: `var func = ${String(options[opt])};`
								+ t(tab+2)	+ `func(el);`
							)
				+ t(tab+1)	+ 	`}`
			}).join('')
		// ******************************************************



		// ****  correção do bug de quebra de linha como valor padrão no textarea ****
		+ ((options.isTextarea || false) 
			? ''
			+ t(tab+1)	+ 	`setTimeout(function() { `
			+ t(tab+2)	+ 		`$("#${options.id}").val($("#${options.id}").val().replace(/<br>/gi, "\\n"));`
			+ t(tab+1)	+ 	`},1000);`
			: ''
		)
		// ***************************************************************************



		// ****  registrar eventos do teclado ****
		// + ( [`month`,`date`].indexOf(options.type) != -1 && (options.id || ``) != `` ? `` : `` )
		+ ( [`month`,`date`].indexOf(options.type) == -1 || (options.id || ``) == `` ? `` : ``
			+ t(tab+1)	+ 	`function momentMonth${capitalize(options.id)}(e,whichkey){`
			+ t(tab+2)	+ 		`if (whichkey == 114 && $("#${options.id}").is(":focus")) {`
			+ t(tab+3)	+ 			`e.preventDefault();`
			+ t(tab+3)	+ 			`$("#${options.id}").val(moment().format("${(options.type == `month` ? `Y-MM` : `Y-MM-DD`)}"));`
			+ t(tab+2)	+ 		`}`
			+ t(tab+1)	+ 	`}`
			+ t(tab+1)	+ 	`try { registerEventKeyboard.push("momentMonth${capitalize(options.id)}"); } catch(e) {}`
			// + ( registerEventKeyboard.push(`momentMonth${capitalize(options.id)}`), '' )
		)
		// ***************************************************************************



		// ****  verificar se tem que registrar para focar através do ENTER ****
		+ (
			(options.id || ``) == `` || options.type == `hidden`
			? ``
			: ((options.onEnter || '') == '' ? '' : ''
				+ t(tab+1)	+ 	`function onEnter${capitalize(options.id)}(e,whichkey){`
				+ t(tab+2)	+ 		`if (whichkey == 13 && $("#${options.id}").is(":focus")) {`
				// + t(tab+3)	+ 			`e.preventDefault();`
				+ t(tab+3)	+ 			`var func = ${String(options.onEnter)}; func(e,whichkey);`
				+ t(tab+2)	+ 		`}`
				+ t(tab+1)	+ 	`}`
				+ t(tab+1)	+ 	`try { registerEventKeyboard.push("onEnter${capitalize(options.id)}"); } catch(e) {}`
			)
			+ ((options.isTextarea || ``) != `` ? `` : ''
				+ t(tab+1)	+ `try { registerInputFocus.push(resolvEl("${options.id}")); } catch(e) {}`
			)
			// : t(tab+1) + `registerInputFocus.push(resolvEl("${options.id}").el[0]);`
		)
		// ***************************************************************************



		// ****  verificar se tem que construir um datalist ****
		+ ((options.datalist || '') == '' ? '' : ''
			+ t(tab+1)	+ 	`function onDataList${capitalize(options.id)}() { `
			// + t(tab+2)	+ 		`${(options.datalist.ajax || 'ajax')}(`
			+ t(tab+2)	+ (typeof(options.datalist.ajax || 'ajax') == 'string' 
							? (options.datalist.ajax || 'ajax') 
							: `window[(function(){ var func = ${String(options.datalist.ajax)}; return func(); })()]`
						) + `({`
			+ t(tab+3)	+ 			`param: ` + jsonToStringParam(options.datalist.param || {}) + `,`
			+ t(tab+3)	+ 			`done: function(data) { `
			+ t(tab+4)	+ 				`data = JSON.parse(data);`
			+ t(tab+4)	+ 				`var grade = "<datalist id=\\"${(options.id || '')}datalist\\">";`
			+ t(tab+4)	+ 				`if (data[0].debug == "OK") { `
			+ t(tab+5)	+ 					`grade += data.map(function(dt) { `
			+ t(tab+6)	+ 						`return "<option value=\\"" + dt.${(options.datalist.input || 'id')} + "\\">"`
			+ t(tab+5)	+ 					`}).join("");`
			+ t(tab+4)	+ 				`}`
			+ t(tab+4)	+ 				`grade += "</datalist>";`
			+ t(tab+4)	+ 				`$("#${(options.id || '')}datalistDiv").html(grade);`
			+ t(tab+3)	+ 			`}`
			+ t(tab+2)	+ 		`});`
			+ t(tab+1)	+ 	`}`
			+ t(tab+1)	+ 	`onDataList${capitalize(options.id)}();`
		)



		// ****  verificar se tem que fazer upload de aquivo ****
		+ ((options.type || 'text') != 'file' || (options.upload || '') == '' ? '' : ''
			+ t(tab+1)	+ 	`function enviarArquivo${options.id}() { `
			+ t(tab+2)	+ 		`if (getBase64("${options.id}") == false) {`
			+ t(tab+3)	+ 			`return alert("Informe o arquivo!");`
			+ t(tab+2)	+ 		`} `
			+ t(tab+2)	+ 		`var validOnSend = ` + String(options.upload.onsend || function() { return true; }) + `;`
			+ t(tab+2)	+ 		`validOnSend = validOnSend();`
			+ t(tab+2)	+ 		`if (validOnSend != true) { `
			+ t(tab+3)	+ 			`if (typeof(validOnSend) == "string") alert(validOnSend);`
			+ t(tab+3)	+ 			`return;`
			+ t(tab+2)	+ 		`} `
			+ (typeof options.upload.path == 'string' 
				? ''
				+ t(tab+2)	+ 	`var path = '${options.upload.path}';`
				: ''
				+ t(tab+2)	+ 	`var path = ${String(options.upload.path)};`
				+ t(tab+2)	+ 	`path = path();`
			)
			+ t(tab+2)	+ 		`sendBase64({`
			+ t(tab+3)	+ 			`id: '${options.id}',`
			+ t(tab+3)	+ 			`div: '#${options.id}_progressFile',`
			+ ((options.upload.fileName || '') == '' ? '' : ''
				+ t(tab+3)	+ 		`fileName: '${options.upload.fileName}',`
			)
			+ t(tab+3)	+ 			`path,`
			+ t(tab+3)	+ 			`onstart: function(data='') { `
			+ t(tab+4)	+ 				`$("#${options.id}_btnUpload").attr('disabled', true);`
			+ t(tab+4)	+ 				`$("#${options.id}").attr('disabled', true);`
			+ t(tab+3)	+ 			`},`
			+ t(tab+3)	+ 			`ondone: function(data) { `
			+ t(tab+4)	+ 				`$("#${options.id}_btnUpload").attr('disabled', false);`
			+ ((options.fileType || '') == '' ? '' : ''
				+ t(tab+4)	+ 			`$("#${options.id}preview").attr('src', data);`
			)
			+ t(tab+4)	+ 				`$("#${options.id}").attr('disabled', false);`
			+ t(tab+4)	+ 				`alert('Arquivo enviado com sucesso!');`
			+ t(tab+3)	+ 			`},`
			+ t(tab+2)	+ 		`});`
			+ t(tab+1)	+ 	`}`
			+ t(tab+1)	+ 	`setTimeout(() => { `
			+ t(tab+2)	+ 		`$("#${options.id}").change(function() { `
			+ t(tab+3)	+ 			`setBase64(this, '${options.id}'`
						+ 				`${options.fileType == 'img' ? `, '${options.id}preview'` : ''}`
						+ 			`);`
						+ 			`$("#${options.id}_desc_file").html('');`
			+ t(tab+2)	+ 		`});`
			+ t(tab+1)	+ 	`}, 500);`
		)



		// ****  verificar se o campo tem accesskey ****
		+ (accesskey == '' ? '' : ''
			+t(tab+1)	+ 	`function inputClickAccesskey${random}(e) { `
			+t(tab+2)	+ 		`if (e.altKey && e.key == "${accesskey}") { `
			+t(tab+3)	+ 			`e.preventDefault();`
			+t(tab+3)	+ 			`try { $("*[data-customerid='input${random}']")[0].focus(); } catch(e) { }`
			+t(tab+2)	+ 		`}`
			+t(tab+1)	+ 	`}`
			+t(tab+1)	+ 	`registerEventKeyboard.push("inputClickAccesskey${random}");`
		)
		// ***************************************************************************



		// ****  verificar se o campo tem accesskey ****
		+ ((options.no_tab || '') == '' ? '' : ''
			+t(tab+1)	+ 	`function inputNoTab${random}(e) { `
			+t(tab+2)	+ 		`try { `
			+t(tab+3)	+ 			`var input = $("*[data-customerid='input${random}']")[0];`
			+t(tab+2)	+ 		`} catch(e) { return; }`
			+t(tab+2)	+ 		`if ($(input).is(':focus') && e.keyCode === 9) { `
			+t(tab+3)	+ 			`e.preventDefault();`
			+t(tab+3)	+ 			`var inicioDaSelecao = input.selectionStart,`
			+t(tab+4)	+ 				`fimDaSelecao = input.selectionEnd,`
			+t(tab+4)	+ 				`recuo = '\\t'; // Experimente também com '    '`
			+t(tab+3)	+ 			`input.value = [`
			+t(tab+4)	+ 				`input.value.substring(0, inicioDaSelecao),`
			+t(tab+4)	+ 				`recuo,`
			+t(tab+4)	+ 				`input.value.substring(fimDaSelecao)`
			+t(tab+3)	+ 			`].join('');`
			+t(tab+3)	+ 			`input.selectionEnd = inicioDaSelecao + recuo.length; `
			+t(tab+2)	+ 		`}`
			+t(tab+1)	+ 	`}`
			+t(tab+1)	+ 	`registerEventKeyboard.push("inputNoTab${random}");`
		)
		// ***************************************************************************



		// ****  verificar se o campo tem mascara ****
		+ ((options.mask || '') == '' || (options.id || '') == '' ? '' : ''
			+ t(tab+1)	+ 	`$("#${options.id}")`
						+ 		`.mask("${options.mask}",${jsonToString(options.maskOption || {})});`
		)
		+t(tab)	+ 	`</`+`script>`
		// ***************************************************************************

	return html;
}

function resolvLabel(options, tab=0) { 
	/*
		options: {
			text: '' 		-- Conteudo da label
		}
	*/
	var html = ''
		+t(tab) 	+ 	"<label>"
		+t(tab+1) 	+ 		(options.text || '')
		+t(tab) 	+ 	"</label>"
	return html;
}

function resolvLegenda(options, tab=0) { 
	/*
		height: '20px' 				-- Altura do bloco da legenda
		width: 	'40px' 				-- Largura do bloco da legenda
		inline: (0|1) 				-- Caso verdadieiro os dados ficam numa unica linha
		OR num > 2 					-- Caso seja um número e for maior que 1, vai de acordo com o numero por linhas
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

function resolvMenu(options={}, tab=0) { 
	/*
		options: {
			descForm: '' 					-- Identificador
			no_link: (0|1) 					-- Não linqua no menu para redirecionar o conteudo
			isLateral: (0|1) 				-- Caso quera resolver um menu lateral
			selected: indice 				-- Escolher qual aba vai começar ativa, padrão 0
			abas: [
				{
					text: '' 				-- Descricao Menu
					icon: '' 				-- icone para acompanha a descricao
					click: '' / function 	-- Função para chamar quando clicar na aba do menu
					ctx: {} 				-- Conteudo Referente
				}
			]
			xs / sm / md / lg: '3-9' 		-- Class bootstrap, referencia disposição dos componetes (isLateral == true)
		}
	*/

	if ((options.descForm || '') == '') return '';

	var random;
	do { 
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	options = $.extend({}, { 
		xs: '3-9',
	}, options);

	var isLateral = (options.isLateral || '') != '';
	var TA = isLateral ? 1 : 0;

	var selected = options.selected || 0;

	var html = ''
		+ (!isLateral ? '' : ''
			+t(tab)	+ 	'<div'
					+ 		` class="`
					+ 			((options.xs || '') == '' ? '' : ' col-xs-' + options.xs.split('-')[0] )
					+ 			((options.sm || '') == '' ? '' : ' col-sm-' + options.sm.split('-')[0] )
					+ 			((options.md || '') == '' ? '' : ' col-md-' + options.md.split('-')[0] )
					+ 			((options.lg || '') == '' ? '' : ' col-lg-' + options.lg.split('-')[0] )
					+ 		`"`
					+	'>'
		)
		+t(tab+TA)	+ 	'<ul class="nav nav-tabs" id="' + options.descForm + '"'
					+ 		' style="display:' + ((options.abas || []).length < 2 ? 'none' : 'block' ) + '"'
					+ 	'>'
	for (var i = 0; i < (options.abas || []).length; i++) { 
		html += ''
		+ (!isLateral || i == 0 ? '' : ''
			+t(tab+TA+1) + '<br>'
		)
		+t(tab+TA+1)	+ 	"<li name='" + options.descForm + "' id='" + options.descForm + i + "'"
					+ (!isLateral ? '' : ''
						+ 	" style=\"width: 100%;\""
					)
					+ 		" onclick='"
					+ 			"mudarPagina("
					+ 				"this,"
					+ 				"\"" + options.descForm + "Ctx" + i + "\","
					+ 				"\"" + options.descForm + "\","
					+ 				"\"" + options.descForm + "Ctx\""
					+ 			");"
					+ 			"clickMenu" + random + i + '(this);'
					+ 			(typeof(options.abas[i].click) == 'string' ? options.abas[i].click : '')
					+ 		"'"
					+ 		" class='" + (i == selected ? 'active' : '') + "'"
					+ 	">"
		+t(tab+TA+2)	
		+ ((options.no_link || '') == '' 
			? 				"<a href=\"#" + options.descForm + "Ctx" + i + "\""
			: 				"<a href=\"javascript:void(0)\""
		)
		// +t(tab+2)	+ 		"<a href=\"javascript:void(0)\""
					+ ((options.abas[i].accesskey || '') == ''  ? '' : ''
						+ 		" accesskey='" + options.abas[i].accesskey + "'"
						+ 		" title='Alt + " + options.abas[i].accesskey + "'"
					)
					+ 		">"
		+t(tab+TA+3)	+ 			((options.abas[i].icon || '') == '' ? '' : ''
									+ "<i class=\"" + resolvIcon(options.abas[i].icon) + "\"></i> "
								)
					+ 			(options.abas[i].text || '')
		+t(tab+TA+2)	+ 		"</a>"
		+t(tab+TA+1)	+ 	"</li>"
	}
	html += ''
		+t(tab+TA)		+ '</ul>'
		+ (!isLateral ? '' : ''
			+t(tab+0) 	+ 	'</div>'
			+t(tab+0) 	+ 	'<style>'
			+t(tab+1) 	+ 		'#' + options.descForm + ' .active a { '
			+t(tab+2) 	+ 			'border-bottom: 1px solid #ddd !important;'
			+t(tab+2) 	+ 			'border-bottom-left-radius: 5px;'
			+t(tab+2) 	+ 			'border-bottom-right-radius: 5px;'
			+t(tab+1) 	+ 		'}'
			+t(tab+1) 	+ 		'#' + options.descForm + ' { '
			+t(tab+2) 	+ 			'border-bottom: none;'
			+t(tab+2) 	+ 			'border-right: 1px solid #ddd;'
			+t(tab+1) 	+ 		'}'
			+t(tab+0) 	+ 	'</style>'
			+t(tab)	+ 	'<div'
					+ 		` class="`
					+ 			((options.xs || '') == '' ? '' : ' col-xs-' + options.xs.split('-')[1] )
					+ 			((options.sm || '') == '' ? '' : ' col-sm-' + options.sm.split('-')[1] )
					+ 			((options.md || '') == '' ? '' : ' col-md-' + options.md.split('-')[1] )
					+ 			((options.lg || '') == '' ? '' : ' col-lg-' + options.lg.split('-')[1] )
					+ 		`"`
					+	'>'
		)
		+t(tab+TA)		+ '<script>'
		+ (options.abas || []).map(function(aba, i) { return ''
			+t(tab+TA+1)	+ 	`function clickMenu${random}${i}(el) { `
			+t(tab+TA+2)	+ 		`resolvEvento('click','${options.descForm}');`
			+t(tab+TA+2)	+ (typeof(aba.click) != 'function' ? '' : ''
							+ `var func = ${String(aba.click)};`
							+ `func(el);`
						)
			+t(tab+TA+1)	+ 	`}`
		}).join('')
		+t(tab+TA)		+ '</'+'script>'

	for (var i = 0; i < (options.abas || []).length; i++) { 
		html += ""
		+t(tab+TA)	+ 	"<div"
					+ 		" id='" + options.descForm + "Ctx" + i + "'"
					+ 		" name='" + options.descForm + "Ctx'"
					+ 		" style='"
					+ 			(i == selected ? '' : "display:none;")
					+ 			(options.isLateral || false ? '' : "margin-top:10px;")
					+ 		"'"
					+ 	">"
					+ 		resolvConfig(options.abas[i].ctx || {},tab+TA+1)
		+t(tab+TA)	+ 	"</div>"
	}
	html += ''
		+ (!isLateral ? '' : ''
			+t(tab) 	+ 	'</div>'
		)

	return html;
}


function resolvPreview(options={}, tab=0) { 
	/*
		options: { 
			descForm: '' 					-- Parametro Identificador
			ctx: '' 						-- Conteudo do Preview
			pathAce: './lib/ace' 			-- Caminho para lib do editor ace
			onBuild: function() { } 		-- Função disparada toda vez que recontroi o obj do preview
		}
	*/

	// var random;
	// do { 
	// 	random = parseInt( Math.random() * 100000 );
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
		// +t(tab+2) 	+			`textAce${options.descForm}.setOption('mode',"javascript");`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('fontSize','11px');`
		+t(tab+2) 	+			`textAce${options.descForm}.setOption('showGutter',true);`
		+t(tab+1) 	+		`});`

		+t(tab+1) 	+ 		`function previewKeyDown${options.descForm}(e, whichkey) { `
		+t(tab+2) 	+ 			`var curso = $("#preview${options.descForm}").find('.ace_editor')[0];`
		+t(tab+2) 	+ 			`if (e.ctrlKey && whichkey == 13 && curso.className.indexOf('ace_focus') >= 0) { `
		+t(tab+3) 	+ 				`var statusGutter = textAce${options.descForm}.getOption('showGutter');`
		+t(tab+3) 	+ 				`var statusInvisible = textAce${options.descForm}.getOption('showInvisibles');`
		+t(tab+3) 	+ 				`textAce${options.descForm}.setOption('showGutter',false);`
		+t(tab+3) 	+ 				`textAce${options.descForm}.setOption('showInvisibles',false);`
		+t(tab+3) 	+ 				`setTimeout(function() { `
		+t(tab+4) 	+ 					`buildPreview(`
					+ 						`textAce${options.descForm}.container.innerText`
					+ 						`, ${jsonToString(options)});`
		+t(tab+4) 	+ 					`textAce${options.descForm}.setOption('showGutter',statusGutter);`
		+t(tab+4) 	+ 					`textAce${options.descForm}.setOption('showInvisibles',statusInvisible);`
		+t(tab+3) 	+ 				`}, 100);`
		+t(tab+2) 	+ 			`}`
		+t(tab+1) 	+ 		`}`
		+t(tab+1) 	+ 		`registerEventKeyboard.push("previewKeyDown${options.descForm}");`


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
			}, function () { 
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

function resolvRow(options, tab=0) { 
	return ""
		+t(tab)	+ 	"<div class='row'>"
				+ (function(array){
					var html = '';
					for (var i = 0; i < array.length; i++) html += resolvConfig(array[i],tab+1);
					return html;
				}(options))
		+t(tab)	+ 	"</div>";
}

/*
	Dependencias 
	<script src="jquery/dist/jquery.min.js"></script>
	<script src="jquery-ui/jquery-ui.min.js"></script>
*/

/* GER */
function resolvSortable(option, data=[]) { 
	/*
		objParamGrade: {
			tamanhoFont: 		11
			fontFamily: 		"NomeDaFont"
			classTable: 		"table table-bordered stripe table-hover table-condensed table-responsive backTeste"
			titleTableBgColor: 	"#D5DEE3"
			titleTableColor: 	"black"
			titleTableWeight: 	"bold"
			headTableBgColor: 	"#D5DEE3"
			headTableColor: 	"black"
			headTableWeight: 	"bold"
			hoverTrTableColor: 	"lightblue"
		}

		option = {
			inputs: [
				{
					head: ''												// Descrição no titulo da tabela
					class: ''												// Class para delimitar o range de cada coluna Ex: (col-xs-11)

					param: '' 												// Parametro a ser mostrado na celula OR
					param: function(data, option, indice) 					// Parametro a ser mostrado por function usará como callback, 
					... 													// 		o option é referente as opções do input e o indice é dos dados OR
					param: { 												// Parametro mais personalizado para mostrar valores
						op: (CONCAT|SUM), 									// operação a ser realizada pelos valores
						val: [ { attr,literal } ] 							// valores a serem trabalhos para mostrar
					}

					dateFormat: { 											// Indica que o campo é data
						format: 'DD/MM/Y' 									// Define com vai ser impresso o formato da data
						format: function(data, option, indice) 				// Pode usar como callback, similar ao atributo param
						useDataTable: 										// (0|1) default: 1
					}
					format: { 												// Indica que o campo é um número
						casas: 	  0 										// numero de casas decimais
						dec: 	',' 										// separedor decimal
						mili: 	'.' 										// separedor de milhar
					}
				}
			],
			descForm: '' 													// referica para a função de editar e apagar registros
			objParamGrade: '' 												// objeto de estilização do qualidade
			ck_remove: (0|1) 												// informe se vai ter opção para remover o item
			icon_ball: (0|1) 												// se vai ser icone de bolinha ou setinha
		}
	*/

	let html = ''
		+ 	`<ul id="sortable${option.descForm}" class="todo-list">`
		+ 		`<li class="unsortable disable-sort-item row" style="margin:0;">`
		+ 			`<div class="row" style="width:100%">`
		+ 				`<div class="col-xs-1">`
		+ 					`<span class="" style="opacity: 0;white-space: nowrap;">`
		+ ((option.icon_ball || '') == '' 
			? 					`<i class="fa fa-long-arrow-up" style="margin-left:1px"></i>`
			+ 					`<i class="fa fa-long-arrow-down" style="margin-right:1px"></i>`
			: 					`<i class="fa fa-ellipsis-v" style="margin-right:1px"></i>`
			+ 					`<i class="fa fa-ellipsis-v" style="margin-left:1px"></i>`
		)
		+ 					`</span>`
		+ 				`</div>`
		+ (option.inputs || []).map(function(input) { return ''
			+ 			`<div class="${(input.class || '')} text-${input.alignHead || input.align || 'left'}">`
			+ 				`<span class="text">${(input.head || '')}</span>`
			+ 			`</div>`
		}).join('')
		+ ((option.ck_remove || '') == '' ? '' : ''
			+ 			`<div class="col-xs-1">`
			+ 				`<span class="" style="opacity: 0;white-space: nowrap;">`
			+ 					`<i class="fa fa-ellipsis-v" style="margin-right:1px"></i>`
			+ 					`<i class="fa fa-ellipsis-v" style="margin-left:1px"></i>`
			+ 				`</span>`
			+ 			`</div>`
		)
		+ 			`</div>`
		+ 		`</li>`
		+ 		data.map(function(dt) { return returnItemSortable(dt, option)}).join('')
		+ 	`</ul>`
		+ 	`<style>`
		+ 		`.todo-list li { `
		+ 			`padding: 5px !important;`
		+ 		`}`
		+ 	`</style>`
		+ 	`<script>`
		+ 		`var optionsSortable${option.descForm} = ${jsonToString(option)};`
		+ 		`var dataSortable${option.descForm} = ${JSON.stringify(data)};`
		+ 		`dataSortable${option.descForm}.forEach(function(dt,i) {`
		+ 			`dataSortable${option.descForm}[i].li = $("#sortable${option.descForm}").find("li")[i+1]`
		+ 		`});`
		+ 		`$('#sortable${option.descForm}').sortable({ `
		+ 			`placeholder: 'sort-highlight',`
		+ 			`handle: '.handle',`
		+ 			`forcePlaceholderSize: true,`
		+ 			`zIndex: 999999,`
		// + 			`cancel: ".disable-sort-item",`
		+ 			`items: "li:not(.unsortable)",`
		+ 			`update: function(event, ui) { `
		+ 				`reorderSortable("${option.descForm}");`
		+ 			`}`
		+ 		`});`
		+ 	`</`+`script>`

	return html;
}

function returnItemSortable(data, option) { 
	return ''
		+ 	`<li data-id="${data[(option.id || '')]}" style="margin:0;background-color:white;border:1px solid black;margin-bottom:2px;">`
		+ 		`<div class="row" style="width:100%">`
		+ 			`<div class="col-xs-1">`
		+ 				`<span class="handle" style="white-space: nowrap;">`
		+ ((option.icon_ball || '') == '' 
			? 				`<i class="fa fa-long-arrow-up" style="margin-left:1px"></i>`
			+ 				`<i class="fa fa-long-arrow-down" style="margin-right:1px"></i>`
			: 				`<i class="fa fa-ellipsis-v" style="margin-right:1px"></i>`
			+ 				`<i class="fa fa-ellipsis-v" style="margin-left:1px"></i>`
		)
		+ 				`</span>`
		+ 			`</div>`
		+ (option.inputs || []).map(function(input, indice) { return ''
			+ 		`<div class="${(input.class || '')} text-${input.align || 'left'}">`
			+ 			`<span class="text">${resolveValPrintSortable($.extend(option, input), data, indice)}</span>`
			+ 		`</div>`
		}).join('')
		+ ((option.ck_remove || '') == '' ? '' : ''
			+ 		`<div class="col-xs-1 text-center">`
			+ 			`<button class="btn btn-danger"`
			+ 				` onclick="removeItemSortable('${option.descForm}','${data[(option.id || '')]}');"`
			+ 			`>`
			+ 				`<i class="fa fa-times"></i>`
			+ 			`</button>`
			+ 		`</div>`
		)
		+ 		`</div>`
		+ 	`</li>`
}

function reorderSortable(id) { 
	let option = window['optionsSortable'+id]
	, 	li = $('#sortable'+id).find('li')
	, 	newArrayId = [];

	for (let i = 1; i < li.length; i++) 
		newArrayId.push(window['dataSortable'+id]
			.filter(function(dt) { return String(dt[option.id]) == String($(li[i]).data('id')) })[0]);

	window['dataSortable'+id] = newArrayId;
}

var getSortable = function(id) { return window['dataSortable'+id]};

function addSortable(id, value) { 
	let newValue = {};
	eval(`newValue = ${ jsonToString(value) }`);
	// eval(`newValue = { ${ Object.keys(value).map(key => `${key}: value.${key}`) } }`);

	$('#sortable'+id).append(returnItemSortable(newValue, window['optionsSortable'+id]));
	let indice = window['dataSortable'+id].length;
	window['dataSortable'+id].push(newValue);
	window['dataSortable'+id][indice].li = $('#sortable'+id).find("li")[indice+1];
}

function removeItemSortable(id, item) { 
	let data = getSortable(id)
	, 	option = window['optionsSortable'+id]
	, 	indice = data.map(function(dt) { return String(dt[option.id])} ).indexOf(String(item));

	if (indice >= 0) { 
		$(data[indice].li).remove();
		data.splice(indice, 1);
	}
}

function resolveValPrintSortable(option, data, indice) { 
	let mask = (data[option.param] == undefined) ? '%0%' : (option.mask || '%0%');

	let valData = '';
	if (typeof(option.param) == 'function') { 
		valData = option.param(data, option, indice)
	}
	else if (typeof(option.param) == 'object') { 
		if (['sum'].indexOf(option.param.op) < 0) valData = 0;

		if ((option.param.op || 'CONCAT').toUpperCase() == 'CONCAT') { 
			valData = option.param.val.map(function(val) { return val.literal || data[val.attr]; }).join('');
		}
		if (option.param.op.toUpperCase() == 'SUM') { 
			valData = option.param.val
				.map(function(val) { return parseFloat(val.literal || data[val.attr] || 0) })
				.reduce(function(t,v) { return t + v; }, 0);
		}
	}
	else { 
		valData = (data[option.param] || '');
	}


	let val = '';
	if((option.format || '') != '') { 
		let { casas, dec, mili } = option.format;
		if (
			(typeof(option.param) == 'function' && valData == '') || 
			(typeof(option.param) != 'function' && data[option.param] == undefined)
		) { 
			valData = option.default || '';
		} else { 
			valData = (valData || 0);
			if (valData == 0 && (option.setDefaultValZero || false)) { 
				val = option.default || '';
			} else { 
				val = number_format(valData, (casas || 0), (dec || ','), (mili || '.'));
			}
		}
	}
	else if ((option.dateFormat || '') != '') { 
		option.dateFormat.format = ((option.dateFormat || {}).format || 'DD/MM/Y')
		let valHide = "<spam style='display:none;'>%0%</spam>";
		try { valHide = valHide.replace('%0%', moment(valData).format('Y-MM-DD')); } catch(e) { }

		if (valData == '') {
			valData = option.default || '';
		} else {
			valData = moment(valData).format(
				eval(`option.dateFormat.format${ typeof(option.dateFormat.format) == 'string' ? '' : '(data, option, indice)' }`)
			)
		}
		val = valHide + valData;
	}
	else { 
		val = valData || option.default || '';
	}

	return mask.replace(/%0%/g, val);
}

function resolvStyle(obj) { 
	// var html = '';
	var keys = Object.keys(obj);

	// return keys.map(k => k + ':' + obj[k] + ';').join('');
	return keys.map(function(k) { return k + ':' + obj[k] + ';'; }).join('');

	// for (var i = 0; i < keys.length; i++)
	// 	html += keys[i] + ':' + obj[keys[i]] + ';';
	// return html;
}

function getForm(obj,options={}) { 
	return serealizeForm(obj,options);
}

function serealizeForm(obj,options={}) { 
	/*
		options: {
			options do valid 		-- Opções descritas na função returnInputValid()
			onlyValue: (0|1) 	-- Buscar somente valores do formulario
			onlyValuePre: (0|1) 	-- Buscar valores predefinido no formulario
		}
	*/
	options = $.extend({},{ }, options);

	var inputs = returnInputObj(obj);
	if ((options.onlyValuePre || '') == '' && (options.onlyValue || '') == '') {
		var valid = returnInputValid(inputs, options);
	} else { 
		var valid = true;
	}
	var keys = returnIdObj(obj);
	var param = {}, paramAdd;
	var input = {};

	for (var i = 0; i < keys.length; i++) { 
		if ( returnRefInputObj().indexOf(keys[i].parent) >= 0 ) { 
			paramAdd = ['codigoConsulta'].indexOf(keys[i].parent) < 0 ? '' : ',"id"'
			if ((options.onlyValuePre || '') == '') {
				param[keys[i].id] = eval(`resolvVal(keys[i].id ${paramAdd});`);
			} else { 
				param[keys[i].id] = keys[i].obj.value != undefined ? keys[i].obj.value : eval(`resolvVal(keys[i].id ${paramAdd});`);
			}
		}

		if (
			(keys[i].obj.input || '') != '' || 
			((keys[i].obj.id || '') != '' && keys[i].parent == 'codigoConsulta')
		) { 
			if (['codigoConsulta'].indexOf(keys[i].parent) < 0) { 
				if ((options.onlyValuePre || '') == '') {
					input[keys[i].obj.input] = eval(`resolvVal(keys[i].id);`);
				} else { 
					input[keys[i].obj.input] = keys[i].obj.value;
				}
			} else {
				if ((options.onlyValuePre || '') == '') { 
					try { input[keys[i].obj.id] 			= eval(`resolvVal(keys[i].id,"id");`); 		} catch(e) {}
					try { input[keys[i].obj.codigo.input] 	= eval(`resolvVal(keys[i].id,"codigo");`); 	} catch(e) {}
					try { input[keys[i].obj.desc.input] 	= eval(`resolvVal(keys[i].id,"desc");`); 	} catch(e) {}
					try { input[keys[i].obj.select.value] 	= eval(`resolvVal(keys[i].id,"select");`); 	} catch(e) {}
				} else { 
					input[(keys[i].obj.id || keys[i].obj.codigo.input)] = keys[i].obj.value;
				}
			}
		}
	}
	return { valid , inputs , param , input };
}

function clearForm(obj) { 
	var keys = returnIdObj(obj);
	for (var i = 0; i < keys.length; i++) {
		if ( returnRefInputObj().indexOf(keys[i].parent) >= 0 ) {
			if (keys[i].parent == 'codigoConsulta') {
				try { resolvVal(keys[i].id , 'id'		, ''); } catch(e){}
				try { resolvVal(keys[i].id , 'codigo'	, ''); } catch(e){}
				try { resolvVal(keys[i].id , 'desc'		, ''); } catch(e){}
				try { resolvVal(keys[i].id , 'select'	, ''); } catch(e){}
				// console.log('limpar ' + capitalize(keys[i].descForm) + 'Selected_Global');
				window[capitalize(keys[i].descForm) + 'Selected_Global'] = '';
				resolvDisabled(keys[i].descForm,'codigo',false);
			}
			else {
				resolvVal(keys[i].id , (keys[i].obj.value || keys[i].obj.val || ''));
				resolvDisabled(keys[i].id, (keys[i].obj.disabled || false));
				$("#" + keys[i].id + "_obs").html('');
			}
		} else if (keys[i].parent == 'div' && (keys[i].obj.text || '') != '') {
			resolvVal(keys[i].id, keys[i].obj.text);
		} else if (keys[i].parent == 'fotos') {
			$("#divFotos"+keys[i].obj.descForm).html(keys[i].obj.desc || '');
		}
	}
}

function setForm(data, obj, options={}) { 
	/*
		options: {
			dec: ',' 	-- Caso valor seja numerico formatará o separador decimal
		}
	*/
	clearForm(obj);
	var keys = returnIdObj(obj);
	for (var i = 0; i < keys.length; i++) { 
		if ( returnRefInputObj().indexOf(keys[i].parent) >= 0 ) { 
			if (keys[i].parent == 'codigoConsulta') { 
				try { resolvVal(keys[i].id , 'id'		, (data[keys[i].obj.id || keys[i].obj.codigo.input] || '')); } catch(e){}
				try { resolvVal(keys[i].id , 'codigo'	, (data[keys[i].obj.codigo.input] 	|| '')); } catch(e){}
				try { resolvVal(keys[i].id , 'desc'		, (data[keys[i].obj.desc.input] 	|| '')); } catch(e){}
				try { resolvVal(keys[i].id , 'select'	, (data[keys[i].obj.select.value] 	|| '')); } catch(e){}
				try {
					window[capitalize(keys[i].descForm) + 'Selected_Global'] = (data[(keys[i].codigo || {}).input] || '');
				} catch(e){}
			}
			else { 
				var val = data[keys[i].obj.input];
				if (data[keys[i].obj.input] == undefined) { 
					val = (keys[i].obj.value || keys[i].obj.val || '');
				}

				if (keys[i].parent == 'input' && ['number','tel'].indexOf(keys[i].obj.type) >= 0) {
					val = String(val).replace(/\./g, (options.dec || ','))
				}
				resolvVal(keys[i].id, val);
				$("#" + keys[i].id + "_obs").html('');
			}
		// } else if (keys[i].parent == 'div' && (keys[i].obj.text || '') != '') {
		// 	resolvVal(keys[i].id, keys[i].obj.text);
		// } else if (keys[i].parent == 'fotos') {
		// 	$("#divFotos"+keys[i].obj.descForm).html(keys[i].obj.desc || '');
		}
	}
}

function disabledForm(obj, disabled=true) { 
	var keys = returnIdObj(obj);
	for (var i = 0; i < keys.length; i++) { 
		if ( returnRefInputObj().indexOf(keys[i].parent) >= 0 ) { 
			if (keys[i].parent == 'codigoConsulta') { 
				resolvDisabled(keys[i].id, 'id', disabled);
			}
			else { 
				resolvDisabled(keys[i].id, disabled);
				$("#" + keys[i].id + "_obs").html('');
			}
		}
	}
}

function returnInputValid(inputs,options={}) { 
	/*
		options: {
			paramReq: 'required' | ['required'] 		-- Parametro para informar quais atributos devem ser vistos com obrigatório
		}
	*/
	var paramReqArray = (options.paramReq || 'required'), paramReq;
	if (typeof(paramReqArray) == 'string') paramReqArray = [paramReqArray];

	var valid, msm;
	for (var i = 0; i < inputs.length; i++) { 
		for (var j = 0; j < paramReqArray.length; j++) { 
			paramReq = paramReqArray[j];

			if ((inputs[i][paramReq] || '') != '') { 

				if (typeof(inputs[i][paramReq]) == 'function') {

					// Valida se o campo está vazio
					switch (inputs[i].tipoCampo) {
						case "codigoConsulta": 	msm = resolvVal(inputs[i].descForm,"id"); 	break;
						default: 				msm = resolvVal(inputs[i].id); 				break;
					}
					msm = msm == '' ? ((inputs[i].text || '') != '' ? `Informe ${inputs[i].text}!` : 'Formulário inválido!') : '';
					if (msm == '') // Caso o campo esteja preenchido verifica a função de validação
						msm = (inputs[i][paramReq]('valid') || '');

					if (typeof(msm) == 'string' && msm != ''){
						alert(msm);
						msm = false;
					} else {
						msm = true;
						$("#" + inputs[i].id + "_obs").html('');
					}

				} else {
					msm = inputs[i][paramReq];
				}

				// se required for função e retornar falso
				if (typeof(inputs[i][paramReq]) == 'function' && !msm) {
					focusInput(inputs[i]);
					return false;
				}

				else if (typeof(inputs[i][paramReq]) != 'function') {
					switch (inputs[i].tipoCampo) {
						case 'input':
						case 'select':
						case 'textarea':
							valid = $("#" + inputs[i].id).val() != '';
							break;
						case 'codigoConsulta':
							valid = $("#" + inputs[i].descForm).find('.id').find('input').val() != '';
							break;
					}
					if (!valid) {
						if ((inputs[i].text || '') != '') {
							alert('Informe ' + inputs[i].text);
						}
						focusInput(inputs[i]);
						return false;
					}
				}
			}
		}
	}
	return true;
}

function focusInput(obj) { 
	var paramIDs = returnRefId(),
		id = (obj || {})[Object.keys(obj).filter(function(e) { return paramIDs.indexOf(e) != -1; })[0]],
		path = resolvPath(id);

	path.forEach(function(x,i) {
		if (x.indexOf('menu') != -1) {
			id = x.split('-')[1] + path[i+2];
			try { $("#"+id)[0].click(); } catch(e) {}
		}
	});

	if (['input','select','textarea'].indexOf(obj.tipoCampo) != -1) {
		$("#" + obj.id)[0].focus();
	}
	if (obj.tipoCampo == 'codigoConsulta') {
		try {
			$("#" + obj.descForm).find('.codigo').find('input')[0].focus();
		} catch(e){ 
			try {
				$("#" + obj.descForm).find('button')[0].focus();
			} catch(e){}
		}
	}
}

function returnInputObj(obj) { 
	return returnFromEl(obj, returnRefInputObj());
}

function returnRefInputObj() { 
	return ['input','select','codigoConsulta','textarea'];
}

function returnRefId() { 
	return ['descForm','id','name'];
}

function returnIdObj(obj) { 
	var ref = returnRefId();
	var el = returnFromEl(obj, ref, { first: true });
	var map = el.map(function(e) {
		for (var i = 0; i < ref.length; i++) if (e[ref[i]] != undefined) return e[ref[i]]
		return '';
	});
	for (var i = 0; i < el.length; i++) el[i].id = map[i];

	return el;
}

function returnFromEl(obj, types) { 
	/*
		options: {
			first: false 	-- Server para quando tiver pesquisando as chaves do objeto parar no primeiro que encontrar
							-- Ex: (descForm,id) / first:true -> assim que ele achar o descForm ele para, se não achar tenta achar pelo id
		}
	*/
	var inputs 		= [], temp;
	var keys 		= Object.keys(obj);
	var options 	= $.extend( {}, { first: false }, (arguments[2] || {}) );

	for (var i = 0; i < types.length; i++) { 
		if (obj[types[i]] != undefined) { 
			inputs.push(
				$.extend(
					{},
					(typeof(obj[types[i]]) == 'object' 
						? obj[types[i]] 
						: JSON.parse("{\"" + types[i] + "\":\"" + String(obj[types[i]]) + "\"}")
					),
					{ tipoCampo: types[i], parent: (arguments[3] || ''), obj: obj }
				) 
			);
			if (options.first) i = types.length;
		}
	}

	for (var i = 0; i < keys.length; i++) { 
		if (types.indexOf(keys[i]) == -1 && typeof(obj[keys[i]]) == 'object') { 
			temp = returnFromEl(obj[keys[i]], types, options, keys[i]);
			for (j = 0; j < temp.length; j++) inputs.push(temp[j]);
		}
	}
	return inputs;
}


var modalconsulta = `<!-- ********************************************************************************************** -->
<!-- * Modal Consulta Global -->
<!-- ********************************************************************************************** -->
<div class="modal fade" id="modalConsulta" role="dialog">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" id="closeModaBuscaAtendimento" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Consultar <spam></spam>:</h4>
			</div>
			<div class="modal-body">
				<table width="100%" style="display:none;">
					<tr>
						<td>
							Pesquisar: 
							<input class="form-control" style="resize:vertical;">
						</td>
						<td>
							<spam style='color:white'>.</spam>
							<button class="btn btn-block btn-search">
								<i class="fa fa-search"></i>
							</button>
						</td>
					</tr>
				</table>
				<br>
				<div class="conteudo"></div>
			</div>
			<div class="modal-footer" style="margin: 0;">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Fechar
				</button>
			</div>
		</div>
	</div>
</div>
<script>
$('#modalConsulta').on('shown.bs.modal', function () {
	// $('#modalConsulta').find('input').trigger('focus');
	$(".btn-search")[0].click();
});
$('#modalConsulta').on('hidden.bs.modal', function () {
	$('#modalConsulta').find('input').val('');
	$('#modalConsulta').find('.conteudo').html('');
});

function abrirModalConsulta(options) { 
	$("#modalConsulta").modal('show').find('spam').html((options.search || '')).parent('.modal-body')
	$("#modalConsulta").find('.btn-search')[0].onclick = options.click
}
</script>`;
var modalimagens = `<!-- ********************************************************************************************** -->
<!-- * Modal Para Visualizar Fotos -->
<!-- ********************************************************************************************** -->
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" id='modalViewFoto' tabindex="-1" role="dialog" aria-hidden="true">
	<div class="pswp__bg"></div>
	<div class="pswp__scroll-wrap">
		<div class="pswp__container">
			<div class="pswp__item"></div>
			<div class="pswp__item"></div>
			<div class="pswp__item"></div>
		</div>
		<div class="pswp__ui pswp__ui--hidden">
			<div class="pswp__top-bar">
				<div class="pswp__counter"></div>
				<button class="pswp__button pswp__button--close" id="fecharModalViewFoto" title="Close (Esc)"></button>
				<button class="pswp__button pswp__button--share" title="Share"></button>
				<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
				<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
				<div class="pswp__preloader">
					<div class="pswp__preloader__icn">
						<div class="pswp__preloader__cut">
							<div class="pswp__preloader__donut"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
				<div class="pswp__share-tooltip"></div> 
			</div>
			<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
			</button>
			<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
			</button>
			<div class="pswp__caption">
				<div class="pswp__caption__center"></div>
			</div>
		</div>
	</div>
</div>`;
var modalmenu = `<script>
function mudarPagina(el, divId, name, nameDiv) {
	var elementoMenu = document.getElementsByName(name);
	var elementoContMenu = document.getElementsByName(nameDiv);
	for (var i = 0; i < elementoMenu.length; i++) {
		$(elementoMenu[i]).attr('class','');
		$(elementoContMenu[i]).css('display','none');
	}
	$(el).attr('class','active');
	$("#" + divId).css('display','block');
}
</script>`;

function resolvConfigModal(obj, forceSet=false) { 
	var html = '';

	/*****************************************************************/
	// Resolv consulta
	var checkModalconsulta = (function (obj) { 
		return resolvFindParam(obj,'codigoConsulta') && (obj.dist || 'B').indexOf('B') >= 0;
	}(obj));
	var checkModalGlobalconsulta = (function (obj) { 
		return resolvFindParam(obj,'codigoConsulta') && (obj.dist || 'B').indexOf('B') >= 0;
	}(objRefConfig_Global));
	if (checkModalconsulta && (!checkModalGlobalconsulta || forceSet)) { html += modalconsulta; }

	/*****************************************************************/
	// Resolv imagens
	var checkModalimagens = (function (obj) { 
		return resolvFindParam(obj,'fotos');
	}(obj));
	var checkModalGlobalimagens = (function (obj) { 
		return resolvFindParam(obj,'fotos');
	}(objRefConfig_Global));
	if (checkModalimagens && (!checkModalGlobalimagens || forceSet)) { html += modalimagens; }

	/*****************************************************************/
	// Resolv menu
	var checkModalmenu = (function (obj) { 
		return resolvFindParam(obj,'menu');
	}(obj));
	var checkModalGlobalmenu = (function (obj) { 
		return resolvFindParam(obj,'menu');
	}(objRefConfig_Global));
	if (checkModalmenu && (!checkModalGlobalmenu || forceSet)) { html += modalmenu; }

	if (t().indexOf('\n') == -1) html.replace(/\n|\t/g, '');
	return html;
}

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
		var val = arguments[1];
		if (val === 0 || ((val || '') != '' && !isNaN(val))) { 
			try { 
				$("#" + id + val).click();
			} catch(e) { console.error(e); }
		}

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

		if (el.obj.type == 'radio' && arguments[1] != undefined && el.el.attr('id') != id) { 
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

	function resolvFocusAction(el, op="focus") { 
		try { el[0][op](); } catch(e) { }
	}

	if (el.parent == 'codigoConsulta') { 
		var isBtn = (el.obj.dist || 'B').indexOf('B') >= 0 && (el.obj.dist || 'C').indexOf('C') < 0;
		return resolvFocusAction(isBtn ? $("#"+id).find('button') : el.el);
	} 

	if (['input','button'].indexOf(el.parent) >= 0) { 
		if ((el.obj.isMonth || false)) 
			return resolvFocusAction($("#"+id+'Datepicker'));

		resolvFocusAction(el.el, el.parent == 'input' ? 'select' : 'focus');
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

function jsonToStringParam(obj) { 
	var keys = Object.keys(obj);
	var objParam = {}, val, func;

	for (var i = 0; i < keys.length; i++) { 
		if (typeof(obj[keys[i]]) == 'function') { 
			func = obj[keys[i]];
			val = func();
		} else { 
			val = obj[keys[i]];
		}
		objParam[keys[i]] = val;
	}
	return jsonToString(objParam);
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

	if (valid.filter(function(e) { return (options[e.param] || '') != '' }).length > 0) { 
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
						// console.log(registerInputFocus[proximoIndice]);
						registerInputFocus[proximoIndice].el[0].focus();
						setComand = true;
					} else { 
						x.el[0].focus();
					}
				}
			});
		}

		if (!setComand) { 
			registerEventKeyboard.forEach(function(x) { 
				window[x](e,whichkey);
			});
		}
	}

	$("body").append(""
		+ 	"<style>"
		+ 		"tr:hover > .celB {"
		+ 			"background-color:" + ((window['objParamGrade_Global'] || {}).hoverTrTableColor || 'lightblue') + " !important;"
		+ 		"}"
		+ 		"tr > .active {"
		+ 			"background-color:" + ((window['objParamGrade_Global'] || {}).activeTrTableColor || '#66ccff') + " !important;"
		+ 		"}"
		+ 	"</style>"
	);
});
