import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Vehicle from 'Types/Vehicle';




export default function  CarDetails({data}: {data: Vehicle}) {
    const [revisionUp, setRevisionUp] = React.useState(false);

    function checkRevision() {
        //To implement the logic for the revision date
    };

    useEffect(() => {
        checkRevision();
    } , [revisionUp]);

    return (
        <div className="font-sans space-y-0.5 w-100%; border-b-2 border-black pb-3">
            <div className='ml-10'>
                <h2 className="text-3xl font-semibold mb-2 text-gray-800">Car Information</h2>
                <p className="info">{data.brand}, {data.model}</p>
                <p className="info">Year: <span className='info2'> {data.year}</span></p>
                <p className="info">License Plate: <span className='info2'> {data.licensePlate}</span></p>
                {revisionUp ? 
                    <p className="info2Alert">Last Revision: <span className='info2Alert'> {data.lastRevision} EXPIRING SOON</span></p> 
                    : 
                    <p className="info">Last Revision: <span className='info2'> {data.lastRevision}</span></p>
                }
                
            </div>
        </div>
    
    );
    
};

