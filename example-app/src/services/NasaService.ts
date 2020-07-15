enum PatentData {
  Id,
  Title = 2,
  Description,
  ImageUrl = 10
}

export type PatentDataShape = {
  id?: string,
  title: string,
  description: string,
  imageUrl: string
}

export class NasaService {
  private apiKey: string = 'WmyhwhhQBZJIvTdIQ6KeYZUNenQY7Fazyd2nauB5';

  getPatents(): Promise<any> {
    const patentsUrl: string =
      `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${this.apiKey}`;

    return fetch(patentsUrl)
      .then(response => response.json())
      .then(body => this.transformPatentsData(body.results))
  }

  private transformPatentsData = (patentsData: []) : PatentDataShape[]=> {
    return patentsData.map(patentData => ({
      id: patentData[PatentData.Id],
      title: patentData[PatentData.Title],
      description: patentData[PatentData.Description],
      imageUrl: patentData[PatentData.ImageUrl],
    }))
  }
}