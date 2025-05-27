import React from 'react'
import Image from 'next/image'

const Agent = () => {
    const isSpeaking = true; // This can be a prop or state to control speaking status
  return (
    <div className='call-view'>
        <div className='card-interviewer'>
            <div className='avatar'>
                <Image src="/ai-avatar.png" alt='vapi' className="object-cover" width={65} height={54} />
                {isSpeaking && <span className='animate-speak' />}
            </div>
        </div>
    </div>
  )
}

export default Agent