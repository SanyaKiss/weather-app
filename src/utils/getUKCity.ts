import axios from 'axios'

interface TranslationResponse {
    responseData: {
      translatedText: string;
    };
  }
  
export const getUKCity = async (city: string) => {
  try {
    const response = await axios.get<TranslationResponse>(
      `https://api.mymemory.translated.net/get?q=${city}&langpair=en|uk`,
    )
    return response.data.responseData.translatedText;

  } catch (e) {
    console.error(e)
    return undefined
  }
}
