import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import HomeComponent from "../src/views/Home.vue";
import ParseComponent from "../src/views/Parse";
import ShaclComponent from "../src/views/Shacl";
import { describe, expect, test} from "@jest/globals";

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
        expect(wrapper.vm.$data.action).toMatch('shacl');

        // Go back to default value
        const parseButton = wrapper.find('#parseButtonInactive');
        await parseButton.trigger('click');
        expect(wrapper.vm.$data.action).toMatch('parsing');

    });

    test('it should fetch URLs containing JSON(-LD) data', async () => {
        const spy = jest.spyOn(wrapper.vm, 'fetchDocument');
        const button = wrapper.find('#fetchButton');
        await button.trigger('click');
        expect(spy).toHaveBeenCalled();
    });

    test('it should show an error when an error occured while fetching data from the URL', async () => {
        expect(wrapper.find('p').exists()).toBeFalsy();
        await wrapper.setData({fetchError: true});
        expect(wrapper.find('p').exists()).toBeTruthy();
    });

    test('it should show the ParseComponent when action is "parsing"', async ( ) => {
       await wrapper.setData({action : 'parsing'});
       expect(wrapper.findComponent(ParseComponent).exists()).toBeTruthy();
    });

    test('it should show the ShaclComponent when action is "shacl"', async () => {
        await wrapper.setData({action: 'shacl'});
        expect(wrapper.findComponent(ShaclComponent).exists()).toBeTruthy();
    })
})
