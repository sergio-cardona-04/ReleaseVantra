Add-Type -AssemblyName System.Windows.Forms

$notificationOwner = New-Object System.Windows.Forms.Form
$notificationOwner.TopMost = $true
$notificationOwner.ShowInTaskbar = $false

try {
  [System.Windows.Forms.MessageBox]::Show(
    $notificationOwner,
    "He terminado la Fase A1 de ReleaseVantra. La implementacion y las verificaciones locales finalizaron. Consulta README.md y docs/fase_a1/a1-report.md para ver los resultados.",
    "ReleaseVantra - Trabajo terminado",
    [System.Windows.Forms.MessageBoxButtons]::OK,
    [System.Windows.Forms.MessageBoxIcon]::Information
  ) | Out-Null
} finally {
  $notificationOwner.Dispose()
}
