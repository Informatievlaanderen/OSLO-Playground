import { shallowMount } from '@vue/test-utils'
import HomeComponent from "../src/components/HomeComponent.vue";
import { describe, expect} from "@jest/globals";

const wrapper = shallowMount(HomeComponent, {
    stubs: [
        'vl-region',
        'vl-layout',
        'vl-grid',
        'vl-column',
        'vl-introduction',
        'vl-side-navigation',
        'vl-side-navigation-list',
        'vl-side-navigation-item',
        'vl-action-group',
        'vl-button',
        'vl-icon',
        'vl-input-field'
    ]
});

describe('HomeComponent', () => {

    // Evaluate the results of functions in the raw component options
    test('it sets the correct default data', () => {
       expect(typeof HomeComponent.data).toBe('function');
       const defaultData = HomeComponent.data();
       expect(defaultData.action).toBe('parsing');
       expect(defaultData.documentURL).toBe('');
       expect(defaultData.fetchError).toBe(false);
       expect(defaultData.documentData).toBe(null);
    });

    // Inspect the component instance on mount
    test('it sets the data fields correctly when created', () => {
        expect(wrapper.vm.$data.action).toBe('parsing');
        expect(wrapper.vm.$data.documentURL).toBe('');
        expect(wrapper.vm.$data.fetchError).toBe(false);
        expect(wrapper.vm.$data.documentData).toBe(null);
    });

    test('it should change the action value on button click', async () => {
        // Default value is parsing
        const shaclButton = wrapper.find('#shaclButtonInactive');
        await shaclButton.trigger('click');
        expect(wrapper.vm.$data.action).toBe('shacl');

        // Go back to default value
        const parseButton = wrapper.find('#parseButtonInactive');
        await parseButton.trigger('click');
        expect(wrapper.vm.$data.action).toBe('parsing');

    });

    test('it should fetch URLs containing JSON(-LD) data', async () => {
        //TODO
    });

    test('it should throw an error when fetching a URL that does not contain JSON', () => {
        //TODO
    });
})
