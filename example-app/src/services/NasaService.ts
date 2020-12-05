enum PatentDataIndexes {
  Id,
  Title = 2,
  Description,
  ImageUrl = 10
}

type LibraryItemResponseShape = {
  data: [
    {
      nasa_id: string;
      title: string;
    }
  ];
  links: [
    {
      href: string;
    }
  ];
};

type AstronomyPictureResponseShape = {
  title: string;
  url: string;
  explanation: string;
};

type MarsRoverPhotoResponseShape = {
  id: number;
  img_src: string;
};

class NasaService {
  private apiKey = 'WmyhwhhQBZJIvTdIQ6KeYZUNenQY7Fazyd2nauB5';

  async smartFetch<T>(
    url: string,
    options?: Record<string, unknown>
  ): Promise<T | undefined> {
    const response = await fetch(url, options);

    if (response.status >= 400) {
      throw response;
    }

    if (response.status === 204) {
      return undefined;
    }

    return response.json();
  }

  async getPatents(): Promise<Global.PatentDataShape[]> {
    const patentsUrl = `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${this.apiKey}`;
    const body = await this.smartFetch<{ results: [] }>(patentsUrl);

    return this.transformPatentsData(body && body.results);
  }

  private transformPatentsData = (
    patentsData: [] = []
  ): Global.PatentDataShape[] =>
    patentsData.map(patentData => ({
      id: patentData[PatentDataIndexes.Id],
      title: patentData[PatentDataIndexes.Title],
      description: patentData[PatentDataIndexes.Description],
      imageUrl: patentData[PatentDataIndexes.ImageUrl]
    }));

  async getLibraryContent(
    searchValue: string
  ): Promise<Global.LibraryContentDataShape[]> {
    const libraryContentUrl = `https://images-api.nasa.gov/search?q=${searchValue}&page=1&media_type=image&year_start=1920&year_end=2020`;
    const body = await this.smartFetch<{ collection: { items: [] } }>(
      libraryContentUrl
    );

    return this.transformLibraryContentData(body && body.collection.items);
  }

  private transformLibraryContentData = (
    libraryContentData: [] = []
  ): Global.LibraryContentDataShape[] =>
    libraryContentData.map((item: LibraryItemResponseShape) => {
      const itemData = item.data[0];
      const itemLinks = item.links[0];

      return {
        id: itemData.nasa_id,
        title: itemData.title,
        link: itemLinks.href
      };
    });

  getAstronomyPictureData = async (): Promise<
    Global.AstronomyPictureDataShape | Error
  > => {
    const astronomyPictureDataUrl = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`;
    const body = await this.smartFetch<AstronomyPictureResponseShape>(
      astronomyPictureDataUrl
    );

    if (!body) {
      throw new Error('No data found for this day');
    }

    return this.transformAstronomyPictureData(body);
  };

  private transformAstronomyPictureData = (
    data: AstronomyPictureResponseShape
  ): Global.AstronomyPictureDataShape => ({
    title: data.title,
    imageUrl: data.url,
    description: data.explanation
  });

  async getMarsRoverPhotos(): Promise<Global.MarsRoverPhotoDataShape[]> {
    const marsRoverPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${this.apiKey}`;

    const res = await this.smartFetch<{
      photos: MarsRoverPhotoResponseShape[];
    }>(marsRoverPhotosUrl);

    return this.transformMarsRoverPhotosData(res && res.photos);
  }

  private transformMarsRoverPhotosData = (
    data: MarsRoverPhotoResponseShape[] = []
  ): Global.MarsRoverPhotoDataShape[] =>
    data.map(item => ({
      id: item.id,
      imageUrl: item.img_src
    }));
}

export const nasaService = new NasaService();
