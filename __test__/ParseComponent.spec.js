import { shallowMount } from '@vue/test-utils'
import ParseComponent from "../src/components/ParseComponent";
import { describe, expect} from "@jest/globals";

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

    test('it should parse the data from the input field', () => {
        //TODO
    });

    test('it throws an error when input can\'t be parsed', () => {
        //TODO
    });

    //TODO: add tests for tab, caret position, ...
});
