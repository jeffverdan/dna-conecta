import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';

import { useTheme } from '@mui/material/styles';
import {
    List,
    RowComponentProps,
    useListRef,
    ListImperativeAPI,
} from 'react-window';
import Typography from '@mui/material/Typography';
import { HiCheck } from 'react-icons/hi';


const LISTBOX_PADDING = 8; // px


export type ValueAutocompleteType = {
    id: string
    name: string
    group?: string
}

interface Props {
    value: ValueAutocompleteType | null;
    onChange: (event: React.SyntheticEvent, value: ValueAutocompleteType | null) => void
    disabled?: boolean
    onOpen?: () => void
    options: ValueAutocompleteType[]
    label?: string
}

type ItemData = Array<
    | {
        key: number;
        group: string;
        children: React.ReactNode;
    }
    | [React.ReactElement, ValueAutocompleteType, number]
>;

function RowComponent({
    index,
    itemData,
    style,
}: RowComponentProps & {
    itemData: ItemData;
}) {
    const dataSet = itemData[index];
    const inlineStyle = {
        ...style,
        top: ((style.top as number) ?? 0) + LISTBOX_PADDING,
    };

    if ('group' in dataSet) {
        return (
            <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
                {dataSet.group}
            </ListSubheader>
        );
    }

    const { key, ...optionProps } = dataSet[0];

    return (
        <Typography key={key} component="li" {...optionProps} noWrap style={inlineStyle}>
            {`#${dataSet[1].id} - ${dataSet[1].name}`}
        </Typography>
    );
}

// Adapter for react-window v2
const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement> & {
        internalListRef: React.Ref<ListImperativeAPI>;
        onItemsBuilt: (optionIndexMap: Map<string, number>) => void;
    }
>(function ListboxComponent(props, ref) {
    const { children, internalListRef, onItemsBuilt, ...other } = props;
    const itemData: ItemData = [];
    const optionIndexMap = React.useMemo(() => new Map<string, number>(), []);

    (children as ItemData).forEach((item) => {
        itemData.push(item);
        if ('children' in item && Array.isArray(item.children)) {
            itemData.push(...item.children);
        }
    });

    // Map option values to their indices in the flattened array
    itemData.forEach((item, index) => {
        if (Array.isArray(item) && item[1]) {
            optionIndexMap.set(item[1].id, index);
        }
    });

    React.useEffect(() => {
        if (onItemsBuilt) {
            onItemsBuilt(optionIndexMap);
        }
    }, [onItemsBuilt, optionIndexMap]);

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: ItemData[number]) => {
        if (child.hasOwnProperty('group')) {
            return 48;
        }
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    // Separate className for List, other props for wrapper div (ARIA, handlers)
    const { className, style, ...otherProps } = other;

    return (
        <div ref={ref} {...otherProps}>
            <List
                className={className}
                listRef={internalListRef}
                key={itemCount}
                rowCount={itemCount}
                rowHeight={(index) => getChildSize(itemData[index])}
                rowComponent={RowComponent}
                rowProps={{ itemData }}
                style={{
                    height: getHeight() + 2 * LISTBOX_PADDING,
                    width: '100%',
                }}
                overscanCount={5}
                tagName="ul"
            />
        </div>
    );
});

export default function AutoCompleteVirtualize({ onChange, value, disabled, onOpen, options, label }: Props) {
    // Use react-window v2's useListRef hook for imperative API access
    const internalListRef = useListRef(null);
    const optionIndexMapRef = React.useRef<Map<string, number>>(new Map());

    const handleItemsBuilt = React.useCallback(
        (optionIndexMap: Map<string, number>) => {
            optionIndexMapRef.current = optionIndexMap;
        },
        [],
    );

    // Handle keyboard navigation by scrolling to highlighted option
    const handleHighlightChange = (
        _event: React.SyntheticEvent,
        option: ValueAutocompleteType | null,
    ) => {
        if (option && internalListRef.current) {
            const index = optionIndexMapRef.current.get(option.id);
            if (index !== undefined) {
                internalListRef.current.scrollToRow({ index, align: 'auto' });
            }
        }
    };

    return (
        <div className={`input-autocomplete ${!!value ? 'success' : ""}`}>
            {/* <HiMagnifyingGlass className='icon-search'/> */}
            {label && <label htmlFor=":Rl9im:" className='label'>{label}</label>}
            <Autocomplete
                // sx={{ width: 300 }}
                onOpen={onOpen}
                disableListWrap
                options={options}
                value={value}
                disabled={disabled}
                onChange={(event, v, _reason, _details) => onChange(event, v)}
                // groupBy={(option) => option[0])}
                getOptionLabel={(option) => (option.name + ' ' + option.id)}
                renderInput={(params) => (
                    <>
                        <TextField autoComplete="off" type='search' className='InputText' placeholder='Pesquise pelo nome do banco' name='autocomplete-responsaveis' {...params} />
                        {value && <HiCheck className='MuiSvgIcon-root' />}
                    </>
                )}
                renderOption={(props, option, state) =>
                    [props, option, state.index] as React.ReactNode
                }
                renderGroup={(params) => params as any}
                onHighlightChange={handleHighlightChange}
                
                slotProps={{
                    listbox: {
                        component: ListboxComponent,
                        internalListRef,
                        onItemsBuilt: handleItemsBuilt,
                    } as any,
                }}
            />

        </div>
    );
}