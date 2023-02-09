import React, { useEffect, createRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import Pubsub from 'pubsub-js'

const Input = styled.input`
    border: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    border-top: 5px solid #ccc;
    border-radius: 10px;
    font-size: 25px;
    transition: all .3s;
    &:focus {
        border-color: #0094ff;
    }
`
var sid = null
export default function RichText() {
    const editorRef = createRef(null);
    const title = createRef(null)
    useEffect(() => {
        sid = Pubsub.subscribe("tmpBridge", () => {
            Pubsub.publish("getContent", {
                title: title.current.value, 
                content: editorRef.current.getContent()
            })
        })
        return () => {
            sid && Pubsub.unsubscribe(sid)
        }
    }, [sid])
    return (
        <>
            <Input type="text" ref={title} placeholder='为你的文章起个标题吧'/>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Write something</p>"
                apiKey='5zhoes985luudtst57f77q3itym230nyqqmwn3ywjrxypldn'
                init={{
                    height: 600,
                    menubar: false,
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
}