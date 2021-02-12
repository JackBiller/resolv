<?php

// include '../servidor_conexao.php';

// include '../lb/entidades/PadraoObjeto.php';
// include '../lb/funcoes.php';
include '../../../class/entidade/PadraoObjeto.php';
include '../../../controller/funcoes.php';

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

	echo 'Atualizações ' . sizeof($files);

	if (sizeof($files) > 0) {
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
				$modalName = substr($branchsModal[$i]->get('name'), 0, strlen($branchsModal[$i]->get('name'))-3);
				array_push($modaisF, $modalName);

				$modalFuncHTML .= "
	var checkModal$modalName = (function (obj) {
$modalFunc
	}(obj));
	if (checkModal$modalName) { html += modal$modalName; }";

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

		$conteudoAdd .=  "
$modalHTML

function resolvConfigModal(obj) { 
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

?>