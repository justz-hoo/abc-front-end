import './rightbar.scss';
import RightCard from "../rightcard/RightCard";
import RightMessage from "../rightmessage/RightMessage";

const Rightbar = () => {
    return (
        <div className="rightbar">
            <div className="container">
                <div className="cards">
                    <div className='card'>
                        <RightCard newType='手术'
                                   color='#5458F7'
                                   number={2}
                                   totalNumber={20}
                                   percentage={12}
                                   unit='周'/>
                    </div>
                    <div className='card'>
                        <RightCard newType='设备'
                                   color='#F8D65E'
                                   number={2}
                                   totalNumber={9}
                                   percentage={10}
                                   unit='月'/>
                    </div>
                </div>
                <div className='messages'>
                    <RightMessage/>
                </div>
            </div>
        </div>
    );
}

export default Rightbar;