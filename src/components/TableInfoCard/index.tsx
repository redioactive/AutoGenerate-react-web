import { TableInfoList } from '@/components/TableInfoList';
import { listTableInfoByPage } from '@/services/tableInfoService';
import { Link, useModel } from '@umijs/max';
import { Button, Card, Empty, Input, message, Space, Spin } from 'antd';
import { DEFAULT_PAGE_SIZE } from 'antd/es/table/hooks/usePagination';
import React, { useEffect, useState } from 'react';
import './index.less';

//默认分页大小
interface Props {
  title?: string;
  needLogin?: boolean;
  showTag?: boolean;
  onLoad?: (
    searchParams: TableInfoType.TableInfoQueryRequest,
    setDataList: (dataList: TableInfoType.TableInfo[]) => void,
    setTotal: (total: number) => void,
  ) => void;
  onImport?: (values: TableInfoType.TableInfo) => void;
}

/**
 * 表信息卡片
 * @constructor
 * @author https://github.com/redioactive
 * */
export const TableInfoCard: React.FC<Props> = (props) => {
  const {
    title = '表信息列表',
    needLogin = false,
    showTag = true,
    onLoad,
    onImport,
  } = props;

  //公开数据
  const [dataList, setDataList] = useState<TableInfoType.TableInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const initSearchParams: TableInfoType.TableInfoQueryRequest = {
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortOrder: 'descend',
  };
  const [searchParams, setSearchParams] =
    useState<TableInfoType.TableInfoQueryRequest>(initSearchParams);

  const { initialState } = useModel('@@initialState');
  if (loading || !initialState) {
    return <Spin />;
  }
  const loginUser = initialState?.loginUser;

  if (!initialState) {
    return <Spin />;
  }
  /**
   * 加载数据
   * */
  const innerOnLoad = () => {
    listTableInfoByPage({
      ...searchParams,
      //只展示已审核的数据
      reviewStatus: 1,
    })
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((error) => {
        message.error(`加载失败${error.message}`);
      });
  };
  //加载数据
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (needLogin && !loginUser) return; // 在 Hook 内部进行检查
    setLoading(true);

    if (onLoad) {
      onLoad(searchParams, setDataList, setTotal);
    } else {
      innerOnLoad();
    }

    setLoading(false);
  }, [searchParams, needLogin, loginUser]);
  return (
    <div className="table-info-card">
      <Card
        title={title}
        extra={
          <Link to="/">
            <Button type="primary">创建表</Button>
          </Link>
        }
      >
        {!needLogin || loginUser ? (
          <>
            <Space>
              <Input.Search
                placeholder="请输入名称"
                enterButton="搜索"
                onSearch={(value) => {
                  setSearchParams({
                    ...initSearchParams,
                    name: value,
                  });
                }}
              />
            </Space>
            <TableInfoList
              pagination={{
                total,
                onChange: (current: number) => {
                  setSearchParams({ ...searchParams, current });
                  window.scrollTo({
                    top: 0,
                  });
                },
                pageSize: DEFAULT_PAGE_SIZE,
              }}
              showTag={showTag}
              dataList={dataList}
              loading={loading}
              onImport={onImport}
            />
          </>
        ) : (
          <Empty
            description={
              <Link to="/user/login">
                <Button type="primary" ghost style={{ marginTop: 8 }}>
                  请先登录
                </Button>
              </Link>
            }
          />
        )}
      </Card>
    </div>
  );
};
