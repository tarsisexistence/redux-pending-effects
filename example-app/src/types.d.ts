declare namespace Global {
  type PatentDataShape = {
    id?: string,
    title: string,
    description: string,
    imageUrl: string
  }

  type LibraryContentDataShape = {
    id: string,
    title: string,
    link: string,
  }

  type AstronomyPictureDataShape = {
    title: string,
    imageUrl: string,
    description: string
  }

  type MarsRoverPhotoDataShape = {
    id: number,
    imageUrl: string
  }
}