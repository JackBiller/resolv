
function resolvRow(options) { 
	var tab = (arguments[1] || 0);
	return ""
		+t(tab)	+ 	"<div class='row'>"
				+ (function(array){
					var html = '';
					for (var i = 0; i < array.length; i++) html += resolvConfig(array[i],tab+1);
					return html;
				}(options))
		+t(tab)	+ 	"</div>";
}
