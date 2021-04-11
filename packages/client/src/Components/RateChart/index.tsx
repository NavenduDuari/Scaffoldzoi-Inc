import React, { Component, RefObject } from 'react';
import './RateChart.scss';
import Form, { FormInstance } from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { ComponentPropsI, ComponentStateI } from './types';
import Context from '../../Containers/App/appContext';
import { RateI } from '../../utils/types';
import { isNumber, isString } from '../../utils/type-checker';

const checkPrice = (_: any, price: string) => {
  const num = Number(price);
  if (isNumber(num) && num > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Price must be greater than zero!'));
};

class RateChart extends Component<ComponentPropsI, ComponentStateI> {
  formRef: RefObject<FormInstance>;

  rateNameEditBox: RefObject<Input>;

  ratePriceEditBox: RefObject<Input>;

  constructor(props: ComponentPropsI) {
    super(props);

    this.state = {
      rowIdToEdit: '',
    };

    this.formRef = React.createRef<FormInstance>();

    this.rateNameEditBox = React.createRef<Input>();

    this.ratePriceEditBox = React.createRef<Input>();
  }

  getRateChartRow = (rate: RateI) => {
    const { isProfileOwner } = this.props;
    const rowBeingEdited = this.state.rowIdToEdit === rate._id;
    return (
      <div className="table-row">
        {!rowBeingEdited ? (
          <>
            <div className="table-col">{rate.goodsMeta.type}</div>
            <div className="table-col">{rate.goodsMeta.price}</div>
          </>
        ) : (
          <>
            <Input
              className="table-col"
              autoFocus
              ref={this.rateNameEditBox}
              defaultValue={rate.goodsMeta.type}
            />
            <Input
              className="table-col"
              ref={this.ratePriceEditBox}
              defaultValue={rate.goodsMeta.price}
            />
          </>
        )}
        {isProfileOwner && (
          <div className="table-col">
            {rowBeingEdited ? (
              <Button
                onClick={() => {
                  const jobs: { path: string[]; value: any }[] = [];
                  const updatedOrangeName = this.rateNameEditBox.current?.state
                    .value;
                  const updatedOrangePrice = this.ratePriceEditBox.current
                    ?.state.value;

                  if (rate.goodsMeta.type !== updatedOrangeName) {
                    jobs.push({
                      path: ['goodsMeta', 'type'],
                      value: updatedOrangeName,
                    });
                  }

                  if (rate.goodsMeta.price !== updatedOrangePrice) {
                    jobs.push({
                      path: ['goodsMeta', 'price'],
                      value: updatedOrangePrice,
                    });
                  }

                  this.props.updateRate(this.state.rowIdToEdit, jobs);
                  this.setState({ rowIdToEdit: '' });
                }}
              >
                Done
              </Button>
            ) : (
              <>
                <Button
                  className="rate-edit-btn"
                  icon={<EditOutlined />}
                  onClick={() => this.setState({ rowIdToEdit: rate._id })}
                />
                <Button
                  className="rate-delete-btn"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => this.props.deleteRate(rate._id)}
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { isProfileOwner } = this.props;
    return (
      <div className="rate-chart">
        <div className="table-header">
          <div className="table-col">Orange Name</div>
          <div className="table-col">Price (₹/Kg)</div>
          {isProfileOwner && <div className="table-col">Actions</div>}
        </div>
        <div className="table-body">
          {this.props.rateChart.length > 0 ? (
            <>
              {this.props.rateChart.map((r: RateI) => this.getRateChartRow(r))}
            </>
          ) : (
            <div className="nothing-here">Oops! Nothing here</div>
          )}
        </div>

        {isProfileOwner && (
          <div className="table-footer">
            <Form
              ref={this.formRef}
              layout="inline"
              onFinish={(values: {
                orangeName: string;
                orangePrice: number;
              }) => {
                const { orangeName } = values;
                const orangePrice = Number(values.orangePrice);
                if (isString(orangeName) && isNumber(orangePrice)) {
                  this.props.insertRate(orangeName, orangePrice);
                  this.formRef.current?.resetFields();
                }
              }}
            >
              <Form.Item className="table-col" name="orangeName">
                <Input placeholder="Enter orange name" />
              </Form.Item>
              <Form.Item
                className="table-col"
                name="orangePrice"
                rules={[{ validator: checkPrice }]}
              >
                <Input placeholder="Enter orange price" />
              </Form.Item>
              <Form.Item className="table-col">
                <Button type="primary" htmlType="submit">
                  ADD
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

RateChart.contextType = Context;

export default RateChart;
