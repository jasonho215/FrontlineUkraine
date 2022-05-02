import React, { useCallback, useRef, useState } from 'react';
import {
  ActionIcon,
  Button,
  MediaQuery,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from '@mantine/core';
import { W3WModal } from './W3WModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from '@mantine/hooks';
import { tablet } from '../../utils/mantine';
import { What3wordsAutosuggest } from '@what3words/react-components';
import {
  RemoteDataAutocomplete,
  RemoteDataAutocompleteProps,
  RemoteDataAutocompleteSetErrorFn, RemoteDataAutocompleteSetLoadingFn
} from '../RemoteDataAutocomplete';
import { What3WordsSuggestion } from '../../models/what3words/What3WordsAutoSuggestionResponse';
import { APIError, useWhat3WordsContext } from '../../contexts/What3WordsContext';
import { useLocale } from '../../locale/LocaleProvider';

type AutocompleteErrorType = 'BadWords' | 'Unknown';

type Props = Omit<RemoteDataAutocompleteProps<What3WordsSuggestion, AutocompleteErrorType, HTMLDivElement>, 'itemComponent' | 'fetchData' | 'transformError' | 'getLabel' | 'getValue'>;

const getWords = (d: What3WordsSuggestion) => d.words;

const transformError = (e: unknown): AutocompleteErrorType => {
  if (e instanceof APIError && e.data.code === 'BadWords') {
    return 'BadWords'
  }
  return 'Unknown'
}

export const W3WAddressAutocomplete: React.ForwardRefExoticComponent<Props> =
  React.forwardRef<HTMLInputElement, Props>(
    (props: Props, ref) => {
      const { locale } = useLocale();
      const { actions: { getAutoSuggestion }} = useWhat3WordsContext();
      const theme = useMantineTheme();
      const [opened, setOpened] = useState(false);
      const isTablet = useMediaQuery(tablet(theme));
      const openDialog = useCallback(() => setOpened(true), []);
      const closeDialog = useCallback(() => setOpened(false), []);
      const iconBtnRef = useRef<HTMLButtonElement>(null);
      const btnRef = useRef<HTMLButtonElement>(null);

      const fetchData = useCallback(async (v: string) => {
        const resp = await getAutoSuggestion({
          clipToCountry: locale,
          language: locale,
          input: v,
        });
        return resp.suggestions;
      }, [getAutoSuggestion, locale]);

      return (
        <>
          <RemoteDataAutocomplete<What3WordsSuggestion, AutocompleteErrorType, HTMLDivElement>
            ref={ref}
            {...props}
            fetchData={fetchData}
            transformError={transformError}
            getLabel={getWords}
            getValue={getWords}
            rightSection={
              <>
                <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                  <ActionIcon
                    ref={iconBtnRef}
                    size={props.size}
                    onClick={openDialog}
                  >
                    <FontAwesomeIcon icon={['fas', 'location-crosshairs']} />
                  </ActionIcon>
                </MediaQuery>

                <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                  <Button ref={btnRef} size={props.size} onClick={openDialog}>
                    Get What3Words
                  </Button>
                </MediaQuery>
              </>
            }
            rightSectionWidth={
              isTablet
                ? btnRef.current?.clientWidth
                : iconBtnRef.current?.clientWidth
            }
          />
          <W3WModal size="full" opened={opened} onClose={closeDialog} />
        </>
      );
    }
  );
