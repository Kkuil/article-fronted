import React from 'react'
import styled from 'styled-components'

const Plugin = styled.div`
    width: 350px;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0 0 10px;
    > div {
        margin: 5px 0;
    }
    h3 {
        background-color: #fff !important;
        color: #000 !important;
        height: initial !important;
    }
    .introductions {
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        white-space: normal;
        word-wrap: break-word;
        text-overflow: ellipsis;
        line-height: 20px;
        overflow: hidden;
    }
`

const cate = [
    "React",
    "Vue",
    "Angular"
]

const plugins = [
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
    {
        title: "React-Router",
        introductions: "nviaoncjdawdasonfajisnfuiawnfkjsabnvuiqwncjkasbnbijwbnkoaxcnvajibgajioknfajibwnkanweiujfas1dfaw456",
        scope: "React 路由",
        officialSite: "http://react-router.com",
        github: "http://github/react-router"
    },
]

export default function Plugins() {
    return (
        <div>
            {
                cate.map(c => {
                    return (
                        <div
                            key={c}
                            style={{
                                marginBottom: "20px"
                            }}
                        >
                            <h4
                                className="cate_name"
                                style={{
                                    color: "#777",
                                    marginLeft: "10px"
                                }}
                            >—— {c} ——</h4>
                            <div
                                className="cate_content"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    flexWrap: "wrap"
                                }}
                            >
                                {
                                    plugins.map((p, index) => {
                                        return (
                                            <Plugin key={index}>
                                                <h3 className="title">{p.title}</h3>
                                                <div className="introductions">{p.introductions}</div>
                                                <div className="scope">适用范围：{p.scope}</div>
                                                <div className="official">官网地址：{p.officialSite}</div>
                                                <div className="github">github地址：{p.github}</div>
                                            </Plugin>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
