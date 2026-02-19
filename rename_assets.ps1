
$video = Get-ChildItem -Path "Contents" -Filter "*GI Tourism*.mp4"
if ($video) { 
    Write-Host "Renaming Video..."
    Rename-Item -Path $video.FullName -NewName "gi-tourism-pla-raed.mp4" 
} else {
    Write-Host "Video already renamed or not found."
}

$image = Get-ChildItem -Path "Contents" -Filter "ปลาแรด.jfif"
if ($image) { 
    Write-Host "Renaming Image..."
    Rename-Item -Path $image.FullName -NewName "pla-raed.jfif" 
} else {
    Write-Host "Image already renamed or not found."
}
