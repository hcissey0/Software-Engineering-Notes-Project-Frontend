import { RichTextEditor} from '@mantine/tiptap'
// ! I noticed that the width and heights of the toolbar and other components are 0 for some reason so they do not display
import { IconBold, IconCode, IconHighlight, IconItalic, IconLink, IconStrikethrough, IconUnderline } from '@tabler/icons-react'
import { MantineProvider } from '@mantine/core'

const Mantine = ({editor}) => {
  const LinkIcon = ()=><IconLink className='hover:bg-gray-200' size='24px' />
  const CodeIcon = ()=> <IconCode size='24px'/>
  

  // styles api: https://mantine.dev/styles/styles-api/

  return (
      <MantineProvider>
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>

            {/* A control group is a set of controls inside the toolbar */}
            <RichTextEditor.ControlsGroup className='border mt-2 flex gap-1 rounded-md me-2'>
              <RichTextEditor.Bold icon={IconBold} />
              <RichTextEditor.Italic icon={IconItalic} />
              <RichTextEditor.Underline icon={IconUnderline} />
              <RichTextEditor.Strikethrough icon={IconStrikethrough} />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight icon={IconHighlight} />
              <RichTextEditor.Code icon={CodeIcon} />
            </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup className='border mt-2 flex gap-1 rounded-md me-2'>
                  <RichTextEditor.Link icon={LinkIcon}/>
              </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content className='mt-2 bg-white p-2 rounded-md' /> 
          {/* call oninput or other event handlers on the content component above */}
        </RichTextEditor>
      </MantineProvider>

  )
}

export default Mantine