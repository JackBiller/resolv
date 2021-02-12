
function getForm(obj,options={}) { 
	return serealizeForm(obj,options);
}

function serealizeForm(obj,options={}) { 
	/*
		options: {
			options do valid 		-- Opções descritas na função returnInputValid()
		}
	*/
	options = $.extend({},{ }, options);

	var inputs = returnInputObj(obj);
	var valid = returnInputValid(inputs, options);
	var keys = returnIdObj(obj);
	var param = {}, paramAdd;
	var input = {};

	for (var i = 0; i < keys.length; i++) { 
		if ( returnRefInputObj().indexOf(keys[i].parent) >= 0 ) { 
			paramAdd = ['codigoConsulta'].indexOf(keys[i].parent) < 0 ? '' : ',"id"'
			param[keys[i].id] = eval(`resolvVal(keys[i].id ${paramAdd});`);
		}

		if (
			(keys[i].obj.input || '') != '' || 
			((keys[i].obj.id || '') != '' && keys[i].parent == 'codigoConsulta')
		) { 
			if (['codigoConsulta'].indexOf(keys[i].parent) < 0) { 
				input[keys[i].obj.input] = eval(`resolvVal(keys[i].id);`);
			} else {
				try { input[keys[i].obj.id] 			= eval(`resolvVal(keys[i].id,"id");`); 		} catch(e) {}
				try { input[keys[i].obj.codigo.input] 	= eval(`resolvVal(keys[i].id,"codigo");`); 	} catch(e) {}
				try { input[keys[i].obj.desc.input] 	= eval(`resolvVal(keys[i].id,"desc");`); 	} catch(e) {}
				try { input[keys[i].obj.select.value] 	= eval(`resolvVal(keys[i].id,"select");`); 	} catch(e) {}
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
				var val = (data[keys[i].obj.input] || keys[i].obj.value || keys[i].obj.val || '');
				if (keys[i].parent == 'input' && ['number','tel'].indexOf(keys[i].obj.type) >= 0) {
					val = String(val).replace(/\./g, (options.dec || ','))
				}
				try { resolvVal(keys[i].id, val); } catch(e){}
				try { $("#" + keys[i].id + "_obs").html(''); } catch(e){}
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
	return ['descForm','id'];
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
