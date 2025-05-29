import { useState, useEffect } from 'react'

const useCallSignalR = (connection) => {
    const [machineData, setMachineData] = useState()

    useEffect(() => {
        if (connection) {
            // connection.send('SendConnections')
            // connection.on('GetAllDeviceConnections', (res) => {
            //     console.log('GetAllDeviceConnections')
            //     let data = JSON.parse(JSON.parse(JSON.stringify(res)))
            //     setMachineData(data)
            // })

            connection.on('TagValueChanged', (res) => {
                let data = JSON.parse(res)
            
                setMachineData(data)
            })

            return () => {
                // connection.off('GetAllDeviceConnections')
                connection.off('TagValueChanged')
            }
        }
    }, [connection])

    return machineData
}

export default useCallSignalR