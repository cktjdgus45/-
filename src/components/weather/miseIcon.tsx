import React from 'react';

interface MiseIconProps {
    miseGrade: string
}

const miseIcon = ({ miseGrade }: MiseIconProps) => {
    const publicUrl: string = process.env.PUBLIC_URL ?? '';
    return (
        <>
            {miseGrade === "1" && (<img className='w-20 h-20' alt='logo' src={publicUrl} />)}
            {miseGrade === "2" && (<img className='w-20 h-20' alt='logo' src={publicUrl} />)}
            {miseGrade === "3" && (<img className='w-20 h-20' alt='logo' src={publicUrl} />)}
            {miseGrade === "4" && (<img className='w-20 h-20' alt='logo' src={publicUrl} />)}
        </>
    )
}
export default miseIcon;