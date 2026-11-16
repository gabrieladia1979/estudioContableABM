param(
    [Parameter(Mandatory)][string]$Fecha,
    [string]$Etiqueta = 'Último día para adherir',
    [Parameter(Mandatory)][string]$Salida
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$image = [System.Drawing.Bitmap]::new(780, 186)
$graphics = [System.Drawing.Graphics]::FromImage($image)
$graphics.SmoothingMode = 'AntiAlias'
$graphics.TextRenderingHint = 'AntiAliasGridFit'
$cream = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#F4E6CD'))
$ink = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#2B211D'))
$pen = [System.Drawing.Pen]::new($ink, 6)
$pen.StartCap = 'Round'
$pen.EndCap = 'Round'
$outline = [System.Drawing.Drawing2D.GraphicsPath]::new()
$dateFont = [System.Drawing.Font]::new('Segoe UI', 60, 'Bold', 'Pixel')
$labelFont = [System.Drawing.Font]::new('Segoe UI', 34, 'Regular', 'Pixel')

try {
    if ($graphics.MeasureString($Fecha, $dateFont).Width -gt 565 -or $graphics.MeasureString($Etiqueta, $labelFont).Width -gt 565) {
        throw 'La fecha o la etiqueta excede el ancho del sticker.'
    }

    $outline.AddArc(4, 4, 90, 90, 180, 90)
    $outline.AddArc(686, 4, 90, 90, 270, 90)
    $outline.AddArc(686, 92, 90, 90, 0, 90)
    $outline.AddArc(4, 92, 90, 90, 90, 90)
    $outline.CloseFigure()
    $graphics.FillPath($cream, $outline)

    # Lucide CalendarDays, adapted from lucide-react. See LUCIDE-LICENSE.txt.
    $calendar = [System.Drawing.Drawing2D.GraphicsPath]::new()
    try {
        $calendar.AddArc(58, 56, 14, 14, 180, 90)
        $calendar.AddArc(107, 56, 14, 14, 270, 90)
        $calendar.AddArc(107, 105, 14, 14, 0, 90)
        $calendar.AddArc(58, 105, 14, 14, 90, 90)
        $calendar.CloseFigure()
        $graphics.DrawPath($pen, $calendar)
        $graphics.DrawLine($pen, 75, 49, 75, 63)
        $graphics.DrawLine($pen, 103, 49, 103, 63)
        $graphics.DrawLine($pen, 58, 77, 121, 77)
        foreach ($x in 75, 89, 103) {
            foreach ($y in 91, 105) {
                $graphics.FillEllipse($ink, $x - 3, $y - 3, 6, 6)
            }
        }
    } finally {
        $calendar.Dispose()
    }

    $graphics.DrawString($Fecha, $dateFont, $ink, [single]154, [single]27)
    $graphics.DrawString($Etiqueta, $labelFont, $ink, [single]158, [single]107)
    $image.Save($ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($Salida), 'Png')
} finally {
    $labelFont.Dispose()
    $dateFont.Dispose()
    $outline.Dispose()
    $pen.Dispose()
    $ink.Dispose()
    $cream.Dispose()
    $graphics.Dispose()
    $image.Dispose()
}
