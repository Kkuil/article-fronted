import React from 'react'
import { Button, Result } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyleNotFound = styled.div`
    height: 100vh;
`

export default function NotFound() {
    const navigateTo = useNavigate()
    return (
        <StyleNotFound className="not_found flex_center">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => {
                        navigateTo('/article')
                    }}>回到首页</Button>
                }
            />
        </StyleNotFound>
    )
}
