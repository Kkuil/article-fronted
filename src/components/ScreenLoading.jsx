import React from 'react'
import { Spin } from 'antd'
import Model from '@/components/Model';

export default function ScreenLoading() {
    return (
        <Model>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </Model>
    )
}
