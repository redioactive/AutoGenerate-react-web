import { AutoInputModal } from '@/components/AutoInputModel';
import { FormInput } from '@/components/FormInput';
import { GenerateResultCard } from '@/components/GenerateResultCard';
import { ImportTableDrawer } from '@/components/ImportTableDrawer';
import { JsonInputModal } from '@/components/JsonInputModal';
import { SqlInputModal } from '@/components/SqlInputModal';
import { generateBySchema, getSchemaByExcel } from '@/services/sqlService';
import { getTableInfoById } from '@/services/tableInfoService';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import {
  BackTop,
  Button,
  Card,
  Col,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Spin,
  Upload,
  UploadProps,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

const IndexPage: React.FC = () => {
  const [result, setResult] = useState<GenerateVO>();
  const [autoInputModalVisible, setAutoInputModalVisible] = useState(false);
  const [jsonInputModalVisible, setJsonInputModalVisible] = useState(false);
  const [sqlInputModalVisible, setSqlInputModalVisible] = useState(false);
  const [importTableDrawerVisible, setImportTableDrawerVisible] =
    useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const formInputRef: any = useRef();
  const [layout, setLayout] = useState('half');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tableId = searchParams.get('table_id');

  const doGenerateBySchema = async (values: TableSchema) => {
    setGenLoading(true);
    try {
      const res = await generateBySchema(values);
      setResult(res.data);
      message.success('已生成');
    } catch (e: any) {
      message.error('生成错误，' + e.message);
    }
    setGenLoading(false);
  };

  const importTableSchema = (tableSchema: TableSchema) => {
    formInputRef.current.setFormValues(tableSchema);
    setAutoInputModalVisible(false);
    setJsonInputModalVisible(false);
    setSqlInputModalVisible(false);
    message.success('导入成功');
  };

  useEffect(() => {
    if (!tableId) {
      setErrorMessage('未找到可用的表，请检查 URL 参数');
      setLoading(false);
      return;
    }

    getTableInfoById(Number(tableId))
      .then((res) => {
        if (!res.data || !res.data.content) {
          throw new Error('表数据为空或无效');
        }
        const tableSchema = JSON.parse(res.data.content);
        importTableSchema(tableSchema);
        setLoading(false);
      })
      .catch((e) => {
        setErrorMessage(`导入表失败: ${e.message}`);
        setLoading(false);
      });
  }, [tableId]);

  const uploadProps: UploadProps = {
    name: 'file',
    showUploadList: false,
    customRequest: async (options) => {
      if (!options) return;
      try {
        const res = await getSchemaByExcel(options.file);
        importTableSchema(res.data);
      } catch (e: any) {
        message.error('操作失败，' + e.message);
      }
    },
  };

  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  const inputConfigView = (
    <Card
      title="输入配置"
      extra={
        <Select defaultValue="MySQL" style={{ width: 120 }} disabled>
          <Select.Option value="MySQL">MySQL</Select.Option>
        </Select>
      }
    >
      <Space size="large" wrap>
        <Button
          type="primary"
          ghost
          onClick={() => setAutoInputModalVisible(true)}
        >
          智能导入
        </Button>
        <Button onClick={() => setImportTableDrawerVisible(true)}>
          导入表
        </Button>
        <Button onClick={() => setJsonInputModalVisible(true)}>导入配置</Button>
        <Button onClick={() => setSqlInputModalVisible(true)}>
          导入建表 SQL
        </Button>
        <Upload {...uploadProps}>
          <Button>导入 Excel</Button>
        </Upload>
      </Space>
      <div style={{ marginTop: 16 }} />
      <FormInput ref={formInputRef} onSubmit={doGenerateBySchema} />
    </Card>
  );

  return (
    <div id="indexPage">
      <PageContainer
        title={<>快速生成 SQL 和模拟数据，大幅提高开发测试效率！</>}
        extra={
          <div style={{ marginLeft: 0 }}>
            切换布局：
            <Radio.Group onChange={onLayoutChange} value={layout}>
              <Radio.Button value="input">配置</Radio.Button>
              <Radio.Button value="half">同屏</Radio.Button>
              <Radio.Button value="output">结果</Radio.Button>
            </Radio.Group>
          </div>
        }
      >
        {errorMessage && (
          <div style={{ textAlign: 'center', marginBottom: 16, color: 'red' }}>
            ⚠ {errorMessage}
          </div>
        )}
        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 2 : 1}
          >
            {inputConfigView}
          </Col>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 1 : 2}
          >
            <GenerateResultCard result={result} loading={genLoading} />
          </Col>
        </Row>
        <BackTop />
      </PageContainer>
      <AutoInputModal
        onSubmit={importTableSchema}
        visible={autoInputModalVisible}
        onClose={() => setAutoInputModalVisible(false)}
      />
      <JsonInputModal
        onSubmit={importTableSchema}
        visible={jsonInputModalVisible}
        onClose={() => setJsonInputModalVisible(false)}
      />
      <SqlInputModal
        onSubmit={importTableSchema}
        visible={sqlInputModalVisible}
        onClose={() => setSqlInputModalVisible(false)}
      />
      <ImportTableDrawer
        onImport={(tableInfo) => {
          formInputRef.current.setFormValues(JSON.parse(tableInfo.content));
          setImportTableDrawerVisible(false);
          message.success('导入成功');
        }}
        visible={importTableDrawerVisible}
        onClose={() => setImportTableDrawerVisible(false)}
      />
    </div>
  );
};

export default IndexPage;
