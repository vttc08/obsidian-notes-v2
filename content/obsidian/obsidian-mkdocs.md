### Installing Python/mkdocs
```python
pip install mkdocs-material "mkdocs-material[imaging]" mkdocs-minify-plugin mdx-breakless-lists mkdocs-git-revision-date-localized-plugin mkdocs-roamlinks-plugin mkdocs-callouts pygments python-frontmatter
```
- `mkdocs-git-revision-date-localized-plugin`, set `fallback_to_build_date` to `true`.
mkdocs writing requirements and it's gotchas can be found here [mkdocs](../!documentation/mkdocs.md#mkdocs%20gotchas)

Exporting bookstack to mkdocs, there are helper scripts found in [infra repo](https://github.com/vttc08/infra-docs) and [bookstack2obsidian](bookstack2obsidian.md) ^1c5935
### mkdocs Giscus
[giscus](https://giscus.app)
- first install the giscus app
- then create a public repo
- enable discussion in that repo
	- go to `Settings -> General -> Features`, turn on `Discussion`
- on the Giscus app, enter the repo name
- copy the generated snippet
On mkdocs, create a new file `comments.html`
- `./overrides/partial`
add this into `mkdocs.yml`
```yaml
theme:
  name: 'material'
  custom_dir: 'overrides'
```
Copy and paste [these lines](https://squidfunk.github.io/mkdocs-material/setup/adding-a-comment-system/#__codelineno-1-1:40) into `comments.html`, replace the lines with `snippets` if nessecary
Lastly, add the frontmatter `comments: true` to the md page

### Github Pages
To simply deploy, just run `mkdocs gh-deploy`, it will build the site and automatically deploy to github.
To deploy the site to multiple places, consult [obsidian-shell](obsidian-shell.md).

This is the best CSS settings for editing in obsidian, CSS can be edited [following these steps](obsidian-basics.md#^171dde) in `.obsidian/snippets` folder
```css
body {  
  --h1-size: 1.5em;  
  --h2-size: 1.4em;  
  --h3-size: 1.2em;  
  --h4-size: 1.12em;  
  --h5-size: 1.05em;  
  --h6-size: 1.05em;  
}
```