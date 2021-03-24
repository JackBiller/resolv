<?php

date_default_timezone_set('America/Sao_Paulo');

include './class/PadraoObjeto.php';
include './class/funcoes.php';


if (!empty($_POST['atualizarArquivoConfig'])) { 
	$files = array();

	// $diretorio = listDir($_POST['dir']);
	$diretorio = listDir('./resolv');
	$branchs = $diretorio->get('branchs');

	for ($i = 0; $i < sizeof($branchs); $i++) {
		if ($branchs[$i]->get('isFile')) {
			$diff = date_diff( date_create(date('Y-m-d H:i:s')), date_create($branchs[$i]->get('dateCriation')) );

			if ($diff->y == 0 && $diff->m == 0 && $diff->d == 0 && $diff->h == 0 && $diff->i == 0 && $diff->s < 3) {
				// em javascript coloca essa string na frente da imagem para cancelar cache // ?(new Date()).toString()
				array_push($files, $branchs[$i]);
			}
		}
	}

	$filObj = getObjFile('resolvConfig.js','./');
	$diff = date_diff( date_create(date('Y-m-d H:i:s')), date_create($filObj->get('dateCriation')) );
	if ($diff->y == 0 && $diff->m == 0 && $diff->d == 0 && $diff->h == 0 && $diff->i == 0 && $diff->s < 3) {
		array_push($files, $filObj);
	}

	$filObj = getObjFile('serealizeForm.js','./');
	$diff = date_diff( date_create(date('Y-m-d H:i:s')), date_create($filObj->get('dateCriation')) );
	if ($diff->y == 0 && $diff->m == 0 && $diff->d == 0 && $diff->h == 0 && $diff->i == 0 && $diff->s < 3) {
		array_push($files, $filObj);
	}

	echo 'Atualizações ' . sizeof($files);

	if (sizeof($files) > 0 || !empty($_POST['force_set'])) {
		$conteudo = ctxFile('resolvConfig.js');
		$conteudo = explode('// funções de resolução', $conteudo);

		if (sizeof($conteudo) != 2) return false;

		$conteudoHead = $conteudo[0];

		$conteudoFoot = explode('// fim função de resolução', $conteudo[1]);
		if (sizeof($conteudoFoot) != 2) return false;
		$conteudoFoot = $conteudoFoot[1];

		$conteudoAdd = '';
		for ($i = 0; $i < sizeof($branchs); $i++) {
			if ($branchs[$i]->get('isFile') && substr($branchs[$i]->get('name'),-3) == '.js') {
				$conteudoAdd .= ctxFile($branchs[$i]->get('path'));
			}
		}

		$conteudoAdd .= ctxFile('serealizeForm.js');





		/* Resolve Modais Padrão */
		$diretorioModal = listDir('./resolv/modal');
		$branchsModal = $diretorioModal->get('branchs');
		$modalHTML = '';
		$modalFuncHTML = '';
		$modais = array();
		$modaisF = array();
		for ($i = 0; $i < sizeof($branchsModal); $i++) {
			if ($branchsModal[$i]->get('isFile') && substr($branchsModal[$i]->get('name'),-5) == '.html') {
				// echo $branchsModal[$i]->get('path');
				$modal = ctxFile($branchsModal[$i]->get('path'));
				$modalName = substr($branchsModal[$i]->get('name'), 0, strlen($branchsModal[$i]->get('name'))-5);
				array_push($modais, $modalName);

				$modal = str_replace("\r", "", $modal);
				// for ($i=0; $i < sizeof($modal); $i++) { $modal = str }
				// $modalHTML .= "var modal$modalName = `" . implode("`\n+ `", explode("\n", $modal)) . '`;
				$modalHTML .= "
var modal$modalName = `$modal`;";
			}
			else if ($branchsModal[$i]->get('isFile') && substr($branchsModal[$i]->get('name'),-3) == '.js') {
				// echo $branchsModal[$i]->get('path');
				$modalFunc = ctxFile($branchsModal[$i]->get('path'));
				$modalFunc = ajusteTab($modalFunc, 1);
				$modalName = substr($branchsModal[$i]->get('name'), 0, strlen($branchsModal[$i]->get('name'))-3);
				array_push($modaisF, $modalName);

				$modalFuncHTML .= "
	/*****************************************************************/
	// Resolv $modalName
	var checkModal$modalName = (function (obj) { 
$modalFunc
	}(obj));
	var checkModalGlobal$modalName = (function (obj) { 
$modalFunc
	}(objRefConfig_Global));
	if (checkModal$modalName && (!checkModalGlobal$modalName || forceSet)) { html += modal$modalName; }
";
			}
		}

		$isFindModal = false;
		for ($i=0; $i < sizeof($modais); $i++) { 
			$isFindModal = false;
			for ($j=0; $j < sizeof($modaisF); $j++) { 
				if ($modais[$i] == $modaisF[$j]) {
					$isFindModal = true;
				}
			}
			if (!$isFindModal) 
				$modalFuncHTML .= '
	html += modal' . $modalName . ';';
		}

		$conteudoAdd .= "
$modalHTML

function resolvConfigModal(obj, forceSet=false) { 
	var html = '';
$modalFuncHTML
	if (t().indexOf('\\n') == -1) html.replace(/\\n|\\t/g, '');
	return html;
}
";
		/* End. Resolve Modais Padrão */






		createFile('resolvConfig.full.js', // 'resolvConfig.mim.js', 
			$conteudo[0] . "// funções de resolução\n" . $conteudoAdd . "\n\t// fim função de resolução" . $conteudoFoot
		);
	}
}

if (!empty($_POST['listarDiretorio'])) { 
	$path = $_POST['path'];
	echo toJson(listDir($path));
}

if (!empty($_POST['criarDiretorioDoc'])) { 
	mkdir('./resolvDoc');
	$doc = $_POST['doc'];
	createFile('./resolvDoc/documentacao.html', $doc);
}

if (!empty($_POST['testeApiDados'])) { 
	class DadoGenericos extends PadraoObjeto { 
		var $id;
		var $desc;
		var $codigo;
		var $debug = 'OK';
	}
	$arrayTeste = array();

	for ($i=0; $i < 50; $i++) { 
		$dadoGenerico = new DadoGenericos();
		$dadoGenerico->set($i, 'id');
		$dadoGenerico->set(($i * 1000), 'codigo');
		$dadoGenerico->set('Pos' . $i, 'desc');
		array_push($arrayTeste, $dadoGenerico);
	}
	echo toJson($arrayTeste);
}

/* Enviar arquivo via base64 */
if (!empty($_POST['sendBase64'])) { 
	$tempName = !empty($_POST['tempName']) ? $_POST['tempName'] : date('ymdHis').rand(0,100);
	$base64 = $_POST['base64'];

	if (!is_dir('./temp')) mkdir('./temp');

	$arquivo = fopen('./temp/'.$tempName, 'a');
	fwrite($arquivo, $base64);
	fclose($arquivo);
	echo $tempName;
}

if (!empty($_POST['doneSendBase64'])) { 
	$tempName 		= $_POST['tempName'];
	$fileName 		= $_POST['fileName'];
	$path 			= $_POST['path'];
	$ext 			= $_POST['ext'];
	$arrayExtText 	= array('txt','csv');

	$arquivo = fopen('./temp/'.$tempName, "r") or die("Unable to open file!");
	$ctx = fread($arquivo, filesize('./temp/'.$tempName));
	fclose($arquivo);

	$path = resolvPath($path);

	$arquivo2 = fopen($path.$fileName.'.'.$ext, "w") or die("Unable to open file!");
	if (empty($_POST['no_base64'])) { 
		if (in_array(strtolower($ext), $arrayExtText)) { 
			fwrite($arquivo2, utf8_encode(base64_decode($ctx)));
		} else { 
			fwrite($arquivo2, base64_decode($ctx));
		}
	} else { 
		fwrite($arquivo2, $ctx);
	}
	fclose($arquivo2);

	$file = './temp/'.$tempName;
	if (is_file($file)) unlink($file);
	echo '1';
}
/* End: Enviar arquivo via base64 */

function ajusteTab($text, $numTab=0, $boolComentario=false) { 
	$text = explode("\n", str_replace("\r", "", $text));

	for ($i=0; $i < sizeof($text); $i++) { 
		$text[$i] = str_replace("\t", "    ", $text[$i]);
		// remover comentario
		if (!$boolComentario) { 
			if (strpos($text[$i], "//") !== '') { 
				$text[$i] = explode('//', $text[$i]);
				$text[$i] = $text[$i][0];
			}
		}
		// remover espaço no final da linha
		while (substr($text[$i], strlen($text[$i])-1, 1) == ' ') { 
			$text[$i] = substr($text[$i], 0, strlen($text[$i])-1);
		}
		// remover linhas vazias
		if ($text[$i] == '') { 
			array_splice($text, $i, 1);
			$i--;
		}
	}

	for ($i=0; $i < $numTab; $i++) { 
		for ($j=0; $j < sizeof($text); $j++) { 
			$text[$j] = "    " . $text[$j];
		}
	}

	return str_replace("    ", "\t", implode("\n", $text));
}

?>