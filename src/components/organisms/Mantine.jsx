import { RichTextEditor } from "@mantine/tiptap";
// ! I noticed that the width and heights of the toolbar and other components are 0 for some reason so they do not display
// * I fixed that by explicitly passing in icons using react tarble icons
import {
  IconBold,
  IconClearFormatting,
  IconCode,
  IconH1,
  IconHighlight,
  IconItalic,
  IconLink,
  IconList,
  IconListNumbers,
  IconRotate,
  IconRotate2,
  IconRotateClockwise,
  IconStrikethrough,
  IconUnderline,
  IconUnlink,
} from "@tabler/icons-react";
import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { BubbleMenu } from "@tiptap/react";

const Mantine = ({ editor, onChange, note }) => {

  useEffect(
    ()=>{
    onChange(editor.getHTML()) // set the content of the editor
    }
  );
  
  const size = "24px";
  const generalClasses = "hover:bg-gray-200 dark:hover:bg-gray-800 border rounded-sm cursor-pointer dark:border-transparent ";
  const iconActive = "stroke-blue-700 dark:stroke-yellow-300";
  const LinkIcon = () => (
    <IconLink
      className={generalClasses + `${editor.isActive("link") && iconActive}`}
      size={size}
    />
  );
  const UnlinkIcon = () => (
    <IconUnlink className={generalClasses} size={size} />
  );
  const CodeIcon = () => <IconCode size={size} className={generalClasses} />;
  const BoldIcon = () => (
    <IconBold
      size={size}
      className={generalClasses + `${editor.isActive("bold") && iconActive}`}
    />
  );
  const ItalicIcon = () => (
    <IconItalic
      size={size}
      className={generalClasses + `${editor.isActive("italic") && iconActive}`}
    />
  );
  const StrikethroughIcon = () => (
    <IconStrikethrough
      size={size}
      className={generalClasses + `${editor.isActive("strike") && iconActive}`}
    />
  );
  const HightlightIcon = () => (
    <IconHighlight size={size} className={generalClasses + `${editor.isActive("highlight") && iconActive}`} />
  );
  const UnderlineIcon = () => (
    <IconUnderline
      size={size}
      className={
        generalClasses + `${editor.isActive("underline") && iconActive}`
      }
    />
  );
  const ClearFormattingIcon = () => (
    <IconClearFormatting size={size} className={generalClasses} />
  );
  const BulletListIcon = () => (
    <IconList
      size={size}
      className={
        generalClasses + `${editor.isActive("bulletList") && iconActive}`
      }
    />
  );
  const NumberedListIcon = () => (
    <IconListNumbers
      size={size}
      className={
        generalClasses + `${editor.isActive("orderedList") && iconActive}`
      }
    />
  );
  const UndoIcon = () => <IconRotate size={size} className={generalClasses} />;
  const RedoIcon = () => (
    <IconRotateClockwise size={size} className={generalClasses} />
  );

  const H1Icon = ()=> <IconH1 size={size} className={generalClasses + `${editor.isActive("heading1") && iconActive}`}/>

  // styles api: https://mantine.dev/styles/styles-api/

const ControlGroups = ()=> (<>
 {/* A control group is a set of controls inside the toolbar */}
 <RichTextEditor.ControlsGroup className="flex gap-1">
            <RichTextEditor.Bold icon={BoldIcon} />
            <RichTextEditor.Italic icon={ItalicIcon} />
            <RichTextEditor.Underline icon={UnderlineIcon} />
            <RichTextEditor.Strikethrough icon={StrikethroughIcon} />
            <RichTextEditor.ClearFormatting icon={ClearFormattingIcon} />
            <RichTextEditor.Highlight icon={HightlightIcon} />
            {/* <RichTextEditor.CodeBlock icon={CodeIcon} /> */}
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup className="relative flex gap-1">
            <RichTextEditor.Link icon={LinkIcon} />
            <RichTextEditor.Unlink icon={UnlinkIcon} />
            <RichTextEditor.BulletList icon={BulletListIcon} />
            <RichTextEditor.OrderedList icon={NumberedListIcon} />
            <RichTextEditor.Undo icon={UndoIcon} />
            <RichTextEditor.Redo icon={RedoIcon} />
          </RichTextEditor.ControlsGroup>

           {/* must fix the control group for h tags elements */}
          {/* <RichTextEditor.ControlsGroup  className="flex gap-1">
          <RichTextEditor.H1 icon={H1Icon} />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup> */}
</>);

  return (
    <MantineProvider>
      <RichTextEditor editor={editor}>
        {(note == null || note.can_edit) && <>
        <RichTextEditor.Toolbar className="flex gap-4">
          <ControlGroups/>
        </RichTextEditor.Toolbar>

        <BubbleMenu editor={editor} className="bg-white shadow-lg rounded dark:bg-gray-900 flex gap-4 px-1 py-2">
          <ControlGroups/>
        </BubbleMenu>
        </>
        }

        <RichTextEditor.Content className="mt-2 bg-white dark:bg-gray-700 dark:border-gray-600 min-h-20 w-full p-2 rounded-md" />
      </RichTextEditor>
    </MantineProvider>
  );
};

export default Mantine;
