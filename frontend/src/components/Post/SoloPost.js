import { useEffect } from 'react';
import PostShowBox from './PostShowBox'

const SoloPost = () => {
        useEffect(() => {
          document.body.style.backgroundColor = "#EDF2F7";
        }, []);
    return(
        <div className='flex'>
            <PostShowBox />
        </div>
    )
}
export default SoloPost;