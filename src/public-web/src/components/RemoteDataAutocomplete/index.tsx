import React, {
  ForwardedRef,
  ForwardRefExoticComponent,
  PropsWithoutRef, RefAttributes,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Group,
  Text,
  Loader,
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

const autocompleteStyles: AutocompleteProps['styles'] = {
  dropdown: {
    maxHeight: 200,
    overflowY: 'scroll',
  },
};

interface LoadingItemData {
  type: 'loading';
}

interface LoadedItemData<TData> {
  type: 'loaded';
  data: TData;
}

interface ErrorItemData<TErrorType> {
  type: 'error';
  error: TErrorType;
}

type AutocompleteItemData<TData, TErrorType> = LoadingItemData | LoadedItemData<TData> | ErrorItemData<TErrorType>;

export type RemoteDataAutocompleteItem<TData, TErrorType> = AutocompleteItem & {
  data: AutocompleteItemData<TData, TErrorType>;
};

// !important: Forwarding ref is required
function DefaultSelectItemComponentInner<TData, TErrorType>(props: RemoteDataAutocompleteItem<TData, TErrorType>, ref: ForwardedRef<HTMLDivElement>) {
  const { label, data, ...others } = props;
  return (
    <div ref={ref} {...others}>
      {data.type === 'loading' && (
        <Loader
          size="sm"
          sx={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
        />
      )}
      {data.type === 'loaded' && (
        <Group noWrap={true}>
          <Text>{label}</Text>
        </Group>
      )}
    </div>
  );
}

const DefaultSelectItemComponent = React.forwardRef(DefaultSelectItemComponentInner);

export type SelectItemComponentType<TData, TErrorType, TComponentRefElType = HTMLElement> = ForwardRefExoticComponent<PropsWithoutRef<RemoteDataAutocompleteItem<TData, TErrorType>> & RefAttributes<TComponentRefElType>>

export type RemoteDataAutocompleteProps<TData, TErrorType, TComponentRefElType = HTMLElement> = Omit<AutocompleteProps,
  'data' | 'itemComponent' | 'filter' | 'searchable'> & {
  itemComponent?: SelectItemComponentType<TData, TErrorType, TComponentRefElType>,
  transformError: (error: unknown) => TErrorType;
  fetchData: (keyword: string) => Promise<TData[]>
  getLabel: (data: TData) => string;
  getValue: (data: TData) => string;
};

export type RemoteDataAutocompleteSetErrorFn<TErrorType> = (errorType: TErrorType) => void;
export type RemoteDataAutocompleteSetLoadingFn = () => void;

const alwaysTrue = () => true;

function RemoteDataAutocompleteInner<TData, TErrorType, TSelectItemComponentRefElType = HTMLElement>(props: RemoteDataAutocompleteProps<TData, TErrorType, TSelectItemComponentRefElType>, ref: ForwardedRef<HTMLInputElement>) {
  const { value, onChange, onItemSubmit, transformError, itemComponent, fetchData, getLabel, getValue, ...others } = props;
  const [debouncedValue] = useDebouncedValue(value, 700);
  const [matches, setMatches] = useState<RemoteDataAutocompleteItem<TData, TErrorType>[]>([]);
  const setLoading = useCallback(() => {
    setMatches([
      {
        data: { type: 'loading' },
        value: 'loading',
      },
    ]);
  }, []);
  const setError = useCallback((errorType: TErrorType) => {
    setMatches([
      {
        data: { type: 'error', error: errorType },
        value: 'error',
      },
    ]);
  }, []);
  const handleItemSubmit = useCallback(
    (item: RemoteDataAutocompleteItem<TData, TErrorType>) => {
      if (item.data.type === 'loaded') {
        onItemSubmit?.(item)
      }
    },
    [onItemSubmit]
  );

  useEffect(() => {
    const fetch = async () => {
      if (debouncedValue == null || debouncedValue.length === 0) {
        return;
      }
      setLoading();
      try {
        const response = await fetchData(debouncedValue);
        setMatches(
          response.map((d) => ({
            label: getLabel(d),
            value: getValue(d),
            data: {
              type: 'loaded',
              data: d,
            },
          }))
        );
      } catch (e: unknown) {
        setError(transformError(e));
      }
    };
    fetch().catch(console.error);
  }, [debouncedValue, fetchData, getLabel, getValue, setError, setLoading, transformError]);

  return (
    <Autocomplete
      ref={ref}
      {...others}
      value={value}
      onItemSubmit={handleItemSubmit}
      onChange={onChange}
      itemComponent={itemComponent ?? DefaultSelectItemComponent}
      data={matches}
      limit={matches.length}
      filter={alwaysTrue}
      styles={autocompleteStyles}
    />
  );
}


export const RemoteDataAutocomplete = React.forwardRef(RemoteDataAutocompleteInner);
