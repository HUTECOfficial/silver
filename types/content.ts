export interface ListItem {
  bold?: string
  text: string
}

export interface Section {
  heading: string
  paragraphs?: string[]
  listTitle?: string
  listItems?: ListItem[]
  additionalParagraphs?: string[]
}

export interface Footer {
  label: string
  date: string
}

export interface PrivacyPolicyContent {
  backLink: string
  title: string
  introduction: string
  sections: Section[]
  footer: Footer
}

