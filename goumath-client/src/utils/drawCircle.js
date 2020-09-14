import * as turf from '@turf/turf'
export default function drawCircle({ lat, lon, radius, map }) {
    let center = turf.point([Number(lon), Number(lat)]);
    let options = {
        steps: 80,
        units: 'kilometers'
    };

    let circle = turf.circle(center, radius, options);
    map.addLayer({
        "id": "circle-fill",
        "type": "fill",
        "source": {
            "type": "geojson",
            "data": circle
        },
        "paint": {
            "fill-color": "#c4e8f2",
            "fill-opacity": 0.5
        }
    });
    map.addLayer({
        "id": "circle-outline",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": circle
        },
        "paint": {
            "line-color": "#1890ff",
            "line-opacity": 0.5,
            "line-width": 10,
            "line-offset": 5
        }
    });
}