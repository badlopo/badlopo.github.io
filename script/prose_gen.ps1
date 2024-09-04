function main
{
    # raw data
    $filename = Read-Host "Enter filename"
    $title = Read-Host "Enter title"
    $category = Read-Host "Enter category"
    $created = Get-Date -Format "yyyy/MM/dd"

    # process data
    if (! $filename.EndsWith(".md"))
    {
        $filename = $filename + ".md"
    }
    $category = $category.ToLower()

    # generate template
    $template = "---`ntitle: $title`ncategory: $category`ncreated: $created`n---`n`nProse Body"

    # output template into file
    $public = Get-Location -PSProvider FileSystem | Join-Path -ChildPath "..\public" | Resolve-Path
    $target = Join-Path -Path $public -ChildPath "source\prose\$filename"

    if (Test-Path -Path $target)
    {
        Write-Host "The file [$filename] already exists at [$target]."
    }
    else
    {
        Out-File -InputObject $template -FilePath $target -Encoding UTF8
        Write-Host "New prose file [$filename] has been created at [$target]."
    }
}

main
