"use client"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { useState } from 'react';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

const ReactCal = ({reservation}:{reservation:{ startDate:Date,endDate:Date}[]
    |undefined;}) => {
    const [state, setState] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);

    let disabledDates:Date []=[];
    reservation?.forEach((r) => {
        const dateRange=eachDayOfInterval({
            start:new Date(r.startDate),
            end:new Date(r.endDate)
        })
   disabledDates=[...disabledDates,...dateRange];
    });

    return (
        <>
     <input  type='hidden' name='startDate' value={state[0].startDate.toISOString()} ></input>
     <input  type='hidden' name='endDate' value={state[0].endDate.toISOString()}></input>


        <DateRange
            date={new Date()}
            showDateDisplay={false}
            rangeColors={["#FF5ASF"]} // If you want a single color, this is correct
            ranges={state}
            onChange={(item) => setState([item.selection as any])} // No need for 'as any' here
            minDate={new Date()}
            disabledDates={disabledDates}
            direction='vertical'
        />
        </>
    );
}

export default ReactCal;
