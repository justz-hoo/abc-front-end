import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import img_url1 from '../../asset/icon/message1.svg'
import img_url2 from '../../asset/icon/message2.svg'
import img_url3 from '../../asset/icon/message3.svg'


const msgs = [
    {img_src: img_url1, type: "手术", department: "妇产科"},
    {img_src: img_url2, type: "设备", department: "眼视光科"},
    {img_src: img_url3, type: "设备", department: "整形科"}
];


const RightMessage = () => {
    const SingleMsg = (props) => {
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={props.img_src}></Avatar>
                </ListItemAvatar>
                {/*<ListItemText primary={props.type + '科室'} secondary={props.department} />*/}
                <ListItemText><span>{props.department}</span></ListItemText>
            </ListItem>
        );
    }

    return (
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {msgs.map((msg, index) => (
                    <SingleMsg img_src={msg.img_src} type={msg.type} department={msg.department}/>
                ))}
            </List>
        </div>
    );
};

export default RightMessage;