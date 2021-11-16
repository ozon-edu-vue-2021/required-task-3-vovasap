<template>
  <div class="menu">
    <div class="toolbar">
      <div class="toolbar__header">
        <h3>Информация</h3>
        <template v-if="isProfileOpened">
          <div class="close" @click="closeProfile">
            <img :src="require('@/assets/icons/close.png')" alt="close" />
          </div>
        </template>
      </div>
    </div>
    <div class="content">
      <div v-show="!isProfileOpened" class="legend">
        <div class="legend__data">
          <div v-if="legend.length > 0" class="legend__items">
            <Draggable>
              <LegendItem
                v-for="(item, index) in legend"
                :key="index"
                :color="item.color"
                :text="item.text"
                :counter="item.counter"
                class="legend__item"
              />
            </Draggable>
          </div>
          <span v-else class="legend--empty"> Список пуст </span>
        </div>
        <div class="legend__chart">
          <Pie ref="chart" />
        </div>
      </div>
      <div v-if="isProfileOpened" class="profile">
        <div v-if="!person" class="profile__empty">Место пустое</div>
        <PersonCard :person="person" v-click-outside="closeProfile" />
      </div>
    </div>
  </div>
</template>

<script>
import LegendItem from "./SideMenu/LegendItem.vue";
import PersonCard from "./SideMenu/PersonCard.vue";
import legend from "@/assets/data/legend.json";
import Draggable from "vuedraggable";
import { Pie } from "vue-chartjs";
import clickOutside from '@/directives/clickOutside.js';

export default {
  props: {
    isProfileOpened: {
      type: Boolean,
      default: false,
    },
    person: {
      type: Object,
      default: null,
    },
  },
  components: {
    LegendItem,
    PersonCard,
    Draggable,
    Pie,
  },
  directives: {
    clickOutside, 
  },
  data() {
    return {
      legend: [],
    };
  },
  created() {
    this.loadLegend();
  },
  mounted() {
    this.makeChart();
  },
  methods: {
    loadLegend() {
      this.legend = legend;
    },
    closeProfile() {
      this.$emit("update:isProfileOpened", false);
    },
    makeChart() {
      const chartData = {
        labels: this.legend.map((legendItem) => legendItem.text),
        datasets: [
          {
            label: "Легенда",
            backgroundColor: this.legend.map((legendItem) => legendItem.color),
            data: this.legend.map((legendItem) => legendItem.counter),
          },
        ],
      };
      const options = {
        legend: {
          display: false,
        },
      };

      this.$refs.chart.renderChart(chartData, options);
    },
  },
};
</script>

<style scoped>
.menu {
  border-left: 1px solid #ccd8e4;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar__header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
}

.toolbar__header .close {
  cursor: pointer;
}

h3 {
  margin: 0;
}

.content {
  flex: 1;
}

.content .legend {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.content .legend .legend__data {
  display: flex;
  height: 100%;
}

.content .legend .legend__items {
  flex: 1;
  width: 100%;
}

.content .legend .legend__items .legend__item:not(:first-child) {
  margin-top: 16px;
}

.content .legend .legend__items .legend__item {
  cursor: pointer;
}

.content .legend .legend__items .legend__item.sortable-chosen {
  opacity: 25%;
}

.content .legend .legend--empty {
  align-self: center;
  width: 100%;
  text-align: center;
}

.profile {
  padding-top: 20px;
}
</style>
