import React from 'react';
import "./style.css";
import { Card, Row } from 'antd';
import Button from '../buttons';

function Cards({income,expense,totalBalance, showExpenseModal,showIncomeModal}) {
  return (
      <Row className='my-row'>
        <Card className='my-card' title="Current Balance">
            <p>{totalBalance}</p>
            <Button blue={true} text="Reset Balance" />
        </Card>
        <Card className='my-card' title="Total Income">
            <p>{income}</p>
            <Button blue={true} text="Add Income" onClick={showIncomeModal}/>
        </Card>
        <Card className='my-card' title="Total Expenses">
            <p>{expense}</p>
            <Button blue={true} text="Add Expenses" onClick={showExpenseModal}/>
        </Card>
      </Row>
  )
}

export default Cards