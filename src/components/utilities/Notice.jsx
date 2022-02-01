export default function Notice(props){
    return(
    <p className={props.notice.visibility?'notice-visible':'notice-invisible'}>{props.notice.message}</p>
    )
}

