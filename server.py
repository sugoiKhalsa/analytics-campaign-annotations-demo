#!/usr/bin/env python3
"""
VWO Analytics Dashboard Local Server
A simple HTTP server to host the dashboard locally for development and testing.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import socket
from urllib.parse import urlparse
import threading
import time

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler with proper MIME types and CORS headers"""
    
    def end_headers(self):
        # Add CORS headers for better compatibility
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        """Override to ensure proper MIME types"""
        mimetype = super().guess_type(path)
        
        # Convert path to string to ensure we can use string methods
        path_str = str(path)
        
        # Ensure CSS files are served with correct MIME type
        if path_str.endswith('.css'):
            return 'text/css'
        elif path_str.endswith('.js'):
            return 'application/javascript'
        elif path_str.endswith('.html'):
            return 'text/html'
        
        return mimetype
    
    def log_message(self, format, *args):
        """Custom logging to make output cleaner"""
        client_ip = self.address_string()
        timestamp = self.log_date_time_string()
        print(f"[{timestamp}] {client_ip} - {format % args}")

def find_free_port(start_port=8000, max_attempts=10):
    """Find a free port starting from start_port"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    return None

def open_browser_delayed(url, delay=1.5):
    """Open browser after a delay to ensure server is ready"""
    time.sleep(delay)
    try:
        webbrowser.open(url)
        print(f"🌐 Opened browser to: {url}")
    except Exception as e:
        print(f"⚠️  Could not open browser automatically: {e}")
        print(f"   Please manually open: {url}")

def check_dashboard_files():
    """Check if required dashboard files exist"""
    required_files = ['index.html', 'styles.css', 'script.js']
    missing_files = []
    
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("❌ Missing required files:")
        for file in missing_files:
            print(f"   - {file}")
        print("\nPlease ensure all dashboard files are in the current directory.")
        return False
    
    print("✅ All dashboard files found!")
    return True

def start_server(port=8000, auto_open=True):
    """Start the local HTTP server"""
    
    # Check if dashboard files exist
    if not check_dashboard_files():
        sys.exit(1)
    
    # Find a free port
    if port != 8000:
        free_port = port
    else:
        free_port = find_free_port(port)
        if free_port is None:
            print(f"❌ Could not find a free port starting from {port}")
            sys.exit(1)
        elif free_port != port:
            print(f"⚠️  Port {port} is busy, using port {free_port} instead")
    
    # Create server
    try:
        with socketserver.TCPServer(("", free_port), CustomHTTPRequestHandler) as httpd:
            server_url = f"http://localhost:{free_port}"
            
            print("\n" + "="*60)
            print("🚀 VWO Analytics Dashboard Server")
            print("="*60)
            print(f"📂 Serving files from: {os.getcwd()}")
            print(f"🌐 Server URL: {server_url}")
            print(f"📱 Local access: http://127.0.0.1:{free_port}")
            print(f"🔌 Port: {free_port}")
            print("="*60)
            print("💡 Tips:")
            print("   • Press Ctrl+C to stop the server")
            print("   • Refresh browser to see changes")
            print("   • Server logs will appear below")
            print("="*60)
            
            # Open browser in a separate thread
            if auto_open:
                browser_thread = threading.Thread(
                    target=open_browser_delayed, 
                    args=(server_url,)
                )
                browser_thread.daemon = True
                browser_thread.start()
            
            print(f"\n🎯 Starting server on port {free_port}...")
            print("📊 VWO Analytics Dashboard is ready!")
            print("\n--- Server Logs ---")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
        print("👋 Thanks for using VWO Analytics Dashboard!")
    except Exception as e:
        print(f"\n❌ Server error: {e}")
        sys.exit(1)

def main():
    """Main function with command line argument parsing"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description="VWO Analytics Dashboard Local Server",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python server.py                    # Start on default port 8000
  python server.py -p 3000           # Start on port 3000
  python server.py --no-browser      # Start without opening browser
  python server.py -p 8080 --no-browser
        """
    )
    
    parser.add_argument(
        '-p', '--port',
        type=int,
        default=8000,
        help='Port to run the server on (default: 8000)'
    )
    
    parser.add_argument(
        '--no-browser',
        action='store_true',
        help='Do not automatically open browser'
    )
    
    parser.add_argument(
        '--version',
        action='version',
        version='VWO Analytics Dashboard Server v1.0'
    )
    
    args = parser.parse_args()
    
    # Validate port range
    if not (1 <= args.port <= 65535):
        print("❌ Error: Port must be between 1 and 65535")
        sys.exit(1)
    
    # Start the server
    start_server(port=args.port, auto_open=not args.no_browser)

if __name__ == "__main__":
    main() 