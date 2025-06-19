# VWO Analytics Dashboard

A modern, interactive analytics dashboard for VWO (Visual Website Optimizer) featuring campaign tracking, metrics visualization, and real-time data analysis.

![VWO Analytics Dashboard](https://img.shields.io/badge/VWO-Analytics%20Dashboard-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,...)

## 🚀 Live Demo

**[View Live Dashboard →](https://[username].github.io/vwo-analytics-dashboard/)**

## ✨ Features

### 📊 Interactive Data Visualization
- **Multiple Chart Types**: Line, Column, and Area charts
- **Dynamic Time Periods**: Switch between Months, Weeks, and Days
- **Real-time Updates**: Synchronized chart and table data
- **Responsive Design**: Optimized for all screen sizes

### 🎯 Campaign Management
- **Campaign Tracking**: Visual campaign bars with hover effects
- **Smart Tooltips**: Detailed campaign information with metrics
- **Campaign Types**: Testing, Personalise, and Rollouts
- **Date Tooltips**: Start/end dates on campaign hover
- **Metric Filtering**: Only show campaigns tracking active metrics

### 📈 Advanced Analytics
- **Sticky Table Columns**: Metric names and averages stay visible
- **Horizontal Scrolling**: Navigate through extensive date ranges
- **Search & Filter**: Find specific data points quickly
- **Campaign Lines**: Dashed lines showing campaign duration on charts

### 🎨 Modern UI/UX
- **Official VWO Branding**: Authentic logo and color scheme
- **Smooth Animations**: Enhanced user experience with transitions
- **Dark/Light Elements**: Professional dashboard aesthetics
- **Intuitive Navigation**: Easy-to-use controls and filters

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Apache ECharts 5.4.3
- **Icons**: Font Awesome 6.0.0
- **Hosting**: GitHub Pages
- **Development**: Python HTTP Server

## 📁 Project Structure

```
vwo-analytics-dashboard/
├── index.html          # Main dashboard page
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and chart logic
├── server.py           # Development server (Python)
├── VWO Logo.svg        # Official VWO logo
├── README.md           # Project documentation
└── script_backup.js    # Backup of previous script version
```

## 🚀 Quick Start

### Option 1: View Online
Simply visit the [live demo](https://[username].github.io/vwo-analytics-dashboard/) to use the dashboard immediately.

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/[username]/vwo-analytics-dashboard.git
   cd vwo-analytics-dashboard
   ```

2. **Start local server**
   ```bash
   # Using Python 3
   python3 server.py
   
   # Or using Python's built-in server
   python3 -m http.server 8000
   
   # Or using Node.js (if installed)
   npx serve .
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000` (or the port shown in terminal)

## 🎯 Usage Guide

### Dashboard Navigation
1. **Metrics Panel** (Left): Configure tracked metrics and filters
2. **Chart Area** (Center): Interactive visualizations with campaign overlays
3. **Data Table** (Bottom): Detailed metrics with sticky columns

### Chart Interactions
- **Hover**: View data points and campaign information
- **Chart Types**: Switch between Line, Column, and Area
- **Time Periods**: Toggle between Months, Weeks, and Days
- **Campaign Toggle**: Show/hide campaign visualization

### Campaign Features
- **Campaign Bars**: Visual representation of campaign duration
- **Hover Effects**: Dashed lines on chart + detailed tooltips
- **Metric Tracking**: Only campaigns tracking active metrics are shown
- **Date Information**: Start/end dates appear on campaign bar edges

## 🔧 Customization

### Adding New Metrics
```javascript
// In script.js - Add to availableMetrics object
const availableMetrics = {
    newMetric: {
        name: "C. New Metric Name",
        color: "#custom-color",
        enabled: true
    }
};
```

### Adding New Campaigns
```javascript
// In script.js - Add to campaignData array
{
    id: X,
    name: "Campaign Name",
    type: "testing", // or "personalise", "rollouts"
    status: "Running",
    trackedMetrics: ["pageVisits", "clicks"],
    // ... other properties
}
```

### Styling Modifications
Edit `styles.css` to customize:
- Colors and branding
- Layout and spacing
- Animation effects
- Responsive breakpoints

## 🌟 Key Features Explained

### Campaign-Metric Integration
The dashboard intelligently shows only campaigns that track at least one active metric, ensuring relevant data visualization.

### Smart Tooltip Positioning
Advanced positioning algorithm prevents tooltip overlap with campaign bars, ensuring optimal user experience.

### Dynamic Data Synchronization
Chart x-axis and table columns automatically sync when switching between time periods (months/weeks/days).

### Responsive Chart Bounds
Column charts automatically adjust boundaries and spacing to prevent overflow issues.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **VWO**: For the inspiration and branding elements
- **Apache ECharts**: For powerful charting capabilities
- **Font Awesome**: For beautiful icons
- **GitHub Pages**: For free hosting

## 📞 Support

For questions or support, please:
1. Check the [Issues](https://github.com/[username]/vwo-analytics-dashboard/issues) page
2. Create a new issue if needed
3. Contact the maintainer

---

**Made with ❤️ for the VWO community** 