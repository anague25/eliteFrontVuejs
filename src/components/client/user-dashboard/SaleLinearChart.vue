<template>
    <canvas ref="spendingChart"></canvas>
  </template>
  
  <script setup>
  import axios from '@/plugins/axios';
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  
  const spendingChart = ref(null)
  
  onMounted(async () => {
    const response = await axios.get(`/orders/sales`) // remplace 1 par l'id dynamique
    const chartData = response.data
  
    const labels = chartData.map(item => item.month)
    const dataValues = chartData.map(item => item.total)
  
    const data = {
  labels: labels,
  datasets: [{
    label:'Dépenses mensuelles',
    data: dataValues,
    fill: false,
    borderColor: 'rgb(0,153,77)',
    tension: 0.1
  }]
};
const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'rgb(254,253,255)' // Couleur du texte de la légende
          }
        },
        tooltip: {
          titleColor: 'rgb(254,253,255)', // Couleur du titre des tooltips
          bodyColor: 'rgb(254,253,255)' // Couleur du corps des tooltips
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'rgb(254,253,255)', // Couleur du texte des ticks sur l'axe X
          },
          title: {
            display: true,
            text: 'Mois', // Titre de l'axe X
            color: 'rgb(254,253,255)' // Couleur du titre de l'axe X
          }
        },
        y: {
          ticks: {
            color: 'rgb(254,253,255)', // Couleur du texte des ticks sur l'axe Y
          },
          title: {
            display: true,
            text: 'Dépenses (€)', // Titre de l'axe Y
            color: 'rgb(254,253,255)' // Couleur du titre de l'axe Y
          }
        }
      }
    }
  };
  
    new Chart(spendingChart.value, config)
  })
  </script>
  