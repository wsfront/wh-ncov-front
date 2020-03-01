<template>
  <HospitalList type="Front" />
</template>

<script>
import HospitalList from "./HospitalList";
import { wxShare } from "../common/mixins";
export default {
  name: "FrontIndx",
  mixins: [wxShare],
  components: { HospitalList }
};
</script>
