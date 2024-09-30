 import CategeoryBtn from './CategeoryBtn'
import CategeoryTitle from './CategeoryTitle'
import ColorBtnGroup from './ColorBtnGroup'
 

const CategeoryList = ({ listName, showView, icon, Categeorys, Color,newFuntest }) => {


  

    function mainDataFun(items) { 
        newFuntest(items)  //1.3
    }

 




    return (
        <>
            <li>
                <CategeoryTitle icon={icon} showView={showView} listName={listName} />
                {Color !== true ? <div className='CategeoryBtnGroup'>

                    <CategeoryBtn Categeorys={Categeorys} mainAllDataFun={mainDataFun} listName={listName} />

                </div>
                    :
                    <div className='colobtngroup'>
                        <ColorBtnGroup BgColor={'#231F20'} Colorbtnname1={'Black'} />
                        <ColorBtnGroup BgColor={'#B6DABA'} Colorbtnname1={'Green'} />
                        <ColorBtnGroup BgColor={'#E1BFB0'} Colorbtnname1={'Peach'} />
                        <ColorBtnGroup BgColor={'#DAD1E2'} Colorbtnname1={'Purple'} />
                    </div>
                }
            </li>
        </>
    )
}

export default CategeoryList