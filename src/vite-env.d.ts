/// <reference types="vite/client" />

// This tells TypeScript: “When someone imports .svg?react, treat it as a valid React component.
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
};