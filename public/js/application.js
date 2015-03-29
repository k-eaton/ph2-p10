$(document).ready(function() {
  var prelingerData;

  $("#welcome").on("submit", function(event) {
    event.preventDefault();
    var formData = $(event.target).serialize()
    console.log("Default prevented")

    var request = $.ajax({
      url: "/new_search",
      type: 'POST',
      data: formData,
      dataType: 'json'
    });
    console.log('test')
    request.done(function(response){
      console.log("we're done!")
      $("#welcome").append(addVideo(response))
    });

  });

});

var addVideo = function(data){
  var video = '<video  style="width:100%;height:100%;" controls>'
    + '<source src="https://archive.org/download/'+ data.identifier +'/'+ data.identifier +'_512kb.mp4">'
    + '<source src="https://archive.org/download/'+ data.identifier +'/'+data.identifier+'.ogv">'
    + '</video>'
  return video
}



