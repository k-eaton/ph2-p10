$(document).ready(function() {
  var prelingerData;

  $("#welcome").on("submit", function(event) {
    event.preventDefault();
    // because the preventDefault is preventing the submission
    // of the data, we had to create formData to catch
    // what the search query is supposed to be.
    var formData = $(event.target).serialize()
    // console.log("Default prevented")
    $("#video").empty()

    var request = $.ajax({
      url: "/new_search",
      type: 'POST',
      data: formData,
      dataType: 'json'
    })
    // console.log('test')
    request.done(function(response){
      for (i = 0;i < response.film.length; i++){
        $("#video").append(listSearchResults(response.film[i]))
      }
      $('a.videolink').on('click', function(event){
        event.preventDefault();
        $("#video").empty()
        var num = this.name;
        // The name of each 'a' tag gives the array index of the listed film
        console.log(response.film[num].title)
        $("#video").append(addVideo(response.film[num]))
        $("#rateit2").bind('rated', function (event, value) {
          $.ajax({
            url: '/video', //your server side script
            dataType: 'json',
            data: {identifier: response.film[num].identifier, wtf_value: value },
            type: 'POST',
          })
        });
        $("#rateit").bind('rated', function (event, value) {
          $.ajax({
            url: '/video', //your server side script
            dataType: 'json',
            data: { identifier: response.film[num].identifier, star_value: value },
            type: 'POST',
          })
        });

        $("#rateit").bind('rated', function (event, value){
          $.ajax({
            url: '/video/rating',
            type: 'GET',
            dataType: 'json',
            data: {identifier: response.film[num].identifier}
          })
          .done(function(avgRating){
            $("#starrating").empty()
            $("#starrating").append('<h4>'+avgRating.avg_rating+'</h4>')
          })
        });
        $("#rateit2").bind('rated', function (event, value){
          $.ajax({
            url: '/video/wtfrating',
            type: 'GET',
            dataType: 'json',
            data: {identifier: response.film[num].identifier}
          })
          .done(function(avgWtfRating){
            $("#wtfrating").empty()
            $("#wtfrating").append('<h4>'+avgWtfRating.avg_wtf_rating+'</h4>')
          })
        });
      });
    });
  });
});


var addVideo = function(data){
  var video = '<h3>'+ data.title +'</h3>'
    + '<input type="hidden" id="backing6">'
    + '<div id="rateit2" class="wtf" data-rateit-starwidth="32" data-rateit-starheight="32" data-rateit-resetable="false" data-rateit-value="2.5" data-rateit-ispreset="true">'
    + '</div>'
    + '<script type="text/javascript">'
    + '  $(function () { $("#rateit2").rateit({ backingfld: "#backing6" }); });'
    + '</script>'
    + '<div id="wtfrating"></div>'
    + '<input type="hidden" id="backing6">'
    + '<div id="rateit" class="bigstars" data-rateit-starwidth="32" data-rateit-starheight="32" data-rateit-resetable="false">'
    + '</div>'
    + '<script type="text/javascript">'
    + '  $(function () { $("#rateit").rateit({ backingfld: "#backing6" }); });'
    + '</script>'
    + '<div id="starrating"></div>'
    + '<p class="description">'+ data.description +'</p>'
    + '<video id="vidcontainer" style="width:100%;height:100%;" controls>'
    + '<source src="https://archive.org/download/'+ data.identifier +'/'+ data.identifier +'_512kb.mp4">'
    + '<source src="https://archive.org/download/'+ data.identifier +'/'+ data.identifier +'.ogv">'
    + '</video>'
  return video
}

var listSearchResults = function(data){
  var searchResults = '<h3><a href="/video" name="'+ i +'" class="videolink">' + data.title + '</a></h3>'

  return searchResults
}


