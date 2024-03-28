// import * as React from 'react';
// import { ComponentType, useEffect, useState } from 'react';
// import useIntersectionObserver from './hooks/useIntersectionObserver';

// //return Hight Component
// function withLazyLoad <P extends object>(
//   WrappedComponent: ComponentType<P>,
//   threshold = 0.5
// ): React.FC<P> => {
//   return (props: P) => {
//     const [isInView, ref] = useIntersectionObserver(threshold);
//     const [hasLoaded, setHasLoaded] = useState(false);
//     useEffect(() => {
//       if (isInView && !hasLoaded) {
//         setHasLoaded(true);
//       }
//     }, [hasLoaded, isInView]);
//     return (
//       <div ref={ref}>
//         {hasLoaded ? <WrappedComponent {...props} /> : <div>Loading...</div>}
//       </div>
//     );
//   };
// };
// withLazyLoad.displayName = 'withLazyLoad';
// export default withLazyLoad;
