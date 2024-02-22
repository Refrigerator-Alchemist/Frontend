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
import { LoginProvider } from './context/LoginContext';

export default function App() {
  return (
    <section>
      <LoginProvider>
        <NavigationProvider>
          <Outlet />
        </NavigationProvider>
      </LoginProvider>
    </section>
  );
}
