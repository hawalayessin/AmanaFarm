param(
    [switch]$Frontend
)

$port = 8081
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Checking for processes on port $port..." -ForegroundColor Cyan
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($connections) {
    $pids = $connections.OwningProcess | Select-Object -Unique
    foreach ($pid in $pids) {
        $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($proc) {
            Write-Host "Killing process $($proc.ProcessName) (PID $pid) on port $port..." -ForegroundColor Yellow
            Stop-Process -Id $pid -Force
        }
    }
    Start-Sleep -Seconds 1
    Write-Host "Port $port is now free." -ForegroundColor Green
} else {
    Write-Host "Port $port is already free." -ForegroundColor Green
}

if ($Frontend) {
    $frontendDir = Join-Path $projectRoot "frontend"
    if (Test-Path $frontendDir) {
        Write-Host "Starting frontend..." -ForegroundColor Cyan
        Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm start" -WorkingDirectory $frontendDir -NoNewWindow
    }
}

$backendDir = Join-Path $projectRoot "backend"
if (Test-Path (Join-Path $backendDir "mvnw.cmd")) {
    Write-Host "Starting backend on port $port..." -ForegroundColor Cyan
    & (Join-Path $backendDir "mvnw.cmd") spring-boot:run
} else {
    Write-Host "Error: mvnw.cmd not found in $backendDir" -ForegroundColor Red
    exit 1
}
