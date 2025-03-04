import {addFieldInfo} from '@/services/fieldInfoService';
import {ProColumns,ProTable} from '@ant-design/pro-components';
import {message,Modal,Typography} from 'antd';
import React,{PropsWithChildren} from 'react';

interface Props {
  modalVisible:boolean;
  initialValues?:FieldInfoType.FieldInfo;
  onSubmit:() => void;
  onCancel:() => void;
}

/**
 * 添加节点
 * @param fields
 * */
const handleAdd = async(fields:FieldInfoType.FieldInfo) => {
  const hide = message.loading('正在添加')
  try {
    await addFieldInfo({...fields} as FieldInfoType.FieldInfoAddRequest);
    hide();
    message.success('添加成功');
    return true;
  }catch(error:any) {
    hide();
    message.error('添加失败，' + error.message);
    return false;
  }
}

/**
 * 创建数据模态框
 * @param props
 * @constructor
 * */
export const FieldInfoCreateModal :React.FC<PropsWithChildren<Props>> = (props) => {
  const {modalVisible,initialValues,onSubmit,onCancel} = props;

  /**
   * 表格列配置
   * */
  const columns:ProColumns<FieldInfoType.FieldInfo>[] = [
    {
      title:'名称',
      dataIndex:'name',
      formItemProps:{
        rules:[{required:true}],
      },
      fieldProps:{
        autoFocus:true,
        placeholder:'请输入中文名称'
      }
    },
    {
      title:'内容（不建议在此修改）',
      dataIndex:'content',
      valueType:'textarea'
    }
  ];
  return(
    <Modal destroyOnClose title="保存字段信息（后续可直接导入）" open={modalVisible} onCancel={() => onCancel()} footer={null}>
      <Typography.Text type="secondary">注意：你提交的内容可能会被公开！</Typography.Text>
      <div style={{marginBottom:16}}/>
      <ProTable <FieldInfoType.FieldInfo,FieldInfoType.FieldInfoAddRequest>
        form={{
          initialValues,
          submitter: {
            render: (props, dom) => [...dom.reverse()],
          },
        }}
        // @ts-ignore
        onSubmit={async (value:FieldInfoAddRequest) => {
          // @ts-ignore
          const fieldInfo = value as FieldInfo;
          const success = await handleAdd(fieldInfo);
          if (success) {
            onSubmit?.();
          }
        }}
        rowKey="id"
        type="form"
        columns={columns}></ProTable>
    </Modal>
  )
}