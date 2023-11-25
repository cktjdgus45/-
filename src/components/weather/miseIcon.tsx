import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceAngry, faFaceFrown, faFaceSmile, faFaceSmileWink } from '@fortawesome/free-solid-svg-icons';

interface MiseIconProps {
    miseGrade: string | undefined;
}

const MiseIcon = ({ miseGrade }: MiseIconProps) => {
    return (
        <div className='text-2xl flex justify-center items-center rounded-full bg-white p-1'>
            {miseGrade === "1" && (<FontAwesomeIcon className='text-sky-500' icon={faFaceSmileWink} />)}
            {miseGrade === "2" && (<FontAwesomeIcon className='text-green-500' icon={faFaceSmile} />)}
            {miseGrade === "3" && (<FontAwesomeIcon className='text-orange-500' icon={faFaceFrown} />)}
            {miseGrade === "4" && (<FontAwesomeIcon className='text-red-500' icon={faFaceAngry} />)}
        </div>
    )
}
export default MiseIcon;