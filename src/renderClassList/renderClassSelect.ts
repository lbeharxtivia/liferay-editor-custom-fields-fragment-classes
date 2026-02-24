import { applyClass } from "../applyClass";
import { getClassesFromStyles } from "./getClassesFromStyles"

export const renderClassSelect = () => {
    const container = document.querySelector('.page-editor__common-styles.panel-group-sm') as HTMLElement | null;
    if (container) {
        const classes = getClassesFromStyles();
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '1rem';
        wrapper.innerHTML = `
      <label for="liferay-editor-custom-fields-fragment-style-selector">Fragment Style Class</label>
      <select class="form-control" id="liferay-editor-custom-fields-fragment-style-selector">
        <option value="">(None)</option>
        ${classes.map(style => `<option value="${style}">${style}</option>`).join('')}
      </select>
    `;
        if (!document.getElementById('liferay-editor-custom-fields-fragment-style-selector')) {
            container.prepend(wrapper)
        };
        const selectElement = wrapper.querySelector('#liferay-editor-custom-fields-fragment-style-selector') as HTMLSelectElement;
        if (selectElement) {
            const fragmentContentEl = document.querySelector('.page-editor__topper.active .page-editor__fragment-content') as HTMLDivElement;
            if (fragmentContentEl.classList) {
                const selectedClass = Array.from(fragmentContentEl.classList).find(className => className.includes('fragment-style-'));
                if (selectedClass) {
                    const selectedItem = selectedClass.replace('fragment-style-', '');
                    selectElement.value = selectedItem;
                }
            }

            selectElement.addEventListener('change', (event: Event) => {
                const target = event.target as HTMLSelectElement;
                applyClass({ className: target?.value })
            });
        }
    }
};

