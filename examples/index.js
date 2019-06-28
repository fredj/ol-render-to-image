import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

import {render} from '../index.js';

const view = new View({
  center: [0, 0],
  zoom: 2
})

const layers = [
  new TileLayer({
    source: new OSM()
  })
];

const options = {
  width: 600,
  height: 400
};

render(view, layers, options).then((dataURL) => {
  console.log(dataURL);
});
