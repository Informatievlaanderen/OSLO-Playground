<template>
    <div>
        <vl-grid>
            <vl-column width="11">
                <vl-tabs>
                    <vl-tab label="N-Quads">
                        <vl-textarea v-model="quadString" rows="16" mod-disabled></vl-textarea>
                    </vl-tab>
                    <vl-tab label="Tabel" class="vl-u-table-overflow">
                        <vl-data-table>
                            <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Predicate</th>
                                <th>Object</th>
                                <th>DataType</th>
                                <th>Language</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="quad in quads">
                                    <td>{{ quad.subject.value }}</td>
                                    <td>{{ quad.predicate.value}}</td>
                                    <td>{{ quad.object.value}}</td>
                                    <td v-if="quad.object.datatype">{{ quad.object.datatype.value}}</td>
                                    <td v-else></td>
                                    <td v-if="quad.object.language">{{ quad.object.language}}</td>
                                    <td v-else></td>
                                </tr>
                            </tbody>
                        </vl-data-table>
                    </vl-tab>
                    <vl-tab label="Visualisatie">

                    </vl-tab>
                </vl-tabs>
            </vl-column>
        </vl-grid>
    </div>
</template>

<script>
    export default {
        name: "ParseResultComponent",
        props: {
            quads: Array,
            quadString: String
        }
    }
</script>

<style lang="scss">

</style>
