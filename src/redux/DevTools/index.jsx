import React from 'react'
import {createDevTools} from 'redux-devtools'
import SliderMonitor from 'redux-slider-monitor'
import Dispatcher from 'redux-devtools-dispatch'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'
    defaultPosition='right'
    defaultIsVisible={false}
  >
    <Dispatcher />
    <SliderMonitor keyboardEnabled />
  </DockMonitor>
)

export default DevTools
