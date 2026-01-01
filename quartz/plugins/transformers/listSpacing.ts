import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"

export interface Options {
  /**
   * Whether to add spacing after unordered lists
   * @default true
   */
  unorderedLists?: boolean

  /**
   * Whether to add spacing after ordered lists
   * @default true
   */
  orderedLists?: boolean
}

const defaultOptions: Options = {
  unorderedLists: true,
  orderedLists: true,
}

export const ListSpacing: QuartzTransformerPlugin<Options> = (userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "ListSpacing",
    textTransform(ctx, src) {
      // Pre-process the raw markdown text to add blank lines after lists
      // This ensures proper parsing by the markdown parser
      
      // Split the text into lines
      const lines = src.toString().split('\n')
      const result: string[] = []
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const nextLine = i < lines.length - 1 ? lines[i + 1] : null
        
        result.push(line)
        
        // Check if this line is part of a list (unordered or ordered)
        const isListLine = /^(\s*[-*+]\s+|\s*\d+\.\s+)/.test(line)
        
        if (isListLine && nextLine !== null) {
          // Check if the next line is not empty, not a list item, and not indented (not a continuation)
          const nextIsEmpty = nextLine.trim() === ''
          const nextIsList = /^(\s*[-*+]\s+|\s*\d+\.\s+)/.test(nextLine)
          const nextIsIndented = /^\s{2,}/.test(nextLine)
          const nextIsHeading = /^#{1,6}\s+/.test(nextLine)
          const nextIsCodeBlock = /^```/.test(nextLine)
          
          // If next line has content that's not a list item, not indented, and not already spaced
          if (!nextIsEmpty && !nextIsList && !nextIsIndented && !nextIsCodeBlock && !nextIsHeading) {
            // Look ahead to see if this is the end of the list
            let isEndOfList = true
            for (let j = i + 1; j < lines.length; j++) {
              const lookahead = lines[j]
              if (lookahead.trim() === '') continue // Skip empty lines
              if (/^(\s*[-*+]\s+|\s*\d+\.\s+)/.test(lookahead)) {
                isEndOfList = false // Found another list item
                break
              }
              break // Found non-list content
            }
            
            if (isEndOfList) {
              // Add a blank line after the list to ensure proper parsing
              result.push('')
            }
          }
        }
      }
      
      return result.join('\n')
    },
    markdownPlugins() {
      return [
        () => {
          return (tree: Root, _file) => {
            let processed = 0
            // Visit all nodes and look for patterns where a list is immediately followed by content
            visit(tree, (node, index, parent) => {
              // Only process nodes that have a parent and index
              if (!parent || index === undefined || index >= parent.children.length - 1) {
                return
              }

              // Check if this is a list node (ordered or unordered)
              if (node.type !== "list") {
                return
              }

              // Skip if this list spacing is disabled
              if (
                (node.ordered && !opts.orderedLists) ||
                (!node.ordered && !opts.unorderedLists)
              ) {
                return
              }

              // Get the next sibling node
              const nextSibling = parent.children[index + 1]
              if (!nextSibling) {
                return
              }

              // Check if the next sibling is content that should be separated from the list
              // This includes paragraphs, headings, text, etc. but excludes other lists and certain block elements
              const shouldAddSpacing = 
                nextSibling.type === "paragraph" ||
                nextSibling.type === "heading" ||
                nextSibling.type === "text" ||
                (nextSibling.type === "code" && !(nextSibling as any).lang) // inline code, not code blocks

              if (shouldAddSpacing) {
                // Insert an empty paragraph to create spacing
                const spacingNode = {
                  type: "paragraph",
                  children: [],
                  data: { 
                    hName: "div",
                    hProperties: { 
                      className: ["list-spacing"],
                      style: "margin: 0; padding: 0; height: 0.5em;" 
                    }
                  }
                } as any

                parent.children.splice(index + 1, 0, spacingNode)
                processed++
                
                // Return "skip" to avoid re-processing the newly inserted node
                return "skip"
              }
            })

            // Debug: log how many spacing nodes were added (optional)
            // console.log(`ListSpacing plugin: Added ${processed} spacing elements`)
          }
        },
      ]
    },
  }
}