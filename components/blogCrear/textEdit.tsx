import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Editor as TiptapEditor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  Link2,
  Link2Off,
  Pilcrow,
  Strikethrough,
  UnderlineIcon,
} from "lucide-react";
import React, { useCallback } from "react";
import Highlight from "@tiptap/extension-highlight";



const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const setLink = useCallback(() => {
    if (!editor) return; // Validación dentro del callback

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e);
    }
  }, [editor]);

  // Validación para el renderizado del componente
  if (!editor) {
    return null;
  }
  const buttonClass =
    "px-3 py-1.5 rounded text-sm font-medium transition-colors";
  const activeClass = "bg-[#634AE2] text-white";
  const inactiveClass = "bg-gray-100 hover:bg-gray-200 text-gray-700";

  return (
    <div className="pb-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${buttonClass} ${
            editor.isActive("heading", { level: 1 })
              ? activeClass
              : inactiveClass
          }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${buttonClass} ${
            editor.isActive("heading", { level: 2 })
              ? activeClass
              : inactiveClass
          }`}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${buttonClass} ${
            editor.isActive("heading", { level: 3 })
              ? activeClass
              : inactiveClass
          }`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${buttonClass} ${
            editor.isActive("paragraph") ? activeClass : inactiveClass
          }`}
        >
          <Pilcrow className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonClass} ${
            editor.isActive("bold") ? activeClass : inactiveClass
          }`}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonClass} ${
            editor.isActive("italic") ? activeClass : inactiveClass
          }`}
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${buttonClass} ${
            editor.isActive("Underline") ? activeClass : inactiveClass
          }`}
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${buttonClass} ${
            editor.isActive("highlight") ? activeClass : inactiveClass
          }`}
        >
          <Highlighter className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${buttonClass} ${
            editor.isActive("strike") ? activeClass : inactiveClass
          }`}
        >
          <Strikethrough className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${buttonClass} ${
            editor.isActive({ textAlign: "left" }) ? activeClass : inactiveClass
          }`}
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${buttonClass} ${
            editor.isActive({ textAlign: "center" })
              ? activeClass
              : inactiveClass
          }`}
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${buttonClass} ${
            editor.isActive({ textAlign: "right" })
              ? activeClass
              : inactiveClass
          }`}
        >
          <AlignRight className="h-4 w-4" />
        </button>
        <button
          onClick={setLink}
          className={`${buttonClass} ${
            editor.isActive({ textAlign: "link" }) ? activeClass : inactiveClass
          }`}
        >
          <Link2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className={`${buttonClass} ${
            editor.isActive("link")
              ? activeClass
              : `${inactiveClass} opacity-50 cursor-not-allowed`
          }`}
        >
          <Link2Off className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}),
  Underline,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          "example-phishing.com",
          "malicious-site.net",
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          "example-no-autolink.com",
          "another-no-autolink.com",
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export const Tiptap = ({
  setContenido,
}: {
  setContenido: React.Dispatch<React.SetStateAction<string>>;
}) => {

  const handleUpdate = ({ editor }: { editor: TiptapEditor }) => {
    // Puedes obtener el contenido como HTML
    const htmlContent = editor.getHTML();

    // O como JSON si lo prefieres
    // const jsonContent = editor.getJSON();
    
    // Si necesitas hacer algo con el contenido, como enviarlo a un servidor
    setContenido(htmlContent);
  };



  return (
    <div className=" max-[500px] w-full  p-4 mx-auto bg-white rounded-lg shadow-lg">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        onUpdate={handleUpdate}
        autofocus={true}
      >
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto p-6">
          <style>{`
            .ProseMirror {
              height: 384px; /* equivalent to h-96 */
              overflow-y: auto;
              outline: none;
            }
            .ProseMirror > * + * {
              margin-top: 0.75em;
            }
            .ProseMirror ul,
            .ProseMirror ol {
              padding: 0 1rem;
            }


            .ProseMirror h1 {
              font-size: 2em;
            }
            .ProseMirror h2 {
              font-size: 1.5em;
            }
            .ProseMirror h3 {
              font-size: 1.25em;
            }
            .ProseMirror mark {
              background-color: #fef3c7;
              border-radius: 0.2rem;
              padding: 0.1rem 0.3rem;
            }
            .ProseMirror blockquote {
              border-left: 3px solid #e5e7eb;
              padding-left: 1rem;
              margin-left: 0;
              margin-right: 0;
            }
            .ProseMirror code {
              background-color: #f3f4f6;
              border-radius: 0.2rem;
              padding: 0.2rem 0.4rem;
              font-size: 0.875em;
            }

            /* Estilizar la barra de scroll */
            .ProseMirror::-webkit-scrollbar {
              width: 8px;
            }
            
            .ProseMirror::-webkit-scrollbar-track {
              background: #F3F3F3;
              border-radius: 30px;
            }
            
            .ProseMirror::-webkit-scrollbar-thumb {
              background: #BABAFF;
              border-radius: 4px;
            }
            
            .ProseMirror::-webkit-scrollbar-thumb:hover {
              background: #817eed;
            }

               .ProseMirror a {
              color: #6366F1;
              cursor: pointer;
              text-decoration: underline;
              transition: color 0.2s ease;
            }

            .ProseMirror a:hover {
              color: #4F46E5;
            }

          `}</style>
        </div>
      </EditorProvider>
     {/*
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-semibold mb-4">Contenido actual:</h3>
        <div
          className="prose prose-sm sm:prose lg:prose-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
        <style>{`
            
            .prose h1 {
              font-size: 2em;
              font-weight: bold;
              margin-top: 0.75em;
            }
            .prose h2 {
              font-size: 1.5em;
              font-weight: bold;
              margin-top: 0.75em;
            }
            .prose h3 {
              font-size: 1.25em;
              font-weight: bold;
              margin-top: 0.75em;
            }
            .prose p {
              margin-top: 0.75em;
            }
            .prose mark {
              background-color: #fef3c7;
              border-radius: 0.2rem;
              padding: 0.1rem 0.3rem;
            }
            .prose [style*="text-align: center"] {
              text-align: center;
            }
            .prose [style*="text-align: right"] {
              text-align: right;
            }
            .prose [style*="text-align: left"] {
              text-align: left;
            }
            .prose a {
              color: #6366F1;
              text-decoration: underline;
              transition: color 0.2s ease;
            }
            .prose a:hover {
              color: #4F46E5;
            }
          `}</style>
      </div>
      <div className="w-full flex justify-end">
        <Button
          radius="full"
          className="w-24 bg-[#634AE2] text-white"
          onClick={handleEnviar}
        >
          Enviar
        </Button>
      </div> 
      */}
    </div>
  );
};

export default Tiptap;
