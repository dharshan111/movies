import React from 'react'
import starimg from '../assets/star.png'
import noimg from '../assets/No-Poster.png'

const MovieCard = ({movie}) => {
    const {title, vote_average, poster_path, original_language, release_date, overview} = movie
  return (
    <div className='movie-card relative group rounded-xl overflow-hidden shadow-lg cursor-pointer'>
        <p className='text-white'>{title}</p>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noimg}  alt={title} />
        
        <div className="mt-4">
            <h3>{title}</h3>


            <div className='content'>
                <div className='rating'>
                    <img src={starimg} alt="star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>.</span>
                <p className='lang'>{original_language}</p>
                
                <span>.</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>

            <p className='text-sm text-gray-300 overflow-hidden line-clamp-6 mb-4'>
                {overview || 'review not available'}
            </p>
                
            </div>
        </div>
    </div>
  )
}

export default MovieCard;