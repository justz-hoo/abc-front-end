import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const RightCard = (props) => {
    return (
        <div>
            <Card sx={{width: 150, borderRadius: 2}}>
                <CardContent>
                    <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 20}}>
                        <div style={{height: 8, width: 8, borderRadius: 4, backgroundColor: props.color}}></div>
                        <Typography sx={{fontSize: 10, fontWeight: 700}} gutterBottom>
                            新增{props.newType}
                        </Typography>
                        <div style={{
                            fontSize: 10,
                            backgroundColor: '#F56B3F',
                            width: 30,
                            height: 20,
                            borderRadius: 10,
                            color: '#fff',
                            textAlign:"center",
                            verticalAlign:"middle"
                        }}>{props.number}</div>
                    </div>
                    <div style={{display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 8}}>
                        <Typography sx={{fontSize: 20, fontWeight: 700}}>
                            {props.totalNumber}
                        </Typography>
                        <Typography sx={{fontSize: 10, fontWeight: 400}} color="text.secondary">
                            +{props.percentage}%
                        </Typography>
                    </div>
                    <Typography sx={{fontSize: 12}} color="text.secondary">
                        本{props.unit}新增
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button style={{color: '#8B5E83'}} size="small">查看详情 →</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default RightCard;