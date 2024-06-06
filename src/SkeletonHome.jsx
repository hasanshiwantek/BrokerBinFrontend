import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonHome = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <Skeleton height={200} />
      <Skeleton count={3} style={{ marginTop: '1rem' }} />
    </div>
  );
};

export default SkeletonHome;
