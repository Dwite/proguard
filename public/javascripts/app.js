var data = [{
    id: 0,
    text: 'enhancement'
}, {
    id: 1,
    text: 'bug'
}, {
    id: 2,
    text: 'duplicate'
}, {
    id: 3,
    text: 'invalid'
}, {
    id: 4,
    text: 'wontfix'
}];

'use strict';
$(document).ready(function() {
    $("#ignoreSearch").select2({
        sorter: function(results) {
            var query = $('.select2-search__field').val().toLowerCase();
            return results.sort(function(a, b) {
                return a.text.toLowerCase().indexOf(query) -
                    b.text.toLowerCase().indexOf(query);
            });
        },
        placeholder: "Search library names",
        multiple: true,
        minimumInputLength: 1,
        data: data
    }); $("#ignoreSearch").select2("container").find("ul.select2-choices").sortable({
        containment: 'parent',
        start: function() {
            $("#ignoreSearch").select2("onSortStart");
        },
        update: function() {
            $("#ignoreSearch").select2("onSortEnd");
        }
    });
})


function generateGitIgnore() {
    var searchString = $("#ignoreSearch").val();
    var searchLength = searchString.length;
    if (searchLength > 0) {
        var files = searchString;
        var uriEncodedFiles = encodeURIComponent(files);
        window.location = "/api/" + uriEncodedFiles;
        $("#ignoreSearch").val("");
    }
}