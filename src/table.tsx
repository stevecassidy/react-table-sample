import { useReducer, useState } from "react";

type TableProps = {
    data: Array<{[key: string]: number | string}>;
}


export function MyTable ({data}: TableProps) {

    const [start, setStart] = useState(0);
    const [nRows, setNRows] = useState(10);
    const [filterTerm, setFilterTerm] = useState('');
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const getColumnHeadings = () => {
        const headings: string[] = [];
        for(let i=0; i<data.length; i++) {
            Object.getOwnPropertyNames(data[i]).map(k => {
                if (k !== 'id' && !headings.includes(k)) {
                    headings.push(k);
                }
            })
        }
        return headings;
    }

    const updateNRows = (event: any) => {
        setNRows(event.target.value);
    }
    const nextPage = () => {
        setStart(Math.min(data.length-nRows, start + nRows));
    }
    const prevPage = () => {
        setStart(Math.max(0, start - nRows));
    }

    const filterRows = (event: any) => {
        setFilterTerm(event.target.value);
    }

    const sortColumn = (key: string) => {
        return () => {            
            data.sort((a, b) => {
                if (a[key] == b[key])
                    return 0;
                else if (a[key] < b[key])
                    return 1;
                else 
                    return -1;
            });
            forceUpdate();
        }
    }

    return (
        <>
        <p>{filterTerm}</p>
        <input name='filter' placeholder='Filter Section' value={filterTerm} onChange={filterRows}></input>
        <input name='rows' type='number' value={nRows} onChange={updateNRows}></input>
        <table>
            <thead>
                <tr>
                    {getColumnHeadings().map((h, i) => {
                        return (<th onClick={sortColumn(h)} key={i}>{h}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
            {data.filter(item => {
                return item.section.toString().match(filterTerm)
            }).slice(start, start+ nRows).map((item, i) => {
                return (
                    <tr key={`row-${i}`}>
                    {getColumnHeadings().map((h, j) => {
                        return (<td key={`item-${j}`}>{item[h]}</td>)
                    })}
                    </tr>
                )
            })}
            </tbody>
        </table>
        <button onClick={prevPage} disabled={start == 0}>Previous</button>
        <button onClick={nextPage} disabled={start >= data.length-nRows}>Next</button>
        </>
    )
};