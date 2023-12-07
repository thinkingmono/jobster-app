import React, { useState } from "react"

import ChartBar from './ChartBar';
import ChartArea from './ChartArea';
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
    const [barChart, setBarChart] = useState(true);
    const { monthlyApplications: data } = useSelector((store) => store.allJobs);
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type="button" onClick={() => setBarChart(!barChart)}>{barChart ? 'Area Chart' : 'Bar Chart'}</button>
            {barChart ? <ChartBar data={data} /> : <ChartArea data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer