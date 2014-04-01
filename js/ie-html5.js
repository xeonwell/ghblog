//create html5 element for IE
(function(){
var h5e = "address|article|aside|audio|canvas|command|datalist|details|dialog|figure|figcaption|footer|header|hgroup|keygen|mark|meter|menu|nav|progress|ruby|section|time|video".split('|');
for(var i = 0, j = h5e.length; i < j; i++) document.createElement(h5e[i]);
})();