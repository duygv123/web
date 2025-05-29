import classNames from 'classnames/bind'
import style from './OeePageChart.module.scss'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
function OeePageChart({ mode, formState, chartData }) {
    let cx = classNames.bind(style)
    const navigate = useNavigate()

    //table settings
    // console.log(formState)
    // console.log(chartData[formState.machine])

    // const xaxis = tableData.map((e) => e.date.split('-').reverse().join('-'))
    const [chartState, setChartState] = useState({
        state: {
            options: {
                xaxis: {
                    categories: [],
                },
                noData: {
                    text: 'Loading...',
                },
            },
            series: [],
        },
    })

    useEffect(() => {
        if (chartData && chartData[formState.machine]) {
            setChartState({
                state: {
                    options: {
                        xaxis: {
                            categories: chartData[formState.machine]?.xaxis,
                        },
                        noData: {
                            text: 'Loading...',
                        },
                    },
                    series: chartData[formState.machine]?.series,
                },
            })
        }
    }, [chartData, formState.machine])
    // console.log(chartState)
    return (
        <>
            <div className={cx('wraper')}>
                <div className={cx('chartBox')}>
                    <Chart
                        options={chartState.state.options}
                        series={chartState.state.series}
                        type="line"
                        width={(window.innerWidth / 1920) * 1400}
                        height={(window.innerWidth / 1920) * 500}
                    />
                </div>
                {/* <div className={cx('tableBox')}>
                    <h3>
                        Bảng giá trị
                        {mode === 1 && ' OEE'}
                        {mode === 2 && ' A'}
                        {mode === 3 && ' P'}
                        {mode === 4 && ' Q'}
                        {mode === 5 && ' L'}
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Ca ép</th>
                                {mode === 1 && <th>OEE</th>}
                                {mode === 2 && <th>A</th>}
                                {mode === 3 && <th>P</th>}
                                {mode === 4 && <th>Q</th>}
                                {mode === 5 && <th>L</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData ? (
                                tableDataReverse.map((p) => (
                                    <tr key={p.id} onClick={() => handleRowClick(p.id)}>
                                        <th>{p.date.split('-').reverse().join('-')}</th>
                                        <th>{p.shiftNumber}</th>
                                        {mode === 1 && <th>{p.oee}</th>}
                                        {mode === 2 && <th>{p.a}</th>}
                                        {mode === 3 && <th>{p.p}</th>}
                                        {mode === 4 && <th>{p.q}</th>}
                                        {mode === 5 && <th>{p.l}</th>}
                                    </tr>
                                ))
                            ) : (
                                <div>loading...</div>
                            )}
                        </tbody>
                    </table>
                </div> */}
            </div>
        </>
    )
}
export default OeePageChart
