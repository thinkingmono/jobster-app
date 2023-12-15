import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

//Chart area graph in all stats page using recharts library.
const ChartArea = ({ data }) => {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <AreaChart data={data} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type='monotone' dataKey='count' stroke='#1e3a8a' fill='#3b82f6' />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default ChartArea