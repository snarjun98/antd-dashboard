import React from 'react';
import { RingProgress } from '@ant-design/charts';
const DemoRingProgress = () => {
    var config = {
        height: 100,
        width: 100,
        autoFit: false,
        percent: 0.7,
        color: ['#5B8FF9', '#E8EDF3'],
    };
    return <RingProgress {...config}/>;
};
export default DemoRingProgress;