import React from 'react';
import LastLocationCard from './LastLocationCard';
import LastTripCard from './LastTripCard';

interface LastActivityProps {
  vehicleId: string | null;
}

const LastActivity: React.FC<LastActivityProps> = ({ vehicleId }) => {
  return (
    <section className="flex flex-col md:flex-row gap-6 p-8">
      <LastLocationCard vehicleId={vehicleId} />
      <LastTripCard vehicleId={vehicleId} />
    </section>
  );
};

export default LastActivity;