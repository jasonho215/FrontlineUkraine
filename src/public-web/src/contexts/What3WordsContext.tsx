import React, { createContext, useContext, useMemo } from 'react';
import { config } from '../config';
import { What3WordsAutoSuggestionResponse } from '../models/what3words/What3WordsAutoSuggestionResponse';
import { What3WordsAutoSuggestionRequest } from '../models/what3words/What3WordsAutoSuggestionRequest';

function isStatusSuccess(status: number) {
  return status >= 200 && status < 400;
}

interface What3WordsError {
  code: string;
  message: string;
}

export class APIError extends Error {
  readonly data: What3WordsError;
  readonly response: Response;

  constructor(data: What3WordsError, response: Response) {
    super(response.statusText);
    this.data = data;
    this.response = response;
  }
}

function buildApiHref(endpoint: string, path: string): string {
  const baseUrl = endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
  return new URL(path, baseUrl).href;
}

async function fetchApi(
  apiEndpoint: string,
  path: string,
  init: RequestInit
): Promise<any> {
  const url = buildApiHref(apiEndpoint, path);
  const response = await fetch(url, init);
  const respData = await response.json();
  if (isStatusSuccess(response.status)) {
    return respData;
  }
  throw new APIError(respData, response);
}

function useMakeRpc() {
  return useMemo(() => {
    const { what3Words: { endpoint, apiKey} } = config;
    const headers = {
      'X-Api-Key': apiKey,
    };

    return {
      get: async (path: string, searchParams?: URLSearchParams) => {
        const query = searchParams?.toString();
        let fullPath = path;
        if (query) {
          fullPath = `${fullPath}?${query}`;
        }
        const init: RequestInit = {
          method: 'GET',
          mode: 'cors',
          headers,
        };
        return fetchApi(endpoint, fullPath, init);
      },
    };
  }, []);
}

type Rpc = ReturnType<typeof useMakeRpc>;

enum ActionType {
  GetAutoSuggestion = 'getAutoSuggestion',
}

function useMakeActions(rpc: Rpc) {
  return useMemo(
    () => ({
      [ActionType.GetAutoSuggestion]: async (params: What3WordsAutoSuggestionRequest) => {
        // TODO: Generic serializer
        const q = new URLSearchParams({'input': params.input,});
        if (params.language) {
          q.append('language', params.language);
        }
        if (params.clipToCountry) {
          q.append('clip-to-country', params.clipToCountry);
        }
        const resp = await rpc.get('v3/autosuggest', q);
        return resp as What3WordsAutoSuggestionResponse;
      },
    }),
    [rpc]
  );
}

type Actions = ReturnType<typeof useMakeActions>;

interface What3WordsContextValue {
  actions: Actions;
}

const What3WordsContext = createContext<What3WordsContextValue>(null as any);

export const What3WordsContextProvider: React.FC = ({ children }) => {
  const rpc = useMakeRpc();
  const actions = useMakeActions(rpc);
  const value = useMemo(() => ({ actions }), [actions]);
  return <What3WordsContext.Provider value={value}>{children}</What3WordsContext.Provider>;
};

export const useWhat3WordsContext = (): What3WordsContextValue => useContext(What3WordsContext);
