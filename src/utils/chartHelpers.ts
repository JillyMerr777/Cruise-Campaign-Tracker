export const chartPalette = {
  teal: '#00C8F4',
  aqua: '#36E3FF',
  sky: '#2F83FF',
  coral: '#FF4FA2',
  violet: '#6A5BFF',
  lavender: '#A789FF',
  mint: '#12D6B8',
  amber: '#FFCA2B'
};

const chartInteractionEvents = ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'] as (
  | 'mousemove'
  | 'mouseout'
  | 'click'
  | 'touchstart'
  | 'touchmove'
)[];

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false
  },
  hover: {
    mode: 'nearest' as const,
    intersect: false
  },
  events: chartInteractionEvents,
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
      enabled: true,
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
  interaction: {
    mode: 'nearest' as const,
    intersect: false
  },
  events: chartInteractionEvents,
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
      enabled: true,
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
