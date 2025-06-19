// Enhanced chart data supporting multiple time periods
const chartData = {
    months: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        pageVisits: [700, 720, 740, 750, 760, 780, 820, 850, 1000, 850, 800, 900],
        clicks: [500, 520, 530, 540, 550, 580, 600, 650, 700, 300, 600, 620]
    },
    weeks: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12', 'W13', 'W14', 'W15', 'W16', 'W17', 'W18', 'W19', 'W20', 'W21', 'W22', 'W23', 'W24', 'W25', 'W26', 'W27', 'W28', 'W29', 'W30'],
        pageVisits: [175, 180, 185, 180, 190, 195, 185, 188, 192, 198, 202, 195, 200, 205, 210, 208, 215, 220, 225, 212, 250, 240, 235, 230, 210, 200, 195, 205, 225, 230],
        clicks: [125, 130, 132, 135, 138, 140, 145, 148, 152, 155, 148, 150, 155, 160, 165, 162, 170, 175, 180, 75, 150, 155, 160, 165, 145, 140, 138, 155, 165, 170]
    },
    days: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        pageVisits: [45, 52, 48, 55, 62, 58, 65, 70, 68, 72, 75, 73, 78, 82, 80, 85, 88, 92, 90, 95, 98, 85, 88, 92, 90, 87, 85, 88, 95, 100, 105],
        clicks: [32, 38, 35, 40, 45, 42, 48, 52, 50, 55, 58, 56, 60, 65, 62, 68, 70, 72, 68, 24, 75, 65, 68, 72, 70, 68, 65, 68, 72, 78, 82]
    }
};

// Current time period setting
let currentTimePeriod = 'months';

// Function to update data table based on current time period
function updateDataTable() {
    const tableWrapper = document.querySelector('.table-wrapper');
    if (!tableWrapper) return;
    
    const data = chartData[currentTimePeriod];
    const labels = data.labels;
    const pageVisits = data.pageVisits;
    const clicks = data.clicks;
    
    // Calculate averages
    const avgPageVisits = Math.round(pageVisits.reduce((a, b) => a + b, 0) / pageVisits.length);
    const avgClicks = Math.round(clicks.reduce((a, b) => a + b, 0) / clicks.length);
    
    // Generate table HTML
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th class="sticky-col sticky-col-1">
                        <input type="checkbox" checked>
                        Metric <i class="fas fa-sort"></i>
                    </th>
                    <th class="sticky-col sticky-col-2">Average <i class="fas fa-sort"></i></th>`;
    
    // Add columns for each time period
    labels.forEach(label => {
        tableHTML += `<th>${label}</th>`;
    });
    
    tableHTML += `
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="sticky-col sticky-col-1">
                        <input type="checkbox" checked>
                        <span class="metric-indicator blue"></span>
                        A. Page Visits
                    </td>
                    <td class="sticky-col sticky-col-2">${avgPageVisits}</td>`;
    
    // Add data for each time period
    pageVisits.forEach(value => {
        tableHTML += `<td>${value}</td>`;
    });
    
    tableHTML += `
                </tr>
                <tr>
                    <td class="sticky-col sticky-col-1">
                        <input type="checkbox" checked>
                        <span class="metric-indicator orange"></span>
                        B. Clicks on page
                    </td>
                    <td class="sticky-col sticky-col-2">${avgClicks}</td>`;
    
    // Add data for each time period
    clicks.forEach(value => {
        tableHTML += `<td>${value}</td>`;
    });
    
    tableHTML += `
                </tr>
            </tbody>
        </table>`;
    
    tableWrapper.innerHTML = tableHTML;
}

// Function to change time period
function changeTimePeriod(newPeriod) {
    if (newPeriod === currentTimePeriod) return;
    
    currentTimePeriod = newPeriod;
    
    // Update chart
    if (chartInstance) {
        const option = generateChartOption(currentChartType);
        chartInstance.setOption(option, true);
    }
    
    // Update table
    updateDataTable();
    
    // Update campaign bars (they might need repositioning for different time periods)
    renderCampaignBars();
    
    // Update dropdown button text
    const dropdownBtn = document.getElementById('timePeriodDropdown');
    if (dropdownBtn) {
        const capitalizedPeriod = newPeriod.charAt(0).toUpperCase() + newPeriod.slice(0, -1);
        dropdownBtn.innerHTML = `${capitalizedPeriod} <i class="fas fa-chevron-down"></i>`;
    }
}

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
        trackedMetrics: ["pageVisits", "clicks"], // Both metrics tracked
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
        trackedMetrics: ["clicks"], // Only clicks tracked
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
        trackedMetrics: ["pageVisits"], // Only page visits tracked
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
        trackedMetrics: ["pageVisits", "clicks"], // Both metrics tracked
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
        trackedMetrics: [], // No metrics tracked - this campaign should not show
        startMonth: 1, // Feb
        endMonth: 2,   // Mar
        left: 8.33,    // Feb position
        width: 16.67   // 2 months width
    },
    {
        id: 6,
        name: "Homepage Hero Banner",
        type: "testing",
        status: "Running",
        creator: "Lisa Rodriguez",
        startDate: "2024-05-01",
        endDate: "2024-07-31",
        target: "New Visitors",
        variations: ["Control", "Video Hero", "Carousel Hero"],
        trackedMetrics: ["pageVisits"], // Only page visits tracked
        startMonth: 4, // May
        endMonth: 6,   // Jul
        left: 33.33,
        width: 25
    },
    {
        id: 7,
        name: "Pricing Page Redesign",
        type: "personalise",
        status: "Running",
        creator: "David Park",
        startDate: "2024-03-15",
        endDate: "2024-09-30",
        target: "Enterprise Leads",
        variations: ["Control", "Enterprise Focus"],
        trackedMetrics: ["clicks"], // Only clicks tracked
        startMonth: 2, // Mar
        endMonth: 8,   // Sep
        left: 16.67,
        width: 50
    },
    {
        id: 8,
        name: "Mobile App Banner",
        type: "rollouts",
        status: "Completed",
        creator: "Jennifer Lee",
        startDate: "2024-01-01",
        endDate: "2024-02-28",
        target: "Mobile Users",
        variations: ["App Download Banner"],
        trackedMetrics: ["pageVisits", "clicks"], // Both metrics tracked
        startMonth: 0, // Jan
        endMonth: 1,   // Feb
        left: 0,
        width: 16.67
    },
    {
        id: 9,
        name: "Exit Intent Popup",
        type: "testing",
        status: "Running",
        creator: "Carlos Martinez",
        startDate: "2024-06-01",
        endDate: "2024-08-15",
        target: "Desktop Users",
        variations: ["Control", "Discount Offer", "Newsletter Signup"],
        trackedMetrics: ["clicks"], // Only clicks tracked
        startMonth: 5, // Jun
        endMonth: 7,   // Aug
        left: 41.67,
        width: 25
    },
    {
        id: 10,
        name: "Footer Optimization",
        type: "testing",
        status: "Paused",
        creator: "Nina Patel",
        startDate: "2024-04-15",
        endDate: "2024-05-31",
        target: "All Traffic",
        variations: ["Control", "Minimal Footer", "Extended Footer"],
        trackedMetrics: [], // No metrics tracked - this campaign should not show
        startMonth: 3, // Apr
        endMonth: 4,   // May
        left: 25,
        width: 16.67
    },
    {
        id: 11,
        name: "Search Functionality",
        type: "personalise",
        status: "Running",
        creator: "Ahmed Hassan",
        startDate: "2024-07-01",
        endDate: "2024-11-30",
        target: "Return Visitors",
        variations: ["Control", "Personalized Results"],
        trackedMetrics: ["pageVisits"], // Only page visits tracked
        startMonth: 6, // Jul
        endMonth: 10,  // Nov
        left: 50,
        width: 41.67
    },
    {
        id: 12,
        name: "Cart Abandonment",
        type: "testing",
        status: "Running",
        creator: "Sophie Turner",
        startDate: "2024-08-01",
        endDate: "2024-10-31",
        target: "Shopping Cart Users",
        variations: ["Control", "Exit Survey", "Discount Reminder"],
        trackedMetrics: ["pageVisits", "clicks"], // Both metrics tracked
        startMonth: 7, // Aug
        endMonth: 9,   // Oct
        left: 58.33,
        width: 25
    },
    {
        id: 13,
        name: "Social Proof Widget",
        type: "rollouts",
        status: "Running",
        creator: "Marcus Johnson",
        startDate: "2024-09-01",
        endDate: "2024-12-31",
        target: "All Traffic",
        variations: ["Customer Reviews Widget"],
        trackedMetrics: ["clicks"], // Only clicks tracked
        startMonth: 8, // Sep
        endMonth: 11,  // Dec
        left: 66.67,
        width: 33.33
    },
    {
        id: 14,
        name: "FAQ Chatbot",
        type: "testing",
        status: "Scheduled",
        creator: "Rachel Kim",
        startDate: "2024-10-01",
        endDate: "2024-12-15",
        target: "Support Page Visitors",
        variations: ["Control", "AI Chatbot", "Live Chat"],
        trackedMetrics: ["pageVisits", "clicks"], // Both metrics tracked
        startMonth: 9, // Oct
        endMonth: 11,  // Dec
        left: 75,
        width: 25
    }
];

// Available metrics in the dashboard
const availableMetrics = {
    pageVisits: {
        name: "A. Page Visits",
        color: "blue",
        enabled: true // Based on what's currently active in left panel
    },
    clicks: {
        name: "B. Clicks on page", 
        color: "orange",
        enabled: true // Based on what's currently active in left panel
    }
};

// Function to get metrics that are both available in dashboard and tracked by campaign
function getDisplayableMetrics(campaign) {
    return campaign.trackedMetrics.map(metricKey => {
        const metric = availableMetrics[metricKey];
        if (!metric) return null;
        
        return {
            key: metricKey,
            name: metric.name,
            color: metric.color,
            enabled: metric.enabled,
            tracked: true
        };
    }).filter(metric => metric !== null);
}

// Function to filter campaigns that have at least one tracked metric that's available in dashboard
function getVisibleCampaigns() {
    return campaignData.filter(campaign => {
        // Campaign is visible if it tracks at least one metric that's available in dashboard
        return campaign.trackedMetrics.some(metricKey => {
            const metric = availableMetrics[metricKey];
            return metric && metric.enabled;
        });
    });
}

// Function to calculate campaign position based on actual chart grid
function calculateCampaignPosition(startMonth) {
    // With boundaryGap: false, months are positioned at specific points
    // Month 0 (Jan) is at the beginning, Month 11 (Dec) is at the end
    const timelineContainer = document.getElementById('campaignTimeline');
    
    if (!timelineContainer) {
        // Fallback calculation - simple percentage
        return (startMonth / 12) * 100;
    }
    
    // Account for timeline container's internal padding (8px each side)
    const timelineWidth = timelineContainer.offsetWidth;
    const internalPadding = 16; // 8px left + 8px right from CSS
    const usableWidth = timelineWidth - internalPadding;
    
    // With boundaryGap: false, we have 12 months spread across the usable width
    // Position each month at its proportional location
    const monthPosition = (startMonth / 11) * usableWidth; // Use 11 as divisor for 12 points (0-11)
    const positionWithPadding = monthPosition + 8; // Add back the 8px left padding
    const percentage = (positionWithPadding / timelineWidth) * 100;
    
    console.log('📍 Campaign position (ECharts aligned):', {
        startMonth,
        monthName: chartData.months.labels[startMonth],
        timelineWidth,
        usableWidth,
        monthPosition: monthPosition.toFixed(2),
        positionWithPadding: positionWithPadding.toFixed(2),
        percentage: percentage.toFixed(2)
    });
    
    return percentage;
}

// Function to calculate campaign width based on actual chart grid
function calculateCampaignWidth(startMonth, endMonth) {
    // Get the campaign timeline container dimensions
    const timelineContainer = document.getElementById('campaignTimeline');
    
    if (!timelineContainer) {
        // Fallback calculation - simple percentage based on month span
        return ((endMonth - startMonth + 1) / 12) * 100;
    }
    
    // Account for timeline container's internal padding (8px each side)
    const timelineWidth = timelineContainer.offsetWidth;
    const internalPadding = 16; // 8px left + 8px right from CSS
    const usableWidth = timelineWidth - internalPadding;
    
    // Calculate width based on month span with ECharts positioning
    // Since months are positioned from 0 to 11, the width spans the difference
    const monthSpan = endMonth - startMonth;
    const widthInPixels = (monthSpan / 11) * usableWidth; // Use 11 as divisor for positioning consistency
    const percentage = (widthInPixels / timelineWidth) * 100;
    
    console.log('📏 Campaign width (ECharts aligned):', {
        startMonth,
        endMonth,
        monthSpan,
        timelineWidth,
        usableWidth,
        widthInPixels: widthInPixels.toFixed(2),
        percentage: percentage.toFixed(2)
    });
    
    return percentage;
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
    console.log('Current time period:', currentTimePeriod);
    console.log('Chart Instance:', !!chartInstance);
    console.log('Tracked metrics:', campaign.trackedMetrics);
    
    if (!chartInstance) {
        console.log('❌ Chart instance not available');
        return;
    }
    
    try {
        // Get current labels based on time period
        const currentLabels = chartData[currentTimePeriod].labels;
        
        // For campaigns that are based on months, we need to map them to current time period
        let startLabel, endLabel;
        
        if (currentTimePeriod === 'months') {
            // Direct mapping for months
            startLabel = currentLabels[campaign.startMonth];
            endLabel = currentLabels[campaign.endMonth];
        } else if (currentTimePeriod === 'weeks') {
            // Map month indices to week indices (approximate)
            const startWeek = Math.floor(campaign.startMonth * 4.33); // ~4.33 weeks per month
            const endWeek = Math.floor(campaign.endMonth * 4.33);
            startLabel = currentLabels[Math.min(startWeek, currentLabels.length - 1)];
            endLabel = currentLabels[Math.min(endWeek, currentLabels.length - 1)];
        } else if (currentTimePeriod === 'days') {
            // Map month indices to day indices (approximate)
            const startDay = Math.floor(campaign.startMonth * 2.5); // Rough mapping
            const endDay = Math.floor(campaign.endMonth * 2.5);
            startLabel = currentLabels[Math.min(startDay, currentLabels.length - 1)];
            endLabel = currentLabels[Math.min(endDay, currentLabels.length - 1)];
        }
        
        console.log('Campaign dates - Start:', startLabel, 'End:', endLabel);
        
        if (!startLabel) {
            console.log('❌ Could not determine start label for campaign');
            return;
        }
        
        // Create vertical markLine option for campaign start and end
        const markLineOption = {
            silent: true,
            animation: false,
            symbol: ['none', 'none'],
            lineStyle: {
                type: 'dashed',
                color: getCampaignColor(campaign.type),
                width: 1,
                opacity: 0.9
            },
            label: {
                show: false
            },
            data: [
                // Vertical line for campaign start
                {
                    xAxis: startLabel
                },
                // Vertical line for campaign end (only if different from start and exists)
                ...(endLabel && startLabel !== endLabel ? [{ xAxis: endLabel }] : [])
            ]
        };
        
        // Update chart with series styling - disable lines for untracked metrics
        const seriesUpdates = [];
        
        // Page Visits series (series[0])
        const pageVisitsTracked = campaign.trackedMetrics.includes('pageVisits');
        seriesUpdates.push({
            lineStyle: {
                opacity: pageVisitsTracked ? 1 : 0.3,
                type: pageVisitsTracked ? 'solid' : 'dotted'
            },
            itemStyle: {
                opacity: pageVisitsTracked ? 1 : 0.3
            },
            markLine: markLineOption
        });
        
        // Clicks series (series[1])
        const clicksTracked = campaign.trackedMetrics.includes('clicks');
        seriesUpdates.push({
            lineStyle: {
                opacity: clicksTracked ? 1 : 0.3,
                type: clicksTracked ? 'solid' : 'dotted'
            },
            itemStyle: {
                opacity: clicksTracked ? 1 : 0.3
            }
        });
        
        chartInstance.setOption({
            series: seriesUpdates
        }, false);
        
        console.log('✅ Campaign lines and metric styling applied!', {
            pageVisitsTracked,
            clicksTracked
        });
        
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
        // Restore normal metric styling and remove markLine
        const seriesUpdates = [];
        
        // Page Visits series (series[0]) - restore normal styling
        seriesUpdates.push({
            lineStyle: {
                opacity: 1,
                type: 'solid'
            },
            itemStyle: {
                opacity: 1
            },
            markLine: {
                data: []
            }
        });
        
        // Clicks series (series[1]) - restore normal styling
        seriesUpdates.push({
            lineStyle: {
                opacity: 1,
                type: 'solid'
            },
            itemStyle: {
                opacity: 1
            }
        });
        
        chartInstance.setOption({
            series: seriesUpdates
        }, false);
        
        console.log('✅ Campaign lines hidden and metric styling restored!');
        
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
            left: type === 'bar' ? '50px' : '40px',
            right: type === 'bar' ? '50px' : '40px',
            top: '5%',
            bottom: '10%',
            containLabel: false
        },
        xAxis: {
            type: 'category',
            data: chartData[currentTimePeriod].labels,
            boundaryGap: type === 'bar' ? true : false,
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
                data: chartData[currentTimePeriod].pageVisits,
                lineStyle: {
                    color: '#8b5cf6',
                    width: 3
                },
                itemStyle: {
                    color: '#8b5cf6',
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
                data: chartData[currentTimePeriod].clicks,
                lineStyle: {
                    color: '#ec4899',
                    width: 3
                },
                itemStyle: {
                    color: '#ec4899',
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
                data: chartData[currentTimePeriod].pageVisits,
                itemStyle: {
                    color: '#8b5cf6',
                    borderRadius: [2, 2, 0, 0]
                },
                barWidth: '15%',
                barGap: '20%',
                barMaxWidth: 30,
                emphasis: {
                    itemStyle: {
                        color: '#2563eb'
                    }
                }
            },
            {
                name: 'B. Clicks on page',
                type: 'bar',
                data: chartData[currentTimePeriod].clicks,
                itemStyle: {
                    color: '#f59e0b',
                    borderRadius: [2, 2, 0, 0]
                },
                barWidth: '15%',
                barMaxWidth: 30,
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
                data: chartData[currentTimePeriod].pageVisits,
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
                data: chartData[currentTimePeriod].clicks,
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
    chartContainer.style.width = '100%';
    chartContainer.style.height = '300px';

    // Initialize ECharts instance with proper pixel ratio for sharp rendering
    chartInstance = echarts.init(chartContainer, null, {
        devicePixelRatio: window.devicePixelRatio || 1,
        renderer: 'canvas',
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
    
    // Campaign bar hover effects are handled dynamically in renderCampaignBars function
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
    
    // Keep container responsive instead of setting fixed pixel widths
    chartContainer.style.width = '100%';
    chartContainer.style.height = '300px';
    
    // Let ECharts handle sizing automatically
    chartInstance.resize();
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
    initializeTimePeriodDropdown();
    
    // Initialize main action buttons
    initializeActionButtons();
    
    // Initialize data table with default data
    updateDataTable();
    
    // Render campaign bars
    renderCampaignBars();
    
    // Test campaign lines after initialization
    setTimeout(() => {
        console.log('🚀 Starting campaign lines test...');
        testCampaignLines();
    }, 3000);
});

// Initialize time period dropdown functionality
function initializeTimePeriodDropdown() {
    const dropdownToggle = document.getElementById('timePeriodDropdown');
    const dropdownMenu = document.getElementById('timePeriodMenu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    if (!dropdownToggle || !dropdownMenu) return;
    
    // Toggle dropdown on button click
    dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // Handle dropdown item selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const period = this.dataset.period;
            
            // Update active state
            dropdownItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Change time period
            changeTimePeriod(period);
            
            // Close dropdown
            dropdownMenu.classList.remove('show');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdownMenu.classList.remove('show');
        }
    });
}

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
    
    // Test campaign lines functionality after everything loads
    testCampaignLines();
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
    console.log('🎯 renderCampaignBars called');
    const timeline = document.getElementById('campaignTimeline');
    if (!timeline) {
        console.log('❌ campaignTimeline element not found!');
        return;
    }
    console.log('✅ Timeline element found');
    
    // Clear existing bars
    timeline.innerHTML = '';
    
    // Get only campaigns that have at least one tracked metric that's available in dashboard
    const visibleCampaigns = getVisibleCampaigns();
    console.log('📊 Visible campaigns (with tracked metrics):', visibleCampaigns.map(c => c.name));
    
    if (visibleCampaigns.length === 0) {
        console.log('ℹ️ No campaigns to display - no tracked metrics found');
        return;
    }
    
    // Calculate proper positioning based on chart months
    const updatedCampaigns = visibleCampaigns.map(campaign => ({
        ...campaign,
        left: calculateCampaignPosition(campaign.startMonth),
        width: calculateCampaignWidth(campaign.startMonth, campaign.endMonth)
    }));
    
    console.log('📊 Updated visible campaigns with positions:', updatedCampaigns);
    
    // Assign rows to prevent overlapping
    const campaignsWithRows = assignCampaignRows(updatedCampaigns);
    const maxRow = Math.max(...campaignsWithRows.map(c => c.row));
    
    console.log('🗂️ Campaigns with rows:', campaignsWithRows);
    console.log('📏 Max row:', maxRow);
    
    // Adjust timeline height based on number of rows
    timeline.style.minHeight = `${(maxRow + 1) * 32 + 16}px`;
    
    campaignsWithRows.forEach((campaign, index) => {
        console.log(`🏷️ Creating bar ${index + 1} for campaign:`, campaign.name, {
            left: campaign.left,
            width: campaign.width,
            row: campaign.row,
            top: campaign.row * 32 + 8
        });
        
        const bar = document.createElement('div');
        bar.className = `campaign-bar ${campaign.type}`;
        bar.style.left = `${campaign.left}%`;
        bar.style.width = `${campaign.width}%`;
        bar.style.top = `${campaign.row * 32 + 8}px`;
        bar.textContent = campaign.name;
        bar.dataset.campaignId = campaign.id;
        
        // Add date tooltips
        const startDate = new Date(campaign.startDate).toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short' 
        });
        const endDate = campaign.endDate === '2024-12-31' ? 'Present' : 
            new Date(campaign.endDate).toLocaleDateString('en-US', { 
                day: 'numeric', 
                month: 'short' 
            });
        
        const startTooltip = document.createElement('div');
        startTooltip.className = 'campaign-date-tooltip start';
        startTooltip.textContent = startDate;
        
        const endTooltip = document.createElement('div');
        endTooltip.className = 'campaign-date-tooltip end';
        endTooltip.textContent = endDate;
        
        bar.appendChild(startTooltip);
        bar.appendChild(endTooltip);
        
        // Add hover events for tooltip and chart lines
        bar.addEventListener('mouseenter', (e) => {
            console.log('Hovering over campaign:', campaign.name, 'Start month:', campaign.startMonth, 'End month:', campaign.endMonth);
            showCampaignTooltip(e, campaign, bar);
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
        
        timeline.appendChild(bar);
        console.log(`✅ Bar ${index + 1} added to timeline`);
    });
    
    console.log('🎯 renderCampaignBars completed');
}

// Function to show campaign tooltip
function showCampaignTooltip(event, campaign, barElement) {
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
    
    // Populate tracked metrics
    const metricsContainer = document.getElementById('tooltipMetrics');
    const metricsSection = document.getElementById('tooltipMetricsSection');
    metricsContainer.innerHTML = '';
    
    // Get all available metrics and mark which ones are tracked
    const allMetrics = [
        { key: 'pageVisits', name: 'A. Page Visits', color: 'blue' },
        { key: 'clicks', name: 'B. Clicks on page', color: 'orange' }
    ];
    
    allMetrics.forEach(metric => {
        const metricEl = document.createElement('div');
        const isTracked = campaign.trackedMetrics.includes(metric.key);
        metricEl.className = `campaign-tooltip-metric ${isTracked ? '' : 'disabled'}`;
        
        metricEl.innerHTML = `
            <span class="campaign-tooltip-metric-indicator ${metric.color}"></span>
            <span>${metric.name}</span>
        `;
        metricsContainer.appendChild(metricEl);
    });
    
    // Show metrics section only if campaign has tracked metrics
    if (campaign.trackedMetrics.length > 0) {
        metricsSection.style.display = 'block';
    } else {
        metricsSection.style.display = 'none';
    }
    
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
    } else if (campaign.status === 'Scheduled') {
        statusEl.style.background = '#e0e7ff';
        statusEl.style.color = '#6366f1';
    }
    
    // Position tooltip relative to the campaign bar
    positionTooltipNearBar(tooltip, barElement);
    tooltip.classList.add('visible');
}

// Function to position tooltip next to campaign bar (using fixed positioning)
function positionTooltipNearBar(tooltip, barElement) {
    if (!tooltip || !barElement) {
        console.log('❌ Missing tooltip or barElement');
        return;
    }
    
    console.log('🎯 Starting simple reliable tooltip positioning...');
    
    // Get bar position and viewport dimensions
    const barRect = barElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Use fixed tooltip dimensions based on CSS
    const tooltipWidth = 300; // min-width from CSS
    const tooltipHeight = 280; // estimated height
    const padding = 25; // Increased padding to prevent overlap
    const margin = 20; // margin from viewport edge
    
    console.log('📏 Measurements:', {
        bar: { left: barRect.left, right: barRect.right, top: barRect.top, bottom: barRect.bottom },
        viewport: { width: viewportWidth, height: viewportHeight },
        tooltip: { width: tooltipWidth, height: tooltipHeight }
    });
    
    // Calculate bar center for vertical alignment
    const barCenterY = barRect.top + (barRect.height / 2);
    
    let finalLeft, finalTop;
    
    // IMPROVED HORIZONTAL POSITIONING WITH OVERLAP PREVENTION
    // Try right side first
    const rightPosition = barRect.right + padding;
    if (rightPosition + tooltipWidth + margin <= viewportWidth) {
        finalLeft = rightPosition;
        console.log('✅ Positioned to RIGHT of bar');
    } else {
        // Try left side with extra safety margin
        const leftPosition = barRect.left - tooltipWidth - padding;
        if (leftPosition >= margin && leftPosition + tooltipWidth < barRect.left - 10) {
            // Additional check: ensure tooltip doesn't overlap with bar (10px safety margin)
            finalLeft = leftPosition;
            console.log('✅ Positioned to LEFT of bar with safety margin');
        } else {
            // If left positioning would overlap, choose the side with more space
            const spaceOnLeft = barRect.left;
            const spaceOnRight = viewportWidth - barRect.right;
            
            if (spaceOnRight >= spaceOnLeft) {
                // More space on right - position tooltip to right but within bounds
                finalLeft = Math.min(barRect.right + padding, viewportWidth - tooltipWidth - margin);
                console.log('⚠️ FORCED positioning to RIGHT (more space available)');
            } else {
                // More space on left - position tooltip to left but ensure no overlap
                finalLeft = Math.max(margin, Math.min(barRect.left - tooltipWidth - padding, barRect.left - tooltipWidth - 15));
                console.log('⚠️ FORCED positioning to LEFT with no-overlap guarantee');
            }
        }
    }
    
    // SIMPLE VERTICAL POSITIONING
    // Center tooltip with bar, but keep within viewport
    const idealTop = barCenterY - (tooltipHeight / 2);
    finalTop = Math.max(margin, Math.min(idealTop, viewportHeight - tooltipHeight - margin));
    
    // Final overlap check
    const tooltipRight = finalLeft + tooltipWidth;
    const hasOverlap = (finalLeft < barRect.right && tooltipRight > barRect.left);
    
    console.log('🎯 FINAL POSITION:', { 
        left: finalLeft, 
        top: finalTop,
        tooltipRight: tooltipRight,
        barLeft: barRect.left,
        barRight: barRect.right,
        hasOverlap: hasOverlap
    });
    
    if (hasOverlap) {
        console.log('⚠️ WARNING: Tooltip may still overlap with campaign bar!');
    }
    
    // Apply positioning immediately
    tooltip.style.position = 'fixed';
    tooltip.style.left = `${finalLeft}px`;
    tooltip.style.top = `${finalTop}px`;
    tooltip.style.transform = 'none';
    tooltip.style.zIndex = '9999';
    tooltip.style.visibility = 'visible';
    tooltip.style.display = 'block';
    
    console.log('✅ Tooltip positioned with simple reliable logic');
}

// Function to hide campaign tooltip
function hideCampaignTooltip() {
    const tooltip = document.getElementById('campaignTooltip');
    if (tooltip) {
        tooltip.classList.remove('visible');
        // Clear inline styles that might override CSS
        tooltip.style.display = '';
        tooltip.style.visibility = '';
        tooltip.style.left = '';
        tooltip.style.top = '';
        console.log('🙈 Tooltip hidden and styles cleared');
    }
}

// Test campaign tooltip functionality
function testCampaignTooltip() {
    console.log('🧪 Testing campaign tooltip functionality...');
    
    // Check if tooltip element exists
    const tooltip = document.getElementById('campaignTooltip');
    console.log('Tooltip element found:', !!tooltip);
    
    // Check if campaign timeline exists
    const timeline = document.getElementById('campaignTimeline');
    console.log('Campaign timeline found:', !!timeline);
    
    // Check if campaign bars exist
    const bars = document.querySelectorAll('.campaign-bar');
    console.log('Number of campaign bars found:', bars.length);
    
    if (bars.length > 0) {
        console.log('First campaign bar details:', {
            className: bars[0].className,
            textContent: bars[0].textContent,
            style: bars[0].style.cssText
        });
        
        // Test tooltip on first bar
        const firstBar = bars[0];
        const campaign = campaignData[0];
        
        console.log('📋 Testing tooltip with first campaign:', campaign);
        showCampaignTooltip(null, campaign, firstBar);
        
        setTimeout(() => {
            hideCampaignTooltip();
            console.log('✅ Test tooltip hidden');
        }, 3000);
    }
    
    return {
        tooltip: !!tooltip,
        timeline: !!timeline,
        barCount: bars.length,
        campaignDataLength: campaignData?.length || 0
    };
}

// Test campaign lines functionality
function testCampaignLines() {
    setTimeout(() => {
        if (chartInstance && campaignData.length > 0) {
            console.log('🧪 Testing vertical campaign lines with first campaign:', campaignData[0]);
            console.log('📍 Should show vertical dashed lines at months:', 
                chartData.months[campaignData[0].startMonth], 'and', 
                chartData.months[campaignData[0].endMonth]);
            
            showCampaignLines(campaignData[0]);
            
            // Hide after 4 seconds to give more time to see
            setTimeout(() => {
                hideCampaignLines();
                console.log('✅ Test campaign lines hidden - hover over campaign bars to see lines again');
            }, 4000);
        } else {
            console.log('⚠️ Cannot test - chartInstance or campaignData not available');
            console.log('Chart instance:', !!chartInstance);
            console.log('Campaign data length:', campaignData?.length || 0);
        }
    }, 2000);
}

// Debug function to manually show tooltip at specific position
function debugTooltip(x = 500, y = 300) {
    console.log('🐛 Debug tooltip at position:', { x, y });
    
    const tooltip = document.getElementById('campaignTooltip');
    if (!tooltip) {
        console.log('❌ Tooltip element not found!');
        return;
    }
    
    // Populate with dummy data
    document.getElementById('tooltipType').textContent = 'testing';
    document.getElementById('tooltipStatus').textContent = 'Running';
    document.getElementById('tooltipTitle').textContent = 'Debug Test Campaign';
    document.getElementById('tooltipCreator').textContent = 'Debug User';
    document.getElementById('tooltipDuration').textContent = 'Jan 1, 2024 - Dec 31, 2024';
    document.getElementById('tooltipTarget').textContent = 'All Users';
    
    // Clear variations
    const variationsContainer = document.getElementById('tooltipVariations');
    variationsContainer.innerHTML = '<span class="campaign-tooltip-variation">Control</span>';
    
    // Show tooltip
    tooltip.classList.add('visible');
    tooltip.style.position = 'fixed';
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.display = 'block';
    tooltip.style.visibility = 'visible';
    tooltip.style.zIndex = '9999';
    
    console.log('✅ Debug tooltip shown');
    
    // Hide after 5 seconds
    setTimeout(() => {
        hideCampaignTooltip();
        console.log('✅ Debug tooltip hidden');
    }, 5000);
}

// Debug function to check date tooltips
function debugDateTooltips() {
    console.log('🔍 Checking date tooltips...');
    
    const campaignBars = document.querySelectorAll('.campaign-bar');
    console.log(`Found ${campaignBars.length} campaign bars`);
    
    campaignBars.forEach((bar, index) => {
        const startTooltip = bar.querySelector('.campaign-date-tooltip.start');
        const endTooltip = bar.querySelector('.campaign-date-tooltip.end');
        
        console.log(`Bar ${index + 1}:`, {
            hasStartTooltip: !!startTooltip,
            hasEndTooltip: !!endTooltip,
            startText: startTooltip?.textContent,
            endText: endTooltip?.textContent,
            startVisible: startTooltip ? getComputedStyle(startTooltip).opacity : 'N/A',
            endVisible: endTooltip ? getComputedStyle(endTooltip).opacity : 'N/A',
            barOverflow: getComputedStyle(bar).overflow
        });
        
        // Force show tooltips for debugging
        if (startTooltip) {
            startTooltip.style.opacity = '1';
            startTooltip.style.background = 'red'; // Make it very visible
            console.log(`📍 Forced tooltip ${index + 1} start to be visible`);
        }
        if (endTooltip) {
            endTooltip.style.opacity = '1';
            endTooltip.style.background = 'blue'; // Make it very visible
            console.log(`📍 Forced tooltip ${index + 1} end to be visible`);
        }
    });
    
    // Reset after 3 seconds
    setTimeout(() => {
        campaignBars.forEach((bar) => {
            const startTooltip = bar.querySelector('.campaign-date-tooltip.start');
            const endTooltip = bar.querySelector('.campaign-date-tooltip.end');
            if (startTooltip) {
                startTooltip.style.opacity = '';
                startTooltip.style.background = '';
            }
            if (endTooltip) {
                endTooltip.style.opacity = '';
                endTooltip.style.background = '';
            }
        });
        console.log('🔄 Reset tooltips to normal state');
    }, 3000);
}

// Make test functions available globally for console testing
if (typeof window !== 'undefined') {
    window.testCampaignTooltip = testCampaignTooltip;
    window.debugTooltip = debugTooltip;
    window.debugDateTooltips = debugDateTooltips;
    console.log('✅ Debug functions loaded and available globally');
}

// Script initialization check
console.log('🚀 VWO Analytics Script loaded successfully');
console.log('Available debug functions:', {
    testCampaignTooltip: typeof window.testCampaignTooltip,
    debugTooltip: typeof window.debugTooltip
}); 