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
        label: 'Dépenses mensuelles',
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(100, 200, 150, 0.2)',
          'rgba(255, 100, 200, 0.2)',
          'rgba(50, 150, 255, 0.2)',
          'rgba(150, 100, 250, 0.2)',
          'rgba(250, 200, 100, 0.2)',
        ],
        borderColor: 'rgb(230,0,38)',
        borderWidth: 3
      }]
    }
  
    const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 50, // adapte selon ton besoin
            color: 'rgb(255,255,255)' // couleur des ticks de l'axe Y
          },
          grid: {
            color: 'rgb(25,28,36)', // couleur de la grille sur l'axe Y
          }
        },
        x: {
          ticks: {
            color: 'rgb(255,255,255)' // couleur des ticks de l'axe X
          },
          grid: {
            color: 'rgb(25,28,36)' // couleur de la grille sur l'axe X
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgb(255,255,255)' // couleur du texte des légendes
          }
        },
        tooltip: {
          titleColor: 'rgb(255,255,255)', // couleur du titre des tooltips
          bodyColor: 'rgb(255,255,255)' // couleur du texte des tooltips
        }
      },
      title: {
        display: true,
        text: 'Dépenses mensuelles',
        color: 'rgb(255, 255, 255)', // couleur du titre du graphique
        font: {
          size: 18
        }
      }
    }
  }
    new Chart(spendingChart.value, config)
  })
  </script>
  