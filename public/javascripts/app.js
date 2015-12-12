var data = [{
    id: 'enhancement',
    text: 'enhancement'
}, {
    id: 'bug',
    text: 'bug'
}, {
    id: 'duplicate',
    text: 'duplicate'
}, {
    id: 'invalid',
    text: 'invalid'
}, {
    id: 'wontfix',
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
    });

    $("#ignoreSearch").select2("container").find("ul.select2-choices").sortable({
        containment: 'parent',
        start: function() {
            $("#ignoreSearch").select2("onSortStart");
        },
        update: function() {
            $("#ignoreSearch").select2("onSortEnd");
        }
    });

    var sampleTags = ['c++', 'java', 'php', 'coldfusion', 'javascript', 'asp', 'ruby', 'python', 'c', 'scala', 'groovy', 'haskell', 'perl', 'erlang', 'apl', 'cobol', 'go', 'lua'];

    $('#singleFieldTags2').tagit({
        availableTags: sampleTags,
        placeholderText : "test"
    });
});


function generateGitIgnore() {
    var searchString = $("#ignoreSearch").val();
    var searchLength = searchString.length;
    if (searchLength > 0) {
        var files = searchString.slice(2);
        var uriEncodedFiles = encodeURIComponent(files);
        window.location = "/api/" + uriEncodedFiles;
        $("#ignoreSearch").val("");
    }
}