import { shallowMount } from '@vue/test-utils'
import ParseComponent from "../src/components/ParseComponent";
import { describe, expect} from "@jest/globals";

const wrapper = shallowMount(ParseComponent, {
    stubs: [
        'vl-region',
        'vl-layout',
        'vl-grid',
        'vl-column',
        'vl-textarea',
        'vl-button',
        'vl-alert'
    ]
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
});
