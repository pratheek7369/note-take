# PowerShell script to run npm commands with full path
$nodePath = "C:\Program Files\nodejs"
$env:PATH = "$nodePath;$env:PATH"

if ($args.Count -eq 0) {
    Write-Host "Usage: .\run-npm.ps1 <npm-command>"
    Write-Host "Example: .\run-npm.ps1 install"
    Write-Host "Example: .\run-npm.ps1 run dev"
    exit
}

$command = $args -join " "
& "$nodePath\npm.cmd" $command
