<template>
  <HospitalList type="End" />
</template>

<script>
import HospitalList from "./HospitalList";
import { wxShare } from "../common/mixins";
export default {
  name: "EndIndx",
  mixins: [wxShare],
  components: { HospitalList }
};
</script>
