// Chart data matching the original design
const chartData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    pageVisits: [700, 720, 740, 750, 760, 780, 820, 850, 1000, 850, 800, 900],
    clicks: [500, 520, 530, 540, 550, 580, 600, 650, 700, 300, 600, 620]
};

// Campaign data with different types and realistic VWO campaigns - properly aligned with chart months
const campaignData = [
    {
        id: 1,
        name: "Navbar Test",
        type: "testing",
        status: "Running",
        creator: "Randeep Singh",
        startDate: "2024-02-01",
        endDate: "2024-06-15",
        target: "All Traffic",
        variations: ["Control", "V1 - Blue CTA", "V2 - Green CTA", "V3 - Red CTA", "V4 - Yellow CTA"],
        startMonth: 1, // Feb (0=Jan, 1=Feb, etc.)
        endMonth: 5,   // Jun
        left: 8.33,    // 1/12 * 100 = Feb position
        width: 41.67   // 5 months width
    },
    {
        id: 2,
        name: "Checkout Optimization",
        type: "personalise",
        status: "Running",
        creator: "Sarah Wilson",
        startDate: "2024-01-15",
        endDate: "2024-05-30",
        target: "Returning Users",
        variations: ["Control", "Personalized"],
        startMonth: 0, // Jan
        endMonth: 4,   // May
        left: 0,       // Jan position
        width: 41.67   // 5 months width
    },
    {
        id: 3,
        name: "Product Page Layout",
        type: "testing",
        status: "Completed",
        creator: "Mike Chen",
        startDate: "2024-03-01",
        endDate: "2024-04-15",
        target: "Mobile Users",
        variations: ["Control", "V1 - Grid Layout", "V2 - List Layout"],
        startMonth: 2, // Mar
        endMonth: 3,   // Apr
        left: 16.67,   // Mar position
        width: 16.67   // 2 months width
    },
    {
        id: 4,
        name: "Header Rollout",
        type: "rollouts",
        status: "Running",
        creator: "Alex Kumar",
        startDate: "2024-04-01",
        endDate: "2024-08-31",
        target: "All Traffic",
        variations: ["New Header"],
        startMonth: 3, // Apr
        endMonth: 7,   // Aug
        left: 25,      // Apr position
        width: 41.67   // 5 months width
    },
    {
        id: 5,
        name: "Button Color Test",
        type: "testing",
        status: "Paused",
        creator: "Emma Davis",
        startDate: "2024-02-15",
        endDate: "2024-03-30",
        target: "New Users",
        variations: ["Control", "Red Button", "Green Button"],
        startMonth: 1, // Feb
        endMonth: 2,   // Mar
        left: 8.33,    // Feb position
        width: 16.67   // 2 months width
    }
];

// Function to calculate campaign position based on month index (aligns with chart x-axis)
function calculateCampaignPosition(startMonth) {
    // Each month takes up 1/12th of the total width
    const monthWidth = 100 / 12;
    return startMonth * monthWidth;
}

// Function to calculate campaign width based on duration
function calculateCampaignWidth(startMonth, endMonth) {
    const monthWidth = 100 / 12;
    return (endMonth - startMonth + 1) * monthWidth;
}

// Function to get campaign color based on type
function getCampaignColor(type) {
    switch (type) {
        case 'testing': return '#3b82f6';
        case 'personalise': return '#10b981';
        case 'rollouts': return '#f59e0b';
        default: return '#6b7280';
    }
}

// Function to show dotted lines on chart for campaign duration
function showCampaignLines(campaign) {
    console.log('=== SHOWING CAMPAIGN LINES ===');
    console.log('Campaign:', campaign.name);
    console.log('Start Month Index:', campaign.startMonth, '-> Month Name:', chartData.months[campaign.startMonth]);
    console.log('End Month Index:', campaign.endMonth, '-> Month Name:', chartData.months[campaign.endMonth]);
    console.log('Chart Instance:', !!chartInstance);
    
    if (!chartInstance) {
        console.log('❌ Chart instance not available');
        return;
    }
    
    try {
        // Use month names from chartData instead of indices
        const startMonthName = chartData.months[campaign.startMonth];
        const endMonthName = chartData.months[campaign.endMonth];
        
        console.log('Using month names for markLine:', startMonthName, 'to', endMonthName);
        
        // Create markLine option
        const markLineOption = {
            silent: true,
            animation: false,
            symbol: ['none', 'none'],
            lineStyle: {
                type: 'dashed',
                color: getCampaignColor(campaign.type),
                width: 3,
                opacity: 0.9
            },
            label: {
                show: false
            },
            data: [
                {
                    xAxis: startMonthName,
                    yAxis: 'min'
                },
                {
                    xAxis: startMonthName,
                    yAxis: 'max'
                },
                {
                    xAxis: endMonthName,
                    yAxis: 'min'
                },
                {
                    xAxis: endMonthName,
                    yAxis: 'max'
                }
            ]
        };
        
        // Add markLine to the first series
        chartInstance.setOption({
            series: [
                {
                    markLine: markLineOption
                }
            ]
        }, false);
        
        console.log('✅ Campaign lines added successfully!');
        
    } catch (error) {
        console.error('❌ Error in showCampaignLines:', error);
    }
}

// Function to hide campaign lines
function hideCampaignLines() {
    console.log('=== HIDING CAMPAIGN LINES ===');
    
    if (!chartInstance) {
        console.log('❌ Chart instance not available');
        return;
    }
    
    try {
        // Remove markLine from first series
        chartInstance.setOption({
            series: [
                {
                    markLine: null
                }
            ]
        }, false);
        
        console.log('✅ Campaign lines hidden');
    } catch (error) {
        console.error('❌ Error in hideCampaignLines:', error);
    }
}

// Global chart instance
let chartInstance = null;
let currentChartType = 'line';

// Utility function to calculate percentage change
function calculatePercentageChange(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(0);
}

// Utility function to get trend indicator
function getTrendIndicator(change) {
    const changeNum = parseFloat(change);
    if (changeNum > 0) {
        return { symbol: '↗', color: '#10b981', sign: '+' };
    } else if (changeNum < 0) {
        return { symbol: '↘', color: '#ef4444', sign: '' };
    } else {
        return { symbol: '→', color: '#6b7280', sign: '' };
    }
}

// ECharts configuration generator
function generateChartOption(type = 'line') {
    const baseOption = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '3%',
            top: '5%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: chartData.months,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                color: '#6b7280',
                fontSize: 12,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1000,
            interval: 200,
            splitLine: {
                lineStyle: {
                    color: '#f3f4f6',
                    width: 1
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#6b7280',
                fontSize: 12,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            confine: true,
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            textStyle: {
                color: '#374151',
                fontSize: 13
            },
            extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); z-index: 9999;',
            formatter: function(params) {
                console.log('Tooltip formatter called:', params); // Debug log
                
                if (!params || params.length === 0) return '';
                
                let html = `<div style="font-weight: 600; margin-bottom: 8px; color: #111827;">${params[0].axisValue}</div>`;
                
                params.forEach(param => {
                    html += `
                        <div style="display: flex; align-items: center; margin-bottom: 4px;">
                            <span style="width: 8px; height: 8px; background: ${param.color}; border-radius: 50%; margin-right: 8px;"></span>
                            <span style="color: #374151;">${param.seriesName}: <strong>${param.value}</strong></span>
                        </div>
                    `;
                });
                
                return html;
            }
        },
        series: []
    };

    // Configure series based on chart type
    if (type === 'line') {
        baseOption.series = [
            {
                name: 'A. Page Visits',
                type: 'line',
                data: chartData.pageVisits,
                lineStyle: {
                    color: '#3b82f6',
                    width: 3
                },
                itemStyle: {
                    color: '#3b82f6',
                    borderColor: '#ffffff',
                    borderWidth: 2
                },
                symbol: 'circle',
                symbolSize: 8,
                emphasis: {
                    itemStyle: {
                        borderWidth: 3
                    },
                    symbolSize: 10
                },
                smooth: true,
                showSymbol: true
            },
            {
                name: 'B. Clicks on page',
                type: 'line',
                data: chartData.clicks,
                lineStyle: {
                    color: '#f59e0b',
                    width: 3
                },
                itemStyle: {
                    color: '#f59e0b',
                    borderColor: '#ffffff',
                    borderWidth: 2
                },
                symbol: 'circle',
                symbolSize: 8,
                emphasis: {
                    itemStyle: {
                        borderWidth: 3
                    },
                    symbolSize: 10
                },
                smooth: true,
                showSymbol: true
            }
        ];
    } else if (type === 'bar') {
        baseOption.series = [
            {
                name: 'A. Page Visits',
                type: 'bar',
                data: chartData.pageVisits,
                itemStyle: {
                    color: '#3b82f6',
                    borderRadius: [2, 2, 0, 0]
                },
                barWidth: '20%',
                barGap: '10%',
                emphasis: {
                    itemStyle: {
                        color: '#2563eb'
                    }
                }
            },
            {
                name: 'B. Clicks on page',
                type: 'bar',
                data: chartData.clicks,
                itemStyle: {
                    color: '#f59e0b',
                    borderRadius: [2, 2, 0, 0]
                },
                barWidth: '20%',
                emphasis: {
                    itemStyle: {
                        color: '#d97706'
                    }
                }
            }
        ];
    } else if (type === 'area') {
        baseOption.series = [
            {
                name: 'A. Page Visits',
                type: 'line',
                data: chartData.pageVisits,
                lineStyle: {
                    color: '#3b82f6',
                    width: 3
                },
                itemStyle: {
                    color: '#3b82f6'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(59, 130, 246, 0.3)'
                        }, {
                            offset: 1,
                            color: 'rgba(59, 130, 246, 0.05)'
                        }]
                    }
                },
                symbol: 'circle',
                symbolSize: 8,
                emphasis: {
                    symbolSize: 10
                },
                smooth: true,
                showSymbol: true
            },
            {
                name: 'B. Clicks on page',
                type: 'line',
                data: chartData.clicks,
                lineStyle: {
                    color: '#f59e0b',
                    width: 3
                },
                itemStyle: {
                    color: '#f59e0b'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(245, 158, 11, 0.3)'
                        }, {
                            offset: 1,
                            color: 'rgba(245, 158, 11, 0.05)'
                        }]
                    }
                },
                symbol: 'circle',
                symbolSize: 8,
                emphasis: {
                    symbolSize: 10
                },
                smooth: true,
                showSymbol: true
            }
        ];
    }

    return baseOption;
}

// Initialize chart
function initializeChart() {
    const chartContainer = document.getElementById('mainChart');
    if (!chartContainer) {
        console.error('Chart container not found!');
        return;
    }

    console.log('Initializing chart...'); // Debug log

    // Ensure container has proper dimensions
    const containerRect = chartContainer.parentElement.getBoundingClientRect();
    chartContainer.style.width = '100%';
    chartContainer.style.height = '300px';

    // Initialize ECharts instance with proper pixel ratio for sharp rendering
    chartInstance = echarts.init(chartContainer, null, {
        devicePixelRatio: window.devicePixelRatio || 1,
        renderer: 'canvas',
        width: containerRect.width || 800,
        height: 300,
        locale: 'EN'
    });
    
    console.log('Chart instance created:', chartInstance); // Debug log
    
    // Set initial chart option
    const option = generateChartOption(currentChartType);
    console.log('Setting chart option with tooltip enabled'); // Debug log
    chartInstance.setOption(option);
    
    console.log('Chart tooltip should now be working!');

    // Add event listeners for debugging
    chartInstance.on('mouseover', function(params) {
        console.log('Mouse over chart:', params);
    });

    chartInstance.on('mouseout', function(params) {
        console.log('Mouse out chart:', params);
    });

    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (chartInstance) {
                chartInstance.resize({
                    width: 'auto',
                    height: 'auto'
                });
            }
        }, 100);
    });

    // Ensure chart renders properly after initialization
    setTimeout(() => {
        if (chartInstance) {
            chartInstance.resize();
            console.log('Chart resized after initialization');
            
            // Render campaign bars after chart is fully ready
            renderCampaignBars();
            console.log('Campaign bars rendered after chart initialization');
            
            // Test campaign lines functionality
            testCampaignLines();
        }
    }, 100);
}

// Update chart type
function updateChartType(type) {
    if (!chartInstance) return;
    
    currentChartType = type;
    const option = generateChartOption(type);
    
    // Clear and set new option for clean transition
    chartInstance.clear();
    chartInstance.setOption(option);
    
    // Force resize to ensure proper rendering
    setTimeout(() => {
        if (chartInstance) {
            chartInstance.resize();
        }
    }, 50);
    
    // Update active button
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-type="${type}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    console.log(`Chart type changed to: ${type}`);
}

// Initialize chart type selector
function initializeChartTypeSelector() {
    const chartTypeButtons = document.querySelectorAll('.chart-type-btn');
    
    chartTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            updateChartType(type);
        });
    });
}

// Campaign toggle functionality
function initializeToggleFunctionality() {
    const showCampaignsToggle = document.getElementById('showCampaigns');
    const campaignBars = document.getElementById('campaignBars');
    
    if (showCampaignsToggle && campaignBars) {
        showCampaignsToggle.addEventListener('change', function() {
            if (this.checked) {
                campaignBars.classList.remove('hidden');
                campaignBars.style.display = 'block';
            } else {
                campaignBars.classList.add('hidden');
                campaignBars.style.display = 'none';
            }
        });
    }
}

// Button group functionality for date controls and view controls
function initializeButtonGroups() {
    // Date controls
    const dateButtons = document.querySelectorAll('.date-btn');
    dateButtons.forEach(button => {
        button.addEventListener('click', function() {
            dateButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Simulate data reload based on date range
            console.log('Date range changed to:', this.textContent.trim());
            // Here you could update the chart data based on the selected date range
        });
    });
    
    // View controls (now dropdown filters)
    const viewDropdowns = document.querySelectorAll('.view-controls .filter-btn');
    viewDropdowns.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.textContent.trim().replace(' ', '');
            console.log('View dropdown clicked:', filterType);
            // Here you would typically show a dropdown menu
            // For now, we'll just log the action
        });
    });
}

// Tab switching functionality
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const tabName = this.textContent.trim();
            console.log('Switched to tab:', tabName);
        });
    });
}

// Search functionality
function initializeSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Add hover effects and interactions
function initializeHoverEffects() {
    // Metric item hover effects
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#6366f1';
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = '#e2e8f0';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Campaign bar hover effects
    const campaignBars = document.querySelectorAll('.campaign-bar');
    campaignBars.forEach(bar => {
        bar.addEventListener('mouseenter', (e) => {
            console.log('Hovering over campaign:', campaign.name, 'Start month:', campaign.startMonth, 'End month:', campaign.endMonth);
            showCampaignTooltip(e, campaign);
            if (chartInstance) {
                console.log('Chart instance available, showing lines');
                showCampaignLines(campaign);
            } else {
                console.log('Chart instance not available yet');
            }
        });
        
        bar.addEventListener('mouseleave', () => {
            console.log('Mouse left campaign bar');
            hideCampaignTooltip();
            if (chartInstance) {
                hideCampaignLines();
            }
        });
        
        // Add click handler for campaign bars
        bar.addEventListener('click', function() {
            console.log('Campaign clicked:', this.className);
        });
    });
}

// Utility function to update chart data
function updateChartData(newData) {
    if (!chartInstance) return;
    
    // Update global data
    chartData.pageVisits = newData.pageVisits;
    chartData.clicks = newData.clicks;
    
    // Regenerate and set new option
    const option = generateChartOption(currentChartType);
    chartInstance.setOption(option);
    
    console.log('Chart data updated');
}

// Add metric functionality
function addNewMetric() {
    console.log('Adding new metric...');
    alert('Add new metric functionality would open a configuration modal here.');
}

// Edit metric functionality
function editMetric(metricId) {
    console.log('Editing metric:', metricId);
}

// Filter functionality
function applyFilter(filterType) {
    console.log('Applying filter:', filterType);
}

// Export functionality
function exportData(format) {
    console.log('Exporting data in format:', format);
    
    if (chartInstance) {
        // Export chart as image
        if (format === 'png') {
            const url = chartInstance.getDataURL({
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            const link = document.createElement('a');
            link.download = 'vwo-analytics-chart.png';
            link.href = url;
            link.click();
        }
    }
}

// Save report functionality
function saveReport() {
    console.log('Saving report...');
    
    // Simulate save success
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        saveBtn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.backgroundColor = '#6b46c1';
        }, 2000);
    }
}

// Utility function to ensure proper chart sizing
function ensureChartSize() {
    const chartContainer = document.getElementById('mainChart');
    if (!chartContainer || !chartInstance) return;
    
    const parent = chartContainer.parentElement;
    const parentRect = parent.getBoundingClientRect();
    
    // Set explicit dimensions
    chartContainer.style.width = parentRect.width + 'px';
    chartContainer.style.height = '300px';
    
    // Resize chart instance
    chartInstance.resize({
        width: parentRect.width,
        height: 300
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting initialization...'); // Debug log
    
    // Wait a bit for styles to load, then initialize chart
    setTimeout(() => {
        initializeChart();
        
        // Ensure proper sizing after initialization
        setTimeout(() => {
            ensureChartSize();
        }, 200);
    }, 100);
    
    // Initialize all interactive functionality
    initializeChartTypeSelector();
    initializeToggleFunctionality();
    initializeButtonGroups();
    initializeTabSwitching();
    initializeSearchFunctionality();
    initializeHoverEffects();
    
    // Initialize main action buttons
    initializeActionButtons();
    
    // Render campaign bars
    renderCampaignBars();
});

// Initialize action buttons
function initializeActionButtons() {
    // Save button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveReport);
    }
    
    // Add metric button
    const addMetricBtn = document.querySelector('.add-metric-btn');
    if (addMetricBtn) {
        addMetricBtn.addEventListener('click', addNewMetric);
    }
    
    // Edit buttons for metrics
    const editButtons = document.querySelectorAll('.metric-edit');
    editButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => editMetric(index));
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            applyFilter(this.textContent.trim());
        });
    });
    
    // Table layout button
    const tableLayoutBtn = document.querySelector('.table-layout-btn');
    if (tableLayoutBtn) {
        tableLayoutBtn.addEventListener('click', function() {
            console.log('Changing table layout...');
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveReport();
    }
    
    // Ctrl/Cmd + N to add new metric
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        addNewMetric();
    }
    
    // Number keys to switch chart types
    if (e.key === '1') {
        updateChartType('line');
    } else if (e.key === '2') {
        updateChartType('bar');
    } else if (e.key === '3') {
        updateChartType('area');
    }
    
    // Escape to close any open modals
    if (e.key === 'Escape') {
        console.log('Escape pressed - would close modals');
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('VWO Analytics Dashboard with ECharts loaded successfully');
    console.log('Load time:', performance.now(), 'ms');
    console.log('Available chart types: Line (1), Column (2), Area (3)');
});

// Expose functions for external use
window.VWODashboard = {
    updateChartType,
    updateChartData,
    exportData,
    saveReport
};

// Function to detect overlaps and assign rows
function assignCampaignRows(campaigns) {
    const rows = [];
    
    campaigns.forEach(campaign => {
        let assignedRow = 0;
        let placed = false;
        
        // Try to find a row where this campaign doesn't overlap
        while (!placed) {
            if (!rows[assignedRow]) {
                rows[assignedRow] = [];
            }
            
            // Check for overlaps with existing campaigns in this row based on months
            const hasOverlap = rows[assignedRow].some(existingCampaign => {
                const campaignStart = campaign.startMonth;
                const campaignEnd = campaign.endMonth;
                const existingStart = existingCampaign.startMonth;
                const existingEnd = existingCampaign.endMonth;
                
                // Two campaigns overlap if they share any months
                // No overlap if: campaign ends before existing starts OR campaign starts after existing ends
                return !(campaignEnd < existingStart || campaignStart > existingEnd);
            });
            
            if (!hasOverlap) {
                // Add a small gap between campaigns for visual clarity
                const campaignWithPosition = {
                    ...campaign,
                    row: assignedRow,
                    left: calculateCampaignPosition(campaign.startMonth),
                    width: calculateCampaignWidth(campaign.startMonth, campaign.endMonth)
                };
                rows[assignedRow].push(campaignWithPosition);
                placed = true;
            } else {
                assignedRow++;
            }
        }
    });
    
    return rows.flat();
}

// Function to render campaign bars
function renderCampaignBars() {
    const timeline = document.getElementById('campaignTimeline');
    if (!timeline) return;
    
    // Clear existing bars
    timeline.innerHTML = '';
    
    // Calculate proper positioning based on chart months
    const updatedCampaigns = campaignData.map(campaign => ({
        ...campaign,
        left: calculateCampaignPosition(campaign.startMonth),
        width: calculateCampaignWidth(campaign.startMonth, campaign.endMonth)
    }));
    
    // Assign rows to prevent overlapping
    const campaignsWithRows = assignCampaignRows(updatedCampaigns);
    const maxRow = Math.max(...campaignsWithRows.map(c => c.row));
    
    // Adjust timeline height based on number of rows
    timeline.style.minHeight = `${(maxRow + 1) * 32 + 16}px`;
    
    campaignsWithRows.forEach(campaign => {
        const bar = document.createElement('div');
        bar.className = `campaign-bar ${campaign.type}`;
        bar.style.left = `${campaign.left}%`;
        bar.style.width = `${campaign.width}%`;
        bar.style.top = `${campaign.row * 32 + 8}px`;
        bar.textContent = campaign.name;
        bar.dataset.campaignId = campaign.id;
        
        // Add hover events for tooltip and chart lines
        bar.addEventListener('mouseenter', (e) => {
            console.log('Hovering over campaign:', campaign.name, 'Start month:', campaign.startMonth, 'End month:', campaign.endMonth);
            showCampaignTooltip(e, campaign);
            if (chartInstance) {
                console.log('Chart instance available, showing lines');
                showCampaignLines(campaign);
            } else {
                console.log('Chart instance not available yet');
            }
        });
        bar.addEventListener('mouseleave', () => {
            console.log('Mouse left campaign bar');
            hideCampaignTooltip();
            if (chartInstance) {
                hideCampaignLines();
            }
        });
        bar.addEventListener('mousemove', updateTooltipPosition);
        
        timeline.appendChild(bar);
    });
}

// Function to show campaign tooltip
function showCampaignTooltip(event, campaign) {
    const tooltip = document.getElementById('campaignTooltip');
    if (!tooltip) return;
    
    // Populate tooltip content
    document.getElementById('tooltipType').textContent = campaign.type;
    document.getElementById('tooltipStatus').textContent = campaign.status;
    document.getElementById('tooltipTitle').textContent = campaign.name;
    document.getElementById('tooltipCreator').textContent = `Created by ${campaign.creator}`;
    
    // Format dates
    const startDate = new Date(campaign.startDate).toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
    const endDate = campaign.endDate === '2024-12-31' ? 'Present' : 
        new Date(campaign.endDate).toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    
    document.getElementById('tooltipDuration').textContent = `${startDate} - ${endDate}`;
    document.getElementById('tooltipTarget').textContent = campaign.target;
    
    // Populate variations
    const variationsContainer = document.getElementById('tooltipVariations');
    variationsContainer.innerHTML = '';
    campaign.variations.forEach(variation => {
        const variationEl = document.createElement('span');
        variationEl.className = 'campaign-tooltip-variation';
        variationEl.textContent = variation;
        variationsContainer.appendChild(variationEl);
    });
    
    // Update tooltip type styling based on campaign type
    const typeEl = document.getElementById('tooltipType');
    typeEl.className = 'campaign-tooltip-type';
    if (campaign.type === 'testing') {
        typeEl.style.background = '#eff6ff';
        typeEl.style.color = '#3b82f6';
    } else if (campaign.type === 'personalise') {
        typeEl.style.background = '#f0fdf4';
        typeEl.style.color = '#10b981';
    } else if (campaign.type === 'rollouts') {
        typeEl.style.background = '#fef3c7';
        typeEl.style.color = '#f59e0b';
    }
    
    // Update status styling
    const statusEl = document.getElementById('tooltipStatus');
    if (campaign.status === 'Running') {
        statusEl.style.background = '#dcfce7';
        statusEl.style.color = '#16a34a';
    } else if (campaign.status === 'Paused') {
        statusEl.style.background = '#fef3c7';
        statusEl.style.color = '#d97706';
    } else if (campaign.status === 'Completed') {
        statusEl.style.background = '#f1f5f9';
        statusEl.style.color = '#64748b';
    }
    
    // Position and show tooltip
    updateTooltipPosition(event);
    tooltip.classList.add('visible');
}

// Function to update tooltip position
function updateTooltipPosition(event) {
    const tooltip = document.getElementById('campaignTooltip');
    if (!tooltip || !tooltip.classList.contains('visible')) return;
    
    const rect = tooltip.getBoundingClientRect();
    const container = document.querySelector('.campaign-bars').getBoundingClientRect();
    
    let left = event.clientX - container.left + 10;
    let top = event.clientY - container.top + 10;
    
    // Adjust if tooltip goes off screen
    if (left + rect.width > container.width) {
        left = event.clientX - container.left - rect.width - 10;
    }
    
    if (top + rect.height > container.height) {
        top = event.clientY - container.top - rect.height - 10;
    }
    
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

// Function to hide campaign tooltip
function hideCampaignTooltip() {
    const tooltip = document.getElementById('campaignTooltip');
    if (tooltip) {
        tooltip.classList.remove('visible');
    }
}

// Test campaign lines functionality
function testCampaignLines() {
    setTimeout(() => {
        if (chartInstance && campaignData.length > 0) {
            console.log('🧪 Testing campaign lines with first campaign:', campaignData[0]);
            showCampaignLines(campaignData[0]);
            
            // Hide after 3 seconds
            setTimeout(() => {
                hideCampaignLines();
                console.log('✅ Test campaign lines hidden');
            }, 3000);
        } else {
            console.log('⚠️ Cannot test - chartInstance or campaignData not available');
        }
    }, 2000);
} 