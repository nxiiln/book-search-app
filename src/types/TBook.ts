export type TBook = {
  id: string,
  volumeInfo: {
    title: string,
    authors?: string[],
    description?: string,
    categories?: string[],
  }
}
