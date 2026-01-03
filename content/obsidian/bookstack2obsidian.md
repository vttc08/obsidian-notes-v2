First, create an [API key](https://wiki.langleybc.duckdns.org/settings/users/1/create-api-token) in bookstack, replace the URL. The token secret will only be shown once.
Clone [this](https://github.com/Szwendacz99/BookStack-Python-exporter) git repo
```bash
git clone https://github.com/Szwendacz99/BookStack-Python-exporter
```
- create the file in `token.txt` with the content in this format `token-id:token-secret`
Prior the exporting, go to [shelves](https://wiki.langleybc.duckdns.org/shelves), click edit and make sure every books are in a bookshelf
Run the python program in shell
```shell
python exporter.py -H https://wiki.langleybc.duckdns.org -f markdown -l pages chapters books --rate-limit 180 -c "/" "#" --force-update-files -t ./token.txt -V debug -p ./ --user-agent "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0" --additional-headers "Header1: value1" "Header2: value2"
```
- the exported files are located as such `./shelves/books/chapters/page.md`
- delete any plain `.md` file in the root `shelves` folder as these are the markdown file of the entire book export
[obsidian-mkdocs](Obsidian-Mkdocs.md)