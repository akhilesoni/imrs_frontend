import { Link } from "react-router-dom";
import "../../style/componentStyle/add_button.css"
import Add from "../../icons/add.svg"
export default function AddButton(props){
    return (
        <Link to={props.link} className="panel-button-blue">
            <img src={Add} className="button-icon" alt="" />
            <p className="text-small">
                {props.title}
            </p>
        </Link>
    )
}