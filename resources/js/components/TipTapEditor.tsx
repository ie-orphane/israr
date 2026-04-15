import * as React from "react"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import StarterKit from "@tiptap/starter-kit"
import { EditorContent, useEditor } from "@tiptap/react"
import { Bold, Eraser, Heading2, Italic, Link2, List, ListOrdered, Quote, Underline as UnderlineIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TipTapEditorProps = {
  id?: string
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  dir?: "ltr" | "rtl"
}

export default function TipTapEditor({
  id,
  value,
  onChange,
  placeholder = "Write here...",
  className,
  dir = "ltr",
}: TipTapEditorProps) {
  const editorAttributes = {
    class: "tiptap-prose min-h-56 px-4 py-3 text-sm leading-7 outline-none",
    dir,
    ...(id ? { id } : {}),
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["http", "https", "mailto", "tel"],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: editorAttributes,
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML())
    },
    immediatelyRender: false,
  })

  React.useEffect(() => {
    if (!editor) {
      return
    }

    const current = editor.getHTML()
    const next = value || ""

    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false })
    }
  }, [editor, value])

  React.useEffect(() => {
    if (!editor) {
      return
    }

    editor.setOptions({
      editorProps: {
        attributes: editorAttributes,
      },
    })
  }, [editor, editorAttributes])

  const setLink = () => {
    if (!editor) {
      return
    }

    const previousUrl = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Enter URL", previousUrl || "")

    if (url === null) {
      return
    }

    const trimmed = url.trim()

    if (!trimmed) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: trimmed }).run()
  }

  if (!editor) {
    return (
      <div className={cn("min-h-56 rounded-md border border-input bg-background p-3 text-sm text-muted-foreground", className)}>
        Loading editor...
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="overflow-hidden rounded-xl border border-input bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring/40">
        <div className="flex flex-wrap gap-2 border-b border-border bg-muted/40 p-2">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("bold") ? "default" : "outline"}
            className={editor.isActive("bold") ? "bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" : ""}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
          <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("italic") ? "default" : "outline"}
            className={editor.isActive("italic") ? "bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" : ""}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
          <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("underline") ? "default" : "outline"}
            className={editor.isActive("underline") ? "bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" : ""}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
          <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
            className={editor.isActive("heading", { level: 2 }) ? "bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" : ""}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
          <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("bulletList") ? "default" : "outline"}
            className={editor.isActive("bulletList") ? "bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" : ""}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
          <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("orderedList") ? "default" : "outline"}
            className={editor.isActive("orderedList") ? "bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" : ""}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
          <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("blockquote") ? "default" : "outline"}
            className={editor.isActive("blockquote") ? "bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" : ""}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
          <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("link") ? "default" : "outline"}
            className={editor.isActive("link") ? "bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" : ""}
            onClick={setLink}
          >
          <Link2 className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          <Eraser className="h-4 w-4" />
          </Button>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
