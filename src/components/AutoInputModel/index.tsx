import {AUTO_INPUT_EXAMPLE} from '@/constants/examples';
import {getSchemaByAuto} from '@/services/sqlService';
import {Button,Form,message,Modal,Space} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

interface Props {
  onSubmit:(values:TableSchema) => void;
  visible:boolean;
  onClose:() => void;
}

/**
 * 智能导入输入模态框
 *
 * @constructor
 * @author https://github.com/redioactive?tab=repositories
 * */

export const AutoInputModel:React.FC<Props> = (props) => {
  const {visible,onSubmit,onClose} = props;
  const [form] = Form.useForm();

  /**
   * 自动生成schema
   * @param values
   * */
  const onFinish = async(values:any) => {
    if(!values.content) {
      return;
    }
    try {
      const res = await getSchemaByAuto(values);
      onSubmit?.(res.data);
    }catch(error:any) {
      message.error(`导入错误,${error.message}`);
    }
  }

  return (
    <Modal title='智能导入' open={visible} footer={null} onCancel={onClose}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="content" rules={[{ required: true, message: '请输入配置' }]}>
          <div>
            请输入表的列名，多个列以【英文或中文逗号分隔】；
            <Button onClick={() => form.setFieldValue('content', AUTO_INPUT_EXAMPLE)}>导入示例</Button>
          </div>
          <TextArea placeholder="请输入表的列名，多个列以【英文或中文逗号】分隔：" autoSize={{ minRows: 16 }} />
        </Form.Item>
        <Form.Item>
          <Space size="large">
            <Button type="primary" htmlType="submit" style={{ width: 120 }}>导入</Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}