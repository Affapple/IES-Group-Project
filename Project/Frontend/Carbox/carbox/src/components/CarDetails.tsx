import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import '../css/CarDetails.css';
import Vehicle from 'Types/Vehicle';




export default function  CarDetails({data}: {data: Vehicle}) {
    const [revisionUp, setRevisionUp] = React.useState(false);
    const [alertMessage, setAlert] = React.useState("(EXPIRING SOON)")

    function checkRevision() {
        //To implement the logic for the revision date
        const lastRevision= new Date(data.lastRevision);
        const expires = new Date(lastRevision);
        expires.setFullYear(expires.getFullYear()+1);
        const current = Date.now();
        if(expires-current <= 30*86400000){
            setRevisionUp(true);
            if(expires-current <=0){
                setAlert("(EXPIRED)");
            }
            else{
                const missingDays = Math.floor((expires-current)/86400000);
                setAlert("(EXPIRING SOON, "+missingDays+" days left)");
            }
        }
        else{
            setRevisionUp(false);
        }

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
                    <p className="infoAlert">Last Revision: <span className='info2'> {data.lastRevision} <span className="info2Alert">{alertMessage}</span></span></p> 
                    : 
                    <p className="info">Last Revision: <span className='info2'> {data.lastRevision}</span></p>
                }
                
            </div>
        </div>
    
    );
    
};

