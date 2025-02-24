import {addReport} from '@/services/reportService';
import {Button,Form,message,Modal,Input} from 'antd';
import React from 'react';

interface Props {
  visible:boolean;
  reportedId:number;
  onClose:() => void;
}

/**
 * 举报弹窗
 * @constructor
 * */
export const ReportModal:React.FC<Props> = (props) => {
  const {visible,reportedId,onClose} = props;
  const TextArea = Input;
  const [form] = Form.useForm();
  const onFinish = async (values:any) => {
    const hide = message.loading('正在提交');
    try {
      await addReport({
        type:0,
        content:values.content,
        reportedId,
      });
      message.success('提交成功');
      form.resetFields();
      onClose?.();
    }catch(error:any) {
      message.error(`提交失败，请重试！${error.message}`)
    }finally {
      hide()
    }
  };

  return(
    <Modal title="我要举报" open={visible} footer={null} onCancel={onClose}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="content" rules={[{required:true,message:'请你输入举报原因'}]}>
          <TextArea autoFocus maxLength={1024}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{float:'right',width:150}}>提交</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}