import { Link } from "react-router-dom"
import { polish } from '../../actions/effect';

function List({text,href,class_name}) {
    const lievent = {
        
    }
    return(
        <li className={ class_name } >
            <Link to={ href } onMouseOver={ polish } >{ text }</Link>
        </li>
    )
}

export default List
