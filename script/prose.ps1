function main
{
    $public = Get-Location -PSProvider FileSystem | Join-Path -ChildPath "..\public" | Resolve-Path
    $source = Join-Path -Path $public -ChildPath "source\prose"
    $target = Join-Path -Path $public -ChildPath "archive\prose.json"
    $items = Get-ChildItem -Path $source -Filter "*.md"

    $config = @{
        total = $items.Count
        date = [long]((Get-Date) - [datetime]'1970-01-01').TotalMilliseconds
        items = New-Object System.Collections.ArrayList
    };

    foreach ($item in $items)
    {
        $reader = [System.IO.StreamReader]::new($item.FullName)
        $frontmatter = @{ }

        # consume the first '---' line
        $line = $reader.ReadLine()
        while ($null -ne ($line = $reader.ReadLine()))
        {
            # stop at the second '---' line
            if ( $line.Equals("---"))
            {
                break
            }

            # skip the comment line
            if ( $line.StartsWith("#"))
            {
                continue
            }

            $k, $v = $line.Split(":").ForEach({ $_.Trim() })
            $frontmatter[$k] = $v
        }

        # close the reader after reading the frontmatter
        $reader.Close()

        # add the frontmatter to the configuration
        $config.items.Add(@{
            title = $frontmatter.title
            filename = $item.Name.Replace(".md", "")
            created = $frontmatter.created
            updated = $frontmatter.updated
        }) | Out-Null  # omit the output of 'Add' method
    }

    # convert the configuration to JSON format
    $json = ConvertTo-Json $config -Depth 5 -Compress

    # save the JSON to the target file (use 'Out-File' to specify the encoding)
    Out-File -FilePath $target -Encoding UTF8 -InputObject $json

    # indicate the completion of the script
    Write-Output "Prose archive has been generated."
}

main
