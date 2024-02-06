document.addEventListener("DOMContentLoaded", async function () {

    const map = L.map("earthmap");

    map.setView([36.2, 138.2], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

    const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson");

    // console.log(response.data);

    const earthquakeCluster = L.markerClusterGroup();
    earthquakeCluster.addTo(map);

    for (let x of response.data.features)
    {
        // console.log(x);
        const long = x.geometry.coordinates[0];
        const lat = x.geometry.coordinates[1];
        // console.log(lat,long);
        const coordinate = [lat, long]; 
        const marker = L.marker(coordinate);
        marker.bindPopup(function(){
            let div = document.createElement('div');
            div.innerHTML = `<h3>${x.properties.place}</h3>
            <p>Magnitude: ${x.properties.mag}</p>`;
            return div;
        })
        marker.addTo(earthquakeCluster);
    }
});