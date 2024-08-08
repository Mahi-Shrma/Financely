import { Line, Pie } from '@ant-design/charts';
import React from 'react'

function ChartComponent({sortedTransactions}) {
    const data = sortedTransactions.map((item)=>{
        return{ date:item.date,amount:item.amount};
    });

let spendingData = sortedTransactions.filter((transactions)=>{
    if(transactions.type == "Expense"){
        return {tag:transactions.tag, amount:transactions.amount}
    }
});

let finalSpendings= spendingData.reduce((acc, obj)=>{
    let key =obj.tag;
    if(!acc[key]){
        acc[key]={tag: obj.tag, amount: obj.amount };
    }else{
        acc[key].amount +=obj.amount;
    }
    return acc;
},{});

      const config = {
        data:data,
        width: 500,
        height: 350,
        autoFit: true,
        xField: 'date',
        yField: 'amount',
        // point: {
        //   size: 5,
        //   shape: 'diamond',
        // },
        // label: {
        //   style: {
        //     fill: '#aaa',
        //   },
        // },
      };
      const spendingConfig={
        data: spendingData,
        width:400,
        height: 350,
        angleField:"amount",
        colorField:"tag",
      };
    
      let chart;
      let pieChart;
  return (
    <div className='charts-wrapper'>
    <div>
        <h2 style={{marginTop:0}}>Finalcial Statistics</h2>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
    </div>
    <div>
        <h2>Total Expenses</h2>
        <Pie
        {...spendingConfig}
        onReady={(chartInstance)=>(pieChart = chartInstance)}/>
    </div>
    </div>
  );
}

export default ChartComponent