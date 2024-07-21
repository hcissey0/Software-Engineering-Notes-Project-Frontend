import React from 'react'

const AvatarSkeleton = () => {
  return (
    <div className="flex items-center ms-3">
                <div className='w-8 aspect-square bg-gray-400 rounded-full animate-pulse'>
                </div>
    </div>
  );
}

export default AvatarSkeleton;