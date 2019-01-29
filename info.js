//InfoPanel

fetch("https://api.spacexdata.com/v3/launches/next")

    .then(function(response) {
        return response.json();
    })

    .then(function(json) {
        var html = `
        <h2> Next SpaceX Launch: ${json.mission_name} </h2> <br>
        <p><strong> Rocket Name <br></strong> ${json.rocket.rocket_name}</p>
        <p><strong> Payload <br></strong> ${json.rocket.second_stage.payloads[0].payload_id} <br>
            from ${json.rocket.second_stage.payloads[0].customers} <br>
            in ${json.rocket.second_stage.payloads[0].nationality} </p>
        <p><strong> Flight Number <br></strong> ${json.flight_number} </p>
        <p><strong> Launch Year <br></strong> ${json.launch_year} </p>
        <p><strong> Launch Date <br></strong> ${json.launch_date_local}</p>
        <p><strong> Launch Site <br></strong> ${json.launch_site.site_name_long} (${json.launch_site.site_name}) </p>  
        `;

        console.log(html);
        document.getElementById("content").innerHTML = html;

        var launchDate = new Date(json.launch_date_local).getTime();

        var temp = setInterval(function() {
            var currentDate = new Date().getTime();

            var timeSpan = launchDate - currentDate;

            var days = Math.floor(timeSpan / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeSpan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeSpan % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeSpan % (1000 * 60)) / 1000);

            document.getElementById("timer").innerHTML = `
            <h2> ${days}d ${hours}h ${minutes}m ${seconds}s </h2>
            `;

            if (timeSpan < 0) {
            clearInterval(temp);
            document.getElementById("timer").innerHTML = "EXPIRED";
            }
        }, 1000);
    })

    .catch(function(error) {
        console.log(`fetch failed: `, error);
    })
    