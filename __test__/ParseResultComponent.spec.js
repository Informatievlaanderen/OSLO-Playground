import { shallowMount } from '@vue/test-utils'
import ParseResultComponent from "../src/views/ParseResult";
import {describe, expect} from "@jest/globals";

const wrapper = shallowMount(ParseResultComponent, {
   stubs: [
       'vl-grid',
       'vl-column',
       'vl-tabs',
       'vl-tab',
       'vl-data-table',
       'vl-textarea'
   ]
});

describe('ParseResultComponent', () => {

    test('it sets the correct default props', () => {
        //TODO
    });
});
