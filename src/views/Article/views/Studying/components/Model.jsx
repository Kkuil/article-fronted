import { Modal } from 'antd'
import PubSub from 'pubsub-js'

export default ({ open, setOpen, isImmersiveStudying, setIsImmersiveStudying }) => {
    const enterStudying = () => {
        setOpen(false)
        PubSub.publish('studying', !isImmersiveStudying)
        setIsImmersiveStudying(!isImmersiveStudying)
    }
    return (
        <>
            <Modal
                title="Ky-Studying"
                open={open}
                onOk={enterStudying}
                onCancel={() => setOpen(false)}
                okText={isImmersiveStudying ? '离开' : '进入'}
                cancelText="取消"
            >
                <b>
                    {
                        isImmersiveStudying
                        ? '离开沉浸式学习'
                        : '进入沉浸式学习'
                    }
                </b>
            </Modal>
        </>
    )
}