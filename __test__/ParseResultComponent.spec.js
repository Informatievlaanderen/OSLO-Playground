import { shallowMount } from '@vue/test-utils'
import ParseResultComponent from "../src/components/ParseResultComponent";
import {describe, expect} from "@jest/globals";

const wrapper = shallowMount(ParseResultComponent, {
   stubs: [
       'vl-grid',
       'vl-column',
       'vl-tabs',
       'vl-tab',
       'vl-data-table'
   ]
});

describe('ParseResultComponent', () => {

    test('it sets the correct default props', () => {
        //TODO
    });
});
