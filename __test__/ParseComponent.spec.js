import { shallowMount } from '@vue/test-utils'
import ParseComponent from "../src/views/Parse";
import { describe, expect} from "@jest/globals";
import ParseResultComponent from "../src/views/ParseResult";

const data = {
    "@context": {
        "ical": "http://www.w3.org/2002/12/cal/ical#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "ical:dtstart": {
            "@type": "xsd:dateTime"
        }
    },
    "ical:summary": "Lady Gaga Concert",
    "ical:location": "New Orleans Arena, New Orleans, Louisiana, USA",
    "ical:dtstart": "2011-04-09T20:00:00Z"
}

const wrapper = shallowMount(ParseComponent, {
    stubs: [
        'vl-region',
        'vl-layout',
        'vl-grid',
        'vl-column',
        'vl-textarea',
        'vl-button',
        'vl-alert'
    ],
    propsData: {
        documentData: data
    }
});

describe('ParseComponent', function () {
    //TODO: add more tests

    test('it sets the correct default data', () => {
        expect(typeof ParseComponent.data).toBe('function');
        const defaultData = ParseComponent.data();
        expect(defaultData.input).toBe('');
        expect(defaultData.quads).toStrictEqual([]);
        expect(defaultData.quadString).toBe('');
        expect(defaultData.error).toBe(false);
        expect(defaultData.errorMessage).toBe('');
    });

    // Inspect the component instance on mount
    test('it sets the data fields correctly when created', () => {
        expect(wrapper.vm.$data.input).toBe('');
        expect(wrapper.vm.$data.quads).toStrictEqual([]);
        expect(wrapper.vm.$data.quadString).toBe('');
        expect(wrapper.vm.$data.error).toBe(false);
        expect(wrapper.vm.$data.errorMessage).toBe('');
    });

    // Not working
    /*test('tab function is executed when tab button is pressed', async () => {
        const spy = jest.spyOn(wrapper.vm, 'tab');
        await wrapper.trigger('keydown.tab');
        expect(spy).toHaveBeenCalled();
    });*/

    test('it shows an error when something went wrong while parsing the data', async () => {
            expect(wrapper.find('#parseError').exists()).toBeFalsy();
            await wrapper.setData({error: true});
            expect(wrapper.find('#parseError').exists()).toBeTruthy();
    });

    test('ParseResultComponent is present', async () => {
        expect(wrapper.findComponent(ParseResultComponent).exists()).toBeTruthy();
    })

    test('Parse function is executed when parse button is clicked', async () => {
        const spy = jest.spyOn(wrapper.vm, 'parse');
        await wrapper.find('#parseButton').trigger('click');
        expect(spy).toHaveBeenCalled();
    });
});
