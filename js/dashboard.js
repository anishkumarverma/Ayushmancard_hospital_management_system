document.addEventListener('DOMContentLoaded', () => {
    // Check if staff is logged in
    if (!sessionStorage.getItem('staffLoggedIn')) {
        window.location.href = 'index.html';
        return;
    }

    // Update staff name in the dashboard
    const staffName = sessionStorage.getItem('staffName');
    document.querySelector('.user-profile span').textContent = staffName;

    // Add logout functionality
    document.querySelector('#logout').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('staffLoggedIn');
        sessionStorage.removeItem('staffName');
        window.location.href = 'index.html';
    });

    // Get all sections
    const dashboardSection = document.querySelector('.dashboard-stats');
    const addPatientSection = document.querySelector('.add-patient-section');
    const chatSection = document.querySelector('.chat-section');
    
    // Hide all sections except dashboard initially
    addPatientSection.style.display = 'none';
    chatSection.style.display = 'none';

    // Get all sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    // Initialize the pie chart outside the click event
    let patientStatusChart;

    function initializeChart() {
        const ctx = document.getElementById('patientStatusChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (patientStatusChart) {
            patientStatusChart.destroy();
        }

        patientStatusChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Active Patients', 'Recovered Patients', 'Total Patients'],
                datasets: [{
                    data: [45, 203, 248],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.9)',  // Active - slightly transparent
                        'rgba(33, 150, 243, 0.9)',  // Recovered
                        'rgba(255, 193, 7, 0.9)'    // Total
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverBackgroundColor: [
                        'rgba(76, 175, 80, 1)',    // Solid on hover
                        'rgba(33, 150, 243, 1)',
                        'rgba(255, 193, 7, 1)'
                    ],
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff',
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.2)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Patient Statistics',
                        font: {
                            size: 24,
                            weight: 'bold',
                            family: "'Arial', sans-serif"
                        },
                        padding: {
                            top: 20,
                            bottom: 20
                        },
                        color: '#333333'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333333',
                        bodyColor: '#333333',
                        bodyFont: {
                            size: 14
                        },
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value * 100) / total).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                elements: {
                    arc: {
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }
                }
            }
        });

        // Add shadow effect to the chart
        const chartArea = ctx.canvas;
        chartArea.style.filter = 'drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1))';
    }

    // Function to update chart data
    function updateChartData(active, recovered, total) {
        if (patientStatusChart) {
            patientStatusChart.data.datasets[0].data = [active, recovered, total];
            patientStatusChart.update();
        }
    }

    // Initialize chart when showing dashboard
    function showDashboard() {
        dashboardSection.style.display = 'grid';
        document.querySelector('.charts-section').style.display = 'flex';
        addPatientSection.style.display = 'none';
        chatSection.style.display = 'none';
        initializeChart(); // Initialize chart when dashboard is shown
    }

    // Add window resize event listener for chart responsiveness
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (document.querySelector('.charts-section').style.display !== 'none') {
                initializeChart();
            }
        }, 250);
    });

    // Show dashboard by default
    showDashboard();

    // Add click event listeners to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            // Add active class to clicked link
            link.parentElement.classList.add('active');

            // Get the href value to determine which section to show
            const section = link.getAttribute('href').substring(1);

            // Hide all sections first
            dashboardSection.style.display = 'none';
            addPatientSection.style.display = 'none';
            chatSection.style.display = 'none';

            // Show the appropriate section
            switch(section) {
                case 'dashboard':
                    showDashboard();
                    break;
                case 'add-patient':
                    dashboardSection.style.display = 'none';
                    document.querySelector('.charts-section').style.display = 'none';
                    addPatientSection.style.display = 'block';
                    chatSection.style.display = 'none';
                    break;
                case 'chat':
                    dashboardSection.style.display = 'none';
                    document.querySelector('.charts-section').style.display = 'none';
                    addPatientSection.style.display = 'none';
                    chatSection.style.display = 'block';
                    break;
                case 'logout':
                    window.location.href = 'index.html';
                    break;
                case 'notifications':
                    dashboardSection.style.display = 'none';
                    document.querySelector('.charts-section').style.display = 'none';
                    addPatientSection.style.display = 'none';
                    chatSection.style.display = 'none';
                    notificationsSection.style.display = 'block';
                    break;
                case 'patients':
                    dashboardSection.style.display = 'none';
                    document.querySelector('.charts-section').style.display = 'none';
                    addPatientSection.style.display = 'none';
                    chatSection.style.display = 'none';
                    notificationsSection.style.display = 'none';
                    patientListSection.style.display = 'block';
                    break;
            }
        });
    });

    // Fingerprint scanning functionality
    const startScanBtn = document.getElementById('startScan');
    const fingerprintBox = document.getElementById('fingerprintBox');
    const verificationStatus = document.getElementById('verificationStatus');
    const scanStatus = fingerprintBox.querySelector('.scan-status');

    if (startScanBtn) {
        startScanBtn.addEventListener('click', () => {
            // Start scanning animation
            fingerprintBox.classList.add('scanning');
            scanStatus.textContent = 'Scanning...';
            startScanBtn.disabled = true;

            // Simulate scanning process
            setTimeout(() => {
                fingerprintBox.classList.remove('scanning');
                scanStatus.textContent = 'Processing...';

                // Simulate verification
                setTimeout(() => {
                    scanStatus.textContent = 'Verified';
                    verificationStatus.classList.remove('hidden');
                    startScanBtn.textContent = 'Scan Complete';
                    startScanBtn.style.backgroundColor = '#4CAF50';
                }, 1500);
            }, 3000);
        });
    }

    const notificationsSection = document.querySelector('.notifications-section');
    const notificationBell = document.querySelector('.notifications');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const notificationCards = document.querySelectorAll('.notification-card');

    // Show notifications when clicking the bell icon
    notificationBell.addEventListener('click', () => {
        // Hide other sections
        dashboardSection.style.display = 'none';
        document.querySelector('.charts-section').style.display = 'none';
        addPatientSection.style.display = 'none';
        chatSection.style.display = 'none';
        
        // Show notifications
        notificationsSection.style.display = 'block';
        
        // Update notification count
        document.querySelector('.notification-count').style.display = 'none';
    });

    // Handle notification filters
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Show/hide notifications based on filter
            notificationCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const patientListSection = document.querySelector('.patient-list-section');
    const patientSearch = document.getElementById('patientSearch');
    const patientCards = document.querySelectorAll('.patient-card');

    // Handle patient search
    if (patientSearch) {
        patientSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            patientCards.forEach(card => {
                const patientName = card.querySelector('h3').textContent.toLowerCase();
                const patientId = card.querySelector('.patient-details span:nth-child(2)').textContent.toLowerCase();
                
                if (patientName.includes(searchTerm) || patientId.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Handle patient details button click
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const patientName = btn.closest('.patient-card').querySelector('h3').textContent;
            alert(`Viewing details for ${patientName}`); // Replace with actual details view
        });
    });
}); 