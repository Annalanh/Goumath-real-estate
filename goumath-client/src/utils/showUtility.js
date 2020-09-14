import mapboxgl from 'mapbox-gl';

let utilityIconClasses = {
  'university': `
  <div class="pin">
    <i class="fa fa-university"></i>
  </div>
  `,
  'hospital': `
  <div class="pin">
    <i class="fa fa-hospital"></i>
  </div>
  `,
  'medical_supply':`
  <div class="pin">
    <i class="fa fa-clinic-medical"></i>
  </div>
  `,
  'pharmacy': `
  <div class="pin">
    <i class="fa fa-medkit"></i>
  </div>
  `,
  'veterinary': `
  <div class="pin">
    <i class="fa fa-dog"></i>
  </div>
  `,
  'kindergarten': `
  <div class="pin">
    <i class="fa fa-baby"></i>
  </div>
  `,
  'school': `
  <div class="pin">
    <i class="fa fa-school"></i>
  </div>
  `,
  'college': `
  <div class="pin">
    <i class="fa fa-building"></i>
  </div>
  `,
  'language_school':`
  <div class="pin">
    <i class="fa fa-language"></i>
  </div>
  `,
  'music_school': `
  <div class="pin">
    <i class="fa fa-music"></i>
  </div>
  `,
  'mall': `
  <div class="pin">
    <i class="fa fa-city"></i>
  </div>
  `,
  'supermarket':`
  <div class="pin">
    <i class="fa fa-shopping-cart"></i>
  </div>
  `
}


function getDistance(poiUl, poiClick) {
  var lon1 = toRadian(Number(poiUl.lon)),
    lat1 = toRadian(Number(poiUl.lat)),
    lon2 = toRadian(Number(poiClick.lon)),
    lat2 = toRadian(Number(poiClick.lat));

  var deltaLat = lat2 - lat1;
  var deltaLon = lon2 - lon1;

  var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  var c = 2 * Math.asin(Math.sqrt(a));
  var EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS;
}

function toRadian(degree) {
  return degree * Math.PI / 180;
}

export default function showUtility({ pois, map, type, poiClick }) {
  pois.forEach(poi => {
    let hospitalIcon = document.createElement('div');
    hospitalIcon.classList.add(type)
    hospitalIcon.innerHTML = utilityIconClasses[type]

    let marker = new mapboxgl.Marker(hospitalIcon)
      .setLngLat([poi.lon, poi.lat])
      .addTo(map);

    let distance = Math.ceil(getDistance(poi, poiClick) * 1000)

    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })
      .setLngLat([poi.lon, poi.lat])
      .setHTML(`
          <div>
            <div class="gou-utility-name gou-utility-detail-container">${poi.tags.name}</div>
            <div class="gou-utility-detail-container">
              <span class="gou-utility-detail-title">Địa chỉ:</span> 
              <span>số 133, đốc ngữ, ba đình, hà nội</span> 
            </div>
            <div class="gou-utility-detail-container">
              <span class="gou-utility-detail-title">Distance:</span> 
              <span>${distance} m</span> 
            </div>
          </div>`
      )

    marker.getElement().addEventListener('mouseenter', () => {
      popup.addTo(map);
    })

    marker.getElement().addEventListener('mouseleave', () => {
      popup.remove();
    })
  })
}