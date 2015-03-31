$(document).ready(function() {
  var prelingerData;

  $("#welcome").on("submit", function(event) {
    event.preventDefault();
    // because the preventDefault is preventing the submission
    // of the data, we had to create formData to catch
    // what the search query is supposed to be.
    var formData = $(event.target).serialize()
    console.log("Default prevented")
    $("#video").empty()

    var request = $.ajax({
      url: "/new_search",
      type: 'POST',
      data: formData,
      dataType: 'json'
    });
    console.log('test')
    request.done(function(response){
      if (response.match === true){
        console.log("we're done!")
        $("#video").append(addVideo(response))
      } else {
        for (i = 0;i < response.film.length; i++){
        // $(response).each(function(index, element) {
        //   console.log(response.film[index].title)
        //   // $(response.film[index].title).each(function(index, element){
          $("#video").append(listSearchResults(response.film[i]))

        //   $("#video").append(listSearchResults(response.film[index].title))
        //     // $("#video").append(listSearchResults(element))
        //   // })
        // })
        // )
    playSearchListVideo(response.film[i])
        }
      }
    });

  });

});

var addVideo = function(data){
  var video = '<video  style="width:100%;height:100%;" controls>'
    + '<source src="https://archive.org/download/'+ data.identifier +'/'+ data.identifier +'_512kb.mp4">'
    + '<source src="https://archive.org/download/'+ data.identifier +'/'+ data.identifier +'.ogv">'
    + '</video>'
  return video
}

var listSearchResults = function(data){
  var searchResults = '<h3><a href="#">' + data.title + '</a></h3>'

  return searchResults
}

var playSearchListVideo = function(filmData){

  $("a#video").click(function(){
    event.preventDefault();
    console.log("I've been clicked")
    $("#video").empty()
    $("#video").append(addVideo(filmData))
  })

}
