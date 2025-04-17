const gpx_wildspitz = "gpx/route_2022-09-25_1.58pm.gpx"
const gpx_rigikulm = "gpx/route_2022-10-22_8.30pm.gpx"
const gpx_pilatus = "gpx/route_2022-10-30_6.55pm.gpx"
const gpx_rigihochflue = "gpx/route_2023-02-25_3.40pm.gpx"

const labelArr = ['Total distance [m]', 'Elevation min [m]', 'Elevation max [m]', 'Elevation gain [m]','Elevation loss [m]','Total time [h]']
const labelFunction = ['get_distance()', 'get_elevation_min()', 'get_elevation_max()', 'get_elevation_gain()',  'get_elevation_loss()','get_total_time()/1000/3600']
let labelMap = labelArr.map((x, i) => [x, labelFunction[i]]);

function addStats(gpx,tableRef){
  let t = document.getElementById(tableRef)
  for (let [key, value] of labelMap) {
    var newRow = t.insertRow();
    var newCell = newRow.insertCell();
    var newText = document.createTextNode(key);
    newCell.appendChild(newText);
    var newCell = newRow.insertCell();
    let nmb = Math.round((parseFloat(eval(gpx+'.'+value))) * 100) / 100
    var newText = document.createTextNode(nmb);
    newCell.appendChild(newText);
  }
}
function plot_elev_profile(gpx,ref){
  const ctx = document.getElementById(ref);
  let data_array = elev_data_from_gpx(gpx)
  let data_map = {
    datasets: [{
      label: 'Elevation [m]',
      data: data_array,
      pointRadius: 1,
      borderColor: 'rgb(0, 0, 255)',
      pointStyle: 'rectRot',
      borderWidth: 1,
      pointBorderColor: 'rgb(0, 0, 255)',
      pointHoverRadius: 2
    }]}
  new Chart(ctx,
    {
      type: 'scatter',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: {
          autoPadding: false
        },
        plugins: {
          legend: {
              display: false,
              labels: {
                  color: 'rgb(255, 99, 132)'
              }
          }
        },
      scales: {
        y: {
          title: {
            text:"Elevation [m]",
            display: true
          }
        },
          x: {
            title: {
              text:"Time [h]",
              display: true
            }
          }
      },
    },
      data: data_map
    }
  );
}

function elev_data_from_gpx(gpx){
  let total_time = parseFloat(eval(gpx+'.get_total_time()/3600/1000'))
  let elev_arr = eval(gpx+'.get_elevation_data()')
  let N = elev_arr.length
  let time_arr = []
  for (i=0;i<N;i++){
    time_arr.push(total_time/N * i)
  }
  let data = []
  for (i=0;i<N;i++){
    data.push(
      {x: time_arr[i], y:elev_arr[i][1]}
    )
  }
  return data
}

var map_rigihochflue = L.map('map_rigihochflue').setView([47.0213042, 8.5679814], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map_rigihochflue);

let gpx1 = new L.GPX(gpx_rigihochflue, {async: true}).on('loaded', function(e) {
  map_rigihochflue.fitBounds(e.target.getBounds());
  addStats('gpx1','t4')
  plot_elev_profile('gpx1','HR4')
  }).addTo(map_rigihochflue);

var map_pilatus = L.map('map_pilatus').setView([47.0213042, 8.5679814], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map_pilatus);

let gpx2 = new L.GPX(gpx_pilatus, {async: true}).on('loaded', function(e) {
  map_pilatus.fitBounds(e.target.getBounds());
  addStats('gpx2','t2')
  plot_elev_profile('gpx2','HR2')
  }).addTo(map_pilatus);

var map_rigikulm = L.map('map_rigikulm').setView([47.0213042, 8.5679814], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map_rigikulm);

let gpx3 = new L.GPX(gpx_rigikulm, {async: true}).on('loaded', function(e) {
  map_rigikulm.fitBounds(e.target.getBounds());
  addStats('gpx3','t3')
  plot_elev_profile('gpx3','HR3')
  }).addTo(map_rigikulm);

var map_wildspitz = L.map('map_wildspitz').setView([47.0213042, 8.5679814], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map_wildspitz);

let gpx4 = new L.GPX(gpx_wildspitz, {async: true}).on('loaded', function(e) {
  map_wildspitz.fitBounds(e.target.getBounds());
  addStats('gpx4','t1')
  plot_elev_profile('gpx4','HR1')
  }).addTo(map_wildspitz);
