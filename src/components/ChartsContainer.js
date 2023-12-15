import React, { useState } from "react"

import ChartBar from './ChartBar';
import ChartArea from './ChartArea';
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
    //barChart state variable to toggle wich chart show bar or area.
    const [barChart, setBarChart] = useState(true);
    //Destructure monthlyApplications from allJObs store and assing data as alias.
    const { monthlyApplications: data } = useSelector((store) => store.allJobs);
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            {/*Toggle chart button based on barChart state*/}
            <button type="button" onClick={() => setBarChart(!barChart)}>{barChart ? 'Area Chart' : 'Bar Chart'}</button>
            {/*Show chart based on barChart state*/}
            {barChart ? <ChartBar data={data} /> : <ChartArea data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer