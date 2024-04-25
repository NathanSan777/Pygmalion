<template>
  <div>
    <canvas id="sleep-chart" width="400" height="400" </canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['sleepData'],

  mounted() {
    this.renderChart();
  },

  methods: {
    renderChart() {
      if (!this.sleepData){
        return;
      }
      console.log("sleepdata: ", this.sleepData);
      const ctx = document.getElementById('sleep-chart').getContext('2d');

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const dates = this.sleepData.map(entry => new Date(entry.timestamp.toDate()));
      dates.sort((a,b) => a - b);
      const hoursOfSleep = this.sleepData.map(entry => entry.hoursOfSleep);
      const minY = Math.min(...hoursOfSleep) - 1; // Subtracting 1 for some padding
      const maxY = Math.max(...hoursOfSleep) + 1; // Adding 1 for some padding


      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Hours of Sleep',
            data: hoursOfSleep,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              min: minY,
              max: maxY,
              title: {
                display: true,
                text: 'Hours of Sleep'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: "Sleep Over Time",
              fontSize: 16,
              fontColor: "black"
            }
          }
        },
      });
    }
  }
};
</script>
