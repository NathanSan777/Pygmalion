<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
<script>
  import Chart from 'chart.js/auto';
  
  export default {
    props: ['chartData'],
    mounted() {
      this.renderChart();
    },
    watch: {
      chartData: {
        handler() {
          this.renderChart();
        },
        deep: true,
      },
    },
    methods: {

    renderChart() {

    if (this.chartData) {
        const ctx = this.$refs.chartCanvas.getContext('2d');
        // Check if there is an existing chart instance
        if (this.chartInstance) {
            this.chartInstance.destroy(); // Destroy the existing chart
      }
      // Render the new chart
      this.chartInstance = new Chart(ctx, {
        type: 'pie', // Change chart type to pie
        data: {
            labels: this.chartData.labels,
            datasets: [{
                data: this.chartData.data,
                backgroundColor: [
                'red', 'orange', 'gold', 'yellowgreen', 'green' 
                ],
                borderColor: 'black', // Set border color to black
                borderWidth: 1, // Set border width
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Daily Mood Breakdown",
              font: {
                size: 16
              }
            }
          }
        }
    });
        }
      }
    }
  }
</script>