import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const studyTimeSlice = createSlice({
    name: 'StudyTime',
    initialState: {
        isPlay: true,
        timestamp: 57600000,
        study_time: '00 : 00 : 00'
    },
    reducers: {
        changeTime(state, actions) {
            state.timestamp += 1000
            state.study_time = moment(state.timestamp).format('HH : mm : ss')
        },
        setPlay(state, action) {
            state.isPlay = !state.isPlay
        },
        restart(state, actions) {
            state.timestamp = 57600000
            state.study_time = '00 : 00 : 00'
        }
    }
})
export default studyTimeSlice
export const { changeTime, setPlay, restart } = studyTimeSlice.actions