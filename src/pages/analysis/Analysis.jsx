import React from 'react';
import './analysis.scss';
import Image1Url from '../../asset/pics/pic0.svg';
import Image2Url from '../../asset/pics/pic2.svg';
import Image3Url from '../../asset/pics/pic3.svg';
import Image4Url from '../../asset/pics/pic4.svg';
import Image5Url from '../../asset/pics/pic5.svg';

const Analysis = () => {
    return (
        <div className='analysis'>
            <div className="container">
                <div className="left">
                    <div className="left-upper">
                        <div className="img1">
                            <img src={Image1Url}/>
                        </div>
                        <div className="img2">
                            <img src={Image2Url}/>
                        </div>
                    </div>
                    <div className="left-lower">
                        <img src={Image3Url}/>
                        <img src={Image4Url} alt=""/>
                    </div>
                </div>
                <div className="right">
                    <img src={Image5Url} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Analysis;