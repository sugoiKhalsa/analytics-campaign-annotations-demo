# VWO Analytics Dashboard

A comprehensive analytics dashboard interface that replicates the VWO platform's reporting functionality. This dashboard provides an intuitive way to visualize website metrics, campaign performance, and visitor behavior data.

## 🚀 Quick Start

### Run the Dashboard Locally

1. **Start the server:**
   ```bash
   python server.py
   ```

2. **The dashboard will automatically open in your browser at:**
   ```
   http://localhost:8000
   ```

### Server Options

```bash
# Start on default port (8000)
python server.py

# Start on a custom port
python server.py -p 3000

# Start without auto-opening browser
python server.py --no-browser

# Start on custom port without browser
python server.py -p 8080 --no-browser

# Get help
python server.py --help
```

## 📁 Files Structure

```
├── index.html          # Main dashboard HTML
├── styles.css          # All styling and layout
├── script.js           # Interactive functionality
├── server.py           # Local Python HTTP server
└── README.md           # This file
```

## 🎯 Features

### 📊 Analytics Dashboard
- **Interactive Line Charts** - Visualize page visits and click data over time
- **Campaign Correlation** - View campaign timelines alongside metrics
- **Real-time Filtering** - Filter data by date ranges, locations, and URLs
- **Custom Metrics** - Add and configure custom tracking events

### 🎛️ Interactive Controls
- **Date Range Picker** - Today, Yesterday, 7 days, 15 days, custom ranges
- **Campaign Toggle** - Show/hide campaign correlation bars
- **Chart Type Selection** - Switch between different visualization types
- **Live Search** - Real-time table filtering and search

### 📋 Data Management
- **Metric Configuration** - Set up page visits, conversions, custom events
- **Advanced Filtering** - URL patterns, geographic locations, user segments
- **Export Functionality** - Download data in various formats
- **Save Reports** - Persist dashboard configurations

## 🎨 Design Features

- **Clean Interface** - Minimalistic VWO-style design
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Interactive Elements** - Hover effects, smooth animations
- **Accessibility** - Keyboard navigation and screen reader support

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js for interactive visualizations
- **Icons**: Font Awesome for UI icons
- **Server**: Python 3 built-in HTTP server
- **No Build Process** - Pure web technologies, runs anywhere

## 🔧 Development

### Requirements
- Python 3.6+ (for the local server)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Making Changes
1. Edit the HTML, CSS, or JavaScript files
2. Refresh your browser to see changes instantly
3. The server will automatically serve updated files

### Server Features
- **Auto-port Detection** - Finds available ports automatically
- **CORS Headers** - Enables cross-origin requests
- **Proper MIME Types** - Serves files with correct content types
- **Clean Logging** - Formatted request logs with timestamps

## 📱 Browser Compatibility

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎯 Use Cases

- **Analytics Prototyping** - Test dashboard designs and interactions
- **Demo Presentations** - Showcase analytics capabilities
- **Educational Tool** - Learn web development and data visualization
- **Template Base** - Starting point for custom analytics dashboards

## 🚦 Getting Help

If you encounter any issues:

1. **Check the console** - Open browser dev tools for error messages
2. **Verify files** - Ensure all files are in the same directory
3. **Port conflicts** - Try a different port with `-p` flag
4. **Python version** - Ensure you're using Python 3.6+

## 🎉 Tips

- **Keyboard Shortcuts**: 
  - `Ctrl+S` (or `Cmd+S`) to save reports
  - `Ctrl+N` (or `Cmd+N`) to add new metrics
  - `Esc` to close modals
- **Performance**: The dashboard loads quickly and runs smoothly
- **Customization**: Easy to modify colors, layout, and functionality

---

**Happy analyzing!** 📊✨ 