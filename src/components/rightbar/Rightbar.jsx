import './rightbar.scss';

const Rightbar = () => {
    return (
        <div className="rightbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <span>User Piggy</span>
                    </div>
                    <div className='item'>
                        <span>Edit Params</span>
                    </div>
                    <div className='item'>
                        <span>Show Data</span>
                    </div>
                    <div className='item'>
                        <span>Export Result</span>
                    </div>
                    <div className='item'>
                        <span>Add New Record</span>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
}

export default Rightbar;