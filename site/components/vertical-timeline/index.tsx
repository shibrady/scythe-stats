import { Fragment, FC, ReactNode } from 'react';
import { useStyletron } from 'baseui';
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import TimelineRow from './timeline-row';

export interface TimelineElement {
  key: string;
  isSelectable: boolean;
  content: ReactNode;
  rawContentDescriptor: string;
  date: string;
}

interface Props {
  elements: TimelineElement[];
  selected: number;
  className?: string;
  onClick?: (key: string) => void;
}

export const VerticalTimeline: FC<Props> = ({
  elements,
  selected,
  className,
  onClick
}) => {
  const [css] = useStyletron();

  return (
    <PerfectScrollbar
      className={classNames(
        css({
          padding: '5px 0',
          width: '550px',
          maxHeight: '450px'
        }),
        className
      )}
    >
      {elements.map(
        ({ key, isSelectable, content, rawContentDescriptor, date }, i) => {
          const isSelected = i === selected;
          const hasPrev = i > 0;

          return (
            <Fragment key={key}>
              {hasPrev && <TimelineRow />}
              <TimelineRow
                element={{
                  id: key,
                  isSelected,
                  content,
                  rawContentDescriptor,
                  date,
                  onClick: isSelectable ? onClick : undefined
                }}
              />
            </Fragment>
          );
        }
      )}
    </PerfectScrollbar>
  );
};
