import React from 'react'
import { Button, DatePicker, Form, Modal, Select, Input} from "antd";

function AddExpenses({
    isExpenseModalVisible,
    handleExpenseCancel,
    onFinish,
}) {

    const [form] = Form.useForm();
  return (
    <Modal
     style={{fontWeight: 600}}
     title="Add Expense"
     visible={isExpenseModalVisible}
     onCancel={handleExpenseCancel}
     footer={null}
    >
    <Form
     form={form}
     layout='vertical'
     onFinish={(values)=>{
        onFinish(values,"Expense");
        form.resetFields();
     }}
    >
    <Form.Item
     style={{fontWeight: 600}}
     label="Name"
     name="name"
     rules={[
        {
            required : true,
            message : "Please input the name of the Expense!"}
     ]}>
    <Input type="text" className="custom-input"/>
    </Form.Item>
    <Form.Item
     style={{fontWeight: 600}}
     label="Amount"
     name="amount"
     rules={[
        {
            required : true,
            message : "Please input the expense amount!"}
     ]}>
    <Input type="number" className="custom-input"/>
    </Form.Item>
    <Form.Item
     style={{fontWeight: 600}}
     label="Date"
     name="date"
     rules={[
        {
            required : true,
            message : "Please input the Expense date!"}
     ]}>
    <DatePicker format="YYYY-MM-DD" className='custom-input' />
    </Form.Item>
    <Form.Item
     style={{fontWeight: 600}}
     label="Tag"
     name="tag"
     rules={[
        {
            required : true,
            message : "Please select a tag!"}
     ]}>
        <Select className='select-input-2'>
            <Select.Option value="Rent">Rent</Select.Option>
            <Select.Option value="Loan">Loan</Select.Option>
            <Select.Option value="Study">Study</Select.Option>
            <Select.Option value="Entertainment">Entertainment</Select.Option>
            <Select.Option value="Medical">Medical</Select.Option>
        </Select>
    </Form.Item>
    <Form.Item>
        <Button className='btn btn-blue' type='primary' htmlType='submit'>Add Expense</Button>
    </Form.Item>
    </Form>
    </Modal>    
  )
}

export default AddExpenses;