import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"
import StatItem from "./StatItem"
import Wrapper from "../assets/wrappers/StatsContainer"
import { useSelector } from "react-redux"

//Stat item cards.
const StatsContainer = () => {
    //Destructure stats from allJobs store.
    const { stats } = useSelector((store) => store.allJobs);

    //Default job states array. Capture each state quantity.
    const defaultStates = [
        {
            title: 'pending applications',
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7'
        },
        {
            title: 'interviews scheduled',
            count: stats.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9'
        },
        {
            title: 'jobs declined',
            count: stats.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee'
        },
    ]
    return (
        <Wrapper>
            {/*Render stat cards through map*/}
            {defaultStates.map((item, index) => {
                return <StatItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

export default StatsContainer