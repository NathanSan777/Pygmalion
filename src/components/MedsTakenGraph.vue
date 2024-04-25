<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
<script>
import Chart from 'chart.js/auto';
  
export default {
    props: ['medsData'],
    mounted() {
      this.renderChart();
    },
    watch: {
      medsData: {
        handler() {
          this.renderChart();
        },
        deep: true,
      },
    },
    methods: {
      renderChart() {
        if (this.medsData) {
          const ctx = this.$refs.chartCanvas.getContext('2d');
          const totalCheckIns = this.medsData.totalCheckIns;
          const medsTakenCount = this.medsData.medsTakenCount;
  
          // Calculate the proportion of days with medication taken
          const medsPercentage = (medsTakenCount / totalCheckIns) * 100;
          const noMedsPercentage = 100 - medsPercentage;
  
          // Render the pie chart
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['Meds Taken', 'No Meds Taken'],
              datasets: [{
                data: [medsPercentage, noMedsPercentage],
                backgroundColor: ['powderblue', 'coral'],
                borderColor: 'black', 
                borderWidth: 1, 
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Medication Taken Ratio',
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
  
  <style>
  /* Add styles as needed */
  </style>
  