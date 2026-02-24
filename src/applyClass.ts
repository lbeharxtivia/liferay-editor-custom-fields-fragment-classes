import { clickFragmentConfigTab, fragmentConfigLoadingEnd, fragmentConfigLoadingStart, getFieldByLabel, setReactDomInputValue, wait, waitForElement } from '@liferay-editor-custom-fields/framework';
import { renderClassSelect } from './renderClassSelect/renderClassSelect';

export const applyClass = async ({ className = "" }: { className: string }) => {
    fragmentConfigLoadingStart();
    clickFragmentConfigTab('Advanced');

    const parentEl = document.querySelector('.page-editor__item-configuration-sidebar');
    await waitForElement({ parentEl, label: 'CSS Classes', searchQuerySelector: 'label' }).catch(fragmentConfigLoadingEnd)
    // If we change from another option we need to delete the old one.
    const oldClassDeleteButtons = document.querySelectorAll('button[aria-label^="Remove fragment-style-"]');
    if(oldClassDeleteButtons.length > 0){
        oldClassDeleteButtons.forEach((delButton: HTMLButtonElement) => delButton.click());
        // Liferay does not like when you interact with the input immediately after pressing the delete class button
        await wait(50);
    }
    
    // If classname exists, enter the selected class. Sometimes there's no class and that's okay.
    if (className) {
        const classInput = getFieldByLabel('CSS Classes');
        setReactDomInputValue(classInput, `fragment-style-${className}`);
        const createBtn = await waitForElement({ parentEl: document.body, label: 'Create', searchQuerySelector: '.cadmin>.dropdown-menu.page-editor__css-class-selector-dropdown.show button' }).catch(fragmentConfigLoadingEnd) as HTMLButtonElement
        createBtn?.click();
    }

    clickFragmentConfigTab('General');
    await waitForElement({ parentEl, label: 'Frame', searchQuerySelector: 'span.panel-title' });
    renderClassSelect();
    // I'm not sure why the select value is staying ths same, but we have the classname so why not just set it
    const selectElement = document.querySelector('#liferay-editor-custom-fields-fragment-style-selector') as HTMLSelectElement;
    if(selectElement) {
        selectElement.value = className;
    }

    fragmentConfigLoadingEnd();
}
