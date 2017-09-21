import React from 'react'
import {createDevTools} from 'redux-devtools'
import Inspector from 'redux-devtools-inspector'
import SliderMonitor from 'redux-slider-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'
    defaultPosition='right'
    defaultIsVisible={false}
  >
    <Inspector />
    <SliderMonitor keyboardEnabled />
  </DockMonitor>
)

export default DevTools
