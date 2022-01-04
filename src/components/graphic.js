
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF5628', '#EFAC00', '#00B100'];

export function Graphic(props) {

    const dataFilter = []
    const [lengthState, setLengthState] = useState([])




    function Filter() {
        props.data.forEach(item => {
            let stateFilted = props.data.filter(state => state.estado === item.estado)

            dataFilter.push({
                amount: stateFilted.length,
                state: stateFilted[0].estado,
                color: stateFilted[0].estado === "em curso" ? "#00B100" : stateFilted[0].estado === "em selecao de fluxo" ? "#FF5628" : stateFilted[0].estado === "chamando" ? "#EFAC00" : ""
            })
        })

        const filter = new Map()

        dataFilter.forEach(item => {
            if (!filter.has(item.state)) {
                filter.set(item.state, item)
            }
        })

        const filtedArray = [...filter.values()]


        setLengthState(filtedArray)

    }

    useEffect(() => {
        Filter()
    }, [props.data])


    return (

        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={250} height={250} >
                <Pie
                    data={lengthState}
                    cx={125}
                    cy={110}
                    innerRadius={50}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="amount"
                    labelLine={true}

                >
                    {lengthState.map((entry, index) => (

                        <Cell key={`cell-${entry.state}`} fill={`${entry.color}`} />

                    ))}

                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>

    );

}
