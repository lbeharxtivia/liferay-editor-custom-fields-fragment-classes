declare const Liferay;

import initFramework from '@liferay-editor-custom-fields/framework';
import { renderClassSelect } from './renderClassSelect/renderClassSelect';

const init: () => void = () => {
    console.log('init');
    initFramework();
    Liferay.on('EditorCustomFields_FragmenConfig_OnLoad', renderClassSelect);
}
export default init;
