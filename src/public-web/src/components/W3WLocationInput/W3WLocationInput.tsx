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

export const W3WLocationInput: React.ForwardRefExoticComponent<TextInputProps> =
  React.forwardRef<HTMLInputElement, TextInputProps>(
    (props: TextInputProps, ref) => {
      const theme = useMantineTheme();
      const [opened, setOpened] = useState(false);
      const isTablet = useMediaQuery(tablet(theme));
      const openDialog = useCallback(() => setOpened(true), []);
      const closeDialog = useCallback(() => setOpened(false), []);
      const iconBtnRef = useRef<HTMLButtonElement>(null);
      const btnRef = useRef<HTMLButtonElement>(null);

      return (
        <>
          <What3wordsAutosuggest api_key="7Q6AXN48">
            <TextInput
              ref={ref}
              {...props}
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
          </What3wordsAutosuggest>
          <W3WModal size="full" opened={opened} onClose={closeDialog} />
        </>
      );
    }
  );
