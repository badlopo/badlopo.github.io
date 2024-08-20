function main
{
    $public = Get-Location -PSProvider FileSystem | Join-Path -ChildPath "..\public" | Resolve-Path
    $source = Join-Path -Path $public -ChildPath "source\poem"
    $target = Join-Path -Path $public -ChildPath "archive\poem.json"
    $items = Get-ChildItem -Path $source -Filter "*.md"

    $config = @{
        total = $items.Count
        date = [long]((Get-Date) - [datetime]'1970-01-01').TotalMilliseconds
        items = New-Object System.Collections.ArrayList
    };

    foreach ($item in $items)
    {
        $content = Get-Content $item.FullName -Encoding UTF8
        $line1 = $content.Split("`n")[0]

        $config.items.Add(@{
            title = $line1.Substring(2)
            filename = $item.Name.Replace(".md", "")
        }) | Out-Null  # omit the output of 'Add' method
    }

    # convert the configuration to JSON format
    $json = ConvertTo-Json $config -Depth 5 -Compress

    # save the JSON to the target file (use 'Out-File' to specify the encoding)
    Out-File -FilePath $target -Encoding UTF8 -InputObject $json

    # indicate the completion of the script
    Write-Output "Poem archive has been generated."
}

main
