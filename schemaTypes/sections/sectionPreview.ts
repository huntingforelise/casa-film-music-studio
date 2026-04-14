export const sectionPreviewTitle = (sectionType: string, title?: string) => {
  const trimmedTitle = title?.trim()

  return trimmedTitle ? `${sectionType} · ${trimmedTitle}` : sectionType
}
