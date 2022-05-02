import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, useRoutes, useNavigate } from 'react-router-dom';
import { ContentfulClient, ContentfulProvider } from 'react-contentful';
import authgear from '@authgear/web';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RouteType } from './routes';
import * as Containers from './containers';
import { APIContextProvider } from './contexts/APIContext';
import { config } from './config';
import { ServiceProvider } from './contexts/ServiceContext';
import { LocaleProvider } from './locale/LocaleProvider';
import { AuthgearProvider } from './contexts/AuthgearContext';
import { FLAppShell } from './components/FLAppShell';
import { resolveDefaultLocale } from './locale/resolveDefaultLocale';
import { What3WordsContextProvider } from './contexts/What3WordsContext';

// @ts-expect-error
const contentfulClient = new ContentfulClient({
  accessToken: config.contentful.deliveryApiKey,
  space: config.contentful.spaceId,
  environment: config.contentful.environment,
});

const AuthgearRedirect: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    authgear
      .finishAuthorization()
      .then((result) => {
        const state = result.state ? atob(result.state) : null;
        let navigateToPath = '/';
        if (state != null) {
          navigateToPath = state;
        }
        navigate(navigateToPath);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate]);

  return null;
};

const InnerFLApp: React.FC = () => {
  const Match = useRoutes([
    { path: RouteType.RegisterNeed, element: <Containers.RegisterNeeds /> },
    {
      path: RouteType.RegisterSupply,
      element: <Containers.RegisterSupplies />,
    },
    { path: RouteType.About, element: <Containers.About /> },
    { path: RouteType.Suppliers, element: <Containers.Suppliers /> },
    { path: RouteType.Partners, element: <Containers.Partners /> },
    { path: RouteType.ContactUs, element: <Containers.ContactUs /> },
    {
      path: RouteType.TermsAndConditions,
      element: <Containers.TermsAndConditions />,
    },
    { path: RouteType.Landing, element: <Containers.Landing /> },
    { path: '/authgear', element: <AuthgearRedirect /> },
  ]);
  return (
    <ContentfulProvider client={contentfulClient}>
      <AuthgearProvider>
        <What3WordsContextProvider>
          <APIContextProvider>
            <ServiceProvider windowImpl={window}>
              <LocaleProvider defaultLocale={resolveDefaultLocale(window)}>
                <FLAppShell>{Match}</FLAppShell>
              </LocaleProvider>
            </ServiceProvider>
          </APIContextProvider>
        </What3WordsContextProvider>
      </AuthgearProvider>
    </ContentfulProvider>
  );
};

export const FLApp: React.FC = () => {
  const [ready, setReady] = useState(false);
  const init = useCallback(async () => {
    try {
      await authgear.configure({
        clientID: config.authgear.clientID,
        endpoint: config.authgear.endpoint,
      });
      await authgear.refreshAccessTokenIfNeeded();
      setReady(true);
    } catch (e: unknown) {
      console.error(e);
    }
  }, []);
  useEffect(() => {
    init().catch(() => {});
  }, [init]);

  if (!ready) {
    return null;
  }
  return (
    <MantineProvider
      theme={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
        colors: {
          flGreen: [
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
          ],
        },
        primaryColor: 'flGreen',
      }}
    >
      <NotificationsProvider>
        <BrowserRouter>
          <InnerFLApp />
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
};
