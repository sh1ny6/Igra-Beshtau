@echo off
cd C:\build
python -c "__import__('subprocess').Popen(['python', '-m', 'http.server', '8000'], creationflags=8, close_fds=True)"
start "" http:\\localhost:8000