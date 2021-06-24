import React from 'react';
import {Bar} from 'react-chartjs-2'

const Statistic =()=>{
    return (
        <div>
            <Bar
                data={{
                    labels: ['Tháng 1','Tháng 2','Tháng 3','Tháng 5','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
                    datasets:[
                        {
                            label:'Số lượng',
                            data:[12,31,5,17,6,19],
                            backgroundColor:[
                                'rgba(54, 162, 235, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                        },
                        {
                            label:'Doanh thu',
                            data:[122,301,53,171,69,192],
                            backgroundColor:['rgba(255, 159, 64, 1)'],
                            borderColor:['rgba(153, 102, 255, 0.2)'],
                        }
                    ],
                }}
                height={400}
                width={600}
                options={{ 
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks:{
                                    beginAtZero:true,
                                },
                            },
                        ],
                    },
                 }}
            />
        </div>
    )
}
export default Statistic;