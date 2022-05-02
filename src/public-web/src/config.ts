interface Config {
  mapboxToken: string;
  apiKey: string;
  apiEndpoint: string;
  contentful: {
    deliveryApiKey: string;
    spaceId: string;
    environment: string;
    usePreviewApi: boolean;
  };
  authgear: {
    clientID: string;
    endpoint: string;
  };
  what3Words: {
    endpoint: string;
    apiKey: string;
  }
}

export const config: Config = window.appConfig;
