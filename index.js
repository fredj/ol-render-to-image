import {Map} from 'ol';
import {toPng} from 'html-to-image';

// FIXME: use http://html2canvas.hertzen.com/features/ ?

/**
 * @typedef {Object} Option
 * @property {number} width Image width in pixels.
 * @property {number} height Image height in pixels.
 * @property {number} [pixelRatio=1]
 * @property {Array<number>} [size]
 * @property {string} [format='png']
 */

/**
 * @param {import("ol/View").default} view
 * @param {Array<import("ol/layer/Layer").default>} layers
 * @param {Option} [options]
 * @return {Promise<string>} Image in dataURL format.
 */
export function render(view, layers, options) {
  return new Promise((resolve) => {
    const htiOptions = {
      width: options.width,
      height: options.height
    };
    const map = new Map({
      target: document.createElement('div'),
      pixelRatio: options.pixelRatio,
      controls: [],
      interactions: [],
      view: view,
      layers: layers
    });
    map.setSize([options.width, options.height]);

    map.once('rendercomplete', () => {
      console.log('rendercomplete');
      toPng(map.getTargetElement(), htiOptions).then((dataURL) => {
        map.setTarget(null);
        resolve(dataURL);
      });
    });
    map.renderSync();
  });

};
