const ctx = document.getElementById('expenseChart').getContext('2d');

// Sample placeholder data (later fetch from backend)
const data = {
  labels: ['Food', 'Travel', 'Bills', 'Shopping', 'Others'],
  datasets: [{
    label: 'Expenses ($)',
    data: [400, 250, 300, 150, 100],
    backgroundColor: [
      '#5b2eae',
      '#8a4ff7',
      '#c285ff',
      '#d9b3ff',
      '#f0e5ff'
    ],
    borderColor: '#fff',
    borderWidth: 1
  }]
};

const expenseChart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#222', font: { size: 14 } }
      }
    }
  }
});
