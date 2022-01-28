<template>
  <div class="home">
      <h1>
        <n-icon size="40" color="#0e7a0d">
          <SolarPanel />
        </n-icon>
        PV Status Monitor
      </h1>
      <div class="enter-sn">
        <n-space vertical>
          <n-input round
                   v-model:value="data.sn"
                   @keyup.enter="getPVStatus"
                   placeholder="Enter SN"
                   type="text"
          />
        </n-space>
      </div>
      <div
          v-if="data.status"
          class="grid-info"
      >
        <n-row>
          <n-col :span="6">
            <n-statistic label="AC power">
              <template #prefix>
                <n-icon>
                  <PowerRound />
                </n-icon>
              </template>
              <template #suffix>{{ data.status.result.acpower }} W</template>
            </n-statistic>
          </n-col>
          <n-col :span="6">
            <n-statistic label="Today">
              <template #prefix>
                <n-icon>
                  <WeatherSunny24Regular />
                </n-icon>
              </template>
              <template #suffix>{{ data.status.result.yieldtoday }} kWh</template>
            </n-statistic>
          </n-col>
          <n-col :span="6">
            <n-statistic label="Total">
              <template #prefix>
                <n-icon>
                  <FunctionsRound />
                </n-icon>
              </template>
              <template #suffix>{{ data.status.result.yieldtotal }} kWh</template>
            </n-statistic>
          </n-col>
          <n-col :span="6">
            <n-statistic label="Upload time">
              <template #prefix>
                <n-icon>
                  <CalendarClock20Regular />
                </n-icon>
              </template>
              <template #suffix>{{ data.status.result.uploadTime }}</template>
            </n-statistic>
          </n-col>
        </n-row>
      </div>

  </div>

</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import axios from "axios";
import { NInput, NIcon, NCol, NRow, NStatistic, NSpace } from 'naive-ui'
import { SolarPanel } from '@vicons/fa'
import { PowerRound, FunctionsRound } from '@vicons/material'
import { CalendarClock20Regular, WeatherSunny24Regular } from '@vicons/fluent'


export default defineComponent({
  components: {
    NInput,
    NIcon,
    SolarPanel,
    PowerRound,
    NCol,
    NRow,
    NStatistic,
    NSpace,
    CalendarClock20Regular,
    WeatherSunny24Regular,
    FunctionsRound
  },
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
      getPVStatus,
      value: ref(null),
    }
  }

})
</script>
