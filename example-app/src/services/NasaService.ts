enum PatentData {
  Id,
  Title = 2,
  Description,
  ImageUrl = 10
}

class NasaService {
  private apiKey: string = 'WmyhwhhQBZJIvTdIQ6KeYZUNenQY7Fazyd2nauB5';

  async smartFetch(
    url: string,
    options?: object
  ): Promise<{ results: [] } | undefined> {
    const response = await fetch(url, options);

    if (response.status >= 400) {
      throw response;
    }

    if (response.status === 204) {
      return undefined;
    }

    return response.json();
  }

  async getPatents(): Promise<Patents.PatentDataShape[]> {
    const patentsUrl: string =
      `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${this.apiKey}`;

    const body = await this.smartFetch(patentsUrl);

    return this.transformPatentsData(body && body.results);
  }

  private transformPatentsData = (patentsData: [] = []) : Patents.PatentDataShape[] => (
    patentsData.map(patentData => ({
      id: patentData[PatentData.Id],
      title: patentData[PatentData.Title],
      description: patentData[PatentData.Description],
      imageUrl: patentData[PatentData.ImageUrl],
    }))
  )
}

export const nasaService = new NasaService();