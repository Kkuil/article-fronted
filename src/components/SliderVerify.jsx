import React from "react";
import { createPortal } from "react-dom";
import { message } from 'antd'
import { Vertify } from '@alex_xu/react-slider-vertify'
import { useNavigate } from "react-router-dom";
import Model from "./Model";
import styled from "styled-components";

const StyleI = styled.i`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  font-size: 25px;
  color: #fff;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

export default function SliderVerify({ close }) {
  const navigateTo = useNavigate()
  return createPortal(<Model>
    <StyleI 
      className="iconfont icon-close-bold flex_center"
      onClick={() => close(false)}
    ></StyleI>
    <Vertify
      width={320}
      height={160}
      visible={true}
      onSuccess={() => {
        navigateTo('/article', {
          replace: true
        })
        message.success('登录成功', 2)
      }}
      onFail={() => message.error('验证失败', 2)}
      onRefresh={() => console.log('refresh')}
    />
  </Model>, document.body);
}
