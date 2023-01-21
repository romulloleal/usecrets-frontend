export interface FileUploadProps {
  uploadComponent: React.ReactElement
  callback: (value: string) => Promise<void> | void
  aspectRatio?: number
  cropImage?: boolean
}
