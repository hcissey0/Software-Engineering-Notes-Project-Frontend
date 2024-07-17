// src/Tiptap.tsx
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

// define your extension array
const extensions = [StarterKit, Link]

const content = '<p>Hello World!</p>'

const TextEditor = () => {
  return (
    <EditorProvider autofocus  extensions={extensions} content={content}>
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  )
}

export default TextEditor;
