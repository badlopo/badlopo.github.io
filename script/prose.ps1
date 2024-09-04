function main
{
    $public = Get-Location -PSProvider FileSystem | Join-Path -ChildPath "..\public" | Resolve-Path
    $source = Join-Path -Path $public -ChildPath "source\prose"
    $target = Join-Path -Path $public -ChildPath "archive\prose.json"
    $items = Get-ChildItem -Path $source -Filter "*.md"

    # create an array list to store the configuration items
    $configItems = New-Object System.Collections.ArrayList

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
        $configItems.Add(@{
            filename = $item.Name.Replace(".md", "")
            title = $frontmatter.title
            category = $frontmatter.category
            created = $frontmatter.created
            updated = $frontmatter.updated
        }) | Out-Null  # omit the output of 'Add' method
    }

    $config = @{
        date = [long]((Get-Date) - [datetime]'Thu, 01 Jan 1970 00:00:00 GMT').TotalMilliseconds
        # TODO: add 'statistics'
        # sort the configuration items by the 'created' date in descending order
        items = $configItems | Sort-Object { [datetime]$_."created" } -Descending
    };

    # convert the configuration to JSON format
    $json = ConvertTo-Json $config -Depth 5 -Compress

    # save the JSON to the target file (use 'Out-File' to specify the encoding)
    Out-File -FilePath $target -Encoding UTF8 -InputObject $json

    # indicate the completion of the script
    Write-Output "Prose archive has been generated."
}

main
