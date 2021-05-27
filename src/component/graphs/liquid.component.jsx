import React, { useState, useEffect } from 'react';
import { Liquid } from '@ant-design/charts';
const DemoLiquid = () => {
    var [percent, setPercent] = useState(0.26);
    var ref;
    var config = {
        percent,
        statistic: {
            title: {
                formatter: function formatter() {
                    return 'So2';
                },
                style: function style(_ref) {
                    var percent = _ref.percent;
                    return { fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)' };
                },
            },
            content: {
                style: function style(_ref2) {
                    var percent = _ref2.percent;
                    return {
                        fontSize: 20,
                        lineHeight: 1,
                        fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
                    };
                },
            },
        },
        liquidStyle: function liquidStyle(_ref4) {
            var percent = _ref4.percent;
            return {
                fill: percent > 0.75 ? '#5B8FF9' : '#FAAD14',
                stroke: percent > 0.75 ? '#5B8FF9' : '#FAAD14',
            };
        },
        color: function color() {
            return '#5B8FF9';
        },
    };
    useEffect(() => {
        var data = 0.25;
        var interval = setInterval(function () {
            data += Math.min(Math.random() * 0.1, 0.1);
            if (data < 0.75) {
                setPercent(data);
            }
            else {
                clearInterval(interval);
            }
        }, 500);
    }, []);
    return <Liquid {...config} chartRef={(chartRef) => (ref = chartRef)}/>;
};
export default DemoLiquid;