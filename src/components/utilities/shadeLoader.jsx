

export default function ShadeLoader(props){
    return (
        <div className={props.loading ? "shade-loader":''}>
            <div className={props.loading ? "progress-bar" : ''}></div>
        </div>
    )
}