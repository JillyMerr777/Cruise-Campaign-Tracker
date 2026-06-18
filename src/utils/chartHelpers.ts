export const chartPalette = {
  teal: '#2fcfd6',
  aqua: '#6be8f0',
  sky: '#67c8ff',
  coral: '#ff7f9f',
  violet: '#8c7cff',
  lavender: '#b39cff',
  mint: '#26cfa9',
  amber: '#ffc86b'
};

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#163155',
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 16
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.94)',
      titleColor: '#10233f',
      bodyColor: '#163155',
      borderColor: 'rgba(20,53,90,0.18)',
      borderWidth: 1,
      padding: 10,
      displayColors: true
    }
  },
  scales: {
    x: {
      ticks: { color: '#4f6b90' },
      grid: { color: 'rgba(20,53,90,0.09)' }
    },
    y: {
      ticks: { color: '#4f6b90' },
      grid: { color: 'rgba(20,53,90,0.09)' }
    }
  }
};

export const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '64%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#163155',
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 12
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.94)',
      titleColor: '#10233f',
      bodyColor: '#163155',
      borderColor: 'rgba(20,53,90,0.18)',
      borderWidth: 1,
      padding: 10,
      displayColors: true
    }
  }
};
