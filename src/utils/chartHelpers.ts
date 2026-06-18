export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#d8e4ff'
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#c1d5ff' },
      grid: { color: 'rgba(255,255,255,0.08)' }
    },
    y: {
      ticks: { color: '#c1d5ff' },
      grid: { color: 'rgba(255,255,255,0.08)' }
    }
  }
};
