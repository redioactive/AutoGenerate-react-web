import { CodeEditor } from '@/components/CodeEditor';
import { downloadDataExcel } from '@/services/sqlService';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Collapse,
  Empty,
  message,
  Space,
  Table,
  Tabs,
} from 'antd';
import copy from 'copy-to-clipboard';
import React from 'react';

interface Props {
  result?: GenerateVO;
  loading?: boolean;
  showCard?: boolean;
}

/**
 * @constructor
 * 生成结果展示卡片组件
 */
export const GenerateResultCard: React.FC<Props> = (props) => {
  const { result, loading = false, showCard = true } = props;
  /**
   * 下载 excel 数据
   */
  const doDownloadDataExcel = async () => {
    if (!result) return;
    try {
      const res = await downloadDataExcel(result);

      // 下载文件
      const blob = new Blob([res]);
      const objectURL = URL.createObjectURL(blob);
      const btn = document.createElement('a');
      btn.download = `${result.tableSchema.tableName}表数据.xlsx`;
      btn.href = objectURL;
      btn.click();
      URL.revokeObjectURL(objectURL);
    } catch (error: any) {
      message.error(`操作失败,${error.message}`);
    }
  };

  /**
   * 生成表格列
   * @param tableSchema
   */
  const schemaToColumn = (tableSchema: TableSchema) => {
    if (!tableSchema?.fieldList) {
      return [];
    }
    return tableSchema.fieldList.map((column) => {
      return {
        title: column.fieldName,
        dataIndex: column.fieldName,
        key: column.fieldName,
      };
    });
  };

  const tableContent = result ? (
    <Tabs
      items={[
        {
          label: 'SQL 代码',
          key: 'createSql',
          children: (
            <>
              <Space>
                <Button
                  icon={<CopyOutlined />}
                  type="primary"
                  onClick={(e) => {
                    if (!result) return;
                    copy(`${result.createSql}\n\n${result.insertSql}`);
                    e.stopPropagation();
                    message.success('已复制到剪切板');
                  }}
                >
                  复制全部
                </Button>
              </Space>
              <div style={{ marginTop: 16 }} />
              <Collapse
                defaultActiveKey={['1', '2']}
                items={[
                  {
                    key: '1',
                    label: '建表语句',
                    className: 'code-collapse-panel',
                    extra: (
                      <Button
                        key="copy-create-sql"
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={(e) => {
                          copy(result?.createSql);
                          e.stopPropagation();
                          message.success('已复制到剪切板');
                        }}
                      >
                        复制
                      </Button>
                    ),
                    children: (
                      <CodeEditor
                        key="create-sql-editor"
                        value={result.createSql}
                        language="sql"
                      />
                    ),
                  },
                  {
                    key: '2',
                    label: '插入语句',
                    className: 'code-collapse-panel',
                    extra: (
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          message.success('已复制到剪切板');
                        }}
                      >
                        复制
                      </Button>
                    ),
                    children: (
                      <CodeEditor value={result.insertSql} language="sql" />
                    ),
                  },
                ]}
              />
            </>
          ),
        },
        {
          label: '模拟数据',
          key: 'mockData',
          children: (
            <React.Fragment key="mockData">
              <Space>
                <Button
                  icon={<DownloadOutlined />}
                  type="primary"
                  onClick={() => doDownloadDataExcel()}
                >
                  下载数据
                </Button>
              </Space>
              <div style={{ marginTop: 16 }} key="spacer" />
              <Table
                bordered={true}
                dataSource={result.dataList.map((item, index) => ({
                  ...item,
                  key: item.id || index, // 确保每项数据都有唯一的 key
                }))}
                columns={schemaToColumn(result.tableSchema)}
              />
            </React.Fragment>
          ),
        },
        {
          label: 'JSON数据',
          key: 'dataJson',
          children: (
            <>
              <Space>
                <Button
                  icon={<CopyOutlined />}
                  type="primary"
                  onClick={(e) => {
                    copy(result?.dataJson);
                    e.stopPropagation();
                    message.success('已复制到剪切板');
                  }}
                >
                  复制代码
                </Button>
              </Space>
              <div style={{ marginTop: 16 }} />
              <CodeEditor value={result.dataJson} language="json" />
            </>
          ),
        },
        {
          label: 'Nestjs 代码',
          key: 'NestCode',
          children: (
            <>
              <Collapse
                defaultActiveKey={['1', '2']}
                items={[
                  {
                    key: '1',
                    label: '实体代码',
                    className: 'code-collapse-panel',
                    extra: (
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={(e) => {
                          copy(result?.nestEntityCode);
                          e.stopPropagation();
                          message.success('已复制到剪切板');
                        }}
                      >
                        复制
                      </Button>
                    ),
                    children: (
                      <CodeEditor
                        value={result.nestEntityCode}
                        language="nest"
                      />
                    ),
                  },
                  {
                    key: '2',
                    label: '对象代码',
                    className: 'code-collapse-panel',
                    extra: (
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={(e) => {
                          copy(result?.nestObjectCode);
                          e.stopPropagation();
                          message.success('已复制到剪切板');
                        }}
                      >
                        复制
                      </Button>
                    ),
                    children: (
                      <CodeEditor
                        value={result.nestObjectCode}
                        language="nest"
                      />
                    ),
                  },
                ]}
              />
            </>
          ),
        },
        {
          label: '前端代码',
          key: 'frontendCode',
          children: (
            <>
              <Collapse
                defaultActiveKey={['1']}
                items={[
                  {
                    key: '1',
                    label: 'Typescript 类型代码',
                    className: 'code-collapse-panel',
                    extra: (
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={(e) => {
                          copy(result?.typescriptTypeCode);
                          e.stopPropagation();
                          message.success('已复制到剪切板');
                        }}
                      >
                        复制
                      </Button>
                    ),
                    children: (
                      <CodeEditor
                        value={result.typescriptTypeCode}
                        language="typescript"
                      />
                    ),
                  },
                ]}
              />
            </>
          ),
        },
      ]}
    />
  ) : (
    <Empty description="请先输入配置并点击【一键生成】" />
  );

  return showCard ? (
    <Card title="生成结果" loading={loading}>
      {tableContent}
    </Card>
  ) : (
    tableContent
  );
};
