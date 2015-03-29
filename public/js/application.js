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

var preligerSearch = function(){
  $.ajax({
    url: "https://archive.org/advancedsearch.php",
    type: 'GET',
    data:"?q="+searchTerm +"+collection%3A%22prelinger%22+avg_rating%3A%5B3+TO+5%5D+downloads%3A%5B1000+TO+100000000%5D&fl%5B%5D=avg_rating&fl%5B%5D=collection&fl%5B%5D=creator&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=num_reviews&fl%5B%5D=publisher&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&indent=yes&output=json&callback=callback&save=yes#raw",
  })
  .done(function(prelinger_response){
    prelinger_data = prelinger_response;
    document.write(prelinger_data);
    console.log("x");
  });
};

// var get



