import React from 'react';
import { Col, Row, RowProps } from 'antd';
import classnames from 'classnames';
import './label-value.less';

export interface LabelValueProps extends RowProps {
    label?: React.ReactNode;
    value?: React.ReactNode;
}

export function LabelValue(props: LabelValueProps) {
    const { label = null, value = null, className, ...rest } = props;
    const classes = classnames('label-value', className);
    return (
        <Row className={classes} {...rest}>
            <Col span={12} className="label-value-label">
                {label}
            </Col>
            <Col span={12} className="label-value-value">
                {value}
            </Col>
        </Row>
    );
}

export default LabelValue;
