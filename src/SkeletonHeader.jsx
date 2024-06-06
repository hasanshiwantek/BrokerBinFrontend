import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonHeader = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <Skeleton height={40} width={`80%`} />
      <Skeleton height={20} width={`60%`} style={{ marginTop: '0.5rem' }} />
    </div>
  );
};

export default SkeletonHeader;
