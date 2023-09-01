import {Link} from 'react-router-dom';
import logo from '../assets/logo.jpg'
const Header  = ({heading, paragraph, linkName, linkUrl='#'}) => {
    return (
        <div className='mb-10'>
            <div className='flex justify-center'>
                <Link to='/'><img alt='Digital Media' className='h-15 w-15' src={logo} /></Link>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-blue-600 hover:text-blue-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}
export default Header;