export interface NoteInterface {
    id: string
    author: string
    label: Label | null
    title: string
    text: string
    created: string
    modified: string
}

export interface Label {
    id: string
    title: string
    notes: NoteInterface
}
