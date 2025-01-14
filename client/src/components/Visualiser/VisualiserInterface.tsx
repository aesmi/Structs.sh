import { Box } from '@mui/material';
import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import CodeSnippet from 'components/CodeSnippet/CodeSnippet';
import { Pane } from 'components/Panes';
import { Documentation } from 'visualiser-src/common/typedefs';
import VisualiserController from 'visualiser-src/controller/VisualiserController';
import { VisualiserControls } from './Controller';
import GUIMode from './Controller/GUIMode/GUIMode';
import styles from './VisualiserDashboard.module.scss';
import VisualiserContext from './VisualiserContext';

interface VisualiserInterfaceProps {
  topicTitle: string;
}

/**
 * The component responsible for connecting the visualiser source code with the
 * React client.
 *   - Contains the controller and form.
 *   - Initialises the visualiser and 'puts' it onto the DOM. It relies on
 *     the corresponding <VisualiserCanvas /> component being there.
 *   - Defines a bunch of callbacks to that call visualiser methods and passes
 *     them off to the controller components (basically the play/pause buttons,
 *     sliders, etc.).
 */
const VisualiserInterface: React.FC<VisualiserInterfaceProps> = ({ topicTitle }) => {
  const topicTitleRef = useRef<string>();
  const controllerRef = useRef<VisualiserController>();
  const [isTimelineComplete, setIsTimelineComplete] = useState<boolean>(false);
  const [documentation, setDocumentation] = useState<Documentation>({});

  useEffect(() => {
    controllerRef.current = controllerRef.current || new VisualiserController();
    controllerRef.current.applyTopicTitle(topicTitle);
    topicTitleRef.current = topicTitle;
    setDocumentation(controllerRef.current.documentation);
  }, [topicTitle]);

  const handleTimelineUpdate = useCallback((val) => {
    const timelineSlider = document.querySelector('#timelineSlider') as HTMLInputElement;
    timelineSlider.value = String(val);
    setIsTimelineComplete(val >= 100);
  }, []);

  const contextValues = useMemo(
    () => ({
      controller: controllerRef.current,
      topicTitle: topicTitleRef.current,
      documentation,
      timeline: { isTimelineComplete, handleTimelineUpdate },
    }),
    [
      controllerRef.current,
      topicTitleRef.current,
      documentation,
      isTimelineComplete,
      handleTimelineUpdate,
    ]
  );

  return (
    <VisualiserContext.Provider value={contextValues}>
      <Box className={styles.interactor}>
        <VisualiserControls />
        <Pane orientation="vertical" minSize={150.9}>
          <GUIMode />
          <CodeSnippet />
        </Pane>
      </Box>
    </VisualiserContext.Provider>
  );
};

export default VisualiserInterface;
