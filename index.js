import {Map} from 'ol';
import htmlToImage from 'html-to-image';

/**
 * @typedef {Object} Option
 * @property {number} [dpi]
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
  return new Promise((resolve, reject) => {
    const map = new Map({
      target: document.createElement('div'),
      controls: [],
      interactions: [],
      view: view,
      layers: layers
    });

    map.once('rendercomplete', () => {
      htmlToImage.toPng(map.getTargetElement()).then((dataURL) => {
        map.setTarget(null);
        resolve(dataURL);
      });
    });
    map.renderSync();
  });

};
