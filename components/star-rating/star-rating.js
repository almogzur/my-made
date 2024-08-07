import { useState } from "react";

function StarRating() {

    const [rating, setRating] = useState(0)
    
    return (
        <div>
          {[1, 2, 3, 4, 5].map((star) => {
            return (  
              <span
                className='star'
                style={{
                  cursor: 'pointer',
                  color: rating >= star ? 'gold' : 'gray',
                  fontSize: `35px`,
                }}
                onClick={() => {
                  setRating(star)
                }}
              >
                {' '}
                ★{' '}
              </span>
            )
          })}
        </div>
      )
}
export default StarRating