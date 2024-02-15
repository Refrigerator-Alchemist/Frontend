// import React from 'react';
// import GetStarted from './pages/GetStarted';

// export default function App() {
//   return (
//     <div>
//       <GetStarted />
//     </div>
//   );
// }

import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationProvider } from '../src/context/NavigationContext';

export default function App() {
  return (
    <section>
      <NavigationProvider>
        <Outlet />
      </NavigationProvider>
    </section>
  );
}
