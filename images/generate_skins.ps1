Add-Type -AssemblyName System.Drawing

function New-SkinImage($file, $c1, $c2, $text) {
    $bmp = New-Object System.Drawing.Bitmap(120, 70)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'HighQuality'
    $rect = New-Object System.Drawing.Rectangle(0, 0, 120, 70)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, $c1[0], $c1[1], $c1[2]), [System.Drawing.Color]::FromArgb(255, $c2[0], $c2[1], $c2[2]), 45)
    $g.FillRectangle($brush, $rect)
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 2)
    $g.DrawRectangle($pen, 1, 1, 118, 68)
    $font = New-Object System.Drawing.Font("Arial", 10, [System.Drawing.FontStyle]::Bold)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = 'Center'
    $format.LineAlignment = 'Center'
    $textRect = New-Object System.Drawing.RectangleF(0, 0, 120, 70)
    $g.DrawString($text, $font, [System.Drawing.Brushes]::White, $textRect, $format)
    $bmp.Save($file)
    $g.Dispose()
    $bmp.Dispose()
}

$dir = Split-Path -Parent $PSCommandPath

New-SkinImage "$dir\skin_ak_fire.png"       (180,40,40)   (220,120,30)  "Fire Serpent"
New-SkinImage "$dir\skin_awp_gungnir.png"   (20,60,140)   (50,120,200)  "Gungnir"
New-SkinImage "$dir\skin_m4_howl.png"       (200,80,30)   (240,150,50)  "Howl"
New-SkinImage "$dir\skin_deagle_blaze.png"  (220,140,30)  (255,200,50)  "Blaze"
New-SkinImage "$dir\skin_usp_kill.png"      (100,30,140)  (160,60,200)  "Kill Confirmed"
New-SkinImage "$dir\skin_glock_twink.png"   (200,40,120)  (255,100,180) "Twink Twink"
New-SkinImage "$dir\skin_mp9_rose.png"      (180,60,80)   (220,120,140) "Rose"
New-SkinImage "$dir\skin_p250_white.png"    (180,180,180) (220,220,220) "Whiteout"
New-SkinImage "$dir\skin_ssg_acid.png"      (40,160,40)   (80,220,60)   "Acid Fade"
New-SkinImage "$dir\skin_mac10_neon.png"    (40,200,200)  (100,255,100) "Neon Rider"
New-SkinImage "$dir\skin_p90_ashes.png"     (80,80,80)    (140,140,140) "Asiimov"
New-SkinImage "$dir\skin_mp7_white.png"     (160,180,200) (200,220,240) "Whiteout"

Write-Host "Done - 12 skin images created in $dir"