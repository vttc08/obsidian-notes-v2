#### Settings
All obsidian settings and plugin settings are stored in plaintext in `.obsidian` folder ^054bb1
#### Plugins
**Code Block Enhancer**
This will show line number and enable YAML highlighting. However, add this css file in `./obsidian/snippets` to make the text normal size. ^171dde
```css
pre[class*=language-] > code[class*=language-].is-loaded {  
  font-size: 0.9em !important;  
  line-height: 1.4em !important;  
}  
pre[class*=language-] {  
  font-size: 0.9em!important;  
  line-height: 1.4em!important;  
}  
.code-block-linenum-wrap {  
  font-size: 0.9em!important;  
  line-height: 1.4em!important;  
}
```
#### Referencing to Text
To reference to a block of text, start a wiki-link `[[]]` and followed by `^` or `caret`, it will prompt to choose a block of text but that is only on this page [block of text](#^054bb1)

>[!notes]- To reference text of another page
>Start with a wiki-link followed by `^^` or `double caret`, then need to know the exact content of the text to reference in another doc. [from another page](../git/Github%20PR%20and%20Issues.md#^8ba941)

#### Callouts
Obsidian callouts have syntax of `>[!notes]+/-` where `+/-` indicates whether the callout will start collapsed or not, every other line of the callouts need to start with `>`. To find out more and integration with [mkdocs](../!documentation/mkdocs.md#Admonition/Callouts).
