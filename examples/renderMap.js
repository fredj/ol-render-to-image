import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

import {renderMap} from '../index.js';

const map = new Map({
  target: 'map',
  view: new View({
    rotation: Math.PI/4,
    center: [0, 0],
    zoom: 2
  }),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ]
});

document.querySelector('#render_map').addEventListener('click', () => {
  renderMap(map).then((dataURL) => {
    const img = document.querySelector('#img_map');
    img.src = dataURL;
  });
});
