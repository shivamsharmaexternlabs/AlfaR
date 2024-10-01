import Popup from "reactjs-popup"
import "./popup.css"

const PopupDetails = ({ children, PopupToggle,classNameProp }) => {
    return (
        <>


            <Popup open={PopupToggle} position="" model   >
                <div className={`${classNameProp} main-popup`} >
                    {children}
                </div>
            </Popup>

             


        </>
    )
}

export default PopupDetails