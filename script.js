
        // Sidebar toggle for mobile
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebarClose = document.getElementById('sidebar-close');
        const sidebar = document.querySelector('.sidebar');
        
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
        
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
        
        // Initialize charts
        document.addEventListener('DOMContentLoaded', function() {
            // Portfolio Performance Chart
            const portfolioCtx = document.getElementById('portfolioChart').getContext('2d');
            const portfolioChart = new Chart(portfolioCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Portfolio Value',
                        data: [85000, 88000, 91000, 89000, 92000, 95000, 98000, 101000, 105000, 110000, 115000, 120000],
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(79, 70, 229, 0.05)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#4f46e5',
                        pointRadius: 3,
                        pointHoverRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: '#1f2937',
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 12
                            },
                            padding: 12,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.parsed.y.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                drawBorder: false,
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'k';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest'
                    }
                }
            });
            
            // Asset Allocation Chart
            const allocationCtx = document.getElementById('allocationChart').getContext('2d');
            const allocationChart = new Chart(allocationCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Stocks', 'Bonds', 'Cash', 'Alternative'],
                    datasets: [{
                        data: [62, 18, 12, 8],
                        backgroundColor: [
                            '#4f46e5',
                            '#3b82f6',
                            '#10b981',
                            '#f59e0b'
                        ],
                        borderWidth: 0,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#1f2937',
                            bodyFont: {
                                size: 12
                            },
                            padding: 12,
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.raw + '%';
                                }
                            }
                        }
                    }
                }
            });
            
            // Performance Comparison Chart
            const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
            const comparisonChart = new Chart(comparisonCtx, {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [
                        {
                            label: 'Your Portfolio',
                            data: [5, 12, 8, 18],
                            borderColor: '#4f46e5',
                            backgroundColor: 'rgba(79, 70, 229, 0.05)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#4f46e5',
                            pointRadius: 3,
                            pointHoverRadius: 5
                        },
                        {
                            label: 'S&P 500',
                            data: [3, 6, 4, 12],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.05)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#10b981',
                            pointRadius: 3,
                            pointHoverRadius: 5,
                            borderDash: [5, 5]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: '#1f2937',
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 12
                            },
                            padding: 12,
                            cornerRadius: 8,
                            displayColors: true,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest'
                    }
                }
            });
            
            // Simulate real-time data updates
            setInterval(() => {
                // Update portfolio chart
                const portfolioData = portfolioChart.data.datasets[0].data;
                const lastValue = portfolioData[portfolioData.length - 1];
                const newValue = lastValue * (1 + (Math.random() * 0.02 - 0.01));
                portfolioData.shift();
                portfolioData.push(Math.round(newValue));
                portfolioChart.update();
                
                // Update today's change card
                const change = ((newValue - lastValue) / lastValue * 100).toFixed(2);
                const changeElement = document.querySelector('.text-2xl.font-bold.mt-1.text-green-500');
                const changePercentElement = document.querySelector('.text-green-500.text-sm.font-medium.flex.items-center');
                
                if (change >= 0) {
                    changeElement.textContent = `+$${Math.round(newValue - lastValue).toLocaleString()}`;
                    changeElement.className = 'text-2xl font-bold mt-1 text-green-500';
                    changePercentElement.innerHTML = `<i class="fas fa-arrow-up mr-1"></i> ${change}%`;
                    changePercentElement.className = 'text-green-500 text-sm font-medium flex items-center';
                } else {
                    changeElement.textContent = `-$${Math.round(lastValue - newValue).toLocaleString()}`;
                    changeElement.className = 'text-2xl font-bold mt-1 text-red-500';
                    changePercentElement.innerHTML = `<i class="fas fa-arrow-down mr-1"></i> ${Math.abs(change)}%`;
                    changePercentElement.className = 'text-red-500 text-sm font-medium flex items-center';
                }
                
                // Update ticker tape
                const tickerItems = document.querySelectorAll('.ticker-tape > div');
                tickerItems.forEach(item => {
                    const changeElement = item.querySelector('span:not(.font-bold):not(.text-xs)');
                    const percentElement = item.querySelector('.text-xs');
                    
                    const currentValue = parseFloat(changeElement.textContent.match(/[\d,]+\.\d{2}/)[0].replace(/,/g, ''));
                    const changePercent = (Math.random() * 2 - 1).toFixed(2);
                    const newValue = currentValue * (1 + changePercent / 100);
                    
                    if (changePercent >= 0) {
                        changeElement.innerHTML = `↑ ${newValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                        changeElement.className = 'text-green-400 mr-1';
                        percentElement.textContent = `(+${changePercent}%)`;
                    } else {
                        changeElement.innerHTML = `↓ ${newValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                        changeElement.className = 'text-red-400 mr-1';
                        percentElement.textContent = `(${changePercent}%)`;
                    }
                });
                
                // Randomly update some holdings
                const holdingRows = document.querySelectorAll('tbody tr');
                holdingRows.forEach(row => {
                    if (Math.random() > 0.7) { // 30% chance to update each holding
                        const changeCell = row.querySelector('td:last-child');
                        const change = (Math.random() * 4 - 2).toFixed(2);
                        
                        if (change >= 0) {
                            changeCell.innerHTML = `<span class="text-green-500 font-medium">+${change}%</span>`;
                        } else {
                            changeCell.innerHTML = `<span class="text-red-500 font-medium">${change}%</span>`;
                        }
                    }
                });
                
            }, 3000); // Update every 3 seconds
        });
    