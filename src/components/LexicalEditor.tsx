import {
  LexicalComposer,
  RichTextPlugin,
  ContentEditable,
  HistoryPlugin,
  OnChangePlugin
} from '@lexical/react/LexicalComposer'
import { $getRoot } from 'lexical'

export default function LexicalEditor({ value, onChange }) {
  const config = {
    namespace: 'ClinicalNotesEditor',
    theme: {},
    onError(error) {
      console.error(error)
    }
  }

  const handleChange = (editorState) => {
    editorState.read(() => {
      const text = $getRoot().getTextContent()
      onChange(text)
    })
  }

  return (
    <LexicalComposer initialConfig={config}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="border p-2 rounded min-h-[100px] bg-white dark:bg-gray-800" />
        }
        placeholder={<div className="text-gray-400">Enter notes...</div>}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  )
}