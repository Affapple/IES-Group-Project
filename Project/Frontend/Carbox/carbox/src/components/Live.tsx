import '../css/CarDetails.css';
import { LineChart } from '@mui/x-charts/LineChart';
import LiveData from 'Types/LiveData';


export default function Live({LiveInfo}: {LiveInfo: LiveData[]}) {
    
    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-red-400 pb-3    ">
            <h1 className="text-3xl font-bold text-red-500 ml-10">Live Data</h1>
            <div className="flex justify-between items-center ml-10">
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        area: true,
                        color: '#2ca02c',
                        label: 'Speed Meter',
                        
                        },
                        
                    ]}
                    width={500}
                    height={300}
                />
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        area: true,
                        color: '#ff4500',
                        label: 'RPM Meter',
                        
                        },
                        
                    ]}
                    width={500}
                    height={300}
                    
                />
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        area: true,
                        label: 'Torque',
                        
                        },
                        
                    ]}
                    width={500}
                    height={300}
                />

            </div>
            
            
        </div>
    
    );
    
};
