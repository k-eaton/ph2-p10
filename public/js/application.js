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
      $('a.videoLink').on('click', function(event){
        event.preventDefault();
        $("#video").empty()
        var num = this.name;
        // The name of each 'a' tag gives the array index of the listed film
        console.log(response.film[num].title)
        $("#video").append(addVideo(response.film[num]))
        $('#rating1').raty({
          score: function() {
            return $('#rating1').attr('datascore')
          },
        });
        // $('#rating2').raty({
        //   score: function() {
        //     return $('#rating2').attr('datascore')
        //   }
        // });
      });
    });
  });
});


var addVideo = function(data){
  var video = '<h3>'+ data.title +'</h3>'
    + '<div id="rating1" datascore="'+data.avg_rating+'">'
    + '</div>'
    + '<div id="rating2" datascore="'+data.avg_rating+'">'
    + '</div>'
    + '<p>'+ data.description +'</p>'
    + '<video  style="width:100%;height:100%;" controls>'
    + '<source src="https://archive.org/download/'+ data.identifier +'/'+ data.identifier +'_512kb.mp4">'
    + '<source src="https://archive.org/download/'+ data.identifier +'/'+ data.identifier +'.ogv">'
    + '</video>'
  return video
}

var listSearchResults = function(data){
  var searchResults = '<h3><a href="/video" name="'+ i +'" class="videoLink">' + data.title + '</a></h3>'

  return searchResults
}


