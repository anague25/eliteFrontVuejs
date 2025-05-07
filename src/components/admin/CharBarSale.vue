<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import axios from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null)
let chartInstance = null

const fetchMonthlyData = async () => {
    const response = await axios.get('/users/statistiques-mensuelles')
    const { monthly_totals, total_year } = response.data

    const labels = monthly_totals.map(item => item.month)
    const data = monthly_totals.map(item => item.total)

    // Destroy the previous chart if it exists
    if (chartInstance) {
        chartInstance.destroy()
    }

    // Create a new chart instance with the updated data
    chartInstance = new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Commandes par mois',
                    data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(230,0,38)',
                    borderWidth: 3,
                    color: 'rgb(255,255,255)',
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'rgb(255,255,255)' // couleur du texte des légendes
                    }
                },
                title: {
                    display: true,
                    color: 'rgb(255,255,255)',
                    text: `Total annuel : ${total_year} FCFA`,
                    font: {
                        size: 16,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw} FCFA`,
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => `${value} FCFA`,
                        color: 'rgb(255,255,255)',
                    },
                },
                x: {
                    ticks: {
                        color: 'rgb(255,255,255)', // couleur des ticks de l'axe X
                    },
                    grid: {
                        color: 'rgb(25,28,36)', // couleur de la grille sur l'axe X
                    },
                },
            },
        }
    })
}

onMounted(fetchMonthlyData)
</script>
