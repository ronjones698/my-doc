<template>
  <div class="card">
    <Header />
    <TableRow />
    <TableRow />
    <TableRow />
    <TableRow />
    <TableRow />
    <TableRow />
    <TableRow />

    <div class="pagination">
      <PaginationDiv />
    </div>
  </div>
</template>

<script>
import Header from "@/components/AccessHeader.vue";
import TableRow from "@/components/AccessRow.vue";
import PaginationDiv from "@/components/PaginationDiv.vue";

export default {
  components: {
    Header,
    TableRow,
    PaginationDiv,
  },
};
</script>
<style scoped>
.card {
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin: 20px;
  padding: 15px;
  width: 98%;
  flex: 1;
  max-height: 58vh;
}
.pagination {
  bottom: 0;
}
</style>
