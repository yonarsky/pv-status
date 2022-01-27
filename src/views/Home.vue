<template>
  <div class="home">
    <h1>PV Status Monitor</h1>
    <div class="enter-sn">
      <input
          v-model="data.sn"
          @keyup.enter="getPVStatus"
          placeholder="Enter SN"
          type="text"
      >
    </div>
    <div
        v-if="data.status"
        class="grid-info"
    >
      <h3>AC power: {{ data.status.result.acpower }} W</h3>
      <h3>Today: {{ data.status.result.yieldtoday }} kWh</h3>
      <h3>Total: {{ data.status.result.yieldtotal }} kWh</h3>
      <p>Upload time: {{ data.status.result.uploadTime }}</p>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";

export default {
  setup() {
    let data = reactive({
      sn: '',
      status: null
    })

    const apiUrl = 'http://localhost:3000/'

    const getPVStatus = () => {
      axios(`${apiUrl}?sn=${data.sn}`)
          .then(response => {
            data.status = response.data
          })
    }

    return {
      data,
      getPVStatus
    }
  }

}
</script>
