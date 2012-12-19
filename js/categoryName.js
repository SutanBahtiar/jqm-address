$('#categoryNamePage').live('pageshow', function(event) {
    var id = getUrlVars()["id"];
    $.getJSON(serviceURL + 'getCategory.php?id='+id, displayCategory);
});

function displayCategory(data) {
    $('#categoryNameList li').remove();
    var category = data.items;
    console.log(category);
    //$('#headerImg').attr('src', 'img/' + category.icon);
    //$('#headerName').text(category.kategori);

    
    //category = data.items;
    $.each(category, function(index, i) {
    	$('#categoryNameList').append('<li><a href="address.html?id=' + i.id_alamat + '">' +
    	    i.nama + '</a></li>');
    });
    $('#categoryNameList').listview('refresh');
	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
