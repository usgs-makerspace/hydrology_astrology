function fetchLocation() {
    /////////////////////////////////
    // Get City and State
    //////////////////////////////////
    var city = [];
    var state = [];
    var apiURL = "http://open.mapquestapi.com/geocoding/v1/address?key=	NkGrSo9aZDYlEaOv3pNN3lvFxuBFmCdK&location=";
    var geocode = [];
    var lat = [];
    var long = [];

    city = document.getElementById("city").value;    
    state = document.getElementById("state").value;    


    // http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=Washington,DC

    console.log(city,state);

    /////////////////////////////////
    // Compile URL
    var geocode = apiURL + city + "," + state;
    /////////////////////////////////
    // Call API

    d3.json(geocode, function(error, apiData) { 
        console.log(apiData, "lat long");

        lat = apiData.results[0].locations[0].latLng.lat;
        long = apiData.results[0].locations[0].latLng.lng;
        console.log(lat,"lat", long, "long");
        
    });
}



/////////////////////////////////
// Function is called when the "submit" button is clicked
//////////////////////////////////
