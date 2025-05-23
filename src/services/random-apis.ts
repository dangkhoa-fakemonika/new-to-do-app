import axiosInstance from "@/services/axiosInstance.ts";

class CommonAPIsController {

  private getAxiosInstance;

  public constructor() {
    this.getAxiosInstance = axiosInstance;
  }

  public async fetchCatQuote(): Promise<{ data: { fact: string } }> {
    return await this.getAxiosInstance.get('catfact.ninja/fact');
  }

  public async fetchJoke(): Promise<{ data: { setup: string, punchline: string } }> {
    return await this.getAxiosInstance.get('official-joke-api.appspot.com/random_joke');
  }

  public async fetchDogImage(): Promise<{ data: { message: string } }> {
    return await this.getAxiosInstance.get('dog.ceo/api/breeds/image/random');
  }
}

export default CommonAPIsController;
