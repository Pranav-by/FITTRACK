import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';

const Model = ({ handleClose, content, header }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='w-[90%] max-w-md bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white rounded-2xl p-6 shadow-xl border border-purple-600'>
        
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>{header}</h2>
          <div onClick={handleClose} className='cursor-pointer hover:text-fuchsia-400 transition'>
            <ClearIcon sx={{ fontSize: '28px' }} />
          </div>
        </div>

        <div>
          {content}
        </div>

      </div>
    </div>
  )
}

export default Model;
