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

export default function App() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}
 