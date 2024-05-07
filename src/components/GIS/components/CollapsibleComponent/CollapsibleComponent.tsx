import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactElement,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";
import {
  MapAttachedComponentProps,
  MapAttachedObject,
} from "../MapAttachedObject";

const CollapsibleContext = createContext(
  null as unknown as () => void //Dispatch<SetStateAction<boolean>>
);

export const useCollapsible = () => {
  return useContext(CollapsibleContext);
};

interface CollapsibleComponentProps extends MapAttachedComponentProps {
  collapsed: ReactNode;
  expanded: ReactNode;
}

export function CollapsibleComponent({
  collapsed,
  expanded,
  view,
}: CollapsibleComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <MapAttachedObject
      id="collapsible-component-div"
      attachmentLocation="top-right"
      view={view}
    >
      <CollapsibleContext.Provider value={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? expanded : collapsed}
      </CollapsibleContext.Provider>
    </MapAttachedObject>
  );
}
