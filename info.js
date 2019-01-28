//InfoPanel
function ajax_get(url, callback) {
  var json = new XMLHttpRequest();
  json.onreadystatechange = function() {
    if (json.readyState == 4 && json.status == 200) {
      console.log("responseText:" + json.responseText);
      try {
        var data = JSON.parse(json.responseText);
      } catch (err) {
        console.log(err.message + " in " + json.responseText);
        return;
      }
      callback(data);
    }
  };
  json.open("GET", url, true);
  json.send();
}

ajax_get("https://api.spacexdata.com/v3/launches/next", function(data) {
  console.log(data);
  var html = "";
  debugger;
  html += "<h2>" + "Next Launch: " + data.mission_name + "</h2>";
  html +=
    "<br>" +
    "<p>" +
    "<strong>" +
    "Rocket name" + "<br>" +
    "</strong>" +
    data.rocket.rocket_name +
    "</p>";
  html +=
    "<p>" +
    "<strong>" +
    "Payload" + "<br>" +
    "</strong>" +
    data.rocket.second_stage.payloads[0].payload_id +
    "<br>" +
    "from " +
    data.rocket.second_stage.payloads[0].customers +
    "<br>" +
    "in " +
    data.rocket.second_stage.payloads[0].nationality;
  ("</p>");
  html +=
    "<p>" +
    "<strong>" +
    "Flight Number" + "<br>" +
    "</strong>" +
    data.flight_number +
    "</p>";
  html +=
    "<p>" +
    "<strong>" +
    "Launch Year" + "<br>" +
    "</strong>" +
    data.launch_year +
    "</p>";
  html +=
    "<p>" +
    "<strong>" +
    "Launch Date" + "<br>" +
    "</strong>" +
    data.launch_date_local +
    "</p>";
  html +=
    "<p>" +
    "<strong>" +
    "Launch Site" + "<br>" +
    "</strong>" +
    data.launch_site.site_name_long +
    " (" +
    data.launch_site.site_name +
    ")" +
    "</p>";

  document.getElementById("content").innerHTML = html;

  var launchDate = new Date(data.launch_date_local).getTime();

  var temp = setInterval(function() {
    var currentDate = new Date().getTime();

    var timeSpan = launchDate - currentDate;

    var days = Math.floor(timeSpan / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeSpan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeSpan % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeSpan % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
      "<h2>" +
      days +
      "d " +
      hours +
      "h " +
      minutes +
      "m " +
      seconds +
      "s " +
      "</h2>";

    if (timeSpan < 0) {
      clearInterval(temp);
      document.getElementById("timer").innerHTML = "EXPIRED";
    }
  }, 1000);
});
