import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

export default function RichText() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
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