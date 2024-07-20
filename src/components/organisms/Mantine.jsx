import { RichTextEditor} from '@mantine/tiptap'
// ! I noticed that the width and heights of the toolbar and other components are 0 for some reason so they do not display
import { IconBold, IconClearFormatting, IconCode, IconHighlight, IconItalic, IconLink, IconList, IconListNumbers, IconRotate, IconRotate2, IconRotateClockwise, IconStrikethrough, IconUnderline, IconUnlink } from '@tabler/icons-react'
import { MantineProvider } from '@mantine/core'


const Mantine = ({editor}) => {
  const size = '24px';
  const generalClasses = 'hover:bg-gray-200 border rounded-sm cursor-pointer '
  const iconActive = 'stroke-blue-700'
  const LinkIcon = ()=><IconLink className={generalClasses + `${editor.isActive('link') && iconActive}`} size={size} />
  const UnlinkIcon = ()=><IconUnlink className={generalClasses} size={size} />
  const CodeIcon = ()=> <IconCode size={size} className={generalClasses}/>
  const BoldIcon = ()=> <IconBold size={size} className={generalClasses + `${editor.isActive('bold') && iconActive}`}/>
  const ItalicIcon = ()=> <IconItalic size={size} className={generalClasses + `${editor.isActive('italic') && iconActive}`}/>
  const StrikethroughIcon = ()=> <IconStrikethrough size={size} className={generalClasses  + `${editor.isActive('strike') && iconActive}`}/>
  const HightlightIcon = ()=> <IconHighlight size={size} className={generalClasses}/>
  const UnderlineIcon = ()=> <IconUnderline size={size} className={generalClasses + `${editor.isActive('underline') && iconActive}`}/>
  const ClearFormattingIcon = ()=> <IconClearFormatting size={size} className={generalClasses}/>
  const BulletListIcon = ()=> <IconList size={size} className={generalClasses + `${editor.isActive('bulletList') && iconActive}`}/>
  const NumberedListIcon = ()=> <IconListNumbers size={size} className={generalClasses + `${editor.isActive('orderedList') && iconActive}`}/>
  const UndoIcon = ()=> <IconRotate size={size} className={generalClasses}/>
  const RedoIcon = ()=> <IconRotateClockwise size={size} className={generalClasses}/>

  // styles api: https://mantine.dev/styles/styles-api/

  return (
      <MantineProvider>
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>

            {/* A control group is a set of controls inside the toolbar */}
            <RichTextEditor.ControlsGroup className='mt-2 flex gap-1 me-4'>
              <RichTextEditor.Bold icon={BoldIcon} />
              <RichTextEditor.Italic icon={ItalicIcon} />
              <RichTextEditor.Underline icon={UnderlineIcon} />
              <RichTextEditor.Strikethrough icon={StrikethroughIcon} />
              <RichTextEditor.ClearFormatting icon={ClearFormattingIcon} />
              <RichTextEditor.Highlight icon={HightlightIcon} />
              {/* <RichTextEditor.CodeBlock icon={CodeIcon} /> */}
            </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup className='border relativ mt-2 flex gap-1 rounded-md me-2'>
                  <RichTextEditor.Link icon={LinkIcon}/>
                  <RichTextEditor.Unlink icon={UnlinkIcon}/>
                  <RichTextEditor.BulletList icon={BulletListIcon} />
                  <RichTextEditor.OrderedList icon={NumberedListIcon} />
                  <RichTextEditor.Undo icon={UndoIcon} />
                  <RichTextEditor.Redo icon={RedoIcon} />
              </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content className='mt-2 bg-white min-h-20 w-2/3 p-2 rounded-md' /> 
          {/* call oninput or other event handlers on the content component above */}
        </RichTextEditor>
      </MantineProvider>

  )
}

export default Mantine;