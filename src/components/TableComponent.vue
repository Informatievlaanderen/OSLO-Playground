<template>
  <div
    class="vl-u-table-overflow"
    style="height: 33%!important;"
  >
    <vl-data-table mod-hover>
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
        <tr 
          v-for="quad in mutableQuads" 
          :key="quad"
        >
          <td>{{ quad.subject.value }}</td>
          <td>{{ quad.predicate.value }}</td>
          <td>{{ quad.object.value }}</td>
          <td v-if="quad.object.datatype">
            {{ quad.object.datatype.value }}
          </td>
          <td v-else />
          <td v-if="quad.object.language">
            {{ quad.object.language }}
          </td>
          <td v-else />
        </tr>
      </tbody>
    </vl-data-table>
  </div>
</template>

<script>
export default {
    name: "TableComponent",
    props: {
        quads: {
          type: Array,
          default: null
        }
    },
    data(){
      mutableQuads: quads
    }
}
</script>

<style lang="scss">
@import "~@govflanders/vl-ui-core/src/scss/core";
@import "~@govflanders/vl-ui-data-table/src/scss/data-table";

vl-data-table tbody tr {
    font-size: 50% !important;
}

th {
    position: sticky !important;
    top: 0 !important;
    background: #cbd2da !important;
}
</style>
