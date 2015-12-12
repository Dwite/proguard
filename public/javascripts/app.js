var data = [{id : 'acra' , text :  'acra'},
    {id : 'action-bar-sherlock' , text :  'action-bar-sherlock'},
    {id : 'activeandroid' , text :  'activeandroid'},
    {id : 'android-gif-drawable' , text :  'android-gif-drawable'},
    {id : 'androidannotations' , text :  'androidannotations'},
    {id : 'avro' , text :  'avro'},
    {id : 'aws-1.7' , text :  'aws-1.7'},
    {id : 'aws-2.1.5' , text :  'aws-2.1.5'},
    {id : 'butterknife-6' , text :  'butterknife-6'},
    {id : 'butterknife-7' , text :  'butterknife-7'},
    {id : 'crashlytics' , text :  'crashlytics'},
    {id : 'crittercism' , text : 'crittercism'},
    {id : 'crosswalk' , text : 'crosswalk'},
    {id : 'deeplinkdispatch-1.5' , text :  'deeplinkdispatch-1.5'},
    {id : 'easy-adapter' , text :  'easy-adapter'},
    {id : 'eventbus' , text :  'eventbus'},
    {id : 'fabric-twitter-kit' , text : 'fabric-twitter-kit'},
    {id : 'facebook-conceal' , text :  'facebook-conceal'},
    {id : 'facebook-stetho' , text : 'facebook-stetho'},
    {id : 'facebook' , text :  'facebook'},
    {id : 'flurry' , text :  'flurry'},
    {id : 'glide' , text :  'glide'},
    {id : 'google-analytics' , text :  'google-analytics'},
    {id : 'google-iap' , text :  'google-iap'},
    {id : 'google-play-services' , text :  'google-play-services'},
    {id : 'greendao' , text :  'greendao'},
    {id : 'gson' , text : 'gson'},
    {id : 'guava' , text :  'guava'},
    {id : 'icepick' , text : 'icepick'},
    {id : 'jackson-2' , text : 'jackson-2'},
    {id : 'joda-convert' , text : 'joda-convert' },
    {id : 'joda-time-android' , text : 'joda-time-android'},
    {id : 'joda-time' , text : 'joda-time'},
    {id : 'logback-android' , text :  'logback-android'},
    {id : 'mikepenz-android-iconics' , text :  'mikepenz-android-iconics'},
    {id : 'mixpanel' , text :  'mixpanel'},
    {id : 'mopub' , text :  'mopub'},
    {id : 'mpandroidchart' , text : 'mpandroidchart'},
    {id : 'new-relic' , text :  'new-relic'},
    {id : 'parse' , text :  'parse'},
    {id : 'proguardject' , text :  'proguardject'},
    {id : 'realm' , text : 'realm'},
    {id : 'retrolambda' , text :  'retrolambda'},
    {id : 'rx-java' , text :  'rx-java'},
    {id : 'rxjavamises' , text :  'rxjavamises' },
    {id : 'simple-xml' , text :  'simple-xml'},
    {id : 'sqlite' , text :  'sqlite'},
    {id : 'square-okhttp' , text : 'square-okhttp'},
    {id : 'square-okio' , text :  'square-okio'},
    {id : 'square-otto' , text :  'square-otto'},
    {id : 'square-picasso' , text :  'square-picasso'},
    {id : 'square-retrofit' , text :  'square-retrofit'},
    {id : 'square-wire' , text :  'square-wire'},
    {id : 'support-design' , text :  'support-design'},
    {id : 'support-v7-appcompat' , text :  'support-v7-appcompat'},
    {id : 'support-v7-cardview' , text :  'support-v7-cardview'},
    {id : 'wizardroid' , text :  'wizardroid'}];

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
        var files = searchString.slice(1);
        var uriEncodedFiles = encodeURIComponent(files);
        window.location = "/api/" + uriEncodedFiles;
        $("#ignoreSearch").val("");
    }
}