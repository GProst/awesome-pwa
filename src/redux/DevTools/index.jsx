import React from 'react'
import {createDevTools} from 'redux-devtools'
import SliderMonitor from 'redux-slider-monitor'
import Dispatcher from 'redux-devtools-dispatch'
import DockMonitor from 'redux-devtools-dock-monitor'
import MultipleMonitors from 'redux-devtools-multiple-monitors'
import DiffMonitor from 'redux-devtools-diff-monitor'

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'
    defaultPosition='right'
    defaultIsVisible={false}
  >
    <MultipleMonitors>
      <DiffMonitor />
      <Dispatcher />
    </MultipleMonitors>
    <SliderMonitor keyboardEnabled />
  </DockMonitor>
)

export default DevTools
